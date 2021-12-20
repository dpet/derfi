
import { useState, useEffect } from 'react';

export default function Notice({messages, setMessages}){

	return <div> 
		{messages.length > 0 && <div className="notification warning is-danger is-light mb-4" onClick={() => setMessages([])}>
		  <button className="delete"></button>
		  <ul>
		  	{messages.map(message => <li key={message}>{message}</li>)}
		  </ul>
		</div>}
	</div>
}