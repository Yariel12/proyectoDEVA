import httpClient from "../apis/httpClient";

export const getInventoryMovementsServices = async () => {
  const response = await httpClient.get("/inventory/Get/Movements/history");
  return response.data;
};

export const createInventoryMovementServices = async (data) => {
  const response = await httpClient.post("/inventory/Add/Stock/Products", data);
  return response.data;
};

export const getMovementsByProductServices = async (id) => {
  const response = await httpClient.get(`/inventory/movements/product/${id}`);
  return response.data;
};
