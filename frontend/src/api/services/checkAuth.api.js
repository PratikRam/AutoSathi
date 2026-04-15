import { axiosInstance } from "../axios"


export const CheckAuth = async () => {
    try {
        const responce = await axiosInstance.get("/api/me",)
        console.log("responce is this", responce.data);
        return responce.data

    } catch (error) {
        const message = error.message
        console.log("error messgae", message);
        console.log("axios instance is", axiosInstance());

        throw new Error(message)

    }
}
