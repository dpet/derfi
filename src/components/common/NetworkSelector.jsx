import { networks } from '../../data/amm.js';
import { useState, useEffect } from 'react';
import { useConnection } from '../helpers/ConnectionProvider.js';

export default function NetworkSelector({selected, setSelected, children}){
	const connection = useConnection()

	useEffect(() => {
		console.log(connection)
	}, [connection])

	useEffect(() => {
		checkNetworkMatch()
	}, [selected.network, connection])

	function networkChanged(network){
		setSelected(prevState => ({
			...prevState,
			network: network,
		}))
	}

	function checkNetworkMatch(){
		let networkMatch
		if (selected.network)
			networkMatch = networks[selected.network].networkId === connection.networkId
		else networkMatch = false

		setSelected(prevState => ({
			...prevState,
			networkMatch: networkMatch
		}))
	}

	return <div>
		<span>Select a network</span>
		<div className="field is-grouped mb-0">
			<div className="select is-success mr-2">
				<select onChange={e => {networkChanged(e.target.value)}} value={selected.network}>
					<option value=''>Network</option>
					{Object.keys(networks).map(networkName => <option key={networkName} value={networkName}>{networkName}</option>)}
				</select>
			</div>

			{children}
		</div>

		<div>
			{!connection.connected && <span className="blue">Metamask not connected</span>}
			{(connection.connected && selected.network) && (selected.networkMatch ? <span className="green">Network match</span> : <span className="red">Network mismatch</span>)}
		</div>
	</div>

}