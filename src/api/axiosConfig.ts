import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type' : "aplication/json",
        "Accept": 'aplication/json'
    },
    withCredentials: true,
});

export default api;