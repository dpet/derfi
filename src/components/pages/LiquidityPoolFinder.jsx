
import { useState, useEffect } from 'react';
import FactorySelector from '../common/FactorySelector.jsx';
import { useConnection } from '../helpers/ConnectionProvider.js';
import Notice from '../common/Notice.jsx';
import { ethers } from 'ethers';
import { factory_abi, token_abi, lp_abi } from '../../data/abi.js';
import PoolDisplay from '../common/PoolDisplay.jsx';

export default function LiquidityPoolFinder(){
 	const connection = useConnection()

	let [ messages, setMessages ] = useState([])
	let [ selected, setSelected ] = useState({
		network: '',
		amm: '',
		factoryAddress: '',
		chefAddress: '',
		networkMatch: null
	})

	let [ loading, setLoading ] = useState(false)
	let [ helpToggle, setHelpToggle ] = useState(false)
	
	let [ token1Address, setToken1Address ] = useState('')
	let [ token2Address, setToken2Address ] = useState('')
	let [ index, setIndex ] = useState('')

	let [ results, setResults ] = useState({
		lpAddress: 'glorp',
	})

	useEffect(() => {
		if (token1Address || token2Address)
			setIndex('')
	}, [token1Address, token2Address])

	useEffect(() => {
		if (index){
			setToken1Address('')
			setToken2Address('')
		}
	}, [index])

	async function find(){
		setResults({})

		let tempMessages = []

		if (!connection.connected)
			tempMessages.push('Metamask is not connected')
		else{
			if (!selected.factoryAddress)
				tempMessages.push('Please select or enter a factory address')
			if (selected.network && !selected.networkMatch)
				tempMessages.push('The selected network does not match the Metamask network')
		}

		if (tempMessages.length === 0){
			if (!index && (!token1Address || !token2Address))
				tempMessages.push('Enter two token addresses or an index')
		}

		setMessages(tempMessages)
		if (tempMessages.length > 0){
			return;
		}

		setLoading(true)
		const factoryContract = new ethers.Contract(selected.factoryAddress, factory_abi, connection.provider)

		let lpAddress
		if (index){
			try{
				lpAddress = await factoryContract.allPairs(index)
			}
			catch(e){
				console.error(e)
				tempMessages.push(['Unknown index'])
			}
		}
		else{
			try{
				lpAddress = await factoryContract.getPair(token1Address, token2Address)
			}
			catch(e){
				console.error(e)
				tempMessages.push(['Unknown token addresses'])
			}
		}

		if (lpAddress === '0x0000000000000000000000000000000000000000')
			tempMessages.push(['Pool not found'])

		setMessages(tempMessages)
		if (tempMessages.length > 0){
			setLoading(false)
			return
		}

		console.log('lp', lpAddress)

		// need ;
		let tempResults = {};
		tempResults.address = lpAddress;
		tempResults.index = index;

		try{
			[ tempResults.token_1,
				tempResults.token_2,
				tempResults.name,
				tempResults.symbol,
				tempResults.decimals 
			] = await getLpState(lpAddress);
		}catch(e){
			console.error(e)
		}

		try{
			[ tempResults.token_1_name,
				tempResults.token_1_symbol,
				tempResults.token_1_decimals,
			] = await getToken(tempResults.token_1);
		}
		catch(e){
			console.error(e)
		}

		try{
			[ tempResults.token_2_name,
				tempResults.token_2_symbol,
				tempResults.token_2_decimals,
			] = await getToken(tempResults.token_2);
		}
		catch(e){
			console.error(e)
		}

		try{
			let res = await getTokenAmounts(lpAddress)
			tempResults.token_1_amount = ethers.utils.formatUnits(res[0]._reserve0, tempResults.token_1_decimals)
			tempResults.token_2_amount = ethers.utils.formatUnits(res[0]._reserve1, tempResults.token_2_decimals)
			tempResults.lp_amount = ethers.utils.formatUnits(res[1], tempResults.decimals)
		}
		catch(e){
			console.error(e)
		}

		setResults(tempResults)
		setLoading(false)
	}

 	return (
 		<div className="container">
 			<h1 className="is-size-3 mb-2">Find a Liquidity Pool <span className="help-toggle ml-2 has-text-warning" onClick={() => setHelpToggle(!helpToggle)}>help {helpToggle ? '▼' : '▲'}</span></h1>

 			{helpToggle && <div className="help-content mb-4 has-text-warning">
 				<p>This tool lets you search a factory for a Liquidity Pool. If you know the index then enter that, or if you know the two token addresses then enter those. If you enter two token addresses then it is unable to find the index of the Liquidity Pool. It uses Metamask to get its data.</p>
 			</div>}

 			<Notice messages={messages} setMessages={setMessages}></Notice>

 			<FactorySelector 
 				selected={selected} 
 				setSelected={setSelected}
 				type="factory">
 			</FactorySelector>

 			<span>Enter two token addresses or an index</span>
 			<div className="field is-grouped is-grouped-multiline">
				<div className="control">
					<input 
						className="input is-primary address-input" 
						type="text" 
						placeholder="Token 1 address" 
						value={token1Address} 
						onKeyUp={e => e.key === "Enter" && find()} 
						onChange={e => setToken1Address(e.target.value)} />
				</div>
				<div className="control">
					<input 
						className="input is-primary address-input" 
						type="text" 
						placeholder="Token 2 address" 
						value={token2Address} 
						onKeyUp={e => e.key === "Enter" && find()} 
						onChange={e => setToken2Address(e.target.value)} />
				</div>
			</div>

			<div className="field is-grouped mb-6">
				<div className="control">
					<input 
						className="input is-info address-input" 
						type="text" 
						placeholder="Index" 
						value={index} 
						onKeyUp={e => e.key === "Enter" && find()}
						onChange={e => setIndex(e.target.value)} />
				</div>

				<div className="control">
					<button className="button is-primary" onClick={find}>Find</button>
				</div>

				<button className="button is-loading loading-button" style={{visibility: loading ? 'visible' : 'hidden'}}></button>
			</div>

			{results.address && <>
				<div className="is-size-4 mb-3 light-blue">
	 				Results:
	 			</div>
	 			<PoolDisplay pools={[results]}></PoolDisplay>
 			</>}

		</div>
 	)

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