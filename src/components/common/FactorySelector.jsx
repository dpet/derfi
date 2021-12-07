import { networks } from '../../data/amm.js';
import { useState, useEffect } from 'react';

export default function FactorySelector(){

	let [ network, setNetwork ] = useState(Object.keys(networks)[0]) 
	let [ amm, setAmm ] = useState(networks[Object.keys(networks)[0]].amms[0].name)
	let [ factoryAddress, setFactoryAddress ] = useState(networks[Object.keys(networks)[0]].amms[0].factory)

	useEffect(() => {
		if (network)
			setAmm(networks[network].amms[0].name)
	}, [network])

	useEffect(() => {
		if (network && amm)
			setFactoryAddress(networks[network].amms.find(ammItem => ammItem.name === amm).factory)
	}, [amm])

	function userChangeNetwork(val){
		if (!val)
			setFactoryAddress('')

		setNetwork(val)
	}

	function userChangeAmm(val){
		if (!val)
			setFactoryAddress('')

		setAmm(val)
	}

	function userChangeFactoryAddress(e){
		setNetwork('')
		setFactoryAddress(e.target.value)
	}

	return <div>
		<span>Select a factory or enter a factory address</span>
		<div className="field is-grouped mb-6">
			<div className="select is-success mr-2">
				<select onChange={e => {userChangeNetwork(e.target.value)}} value={network}>
					<option value=''>Select</option>
					{Object.keys(networks).map(networkName => <option key={networkName} value={networkName}>{networkName}</option>)}
				</select>
			</div>

			<div className="select is-info mr-2">
				<select onChange={e => {userChangeAmm(e.target.value)}} value={amm}>
					<option value=''>Select</option>
					{network && networks[network].amms.map(ammItem => <option key={ammItem.name} value={ammItem.name}>{ammItem.name}</option>)}
				</select>
			</div>

			<div className="control">
				<input className="input is-primary address-input" type="text" placeholder="factory address" value={factoryAddress} onChange={e => userChangeFactoryAddress(e)} />
			</div>
		</div>
	</div>
}
