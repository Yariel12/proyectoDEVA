import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";

export const useProductsList = () => {
  const { getProducts, loading } = useProducts();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    provider: "",
    status: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const load = async () => {
      try {
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(
            ([, value]) => value !== "" && value !== null,
          ),
        );

        const data = await getProducts({
          page,
          limit,
          ...cleanFilters,
        });

        setProducts(data.products);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    load();
  }, [page, filters, getProducts]);

  const handleFilterChange = (name, value) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setPage(1);
    setFilters({
      search: "",
      category: "",
      provider: "",
      status: "",
    });
  };

  return {
    products,
    total,
    totalPages,
    page,
    setPage,
    filters,
    handleFilterChange,
    resetFilters,
    loading,
  };
};
