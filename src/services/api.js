import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.adazulpool.com/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default api;