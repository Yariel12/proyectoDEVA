import httpClient from "../apis/httpclient";

export const getProducts = async () => {
  const { data } = await httpClient.get("/products");
  return data;
};

export const getProductById = async (id) => {
  const { data } = await httpClient.get(`/products/${id}`);
  return data;
};

export const createProduct = async (product) => {
  const { data } = await httpClient.post("/products", product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await httpClient.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await httpClient.delete(`/products/${id}`);
  return data;
};
