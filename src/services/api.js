import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.adazulpool.com/',
    timeout: 1000,
});

export default api;