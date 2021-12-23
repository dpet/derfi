
import { useState, useEffect } from 'react';
import { useConnection } from '../helpers/ConnectionProvider.js';
import Notice from '../common/Notice.jsx';
import LiquidityPoolMonitorElement from '../common/LiquidityPoolMonitorElement.jsx';

export default function LiquidityPoolMonitor(){

	const connection = useConnection()
	let [ messages, setMessages ] = useState([])
	let [ helpToggle, setHelpToggle ] = useState(false)

	useEffect(() => {
		console.log('messages', messages)
	}, [messages])


	return 	<div className="container">
		<h1 className="is-size-3 mb-2">Liquidity Pool Monitor<span className="help-toggle ml-2 has-text-warning" onClick={() => setHelpToggle(!helpToggle)}>help {helpToggle ? '▼' : '▲'}</span></h1>

		{helpToggle && <div className="help-content mb-4 has-text-warning">
			<p>This tool monitors a Liquidity Pool for price changes. Enter a LP Address to watch the token amounts.</p>
		</div>}

		<Notice messages={messages} setMessages={setMessages}></Notice>

		<LiquidityPoolMonitorElement setMessages={setMessages} />
	</div>
}