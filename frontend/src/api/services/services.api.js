import { axiosInstance } from "../axios"

export const addService = async (data) => {
    try {
        const response = await axiosInstance.post('/service/add', data)
        console.log(response.data)
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to add service'
        throw new Error(message)
    }
}

export const getService = async () => {
    try {
        const response = await axiosInstance.get('/service/get')
        console.log(response.data)
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to get service'
        throw new Error(message)
    }
}