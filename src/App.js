import React, { useEffect, useState } from 'react';
import TicketService from './services/TicketService';
import TicketList from './components/TicketList';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    Promise.all([
      TicketService.getTickets(),
      TicketService.getUsers()
    ]).then(([ticketsData, usersData]) => {
      // attaching user name to each ticket
      const ticketsWithUserNames = ticketsData.map(ticket => ({
        ...ticket,
        userName: usersData.find(user => user.id === ticket.userId)?.name || 'Unknown',
      }));

      setTickets(ticketsWithUserNames);
    });
  }, []);

  // Group and Sort tickets based on selected options
  useEffect(() => {
    // group
    let grouped = {};
    tickets.forEach(ticket => {
      if(!grouped[ticket[groupBy]]) {
        grouped[ticket[groupBy]] = [];
      }
      grouped[ticket[groupBy]].push(ticket);
    });
    // sorting:
    for (let group in grouped){
      if(sortBy === 'priority') {
        grouped[group].sort((a,b) => b[sortBy] - a[sortBy]);
      } else if (sortBy === 'title') {
        grouped[group].sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
      }
    }

    setGroupedTickets(grouped);
  }, [groupBy, sortBy, tickets]);

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div className='select-container'>
        <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
          <option value="status">Group by Status</option>
          <option value="userName">Group by User</option>
          <option value="priority">Group by Priority</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
      <TicketList tickets={groupedTickets} />
    </div>
  );
}

export default App;
