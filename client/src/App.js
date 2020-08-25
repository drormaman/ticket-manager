import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [inputText, setInputText] = useState('');
  useEffect(() => {
	(async () => {
		const response = await fetch('/api/tickets');
		const ticketsData = await response.json();
		setTickets(ticketsData)
  })();
  }, []);

  useEffect(() => {
	(async () => {
		const response = await fetch(`/api/tickets?searchText=${inputText}`);
		const ticketsData = await response.json();
		setTickets(ticketsData)
	})();
  }, [inputText]);

  function onHideTicketClick(id) {
	const newTickets = tickets.map((ticket, index) => {
		if(ticket.id === id){
			ticket.hide = true;
			return ticket;
		} 
		return ticket;
	});
	setTickets(newTickets);
  }
  
  return (
    <>
      <input
        type="text"
        id="searchInput"
        value={inputText}
        onChange={({ target }) => setInputText(target.value)}
      />
      {tickets.filter(ticket => !ticket.hide)
	 		  .map(ticket => <Ticket key={ticket.id} ticket={ticket} onHideClick={onHideTicketClick} />)}
    </>
  );
}

export default App;
