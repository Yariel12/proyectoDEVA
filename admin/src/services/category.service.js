import httpClient from "../apis/httpClient";

export const getCategoriesServices = async (params) => {
  const response = await httpClient.get("/category/getAllCategory", { params });
  return response.data;
};

export const getCategoryByIdServices = async (id) => {
  const response = await httpClient.get(`/category/${id}`);
  return response.data;
};

export const createCategoryServices = async (data) => {
  const response = await httpClient.post("/category/createCategory", data);
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
