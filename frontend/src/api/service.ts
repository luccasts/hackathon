import { AxiosError } from "axios";
import { axiosInstance } from "./instance";


export const service = {
    registerUser: async (username: string, email: string, password: string) => {
        try{
        
        const res = axiosInstance.post("/", {
            username,
            email, 
            password
        })
        } catch(error) {
            if(error instanceof AxiosError) {
                console.log(error.response?.data)
            }
            console.error(error)
        }
    }
}