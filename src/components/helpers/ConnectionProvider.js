
import React, { useContext, useState, useEffect } from 'react';
import useInterval from './UseInterval.js';
import { ethers } from 'ethers';

const ConnectionContext = React.createContext()
const ConnectContext = React.createContext()

export function useConnection(){
	return useContext(ConnectionContext)
}

export function useConnect(){
	return useContext(ConnectContext)
}

export default function ConnectionProvider({children}){
	  const [connection, setConnection] = useState({
	    connected: false,
	    provider: null,
	    networkName: null,
	    networkId: null,
	    warning: []
	  });

	  useInterval(() => checkNetwork(), 1000)

	  async function ethersConnect(){

	    try {
	    	const provider = new ethers.providers.Web3Provider(window.ethereum)
		    const network = await provider.getNetwork()

		    setConnection(prevState => ({
		      ...prevState,
		      connected: true,
		      provider: provider,
		      networkName: network.name,
		      networkId: network.chainId
		    }))
		}
		catch(e){
			setConnection(prevState => ({
		      ...prevState,
		      warning: ['Metamask not available'],
		    }))
		}
	  }

	  // updates name and id of network if it has changed, gets details from metamask
	  async function checkNetwork(){
	    if (connection.connected){
	      try {
	        const network = await connection.provider.getNetwork()

	        if (connection.networkName !== network.name || connection.networkId !== network.chainId){
		        setConnection(prevState => ({
		          ...prevState,
		          networkName: network.name,
		          networkId: network.chainId
		        }))
		    }
	      }
	      catch(e){
	        ethersConnect()
	      }
	    }
	  }

	return ( 
		<ConnectionContext.Provider value={connection}>
			<ConnectContext.Provider value={ethersConnect}>
				{children}
			</ConnectContext.Provider>
		</ConnectionContext.Provider>
	)
}




