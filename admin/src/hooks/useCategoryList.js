import { useEffect, useState, useCallback, useRef } from "react";
import { useCategories } from "./useCategories";
import { useConfirm } from "./useConfirm";

export const useCategoryList = () => {
  const { getCategories, deleteCategory, loading } = useCategories();
  const { confirm } = useConfirm();
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  // Ref para evitar race conditions
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const fetchData = async () => {
      const response = await getCategories({ page, limit });
      if (!isMounted.current) return; // evita setState si el componente se desmontó
      setCategories(response.data);
      setPagination(response.pagination);
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [page, limit, getCategories, refreshKey]);

  const handleDelete = useCallback(
    async (id) => {
      const ok = await confirm(
        "Esta categoría no se podrá recuperar. ¿Deseas continuar?",
      );
      if (!ok) return;
      await deleteCategory(id);
      setRefreshKey((prev) => prev + 1);
    },
    [confirm, deleteCategory],
  );

  return {
    categories,
    loading,
    pagination,
    page,
    setPage,
    handleDelete,
  };
};
