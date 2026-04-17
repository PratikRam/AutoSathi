import { axiosInstance } from "../axios"

export const addServiceHandler = async (carId, data) => {
    console.log(carId);
    console.log(data);

    try {
        const response = await axiosInstance.post(`/service/${carId}`, data)
        console.log(response.data)
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to add service'
        throw new Error("error is " + message)
    }
}

export const getService = async (id) => {
    try {
        const response = await axiosInstance.get(`/service/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to get service'
        throw new Error(message)
    }
}

export const deleteService = async (id) => {
    try {
        const response = await axiosInstance.delete(`/service/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to delete service'
        throw new Error(message)
    }
}