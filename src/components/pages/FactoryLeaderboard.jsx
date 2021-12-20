
import { useState, useEffect } from 'react';
import Notice from '../common/Notice.jsx';
import NetworkSelector from '../common/NetworkSelector.jsx';
import { networks } from '../../data/amm.js';
import { useConnection } from '../helpers/ConnectionProvider.js';
import { factory_abi } from '../../data/abi.js'; 
import { ethers } from 'ethers';

export default function FactoryLeaderboard(){

	let [ messages, setMessages ] = useState([])
	let [ selected, setSelected ] = useState({
		network: '',
		networkMatch: null
	})

	let [ factories, setFactories ] = useState([])
	let [ loading, setLoading ] = useState(false)
	let [ helpToggle, setHelpToggle ] = useState(false)
	const connection = useConnection()

	useEffect(() => {
		if (selected.network){
			if (networks[selected.network].amms[0].numberOfPools)
				networks[selected.network].amms.sort((a, b) => a.numberOfPools < b.numberOfPools ? 1 : -1)
			setFactories(networks[selected.network].amms)
		}
		else
			setFactories([])
	}, [selected])

	useEffect(() => {
		console.log('f', factories)
		console.log('n', networks)
	}, [factories])

	function load(){

		let tempMessages = []

		if (!connection.connected)
			tempMessages.push('Metamask is not connected')
		else{
			if (!selected.network)
				tempMessages.push('Please select a network')
			if (selected.network && !selected.networkMatch)
				tempMessages.push('The selected network does not match the Metamask network')
		}

		setMessages(tempMessages)
		if (tempMessages.length > 0){
			return;
		}

		setLoading(true)

		let promises = []
		for (let a = 0; a < factories.length; a++){
			const factory = factories[a]

			const factoryContract = new ethers.Contract(factory.factory, factory_abi, connection.provider)
			const promise = new Promise((resolve, reject) => {
				factoryContract.allPairsLength().then(response => {
					factory.numberOfPools = response.toNumber()
					resolve(factory)
				})
			})

			promises.push(promise)
		}

		Promise.all(promises).then(response => {
			response.sort((a, b) => a.numberOfPools < b.numberOfPools ? 1 : -1)
			setFactories(response)
			setLoading(false)
		})
	}


	return <div className="container">
 			<h1 className="is-size-3 mb-2">Factory Leaderboard <span className="help-toggle ml-2 has-text-warning" onClick={() => setHelpToggle(!helpToggle)}>help {helpToggle ? '▼' : '▲'}</span></h1>

 			{helpToggle && <div className="help-content mb-4 has-text-warning">
 				<p>This tool takes all the Factories listed for a network and checks how many Liquidity Pools each one has. It only checks the Factories in the list so if one is missing then it won't be included. It uses Metamask to get its data.</p>
 			</div>}

 			<Notice messages={messages} setMessages={setMessages}></Notice>

 			<NetworkSelector 
 				selected={selected} 
 				setSelected={setSelected}>
 					<button className="button is-primary" onClick={load}>Load</button>
 			</NetworkSelector>

 			<h3 className="is-size-3 mb-3 has-text-danger">
 				{selected.network}
 				<button className="button is-loading loading-button mt-2" style={{visibility: loading ? 'visible' : 'hidden'}}></button>
 			</h3>

 			<div className="is-size-4 mb-3 light-blue">
 				Liquidity pools registered with factory:
 			</div>

 			<div className="is-size-5 mb-3">
 				{factories.map(factory => <div className="factory-list" key={factory.name}>
 					<span className="factory-list-name">{factory.name}</span>
 					<span className="factory-list-amount has-text-info">{factory.numberOfPools && factory.numberOfPools.toLocaleString()}</span>
 				</div>)}
 			</div>
	</div>
}