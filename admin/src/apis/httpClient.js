import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://proyectodeva.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("No autorizado, token inválido o expirado");
      sessionStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default httpClient;
