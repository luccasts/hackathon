import { axiosPublic } from "./axiosPublic";
import { toast } from "sonner";
import { handleApiError } from "../utils/handleApiError";
import { axiosPrivate } from "./axiosPrivate";

export const service = {
  registerUser: async (username: string, email: string, password: string) => {
    try {
      const res = await axiosPublic.post("/api/auth/register/", {
        username,
        email,
        password: password,
      });
      console.log(res, "deu certo");
      toast.success("Usuário criado com sucesso");
    } catch (error) {
      console.log(username, email, password);
      handleApiError(error);
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      const res = await axiosPublic.post("/api/auth/login/", {
        email,
        password,
      });
      toast.success("Login realizado com sucesso!");
      return res;
    } catch (error) {
      handleApiError(error);
    }
  },
  getUserData: async () => {
    try {
      const res = await axiosPrivate.get("/api/auth/me/");
      return res;
    } catch (error) {
      console.error(error);
    }
  },

  refreshAccessToken: async (refresh: string) => {
    try {
      const res = await axiosPublic.post("/api/auth/refresh/", {
        refresh,
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  },

  postMessage: async (message: string) => {
    try {
      const res = await axiosPrivate.post("api/assistant/", {
        question: message,
      });
      return res;
    } catch (error) {
      //Para Debbugar
      // if (error instanceof AxiosError) {
      //   // if (error.response) {
      //   //   console.log(error?.response.data);
      //   // }
      // }
      console.error(error);
    }
  },

  postChildScreening: async (answers: (boolean | null)[]) => {
    try {
      const res = await axiosPrivate.post("/api/child-screening/", {
        answers: answers,
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};
