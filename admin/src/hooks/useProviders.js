import { useState } from "react";
import {
  createProviderServices,
  getProvidersServices,
  updateProviderServices,
  deleteProviderServices,
} from "../services/provider.service";

import { sileo } from "sileo";

export const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProviders = async () => {
    try {
      setLoading(true);
      const data = await getProvidersServices();
      setProviders(data);
    } catch {
      sileo.error("Error al cargar proveedores");
    } finally {
      setLoading(false);
    }
  };

  const createProvider = async (providerData) => {
    try {
      setLoading(true);

      const data = await createProviderServices(providerData);

      setProviders((prev) => [...prev, data]);

      sileo.success("Proveedor creado correctamente 🔥");

      return data;
    } catch (error) {
      sileo.error(error?.response?.data?.message || "Error al crear proveedor");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProvider = async (id, providerData) => {
    try {
      setLoading(true);

      const data = await updateProviderServices(id, providerData);

      setProviders((prev) => prev.map((p) => (p.id === id ? data : p)));

      sileo.success("Proveedor actualizado correctamente");

      return data;
    } catch (error) {
      sileo.error("Error al actualizar proveedor");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProvider = async (id) => {
    try {
      setLoading(true);

      await deleteProviderServices(id);

      setProviders((prev) => prev.filter((p) => p.id !== id));

      sileo.success("Proveedor eliminado correctamente");
    } catch (error) {
      sileo.error("Error al eliminar proveedor");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    providers,
    loading,
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider,
  };
};
