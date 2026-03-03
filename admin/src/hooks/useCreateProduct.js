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
        const catsResponse = await getCategoriesServices({
          page: 1,
          limit: 100,
        });

        const provsResponse = await getProvidersServices({
          page: 1,
          limit: 100,
        });

        // 🔐 Manejo seguro por si viene array directo o { data: [] }
        const categoriesData = Array.isArray(catsResponse)
          ? catsResponse
          : Array.isArray(catsResponse?.data)
            ? catsResponse.data
            : [];

        const providersData = Array.isArray(provsResponse)
          ? provsResponse
          : Array.isArray(provsResponse?.data)
            ? provsResponse.data
            : [];

        setCategories(categoriesData);
        setProviders(providersData);
      } catch (err) {
        console.log("Error cargando relaciones:", err);
        setCategories([]);
        setProviders([]);
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
