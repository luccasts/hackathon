import { axiosInstance } from "./instance";
import { toast } from "sonner";
import { handleApiError } from "../utils/handleApiError";

export const service = {
  registerUser: async (username: string, email: string, password: string) => {
    try {
      const res = await axiosInstance.post("/api/auth/register/", {
        username,
        email,
        senha: password,
      });
      console.log(res, "deu certo");
      toast.success("Usuário criado com sucesso");
    } catch (error) {
      handleApiError(error);
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post("/api/auth/login/", {
        email,
        password,
      });
      toast.success("Login realizado com sucesso!");
      return res;
    } catch (error) {
      handleApiError(error);
    }
  },

  getUserData: async (access: string) => {
    try {
      const res = await axiosInstance.get("/api/usuarios/refresh/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};
