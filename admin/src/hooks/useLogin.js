import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.service";
import { sileo } from "sileo";

export const useLogin = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await loginService(credentials);

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      sileo.success({
        title: "Bienvenido (A)",
        description: `Hola ${data.user.name}, has iniciado sesión correctamente.`,
      });

      navigate("/");

      return data;
    } catch (err) {
      const message = err.response?.data?.message || "Error al iniciar sesión";

      setError(message);

      sileo.error({
        title: "Error",
        description: message,
      });

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
