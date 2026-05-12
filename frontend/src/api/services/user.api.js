import { axiosInstance } from "../axios"

export const updateProfile = async (data) => {
    
    const response = await axiosInstance.patch('/user/updateprofile', data)
    console.log("🚀 ~ updateProfile ~ response:", response)
    return response.data

}
