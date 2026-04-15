import axios from "axios";


export const axiosInstance = axios.create({
    // baseURL: 'https://autosathi.onrender.com',
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

