import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function Ticket(props) {
  const {
    id, title, content, userEmail, creationTime, labels,
  } = props.ticket;

  const date = new Date(creationTime);
  const [done, setDone] = useState(props.ticket.done);
  const [modalOpen, setModalOpen] = useState(false);

  function handleOpen() {
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
  }

  async function markTicketDone() {
    fetch(`/api/tickets/${id}/done`, { method: 'POST' });
    setDone(true);
  }
  async function markTicketUndone() {
    fetch(`/api/tickets/${id}/undone`, { method: 'POST' });
    setDone(false);
  }

  function addExpandButton() {
    if (content.length > 250) {
      return (
        <>
          <p className="ticketContent">
            {`${content.slice(0, content.indexOf(' ', 250))} ... `}
            <span className="expandContent" onClick={handleOpen}>see more</span>
          </p>
        </>
      );
    }
    return <p className="ticketContent">{content}</p>;
  }

  const ticketBody = (
    <div className="ticket">
      <header>
        <div>
          <h5>{title}</h5>
          <span>
            {'From: '}
            <span className="userEmail">{userEmail}</span>
          </span>
          {done && <div><CheckCircleIcon fontSize="small" color="primary" /></div>}
        </div>
        <ButtonGroup orientation="vertical" size="small" color="primary" style={{ width: 100 }} aria-label="text primary button group">
          <Button className="hideTicketButton" onClick={() => props.onHideClick(id)}>Hide</Button>
          {(done)
            ? <Button className="markTicketUndoneButton" onClick={markTicketUndone}>mark as Undone</Button>
            : <Button className="markTicketDoneButton" onClick={markTicketDone}>mark as Done</Button>}
        </ButtonGroup>
      </header>
      <div>
        {addExpandButton()}
      </div>
      <footer>
        <span className="ticketDate">{date.toDateString()}</span>
        {labels ? (
          <div>
            {labels.map((label) => <span className="label" key={label}>{label}</span>)}
          </div>
        ) : undefined}
        {/* <p>{done}</p> */}
      </footer>
    </div>
  );

  const modalBody = (
    <div
      className="ticket"
      style={{
        width: '400px',
        margin: '15vh auto',
        maxHeight: '70vh',
        overflow: 'auto',
        outline: 'none',
      }}
    >
      <header>
        <div>
          <h5>{title}</h5>
          <span>
            {'From: '}
            <span className="userEmail">{userEmail}</span>
          </span>
          {done && <div><CheckCircleIcon fontSize="small" color="primary" /></div>}
        </div>
        <ButtonGroup orientation="vertical" size="small" color="primary" style={{ width: 100 }} aria-label="text primary button group">
          <Button className="hideTicketButton" onClick={() => props.onHideClick(id)}>Hide</Button>
          {(done)
            ? <Button className="markTicketUndoneButton" onClick={markTicketUndone}>mark as Undone</Button>
            : <Button className="markTicketDoneButton" onClick={markTicketDone}>mark as Done</Button>}
        </ButtonGroup>
      </header>
      <div>
        {<p className="ticketContent">{content}</p>}
      </div>
      <footer>
        <span className="ticketDate">{date.toDateString()}</span>
        {labels ? (
          <div>
            {labels.map((label) => <span className="label" key={label}>{label}</span>)}
          </div>
        ) : undefined}
      </footer>
    </div>
  );

  return (
    <>
      {ticketBody}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </>
  );
}
export default Ticket;
