

export default function PoolDisplay({pools}){


	return <div>
		{Object.values(pools).reverse().map(pool => <div className="pool mb-4" key={pool.address}>
			<div>
				<span  className="pool-index">{pool.index}</span>
				lp: <span className=" has-text-primary">{pool.address}</span>
			</div>

			<div>{pool.token_1_symbol 
				? <>
					<span className="pool-token-name">{pool.token_1_symbol} - {pool.token_1_name}</span>
				  	<span className="pool-token-amount">1.0000</span>
				  </>
				: <span className="has-text-grey-light">Token Unavailable</span>}
				<span className="is-inline-block ml-2 has-text-primary">{pool.token_1}</span>
			</div>

			<div>{pool.token_2_symbol 
				? <>
					<span className="pool-token-name">{pool.token_2_symbol} - {pool.token_2_name}</span>
					<span className="pool-token-amount">1.0000</span>
				  </>
				: <span className="has-text-grey-light">Token Unavailable</span>}
				<span className="is-inline-block ml-2 has-text-primary">{pool.token_2}</span>
			</div>

		</div>)}
	</div>
}