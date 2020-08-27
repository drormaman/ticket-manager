const express = require('express');

const app = express();
const fs = require('fs').promises;
// const path = require('path');

// app.use(express.static(path.join(__dirname, 'data')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/tickets', async (req, res) => {
  try {
    const ticketsFile = await fs.readFile('./data.json');
    const ticketsArr = JSON.parse(ticketsFile);
    if (req.query.searchText) {
      // eslint-disable-next-line max-len
      const re = new RegExp(req.query.searchText, 'i');
      res.send(ticketsArr.filter((ticket) => re.test(ticket.title)));
    } else {
      res.send(ticketsArr);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  try {
    const ticketsFile = await fs.readFile('./data.json');
    const ticketsArr = JSON.parse(ticketsFile);
    ticketsArr.forEach((ticket, i) => {
      if (ticket.id === req.params.ticketId) {
        ticketsArr[i].done = true;
      }
    });
    await fs.writeFile('./data.json', JSON.stringify(ticketsArr));
  } catch (error) {
    console.log('Error: ', error);
  } finally {
    res.send('updated: true');
  }
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  try {
    const ticketsFile = await fs.readFile('./data.json');
    const ticketsArr = JSON.parse(ticketsFile);
    ticketsArr.forEach((ticket, i) => {
      if (ticket.id === req.params.ticketId) {
        ticketsArr[i].done = false;
      }
    });
    await fs.writeFile('./data.json', JSON.stringify(ticketsArr));
  } catch (error) {
    console.log('error', error);
  } finally {
    res.send('updated: true');
  }
});
module.exports = app;
