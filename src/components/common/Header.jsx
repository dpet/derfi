import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useConnection, useConnect } from '../helpers/ConnectionProvider.js';

export default function Header() {
	const connection = useConnection()
	const ethersConnect = useConnect()

	return <div className="custom-menu">
		<div className="container">
			<nav className="level">
				<div className="level-left">
					<div className="level-item">
						<NavLink className="menu-item logo" exact to="/">
							<h1 className="is-size-3 menu-title">DerfiDefi</h1>
						</NavLink>
					</div>

					<div className="level-item menu-links">
						<div className="menu-dropdown">
							<div className="menu-dropdown-title">Liquidity Pools</div>
							<div className="menu-dropdown-content">
								<NavLink className="menu-item" to="/factoryMonitor">Factory Monitor</NavLink>
								<NavLink className="menu-item" to="/factoryLeaderboard">Factory Leaderboard</NavLink>
								<NavLink className="menu-item" to="/liquidityPoolFinder">Liquidity Pool Finder</NavLink>
								<NavLink className="menu-item" to="/liquidityPoolMonitor">Liquidity Pool Monitor</NavLink>
								<NavLink className="menu-item" to="/impermanentLoss">Impermanent Loss</NavLink>
							</div>
						</div>

						{/*<div className="menu-dropdown">
							<div className="menu-dropdown-title">Staking Pools</div>
							<div className="menu-dropdown-content">
								<NavLink className="menu-item" to="/chefMonitor">Chef Monitor</NavLink>
							</div>
						</div>*/}

						<div className="">
							<NavLink className="menu-item has-text-white" to="/docs">Docs</NavLink>
						</div>
					</div>
				</div>

				<div className="level-right">
					<div className="level-item">
						<button onClick={ethersConnect} className={'button connectButton ' + (connection.connected ? 'is-success' : '')}>{connection.connected ? `${connection.networkName.toUpperCase()} ${connection.networkId}` : 'Connect Metamask'}</button>
					</div>
				</div>
			</nav>
		</div>
	</div>
}
