import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
