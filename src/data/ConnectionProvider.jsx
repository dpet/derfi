
import React, { useContext, useState, useEffect } from 'react';
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
	    networkId: null
	  });

	  useEffect(()=>{
	    const interval = setInterval(()=>{
	      checkNetwork()
	    }, 2000)

	    return ()=>{clearInterval(interval)}
	  }, []);

	  useEffect(()=>{
	    checkNetwork()
	  }, [connection.provider])

	  // triggered when header button clicked
	  async function ethersConnect(){
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

	  // updates name and id of network if it has changed, gets details from metamask
	  async function checkNetwork(){
	    if (connection.connected){
	      try {
	        const network = await connection.provider.getNetwork()

	        setConnection(prevState => ({
	          ...prevState,
	          networkName: network.name,
	          networkId: network.chainId
	        }))
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




