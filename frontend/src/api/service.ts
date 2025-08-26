
import { axiosInstance } from "./instance";
import { toast } from "sonner";
import { handleApiError } from "../utils/handleApiError";

export const service = {
  registerUser: async (username: string, email: string, password: string) => {
    try {
      const res = axiosInstance.post("/", {
        username,
        email,
        password,
      });
      console.log(res, 'deu certo')
      toast.success("Usuário criado com sucesso");
    } catch (error) {
      handleApiError(error)
    }
  },
};
