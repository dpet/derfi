import { networks } from '../../data/amm.js';
import { useState, useEffect } from 'react';
import { useConnection } from '../helpers/ConnectionProvider.js';

export default function FactorySelector({selected, setSelected, children}){
	const connection = useConnection()

	// set initial selections
	useEffect(() => {
		setSelected({
			network: Object.keys(networks)[0],
			amm: networks[Object.keys(networks)[0]].amms[0].name,
			factoryAddress: networks[Object.keys(networks)[0]].amms[0].factory
		})
	}, [])

	// select first amm when a network is changed
	useEffect(() => {
		if (selected.network){
			setSelected(prevState => ({
				...prevState,
				amm: networks[selected.network].amms[0].name
			}))
		}

		checkNetworkMatch()
	}, [selected.network])

	// see if the networ matches after metamask network changes
	useEffect(() => {
		checkNetworkMatch()
	}, [connection])

	// add factory address when amm is changed
	useEffect(() => {
		if (selected.network && selected.amm){
			setSelected(prevState => ({
				...prevState,
				factoryAddress: networks[selected.network].amms.find(ammItem => ammItem.name === selected.amm).factory
			}))
		}
	}, [selected.amm])

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

	function userChangeNetwork(val){
		if (!val){
			setSelected(prevState => ({
				...prevState,
				factoryAddress: '',
				amm: ''
			}))
		}

		setSelected(prevState => ({
			...prevState,
			network: val
		}))
	}

	function userChangeAmm(val){
		if (!val){
			setSelected(prevState => ({
				...prevState,
				factoryAddress: ''
			}))
		}

		setSelected(prevState => ({
			...prevState,
			amm: val
		}))
	}

	function userChangeFactoryAddress(e){
		setSelected(prevState => ({
			...prevState,
			network: '',
			amm: '',
			factoryAddress: e.target.value
		}))
	}

	return <div className="mb-6">
		<span>Select a factory or enter a factory address</span>
		<div className="field is-grouped mb-0">
			<div className="select is-success mr-2">
				<select onChange={e => {userChangeNetwork(e.target.value)}} value={selected.network}>
					<option value=''>Network</option>
					{Object.keys(networks).map(networkName => <option key={networkName} value={networkName}>{networkName}</option>)}
				</select>
			</div>

			<div className="select is-info mr-2">
				<select onChange={e => {userChangeAmm(e.target.value)}} value={selected.amm}>
					<option value=''>Amm</option>
					{selected.network && networks[selected.network].amms.map(ammItem => <option key={ammItem.name} value={ammItem.name}>{ammItem.name}</option>)}
				</select>
			</div>

			<div className="control">
				<input className="input is-primary address-input" type="text" placeholder="factory address" value={selected.factoryAddress} onChange={e => userChangeFactoryAddress(e)} />
			</div>

			{children}
		</div>

		<div>
			{!connection.connected && <span className="blue">Metamask not connected</span>}
			{(connection.connected && selected.network) && (selected.networkMatch ? <span className="green">Network match</span> : <span className="red">Network mismatch</span>)}
		</div>
	</div>
}
