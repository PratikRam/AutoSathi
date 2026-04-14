import { axiosInstance } from "../axios"


export const registerUser = async (userData) => {
    try {
        const responce = await axiosInstance.post('/api/auth/register', userData)
        console.log(responce.data);
        return responce.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Registration failed'
        throw new Error(message)
    }
}

export const loginUser = async (userData) => {
    try {
        const responce = await axiosInstance.post('/api/auth/login', userData)
        console.log(responce.data);
        return responce.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Login failed'
        throw new Error(message)
    }
}


export const logout = async () => {
    try {
        const responce = await axiosInstance.post('/api/auth/logout',)
        console.log(responce.data);
        return responce.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Login failed'
        throw new Error(message)
    }
}


