import { useState } from "react";
import { registerService } from "../services/auth.service";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await registerService(userData);

      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
