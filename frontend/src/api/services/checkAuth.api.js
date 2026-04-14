import { axiosInstance } from "../axios"


export const CheckAuth = async () => {
    try {
        const responce = await axiosInstance.get("/api/me",)
        console.log(responce.data);
        return responce.data

    } catch (error) {
        const message = error.message
        throw new Error(message)

    }
}
