

export default function PoolDisplay({children, pools}){


	return <div>
		{Object.values(pools).reverse().map(pool => <div className="pool mb-4" key={pool.address}>
			<div>
				<span className="pool-index">{pool.index}</span>
				<span className=" has-text-info">{pool.token_1_symbol} / {pool.token_2_symbol}</span>
			</div>

			<table>
				<tbody>
					<tr>{pool.symbol 
						? <>
							<td className="pool-token-name has-text-warning">{pool.symbol} - {pool.name}</td>
						  	<td className="pool-token-amount">{pool.lp_amount}</td>
						  </>
						: <td className="has-text-grey-light">Token Unavailable</td>}
						<td className="is-inline-block ml-2 has-text-primary">{pool.address}</td>
					</tr>

					<tr>{pool.symbol 
						? <>
							<td className="pool-token-name">{pool.token_1_symbol} - {pool.token_1_name}</td>
						  	<td className="pool-token-amount">{pool.token_1_amount}</td>
						  </>
						: <td className="has-text-grey-light">Token Unavailable</td>}
						<td className="is-inline-block ml-2 has-text-primary">{pool.token_1}</td>
					</tr>

					<tr>{pool.symbol 
						? <>
							<td className="pool-token-name">{pool.token_2_symbol} - {pool.token_2_name}</td>
						  	<td className="pool-token-amount">{pool.token_2_amount}</td>
						  </>
						: <td className="has-text-grey-light">Token Unavailable</td>}
						<td className="is-inline-block ml-2 has-text-primary">{pool.token_2}</td>
					</tr>
				</tbody>
			</table>

			{children}

			{/*<div>{pool.symbol 
				? <>
					<span className="pool-token-name has-text-warning">{pool.symbol} - {pool.name}</span>
				  	<span className="pool-token-amount">{pool.lp_amount}</span>
				  </>
				: <span className="has-text-grey-light">Token Unavailable</span>}
				<span className="is-inline-block ml-2 has-text-primary">{pool.address}</span>
			</div>

			<div>{pool.token_1_symbol 
				? <>
					<span className="pool-token-name">{pool.token_1_symbol} - {pool.token_1_name}</span>
				  	<span className="pool-token-amount">{pool.token_1_amount}</span>
				  </>
				: <span className="has-text-grey-light">Token Unavailable</span>}
				<span className="is-inline-block ml-2 has-text-primary">{pool.token_1}</span>
			</div>

			<div>{pool.token_2_symbol 
				? <>
					<span className="pool-token-name">{pool.token_2_symbol} - {pool.token_2_name}</span>
					<span className="pool-token-amount">{pool.token_2_amount}</span>
				  </>
				: <span className="has-text-grey-light">Token Unavailable</span>}
				<span className="is-inline-block ml-2 has-text-primary">{pool.token_2}</span>
			</div>*/}

		</div>)}
	</div>
}