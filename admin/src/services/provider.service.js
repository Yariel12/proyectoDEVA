import httpClient from "../apis/httpClient";

// Get all providers
export const getProvidersServices = async () => {
  const response = await httpClient.get("/providers/get");
  return response.data;
};

// Get provider by ID
export const getProviderByIdServices = async (id) => {
  const response = await httpClient.get(`/providers/getById/${id}`);
  return response.data;
};

// Create a new provider
export const createProviderServices = async (data) => {
  const response = await httpClient.post("/providers/create", data);
  return response.data;
};

// Update provider by ID
export const updateProviderServices = async (id, data) => {
  const response = await httpClient.put(`/providers/Update/${id}`, data);
  return response.data;
};

// Delete provider by ID
export const deleteProviderServices = async (id) => {
  const response = await httpClient.delete(`/providers/delete/${id}`);
  return response.data;
};