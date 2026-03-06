import { useState, useEffect } from "react";
import { useInventoryMovements } from "./useInventoryMovements";
import { getProductsServices } from "../services/products.service";

export const useCreateMovementsStockProducts = () => {
  const { createInventoryMovement, loading } = useInventoryMovements();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    product: "",
    direction: "in",
    reason: "",
    quantity: "",
    note: "",
  });

  const loadProducts = async () => {
    try {
      const data = await getProductsServices();
      setProducts(data.products || data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await loadProducts();
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createInventoryMovement({
      product: form.product,
      direction: form.direction,
      reason: form.reason,
      quantity: Number(form.quantity),
      note: form.note,
    });
  };

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
    products,
    search,
    setSearch,
  };
};
