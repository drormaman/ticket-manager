import React, { useEffect, useState } from 'react';

function Ticket(props) {
  const {
    id, title, content, userEmail, creationTime, labels, done,
  } = props.ticket;
  return (
    <div className="ticket">
      <h5>{title}</h5>
      <p>{content}</p>
      <span>{userEmail}</span>
      <span>{creationTime}</span>
      {labels
            ? (
              <div>
                {labels.map((label) => <span className="label" key={label}>{label}</span>)}
              </div>
            ) : undefined}
      {/* <p>{done}</p> */}
      <button type="button" className="hideTicketButton" onClick={() => props.onHideClick(id)} >Hide</button>
    </div>
  );
}
export default Ticket;
