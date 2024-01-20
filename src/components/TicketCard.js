import React from "react";

function TicketCard({ ticket, userMap }) {
    return (
        <div className="ticket-card">
            <h3>{ticket.title}</h3>
            <p>Tag: {ticket.tag}</p>
            <p>{ticket.userName}</p>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
        </div>
    );
}

export default TicketCard;