import httpClient from "../apis/httpClient";

export const getCategoriesServices = async () => {
  const response = await httpClient.get("/category/getAllCategory");
  return response.data;
};

export const getCategoryByIdServices = async (id) => {
  const response = await httpClient.get(`/category/${id}`);
  return response.data;
};

export const createCategoryServices = async (data) => {
  const response = await httpClient.post("/category", data);
  return response.data;
};

export const updateCategoryServices = async (id, data) => {
  const response = await httpClient.put(`/category/${id}`, data);
  return response.data;
};

export const deleteCategoryServices = async (id) => {
  const response = await httpClient.delete(`/category/${id}`);
  return response.data;
};
