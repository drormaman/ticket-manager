import React, { useEffect, useState } from 'react';

function Ticket(props) {
    const {title, content, userEmail, creationTime, labels, done} = props.ticket;
    return (
        <div className="ticket">
            <h5>{title}</h5>
            <p>{content}</p>
            <span>{userEmail}</span>
            <span>{creationTime}</span>
            {labels && 
            <div>
            {labels.map((label, i) => <span className="label" key={i}>{label}</span>)}
            </div>}
            {/* <p>{done}</p> */}
        </div>
    )
}
export default Ticket;
