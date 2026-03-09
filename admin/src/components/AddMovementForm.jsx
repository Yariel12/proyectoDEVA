import { useState } from "react";
import {
  Package,
  TrendingUp,
  TrendingDown,
  Search,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useCreateMovementsStockProducts } from "../hooks/useCreateMovementsStockProducts.js";

function AddMovementForm() {
  const { form, loading, handleChange, handleSubmit, products } =
    useCreateMovementsStockProducts();
  useCreateMovementsStockProducts;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selectProduct = (product) => {
    handleChange({
      target: { name: "product", value: product._id },
    });
    setSearch(product.name);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      <div className="px-4 py-12 mx-auto max-w-8xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-[#005AD9] rounded-xl">
              <Package className="text-white h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Agregar Stock a Productos
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Registra entradas o salidas de productos en el inventario
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl"
        >
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* PRODUCTO */}
              <div className="relative md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Productos *
                </label>

                <div className="relative">
                  <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    className="w-full py-3 pr-4 transition-all duration-200 border border-gray-300 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                {open && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpen(false)}
                    />
                    <div className="absolute z-20 w-full mt-2 overflow-hidden overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-xl max-h-64">
                      {filteredProducts?.length === 0 && (
                        <div className="p-4 text-sm text-center text-gray-500">
                          No se encontraron productos
                        </div>
                      )}

                      {filteredProducts?.map((product) => (
                        <div
                          key={product._id}
                          onClick={() => selectProduct(product)}
                          className="flex items-center gap-3 px-4 py-3 transition border-b border-gray-100 cursor-pointer hover:bg-gray-50 last:border-b-0"
                        >
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{product.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* DIRECCION */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Tipo de movimiento *
                </label>

                <div className="relative">
                  {form.direction === "in" ? (
                    <TrendingUp className="absolute w-5 h-5 text-green-600 -translate-y-1/2 left-3 top-1/2" />
                  ) : (
                    <TrendingDown className="absolute w-5 h-5 text-red-600 -translate-y-1/2 left-3 top-1/2" />
                  )}
                  <select
                    name="direction"
                    value={form.direction}
                    onChange={handleChange}
                    className="w-full py-3 pr-4 transition-all duration-200 bg-white border border-gray-300 appearance-none cursor-pointer pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="in">Entrada</option>
                    <option value="out">Salida</option>
                  </select>
                  <div className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CANTIDAD */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Cantidad *
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* REASON ENUM */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Razón del movimiento *
                </label>

                <div className="relative">
                  <select
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all duration-200 bg-white border border-gray-300 appearance-none cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Seleccionar razón</option>
                    <option value="purchase">Compra</option>
                    <option value="sale">Venta</option>
                    <option value="adjustment">Ajuste de inventario</option>
                    <option value="damage">Producto dañado</option>
                    <option value="return">Devolución</option>
                  </select>
                  <div className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* NOTA */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Nota
                </label>

                <div className="relative">
                  <FileText className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Agregar una nota opcional..."
                    className="w-full py-3 pr-4 transition-all duration-200 border border-gray-300 resize-none pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-8 py-5 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Todos los campos son obligatorios excepto la nota
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-200 bg-[#005AD9] shadow-sm rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Registrar Movimiento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovementForm;
