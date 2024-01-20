import axios from 'axios';

// Api: https://api.quicksell.co/v1/internal/frontend-assignment

const TicketService = {
    getTickets() {
        return axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
        .then(response => response.data.tickets);
    },
    getUsers() {
        return axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
        .then(response => response.data.users);
    }
};

export default TicketService;