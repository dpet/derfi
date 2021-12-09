
import { useState, useEffect } from 'react';
import FactorySelector from '../common/FactorySelector.jsx';
import { useConnection } from '../helpers/ConnectionProvider.js';
import Notice from '../common/Notice.jsx';
import { factory_abi } from '../../data/abi.js'; 
import { ethers } from 'ethers';

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

	useEffect(() => {
		setNumberOfPools(null)
	}, [selected])

	async function load(){
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
		if (tempMessages.length > 0)
			return;

		const factoryContract = new ethers.Contract(selected.factoryAddress, factory_abi, connection.provider)
		let factoryPools = await factoryContract.allPairsLength()
		setNumberOfPools(factoryPools.toString())
	}

 	return (
 		<div className="container">
 			<h1 className="is-size-3 mb-2">Pancakeswap Factory Monitor</h1>

 			<Notice messages={messages} setMessages={setMessages}></Notice>

 			<FactorySelector 
 				selected={selected} 
 				setSelected={setSelected}>
 					<button className="button is-primary" onClick={load}>Load</button>
 			</FactorySelector>

 			<div className="is-size-4 mb-4">
 				Liquidity pools registered with factory: <span className="has-text-info">{numberOfPools && numberOfPools.toLocaleString()}</span>
 			</div>

 			<div>
 				<span className="is-size-4 mb-4">Recent pools:</span>
 			</div>
 		</div>
 	)
}


