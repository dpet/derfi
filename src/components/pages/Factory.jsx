
import FactorySelector from '../common/FactorySelector.jsx';

export default function FactoryMonitor(){
 	return (
 		<div className="container">
 			<h1 className="is-size-3 mb-2">Pancakeswap Factory Monitor</h1>

 			<FactorySelector></FactorySelector>

 			<div>
 				<span className="label is-size-4 mb-4">Registered Pools:</span>
 			</div>

 			<div>
 				<span className="label is-size-4 mb-4">Recent pools:</span>
 			</div>
 		</div>
 	)
 }