import { useState } from "react";
import { useProviders } from "./useProviders";

export const useCreateProvider = () => {
  const { createProvider } = useProviders();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await createProvider(formData);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        rnc: "",
        description: "",
      });
    } catch {
      setError("Error al crear proveedor");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
