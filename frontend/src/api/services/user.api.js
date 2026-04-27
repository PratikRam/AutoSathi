import { axiosInstance } from "../axios"

export const updateProfile = async (data) => {
    const response = await axiosInstance.patch('/user/updateprofile', data)
    return response.data
}

