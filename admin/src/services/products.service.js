import httpClient from "../apis/httpClient";

// Obtener todos los productos con filtros opcionales
export const getProductsServices = async (params = {}) => {
  const response = await httpClient.get("/products/getAllProducts", {
    params,
  });

  return response.data;
};

// Crear nuevo producto
export const createProductsServices = async (productData) => {
  const response = await httpClient.post(
    "/products/createProducts",
    productData,
  );
  return response.data;
};

// Obtener producto por ID
export const getProductsByIdServices = async (id) => {
  const response = await httpClient.get(`/products/getByIdProduct/${id}`);
  return response.data;
};

// Actualizar producto
export const updateProductsServices = async (id, productData) => {
  const response = await httpClient.put(
    `/products/updateProduct/${id}`,
    productData,
  );
  return response.data;
};

// Eliminar producto
export const deleteProductsServices = async (id) => {
  const response = await httpClient.delete(`/products/deleteProduct/${id}`);
  return response.data;
};

// Cambiar estado del producto
export const toggleProductStatusServices = async (id) => {
  const response = await httpClient.patch(`/products/patch/toggle/${id}`);
  return response.data;
};
