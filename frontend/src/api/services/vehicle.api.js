
import { axiosInstance } from "../axios";


export const addVehicle = async (data) => {
    try {
        const responce = await axiosInstance.post('/car/add', data)
        console.log(responce.data);
        return responce.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to add vehicle'
        throw new Error(message)
    }
}

export const getVehicle = async () => {
    try {
        const responce = await axiosInstance.get('/car/get')
        console.log(responce.data);
        return responce.data

    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to fetch vehicle'
        throw new Error(message)
    }
}