import React, { useState } from 'react';

export default function FindLiquidityPool(){

 	let [errors, setErrors] = useState([])
 	let [token1, setToken1] = useState([])
 	let [token2, setToken2] = useState([])
 	let [factory, setFactory] = useState([])

 	return (
 		<div className="container">
 			<h2 className="is-size-2">Find Liquidity Pool</h2>
 			Find a liquidity pool using two tokens and a factory
 			<br /><br />

 			<div className="field is-grouped">

				<div className="control">
					<input type="text" name="token1" className="input is-primary" placeholder="Token 1 address" value={token1} onChange={setToken1}></input>
				</div>
				
				<div className="control">
					<input type="text" name="token2" className="input is-primary" placeholder="Token 2 address" value={token2} onChange={setToken2}></input>
				</div>
				
				<button className="button mr-3 is-primary" onClick={findPool}>Find</button>
			</div>
			<div className="">
				{errors.map(error=><div className="red mb-4" key={error}>{error}</div>)}
			</div>

 		</div>
 	)


 	function findPool(){

 	}
 }