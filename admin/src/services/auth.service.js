import httpClient from "../apis/httpClient";

export const loginService = async (credentials) => {
  const response = await httpClient.post("/auth/login", credentials);
  return response.data;
};

export const registerService = async (userData) => {
  const response = await httpClient.post("/auth/register", userData);
  return response.data;
};
