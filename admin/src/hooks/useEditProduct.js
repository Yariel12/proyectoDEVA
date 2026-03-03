import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "./useProducts";

export const useEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductById, updateProduct, loading } = useProducts();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadProduct = async () => {
      const product = await getProductById(id);

      if (!isMounted) return;

      setForm({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
      });
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id, getProductById]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, form);
    navigate("/products");
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
  };
};
