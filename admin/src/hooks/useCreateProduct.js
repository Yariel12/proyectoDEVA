import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import { getCategoriesServices } from "../services/category.service.js";
import { getProvidersServices } from "../services/provider.service.js";

export const useCreateProduct = () => {
  const { createProduct, loading, error } = useProducts();

  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    provider: "",
    images: [],
  });

  useEffect(() => {
    const fetchRelations = async () => {
      try {
        const cats = await getCategoriesServices();
        const provs = await getProvidersServices();

        setCategories(cats);
        setProviders(provs);
      } catch (err) {
        console.log("Error cargando relaciones:", err);
      }
    };

    fetchRelations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImages = (e) => {
    const value = e.target.value;

    const linksArray = value
      .split(",")
      .map((link) => link.trim())
      .filter((link) => link !== "");

    setFormData((prev) => ({
      ...prev,
      images: linksArray,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      await createProduct(payload);

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        provider: "",
        images: [],
      });
    } catch {
      console.log("Error controlado");
    }
  };

  return {
    formData,
    categories,
    providers,
    loading,
    error,
    handleChange,
    handleImages,
    handleSubmit,
  };
};
