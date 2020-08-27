import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Ticket from './components/Ticket';
import Header from './components/Header';

import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [hiddenTicketsId, setHiddenTicketsId] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    (async () => {
        const response = await fetch('/api/tickets');
        const ticketsData = await response.json();
        setTickets(ticketsData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
        const response = await fetch(`/api/tickets?searchText=${inputText}`);
      const ticketsData = await response.json();
      setTickets(ticketsData.filter((ticket) => !hiddenTicketsId.includes(ticket.id)));
    })();
  }, [inputText]);

  function onHideTicketClick(id) {
    setHiddenTicketsId([...hiddenTicketsId, id]);
    const newTickets = tickets.map((ticket) => {
      if (ticket.id === id) {
        ticket.hide = true;
      }
      return ticket;
    });
    setTickets(newTickets);
  }

  function onRestoreHiddenClick() {
    setHiddenTicketsId([]);
    const newTickets = tickets.map((ticket) => {
      if (ticket.hide) {
        delete ticket.hide;
      }
      return ticket;
    });
    setTickets(newTickets);
  }

  return (
    <div className="app">
      <Header />
      <div id="searchDiv">
        <TextField
          id="searchInput"
          label="Search ticket"
          type="search"
          value={inputText}
          onChange={({ target }) => setInputText(target.value)}
        />
        <div id="countersDiv">
          <span>
            Showing
            {tickets.length - hiddenTicketsId.length}
            {' '}
            tickets
          </span>
          <span>
            (
            <span id="hideTicketsCounter">{hiddenTicketsId.length}</span>
            {' '}
            Hidden)
          </span>
          <span id="restoreHideTickets" onClick={onRestoreHiddenClick}>Restore hidden</span>
        </div>
      </div>

      <main>
        {tickets.filter((ticket) => !ticket.hide)
          .map((ticket) => <Ticket key={ticket.id} ticket={ticket} onHideClick={onHideTicketClick} />)}
      </main>
    </div>
  );
}

export default App;
