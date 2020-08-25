import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [hiddenTicketsId, setHiddenTicketsId] = useState([]);
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
		setTickets(ticketsData.filter(ticket => !hiddenTicketsId.includes(ticket.id)))
	})();
  }, [inputText]);

  function onHideTicketClick(id) {
	setHiddenTicketsId([...hiddenTicketsId, id]);
	const newTickets = tickets.map((ticket) => {
		if(ticket.id === id){
			ticket.hide = true;
		} 
		return ticket;
	});
	setTickets(newTickets);
  }

  function onRestoreHiddenClick() {
	setHiddenTicketsId([]);
	const newTickets = tickets.map((ticket) => {
		if(ticket.hide){
			delete ticket.hide
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
	  <span id="hideTicketsCounter">{hiddenTicketsId.length}</span>
	  <button id="restoreHideTickets" onClick={onRestoreHiddenClick} >restore hidden tickets</button>
      {tickets.filter(ticket => !ticket.hide)
	 		  .map(ticket => <Ticket key={ticket.id} ticket={ticket} onHideClick={onHideTicketClick} />)}
    </>
  );
}

export default App;
