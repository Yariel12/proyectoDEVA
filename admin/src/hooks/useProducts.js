import { useState } from "react";
import { sileo } from "sileo";
import {
  getProductsServices,
  createProductsServices,
  getProductsByIdServices,
  updateProductsServices,
  deleteProductsServices,
} from "../services/products.service";

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (requestFn, successMessage) => {
    try {
      setLoading(true);
      setError(null);

      const response = await requestFn();

      if (successMessage) {
        sileo.success(successMessage);
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

  const getProducts = (params) =>
    handleRequest(() => getProductsServices(params));

  const createProduct = (productData) =>
    handleRequest(
      () => createProductsServices(productData),
      "Producto creado correctamente",
    );

  const getProductById = (id) =>
    handleRequest(() => getProductsByIdServices(id));

  const updateProduct = (id, productData) =>
    handleRequest(
      () => updateProductsServices(id, productData),
      "Producto actualizado correctamente",
    );

  const deleteProduct = (id) =>
    handleRequest(
      () => deleteProductsServices(id),
      "Producto eliminado correctamente",
    );

  return {
    loading,
    error,
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
  };
};
