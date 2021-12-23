
import { useState, useEffect } from 'react';
import FactorySelector from '../common/FactorySelector.jsx';
import { useConnection } from '../helpers/ConnectionProvider.js';
import Notice from '../common/Notice.jsx';
import { ethers } from 'ethers';
import { factory_abi, token_abi, lp_abi, chef_abi } from '../../data/abi.js';


export default function ChefMonitor(){

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
	let [ results, setResults ] = useState(false)



	async function load(){
		try{
			let results = await getChefInfo(selected.chefAddress)
			setResults({
				pools: results[0].toString(),
				allocPoints: results[1].toString(),
				cakePerBlock: results[2].toString(),
			})
			console.log(results)
		}
		catch(e){
			console.error(e)
		}
	}


	return <div className="container">
		<h1 className="is-size-3 mb-2">Chef Monitor<span className="help-toggle ml-2 has-text-warning" onClick={() => setHelpToggle(!helpToggle)}>help {helpToggle ? '▼' : '▲'}</span></h1>

		{helpToggle && <div className="help-content mb-4 has-text-warning">
			<p>Chef</p>
		</div>}

		<Notice messages={messages} setMessages={setMessages}></Notice>

		<FactorySelector 
			selected={selected} 
			setSelected={setSelected}
			type="chef">
				<button className="button is-primary" onClick={load}>Load</button>
		</FactorySelector>

		<div className="is-size-5 mb-3">
			<div className="factory-list">
				<span className="factory-list-name">Pools</span>
				<span className="factory-list-amount has-text-info">{results.pools}</span>
			</div>
			<div className="factory-list">
				<span className="factory-list-name">Alloc Poins</span>
				<span className="factory-list-amount has-text-info">{results.allocPoints}</span>
			</div>
			<div className="factory-list">
				<span className="factory-list-name">Cake per block</span>
				<span className="factory-list-amount has-text-info">{results.cakePerBlock}</span>
			</div>
		</div>

	</div>


	function getChefInfo(chefAddress){
		const chefContract = new ethers.Contract(chefAddress, chef_abi, connection.provider)

		return Promise.all([
			chefContract.poolLength(),
			chefContract.totalAllocPoint(),
			chefContract.cakePerBlock(),
		])
	}

	function getPoolInfo(chefAddress, poolNum){
		const chefContract = new ethers.Contract(chefAddress, chef_abi, connection.provider)

		return Promise.all([
			chefContract.poolInfo(poolNum),
		])
	}
}