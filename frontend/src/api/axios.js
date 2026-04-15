import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://autosathi.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

