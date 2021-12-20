import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useConnection, useConnect } from '../helpers/ConnectionProvider.js';

function Header() {
	const connection = useConnection()
	const ethersConnect = useConnect()

	useEffect(()=>{
	  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	  if ($navbarBurgers.length > 0) {
	    $navbarBurgers.forEach( el => {
	      el.addEventListener('click', () => {
	        const target = el.dataset.target;
	        const $target = document.getElementById(target);
	        el.classList.toggle('is-active');
	        $target.classList.toggle('is-active');

	      });
	    });
	  }
	}, [])

	return (
		<>
		{/*<nav className="navbar is-dark">
			<div className="container">
			  <div className="navbar-brand">
			  	<NavLink className="navbar-item" exact to="/">
			  		<h1 className="is-size-3 menu-title">DerfiDefi</h1>
			  	</NavLink>
			    <div className="navbar-burger" data-target="navbarExampleTransparentExample">
			      <span></span><span></span><span></span>
			    </div>
			  </div>

			  <div id="navbarExampleTransparentExample" className="navbar-menu">
			    <div className="navbar-start">

			      <div className="navbar-item has-dropdown is-hoverable">
			        <a className="navbar-link">LP</a>
			        <div className="navbar-dropdown">
			          <NavLink activeClassName="is-active" className="navbar-item" to="/factory">Factory Monitor</NavLink>
			          <NavLink activeClassName="is-active" className="navbar-item" to="/liquidity_pools">Liquidity Pool Monitor</NavLink>
			        </div>
			      </div>
			      <NavLink activeClassName="is-active" className="navbar-item" to="/docs">Docs</NavLink>

			    </div>

			    <div className="navbar-end">
			      <div className="navbar-item">
			        <button onClick={ethersConnect} className={'button connectButton ' + (connection.connected ? 'is-success' : '')}>{connection.connected ? `${connection.networkName.toUpperCase()} ${connection.networkId}` : 'Connect Metamask'}</button>
			      </div>
			    </div>
			  </div>
		  </div>
		</nav>*/}


		<div className="custom-menu">
			<div className="container">
				<nav className="level is-mobile">

					<div className="level-left">
						<div className="level-item">
							<NavLink className="navbar-item menu-title" exact to="/">
								<h1 className="is-size-3 menu-title">DerfiDefi</h1>
							</NavLink>
						</div>

						<div className="level-item">
							<NavLink className="custom-menu-item" to="/factoryMonitor">Factory Monitor</NavLink>
							<NavLink className="custom-menu-item" to="/factoryLeaderboard">Factory Leaderboard</NavLink>
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

	</>
	)
}

export default Header;