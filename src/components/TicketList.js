import React from 'react';
import TicketCard from './TicketCard';
import './styles.css';

function TicketList({ tickets }) {
    return (
        <div className='ticket-grid'> 
            {Object.keys(tickets).map(groupName => (
                <div key={groupName}>
                    <h2>{groupName}</h2>
                    <div className="ticket-card-container">
                        {tickets[groupName].map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TicketList;