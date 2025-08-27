import axios from "axios";
import { axiosPublic } from "./axiosPublic";

export const axiosPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response, // se der certo, só retorna
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const res = await axiosPublic.post("/api/auth/refresh/", {
            refresh: refreshToken,
          });
          const newAccess = res.data.access;

          // Salva novo token e atualiza headers
          localStorage.setItem("access", newAccess);
          axiosPrivate.defaults.headers.common["Authorization"] =
            `Bearer ${newAccess}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

          return axiosPrivate(originalRequest);
        } catch (err) {
          console.error("Falha ao atualizar token:", err);
          localStorage.clear();
          window.location.href = "/entrar";
        }
      }
    }

    return Promise.reject(error);
  },
);
