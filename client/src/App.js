import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [inputText, setInputText] = useState('');
  useEffect(() => {
    fetch('/api/tickets').then(res => res.json()).then(data => setTickets(data))
  },[])

useEffect(() => {
  fetch(`/api/tickets?searchText=${inputText}`).then(res => res.json()).then(data => setTickets(data))
},[inputText])

  return (
    <div>
    <input type="text" id="searchInput" value={inputText} onChange={({target}) => setInputText(target.value)} />
    {tickets.map(ticket => 
      <Ticket key={ticket.id} ticket={ticket} />
    )}
    </div>
  );
}

export default App;



    