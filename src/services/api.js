import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_SERVICE_URL,
    timeout: 1000,
});

export default api;