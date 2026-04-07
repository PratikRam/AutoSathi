import { axiosInstance } from "../axios"


export const registerUser = async (userData) => {
    try {
        const responce = await axiosInstance.post('/register/register', userData)
        console.log(responce.data);
        return responce.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed')
    }
}

export const loginUser = async (userData) => {
    try {
        const responce = await axiosInstance.post('/login/login', userData)
        console.log(responce.data);
        return responce.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed')
    }
}