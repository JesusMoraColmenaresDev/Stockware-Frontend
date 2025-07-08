// api/axiosConfig.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para añadir token a cada petición
api.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem("jwt");
      delete api.defaults.headers.common["Authorization"];

      console.error("Sesión expirada. Por favor inicia sesión nuevamente.");
    }
    return Promise.reject(error);
  }
);

export default api;

