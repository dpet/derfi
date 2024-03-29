
import { useState, useEffect } from 'react';
import FactorySelector from '../common/FactorySelector.jsx';
import { useConnection } from '../helpers/ConnectionProvider.js';
import Notice from '../common/Notice.jsx';
import { factory_abi, lp_abi, token_abi } from '../../data/abi.js'; 
import { ethers } from 'ethers';
import PoolDisplay from '../common/PoolDisplay.jsx';
import useInterval from '../helpers/UseInterval.js';

export default function FactoryMonitor(){
	const connection = useConnection()

	let [ messages, setMessages ] = useState([])
	let [ selected, setSelected ] = useState({
		network: '',
		amm: '',
		factoryAddress: '',
		chefAddress: '',
		networkMatch: null
	})

	let [ numberOfPools, setNumberOfPools ] = useState()
	let [ pools, setPools ] = useState({})

	let [ started, setStarted ] = useState(false)
	let [ loading, setLoading ] = useState(false)
	let [ helpToggle, setHelpToggle ] = useState(false)

	let [ bell, setBell ] = useState(false)
	let beep_1 = new Audio('beep_1.wav');

	useEffect(() => {
		setMessages(['Warning: many new tokens are scams. Do not buy unless you know what you are doing. Many new liquidity pools have their liquidity pulled soon after creation. New tokens can also be named the same as other tokens to trick users into buying them. Many tokens self destruct their contracts soon after launch. There are many tricks so be wary. This site is just for monitoring new pools.'])
	}, [])

	useEffect(() => {
		setNumberOfPools(null)
		setPools({})
		setStarted(false)
	}, [selected])

	useEffect(() => {
		load()
	}, [started])

	useEffect(() => {
		console.log(pools)
	}, [pools])

	useEffect(() => {
		if (connection.warning.length > 0)
			setMessages(connection.warning)

	}, [connection])

	useInterval(
		() => load(), 
		started ? 10000 : null
	)

	async function load(){
		if (!started)
			return
		
		let tempMessages = []

		if (!connection.connected)
			tempMessages.push('Metamask is not connected')
		else{
			if (!selected.factoryAddress)
				tempMessages.push('Please select or enter a factory address')
			if (selected.network && !selected.networkMatch)
				tempMessages.push('The selected network does not match the Metamask network')
		}

		setMessages(tempMessages)
		if (tempMessages.length > 0){
			setStarted(false)
			return;
		}

		setLoading(true)
		const factoryContract = new ethers.Contract(selected.factoryAddress, factory_abi, connection.provider)

		try {
			let factoryPools = await factoryContract.allPairsLength()

			if (numberOfPools)
				poolsFromIndex(numberOfPools, factoryPools.toNumber(), factoryContract)
			else
				poolsFromIndex(factoryPools.toNumber() - 5, factoryPools.toNumber(), factoryContract)

			setNumberOfPools(factoryPools.toString())
		}catch(e){
			console.error(e)
			tempMessages.push('Not a factory')
			setTimeout(() => setLoading(false), 400)
			setStarted(false)
		}
	}

 	return (
 		<div className="container">
 			<h1 className="is-size-3 mb-2">Factory Monitor <span className="help-toggle ml-2 has-text-warning" onClick={() => setHelpToggle(!helpToggle)}>help {helpToggle ? '▼' : '▲'}</span></h1>

 			{helpToggle && <div className="help-content mb-4 has-text-warning">
 				<p>This tool checks how many Liquidity Pools have been registered with a factory and then shows recent and new pools as they are created. You can use the drop down to select a factory from the list or you can enter your own factory address. It will check whatever network is selected in metamask for the factory. Once it sees how many Liquidity Pools are registered with a factory, it will grab the last few Liquidity Pools and show the amounts of tokens in the pool including the LP amount. It will then continue to monitor the factory for new pools. If you select an active pool like Pancakeswap V2 then you will see new pools frequently. The pool values will not be updated after the initial fetch, so this tool is not good for monitoring changes in a pool, it only gives a snapshot of new pools when they are created. It uses Metamask to get its data.</p>
 			</div>}

 			<Notice messages={messages} setMessages={setMessages}></Notice>

 			<FactorySelector 
 				selected={selected} 
 				setSelected={setSelected}
 				type="factory">
 					<button className="button is-primary mr-5" onClick={() => setStarted(true)}>Load</button>
 					<label className="checkbox bell has-text-white">
					  <input className="mr-2" type="checkbox" 
					  	type="checkbox"
				        checked={bell}
				        onChange={() => setBell(!bell)} />
					    	bell
					</label>
 			</FactorySelector>

 			<h3 className="is-size-3 mb-2 has-text-danger">{selected.amm}</h3>

 			<div className="is-size-4 mb-3">
 				Liquidity pools registered with factory: <span className="has-text-info">{numberOfPools && numberOfPools.toLocaleString()}</span>
 				<button className="button is-loading loading-button" style={{visibility: loading ? 'visible' : 'hidden'}}></button>
 			</div>

 			<div className="mb-2">
 				<span className="is-size-4">Recent pools:</span>
 			</div>

 			<PoolDisplay pools={pools}></PoolDisplay>
 		</div>
 	)

 	function poolsFromIndex(start, end, factoryContract){

 		let collectedPools = {}
 		let promises = []

 		if (start < 0)
 			start = 0;

 		for (let a = start; a < end; a++){
 			collectedPools[a] = {index: a}

 			promises.push(new Promise((resolve, reject) => {
 				factoryContract.allPairs(a).then(res => {
	 				collectedPools[a].address = res

	 				getLpState(res).then(res => {

	 					[ collectedPools[a].token_1,
	 						collectedPools[a].token_2,
	 						collectedPools[a].name,
	 						collectedPools[a].symbol,
	 						collectedPools[a].decimals 
	 					] = res

	 					getToken(collectedPools[a].token_1).then(res => {

	 						[ collectedPools[a].token_1_name,
	 							collectedPools[a].token_1_symbol,
	 							collectedPools[a].token_1_decimals,
	 						] = res

	 						getToken(collectedPools[a].token_2).then(res => {

		 						[ collectedPools[a].token_2_name,
		 							collectedPools[a].token_2_symbol,
		 							collectedPools[a].token_2_decimals,
		 						] = res

		 						getTokenAmounts(collectedPools[a].address).then(res => {
		 							collectedPools[a].token_1_amount = ethers.utils.formatUnits(res[0]._reserve0, collectedPools[a].token_1_decimals)
		 							collectedPools[a].token_2_amount = ethers.utils.formatUnits(res[0]._reserve1, collectedPools[a].token_2_decimals)

		 							collectedPools[a].lp_amount = ethers.utils.formatUnits(res[1], collectedPools[a].decimals)
		 							resolve()
		 						})
		 						.catch(e => {
		 							console.error(a, e)
				 					resolve()
				 				})
		 					})
		 					.catch(e => {
			 					resolve()
			 				})
	 					})
	 					.catch(e => {
		 					resolve()
		 				})
	 				})
	 				.catch(e => {
	 					resolve()
	 				})
	 			})
	 			.catch(e => {
 					resolve()
 				})
 			}))
 		}


 		Promise.all(promises).then(res => {
			setTimeout(() => setLoading(false), 400)	
 			setPools(prevState => ({...prevState, ...collectedPools}))

 			console.log(start, end)

 			if (bell && end > start)
 				beep_1.play().then()
 		})
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

		if (address === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'){
			return new Promise((resolve, reject) => {
				resolve([
					'WBNB',
					'Wrapped BNB',
					18
				])
			})
		}
		else{
			return Promise.all([
				tokenContract.name(),
				tokenContract.symbol(),
				tokenContract.decimals(),
			])
		}
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




