import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useProductsList } from "../hooks/useProductsList";
import infoProducts from "../data/infoProducts.json";

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
    <div className="w-full min-h-screen px-12 py-10 bg-gray-50">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {infoProducts.products.list.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {infoProducts.products.list.information}
          </p>
        </div>

        <Link
          to="/products/create"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#007bff] rounded-xl transition-all duration-200 hover:bg-blue-800 hover:scale-105"
        >
          <FiPlus size={18} />
          {infoProducts.products.buttons.button}
        </Link>
      </div>

      {/* FILTROS */}
      <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="p-3 text-sm transition border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={resetFilters}
            className="px-4 py-3 text-sm font-medium text-gray-600 transition border border-gray-200 rounded-xl hover:bg-gray-100"
          >
            {infoProducts.products.buttons.reset}
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-xs tracking-wider text-gray-600 uppercase bg-gray-50">
            <tr>
              <th className="p-5 font-medium">
                {infoProducts.products.list.tablet.name}
              </th>
              <th className="p-5 font-medium">
                {infoProducts.products.list.tablet.price}
              </th>
              <th className="p-5 font-medium">
                {infoProducts.products.list.tablet.category}
              </th>
              <th className="p-5 font-medium">
                {infoProducts.products.list.tablet.provider}
              </th>
              <th className="p-5 font-medium text-center">
                {infoProducts.products.list.tablet.actions}
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  Cargando productos...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="transition-all duration-200 border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-5 font-medium text-gray-900">
                    {product.name}
                  </td>

                  <td className="p-5 font-semibold text-gray-800">
                    ${product.price?.toLocaleString()}
                  </td>

                  <td className="p-5">
                    <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                      {product.category?.name || "Sin categoría"}
                    </span>
                  </td>

                  <td className="p-5">
                    <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                      {product.provider?.name || "Sin Proveedor asignado"}
                    </span>
                  </td>

                  <td className="flex items-center justify-center gap-3 p-5">
                    <Link
                      to={`/products/edit/${product._id}`}
                      className="flex items-center justify-center text-blue-600 transition-all duration-200 w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white hover:scale-105"
                    >
                      <FiEdit size={17} />
                    </Link>

                    <button className="flex items-center justify-center text-red-600 transition-all duration-200 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white hover:scale-105">
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
          Total: <span className="font-medium text-gray-800">{total}</span>{" "}
          productos
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 text-sm transition border border-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-100"
          >
            Anterior
          </button>

          <span className="px-4 py-2 text-sm bg-gray-100 rounded-xl">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 text-sm transition border border-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-100"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
