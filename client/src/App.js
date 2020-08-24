import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetch('/api/tickets').then(res => res.json()).then(data => setTickets(data))
  }, [])

  return (
    <div>
    {tickets.map(ticket => 
      <Ticket key={ticket.id} ticket={ticket} />
    )}
    </div>
  );
}

export default App;
