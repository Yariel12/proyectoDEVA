import { useEffect, useState } from "react";
import { useCategories } from "./useCategories";

export const useCategoryList = () => {
  const { getCategories, deleteCategory, loading } = useCategories();

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });

  useEffect(() => {
    const loadData = async () => {
      const response = await getCategories({ page, limit });

      setCategories(response.data);
      setPagination(response.pagination);
    };

    loadData();
  }, [page, limit, getCategories]);

  const handleDelete = async (id) => {
    await deleteCategory(id);
    setPage((prev) => prev);
  };

  return {
    categories,
    loading,
    pagination,
    page,
    setPage,
    handleDelete,
  };
};
