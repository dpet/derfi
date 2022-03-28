import { networks } from '../../data/amm.js';
import { useState, useEffect } from 'react';
import { useConnection } from '../helpers/ConnectionProvider.js';

export default function FactorySelector({selected, setSelected, type, children}){
	const connection = useConnection()
	let [ customNetwork, setCustomNetwork ] = useState(false)

	// set initial selections
	useEffect(() => {
		setSelected({
			network: Object.keys(networks)[0],
			amm: networks[Object.keys(networks)[0]].amms[0].name,
			factoryAddress: networks[Object.keys(networks)[0]].amms[0].factory,
			chefAddress: networks[Object.keys(networks)[0]].amms[0].chef,
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
				factoryAddress: networks[selected.network].amms.find(ammItem => ammItem.name === selected.amm).factory,
				chefAddress: networks[selected.network].amms.find(ammItem => ammItem.name === selected.amm).chef,
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
				chefAddress: '',
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
				factoryAddress: '',
				chefAddress: ''
			}))
		}

		setSelected(prevState => ({
			...prevState,
			amm: val
		}))
	}

	function userChangeFactoryAddress(e){
		setCustomNetwork(true)
		if (type === 'factory'){
			setSelected(prevState => ({
				...prevState,
				network: '',
				amm: '',
				factoryAddress: e.target.value,
				chefAddress: ''
			}))
		}
		else if (type === 'chef'){
			setSelected(prevState => ({
				...prevState,
				network: '',
				amm: '',
				factoryAddress: '',
				chefAddress: e.target.value
			}))
		}
	}

	function customNetworkToggled(){
		if (!customNetwork){
			setSelected(prevState => ({
				...prevState,
				network: '',
				amm: ''
			}))
		}
		setCustomNetwork(!customNetwork)
	}

	return <div className="mb-4">
		<div>Select a {type} or enter a {type} address</div>

		<label className="checkbox mb-2 has-text-white">
		  	<input className="mr-2" type="checkbox" 
			  	type="checkbox"
		        checked={customNetwork}
		        onChange={customNetworkToggled} />
		    		Use other factory (uses whatever network metamask is on)
		</label>

		<div className="field is-grouped is-grouped-multiline mb-0">
			{!customNetwork && <>
				<div className="control">
					<div className="select is-success mr-2">
						<select onChange={e => {userChangeNetwork(e.target.value)}} value={selected.network}>
							<option value=''>Network</option>
							{Object.keys(networks).map(networkName => <option key={networkName} value={networkName}>{networkName}</option>)}
						</select>
					</div>
				</div>

				<div className="control">
					<div className="select is-info mr-2">
						<select onChange={e => {userChangeAmm(e.target.value)}} value={selected.amm}>
							<option value=''>Amm</option>
							{selected.network && networks[selected.network].amms.map(ammItem => <option key={ammItem.name} value={ammItem.name}>{ammItem.name}</option>)}
						</select>
					</div>
				</div>
			</>}

			{type === 'factory' &&
				<div className="control">
					<input className="input is-primary address-input" type="text" placeholder={`${type} address`} value={selected.factoryAddress} onChange={e => userChangeFactoryAddress(e)} />
				</div>
			}

			{type === 'chef' &&
				<div className="control">
					<input className="input is-primary address-input" type="text" placeholder={`${type} address`} value={selected.chefAddress} onChange={e => userChangeFactoryAddress(e)} />
				</div>
			}

			{children}
		</div>

		<div>
			{!connection.connected && <span className="blue">Metamask not connected</span>}
			{(connection.connected && selected.network) && (selected.networkMatch ? <span className="green">Network match</span> : <span className="red">Network mismatch</span>)}
		</div>
	</div>
}
