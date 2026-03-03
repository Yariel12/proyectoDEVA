import { useState, useCallback } from "react";
import { sileo } from "sileo";
import {
  getCategoriesServices,
  createCategoryServices,
  getCategoryByIdServices,
  updateCategoryServices,
  deleteCategoryServices,
} from "../services/category.service";

export const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (requestFn) => {
    try {
      setLoading(true);
      setError(null);

      const response = await requestFn();

      if (response?.message) {
        sileo.success({
          title: "Éxito",
          description: response.message,
          duration: 4000,
        });
      }

      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Ha ocurrido un error";

      setError(message);

      sileo.error({
        title: "Error",
        description: message,
        duration: 4000,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCategories = useCallback(
    (params) => handleRequest(() => getCategoriesServices(params)),
    [],
  );

  const createCategory = (data) =>
    handleRequest(() => createCategoryServices(data));

  const getCategoryById = (id) =>
    handleRequest(() => getCategoryByIdServices(id));

  const updateCategory = (id, data) =>
    handleRequest(() => updateCategoryServices(id, data));

  const deleteCategory = (id) =>
    handleRequest(() => deleteCategoryServices(id));

  return {
    loading,
    error,
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
  };
};
