
import { useState, useEffect } from 'react';

export default function Notice({messages, setMessages}){

	return <div> 
		{messages.length > 0 && <div className="notification warning is-danger is-light mb-4" onClick={() => setMessages([])}>
		  <button class="delete"></button>
		  <ul>
		  	{messages.map(message => <li>{message}</li>)}
		  </ul>
		</div>}
	</div>
}