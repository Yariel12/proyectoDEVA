import { useState } from "react";
import { useCategories } from "./useCategories";

export const useCreateCategory = () => {
  const { createCategory, loading } = useCategories();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await createCategory(formData);

    setFormData({
      name: "",
      description: "",
    });
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
};
