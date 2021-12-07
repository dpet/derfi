
import { useState, useEffect } from 'react';
import FactorySelector from '../common/FactorySelector.jsx';
import { useConnection } from '../helpers/ConnectionProvider.js';

export default function FactoryMonitor(){
	const connection = useConnection()

	let [ selected, setSelected ] = useState({
		network: '',
		amm: '',
		factoryAddress: ''
	})

 	return (
 		<div className="container">
 			<h1 className="is-size-3 mb-2">Pancakeswap Factory Monitor</h1>

 			<FactorySelector 
 				selected={selected} 
 				setSelected={setSelected}>
 			</FactorySelector>

 			<div>
 				<span className="label is-size-4 mb-4">Registered Pools:</span>
 			</div>

 			<div>
 				<span className="label is-size-4 mb-4">Recent pools:</span>
 			</div>
 		</div>
 	)
 }