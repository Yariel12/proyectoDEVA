import { useState, useCallback } from "react";
import { sileo } from "sileo";
import {
  getInventoryMovementsServices,
  createInventoryMovementServices,
  getMovementsByProductServices,
} from "../services/Inventory.service";

export const useInventoryMovements = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movements, setMovements] = useState([]);
  const [pagination, setPagination] = useState(null);

  const handleRequest = async (requestFn, successMessage) => {
    try {
      setLoading(true);
      setError(null);

      const response = await requestFn();

      if (successMessage) {
        sileo.success({
          title: "Éxito",
          description: successMessage,
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

  const getInventoryMovements = useCallback(async (page = 1, limit = 10) => {
    const data = await handleRequest(() =>
      getInventoryMovementsServices(page, limit),
    );
    setMovements(data.movements);
    setPagination(data.pagination);
    return data;
  }, []);

  const createInventoryMovement = async (movementData) => {
    const data = await handleRequest(
      () => createInventoryMovementServices(movementData),
      "Movimiento de inventario registrado correctamente",
    );

    await getInventoryMovements();
    return data;
  };

  const getMovementsByProduct = (id) =>
    handleRequest(() => getMovementsByProductServices(id));

  return {
    loading,
    error,
    movements,
    pagination,
    getInventoryMovements,
    createInventoryMovement,
    getMovementsByProduct,
  };
};
