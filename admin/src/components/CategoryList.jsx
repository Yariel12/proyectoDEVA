import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useCategoryList } from "../hooks/useCategoryList";

function CategoryList() {
  const { categories, loading, handleDelete, pagination, page, setPage } =
    useCategoryList();

  return (
    <div className="w-full min-h-screen px-12 py-10 bg-gray-50">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Lista de Categorías
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra las categorías registradas en el sistema
          </p>
        </div>

        <Link
          to="/categories/create"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#007bff] rounded-xl transition-all duration-200 hover:bg-blue-800 hover:scale-105"
        >
          <FiPlus size={18} />
          Nueva Categoría
        </Link>
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs tracking-wider text-gray-600 uppercase bg-gray-50">
            <tr>
              <th className="p-5 font-medium">Nombre</th>
              <th className="p-5 font-medium">Descripción</th>
              <th className="p-5 font-medium text-center">Acciones</th>
              <th className="p-5 font-medium text-center">Activas</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">
                  Cargando categorías...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-400">
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="transition-all duration-200 border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-5 font-medium text-gray-900">
                    {category.name}
                  </td>

                  <td className="p-5 text-gray-600">{category.description}</td>
                  <td className="p-5 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        category.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.isActive ? "Activa" : "Inactiva"}
                    </span>
                  </td>

                  <td className="flex items-center justify-center gap-3 p-5">
                    <Link
                      to={`/categories/edit/${category._id}`}
                      className="flex items-center justify-center text-blue-600 transition-all duration-200 w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white hover:scale-105"
                    >
                      <FiEdit size={17} />
                    </Link>

                    <button
                      onClick={() => handleDelete(category._id)}
                      className="flex items-center justify-center text-red-600 transition-all duration-200 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white hover:scale-105"
                    >
                      <FiTrash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-gray-500">
          Total registros:{" "}
          <span className="font-medium text-gray-800">{pagination.total}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
            {page} de {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
