
import { useState, useEffect } from 'react';
import { useConnection } from '../helpers/ConnectionProvider.js';
import { ethers } from 'ethers';
import { factory_abi, token_abi, lp_abi } from '../../data/abi.js';
import PoolDisplay from '../common/PoolDisplay.jsx';
import { format } from 'date-fns';
import useInterval from '../helpers/UseInterval.js';

export default function LiquidityPoolMonitorElement({ setMessages }){

	const connection = useConnection()
	let [ loading, setLoading ] = useState(false)
	let [ lpAddress, setLpAddress ] = useState('')

	let [ results, setResults ] = useState({prices: []})
	let [ bell, setBell ] = useState(false)
	const secondsPerDay = 86400

	let beep_1 = new Audio('beep_1.wav');

	useInterval(() => {
		if (results.name)
			getPrices()
	}, 10000)

	useEffect(() => {
		console.log('results', results)
	}, [results])

	async function load(){
		setLoading(true)
		setResults({prices: []})
		let tempMessages = []

		if (!connection.connected)
			tempMessages.push('Metamask is not connected')
		else{
			if (!lpAddress)
				tempMessages.push('Please enter a Liquidity Pool address')
		}

		setMessages(tempMessages)
		if (tempMessages.length > 0){
			setLoading(false)
			return;
		}

		let tempResults = {prices: []};
		tempResults.address = lpAddress;

		try{
			[ tempResults.token_1,
				tempResults.token_2,
				tempResults.name,
				tempResults.symbol,
				tempResults.decimals 
			] = await getLpState(lpAddress);
		}catch(e){
			console.error('1', e)
			tempMessages.push('Pool fetch failed. Not a LP Address.')
		}

		try{
			[ tempResults.token_1_name,
				tempResults.token_1_symbol,
				tempResults.token_1_decimals,
			] = await getToken(tempResults.token_1);
		}
		catch(e){
			console.error('2', e)
			tempMessages.push('Token 1 fetch failed')
		}

		try{
			[ tempResults.token_2_name,
				tempResults.token_2_symbol,
				tempResults.token_2_decimals,
			] = await getToken(tempResults.token_2);
		}
		catch(e){
			console.error('3', e)
			tempMessages.push('Token 2 fetch failed')
		}

		setMessages([...tempMessages])
		if (tempMessages.length > 0){
			setLoading(false)
			return;
		}

		setResults(tempResults)
		setLoading(false)
	}

	async function getPrices(){
		let res = await getTokenAmounts(lpAddress)

		if (!results.prices)
			results.prices = []

		let price = {
			token_1_amount: precision(ethers.utils.formatUnits(res[0]._reserve0, results.token_1_decimals), 4),
			token_2_amount: ethers.utils.formatUnits(res[0]._reserve1, results.token_2_decimals),
			lp_amount: ethers.utils.formatUnits(res[1], results.decimals),
			time: Date.now(),
		}

		results.prices.push(price)
		results.prices = createTableData(results.prices)

		if (bell && results.prices.length > 1){
			if (results.prices[results.prices.length - 1].token_1_amount !== results.prices[results.prices.length - 2].token_1_amount){
				beep_1.play().then()
			}
		}
		
		setResults(prevState => ({...prevState, prices: [...results.prices]}))
	}

	function precision(string, digits) {
		string = string.toString()

	    if (string.includes('.')) {
	        const parts = string.split('.');
	        return parts[0] + '.' + parts[1].slice(0, digits);
	    }
	    return string;
	}

	function setListener(){
		const lpContract = new ethers.Contract(lpAddress, lp_abi, connection.provider)
		// event Transfer(address indexed from, address indexed to, uint value);

		lpContract.on("Transfer", (...vals) => {
			console.log('vals', vals)
			getPrices()
		});
	}

	return <div>
		<div className="field is-grouped mt-6 mb-4">
			<div className="control">
				<input 
					className="input is-info address-input" 
					type="text" 
					placeholder="LP Address" 
					value={lpAddress} 
					onKeyUp={e => e.key === "Enter" && load()}
					onChange={e => setLpAddress(e.target.value)} />
			</div>

			<div className="control">
				<button className="button is-primary" onClick={load}>Load</button>
				{/*<button className="button is-primary ml-2" onClick={setListener}>Listen</button>*/}
			</div>

			<button className="button is-loading loading-button mr-2" style={{visibility: loading ? 'visible' : 'hidden'}}></button>
			
			<label className="checkbox mt-4 has-text-white">
			  <input className="mr-2" type="checkbox" 
			  	type="checkbox"
		        checked={bell}
		        onChange={() => setBell(!bell)} />
			    	bell
			</label>

		</div>

		{results.address && <PoolDisplay pools={[results]}>{tableJsx()}</PoolDisplay> }
		
	</div>

	function tableJsx(){
		return <table className="table is-bordered dark-table is-narrow mt-4">
			<thead>
				<tr>
					<th>Time</th>
					<th>Elapsed</th>
					<th className="numberField">{results.token_1_symbol}</th>
					<th></th>

					<th className="numberField">{results.token_2_symbol}</th>
					<th></th>

					<th className="numberField">Total lp</th>
					<th></th>

					{/*<th className="numberField">Geometric Mean</th>
					<th></th>*/}
				</tr>
			</thead>
			<tbody>
				{results.prices.slice().reverse().map(row => {

					return <tr key={row.time}>
						{getTimeCellJsx(row.time)}
						{getTimeElapsedCellJsx(row.timeElapsed)}

						<td>{precision(row.token_1_amount, 4)}</td>
						{getPercentCellJsx(row.token1Percent)}

						<td>{precision(row.token_2_amount, 4)}</td>
						{getPercentCellJsx(row.token2Percent)}

						<td>{precision(row.lp_amount, 4)}</td>
						{getPercentCellJsx(row.lpPercent)}

						{/*<td>{precision(row.product, 4)}</td>
						{getPercentCellJsx(row.productPercent)}*/}

					</tr>
					}
				)}
			</tbody>
		</table>
	}

	function createTableData(prices){

		for (let a = 0; a < prices.length; a++){
			prices[a].product = Math.sqrt(prices[a].token_1_amount * prices[a].token_2_amount, 2)

			if (a > 0){
				prices[a].timeElapsed = prices[a].time - prices[a - 1].time
				prices[a].token1Percent = getPercentChange(prices[a - 1].token_1_amount, prices[a].token_1_amount)
				prices[a].token2Percent = getPercentChange(prices[a - 1].token_2_amount, prices[a].token_2_amount)
				prices[a].lpPercent = getPercentChange(prices[a - 1].lp_amount, prices[a].lp_amount)
				prices[a].productPercent = getPercentChange(prices[a - 1].product, prices[a].product)
			}
		}

		return prices;
	}

	function getPercentChange(val1, val2){
		return ((val2 - val1) / val1) * 100
	}

	function getTimeCellJsx(ms){
		return <td className="nowrap">{format(ms, 'H:mm:ss')}</td>
	}
	

	function getTimeElapsedCellJsx(ms){
		if (typeof ms === 'string' || isNaN(ms))
			return <td></td>

		let seconds = ms / 1000

		let days = Math.floor(seconds / secondsPerDay)
		let hours = Math.floor((seconds - (days * secondsPerDay)) / 3600)
		let minutes = Math.floor((seconds - (days * secondsPerDay) - (hours * 3600)) / 60)
		minutes = minutes.toString().padStart(2, '0')
		let secs = seconds - (days * secondsPerDay) - (hours * 3600) - (minutes * 60)
		secs = secs.toFixed(2).padStart(2, '0')

		let str = '';
		if (days > 0)
			str += days + ':'
		if (hours > 0)
			str += hours + ':'
		str += minutes + ':' + secs

		return <td>{str}</td>
	}

	function getPercentCellJsx(val, precision = 2){
		if (typeof val === 'string' || isNaN(val))
			return <td></td>

		if (Number.isNaN(val))
			return <td className="percent red">0%</td>
		
		let classColor = 'light-grey'
		if (val != 0)
			classColor = val < 0 ? 'red' : 'green'

		return <td className={`percent ${classColor}`}>{parseFloat(val).toFixed(precision)}%</td>
	}

	function getLpState(lpAddress){
 		const lpContract = new ethers.Contract(lpAddress, lp_abi, connection.provider)

		let promises = [
			lpContract.token0(),
			lpContract.token1(),
			lpContract.name(),
			lpContract.symbol(),
			lpContract.decimals()
		]
		return Promise.all(promises)
	}

	function getToken(address){
		const tokenContract = new ethers.Contract(address, token_abi, connection.provider)

		return Promise.all([
			tokenContract.name(),
			tokenContract.symbol(),
			tokenContract.decimals(),
		])
	}

	function getTokenAmounts(lpAddress){
		const lpContract = new ethers.Contract(lpAddress, lp_abi, connection.provider)

		let promises = [
			lpContract.getReserves(),
			lpContract.totalSupply(),
		]
		return Promise.all(promises)
	}
}