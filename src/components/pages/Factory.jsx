
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
		networkMatch: null
	})

	let [ numberOfPools, setNumberOfPools ] = useState()
	let [ pools, setPools ] = useState({})

	let [ started, setStarted ] = useState(false)

	useEffect(() => {
		setNumberOfPools(null)
		setPools({})
		setStarted(false)
	}, [selected])

	useEffect(() => {
		load()
	}, [started])

	useInterval(
		() => load(), 
		started ? 5000 : null
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

		const factoryContract = new ethers.Contract(selected.factoryAddress, factory_abi, connection.provider)
		let factoryPools = await factoryContract.allPairsLength()

		if (numberOfPools)
			poolsFromIndex(numberOfPools, factoryPools.toNumber(), factoryContract)
		else
			poolsFromIndex(factoryPools.toNumber() - 5, factoryPools.toNumber(), factoryContract)

		setNumberOfPools(factoryPools.toString())		
	}

 	return (
 		<div className="container">
 			<h1 className="is-size-3 mb-2">Factory Monitor</h1>

 			<Notice messages={messages} setMessages={setMessages}></Notice>

 			<FactorySelector 
 				selected={selected} 
 				setSelected={setSelected}>
 					<button className="button is-primary" onClick={() => setStarted(true)}>Load</button>
 			</FactorySelector>

 			<h3 className="is-size-3 mb-2 has-text-danger">{selected.amm}</h3>

 			<div className="is-size-4 mb-4">
 				Liquidity pools registered with factory: <span className="has-text-info">{numberOfPools && numberOfPools.toLocaleString() - 1}</span>
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
		 							console.log(res)

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
 			console.log('all', collectedPools)
 			setPools(prevState => ({...prevState, ...collectedPools}))
 		})
	}

 	function getLpState(lpAddress){
		const lpContract = new ethers.Contract(lpAddress, lp_abi, connection.provider)

		let promises = [
			lpContract.token0(),
			lpContract.token1(),
			lpContract.name(),
			lpContract.symbol(),
			lpContract.decimals(),
			lpContract.getReserves(),
			lpContract.totalSupply(),
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




