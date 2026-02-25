import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useProductsList } from "../hooks/useProductsList";

function ProductsList() {
  const {
    products,
    total,
    totalPages,
    page,
    setPage,
    filters,
    handleFilterChange,
    resetFilters,
    loading,
  } = useProductsList();

  return (
    <div className="w-full px-10 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Productos</h1>

        <Link
          to="/products/create"
          className="px-5 py-2 text-white transition bg-black rounded-lg hover:bg-gray-800"
        >
          + Crear Producto
        </Link>
      </div>

      <div className="p-6 mb-8 bg-white border rounded-xl">
        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={resetFilters}
            className="px-4 py-3 text-sm font-medium text-white transition bg-gray-700 rounded-lg hover:bg-gray-800"
          >
            Resetear
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white border rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Proveedor</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  Cargando...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No hay productos
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="transition border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.category?.name}</td>
                  <td className="p-4">{product.provider?.name}</td>

                  <td className="flex items-center justify-center gap-3 p-4">
                    <Link
                      to={`/products/edit/${product._id}`}
                      className="p-2 text-blue-600 transition rounded-lg hover:bg-blue-100"
                    >
                      <FiEdit />
                    </Link>

                    <button className="p-2 text-red-600 transition rounded-lg hover:bg-red-100">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">Total: {total} productos</p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 text-sm transition border rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            Anterior
          </button>

          <span className="px-4 py-2 text-sm bg-gray-100 rounded-lg">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 text-sm transition border rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
