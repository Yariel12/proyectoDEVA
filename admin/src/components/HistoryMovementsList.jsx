import { useEffect, useState } from "react";
import { useInventoryMovements } from "../hooks/useInventoryMovements";

const directionConfig = {
  in: {
    label: "Entrada",
    classes: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30",
  },
  out: {
    label: "Salida",
    classes: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30",
  },
};

const reasonLabels = {
  purchase: "Compra",
  sale: "Venta",
  adjustment: "Ajuste",
  return: "Devolución",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-DO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HistoryMovementsList() {
  const { movements, loading, pagination, getInventoryMovements } =
    useInventoryMovements();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getInventoryMovements(currentPage);
  }, [currentPage, getInventoryMovements]);

  const handlePage = (page) => {
    if (page < 1 || page > pagination?.totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen px-12 py-10 bg-gray-50">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Movimientos de Inventario
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Historial de entradas y salidas de productos
        </p>
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full border-t-blue-600 animate-spin" />
            <span className="ml-3 text-sm text-gray-500">Cargando...</span>
          </div>
        ) : movements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-sm">No hay movimientos registrados</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs tracking-wider text-gray-600 uppercase bg-gray-50">
              <tr>
                <th className="p-5 font-medium">Producto</th>
                <th className="p-5 font-medium">Dirección</th>
                <th className="p-5 font-medium">Razón</th>
                <th className="p-5 font-medium text-right">Cantidad</th>
                <th className="p-5 font-medium">Creado por</th>
                <th className="p-5 font-medium">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {movements.map((movement) => {
                const dir = directionConfig[movement.direction] ?? {
                  label: movement.direction,
                  classes: "bg-gray-100 text-gray-700",
                };

                return (
                  <tr
                    key={movement._id}
                    className="transition-all duration-200 border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-5 font-medium text-gray-900">
                      {movement.product?.name ?? (
                        <span className="italic text-gray-400">Eliminado</span>
                      )}
                    </td>

                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${dir.classes}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            movement.direction === "in"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        {dir.label}
                      </span>
                    </td>

                    <td className="p-5 text-gray-600">
                      {reasonLabels[movement.reason] ?? movement.reason}
                    </td>

                    <td className="p-5 font-semibold text-right">
                      <span
                        className={`${
                          movement.direction === "in"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {movement.direction === "in" ? "+" : "-"}
                        {movement.quantity}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center text-xs font-bold text-blue-700 uppercase bg-blue-100 rounded-full w-7 h-7 shrink-0">
                          {movement.createdBy?.name?.[0] ?? "?"}
                        </div>
                        <span className="text-gray-700">
                          {movement.createdBy?.name ?? "—"}
                        </span>
                      </div>
                    </td>

                    <td className="p-5 text-gray-500 whitespace-nowrap">
                      {formatDate(movement.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINACIÓN */}
      {pagination && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-gray-500">
            Mostrando {movements.length} de{" "}
            <span className="font-medium text-gray-800">
              {pagination.total}
            </span>{" "}
            movimientos
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePage(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 text-sm transition border border-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-100"
            >
              Anterior
            </button>

            <span className="px-4 py-2 text-sm bg-gray-100 rounded-xl">
              Página {currentPage} de {pagination.totalPages}
            </span>

            <button
              onClick={() => handlePage(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 text-sm transition border border-gray-200 bg-[#007bff] rounded-xl disabled:opacity-40 hover:bg-blue-800"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryMovementsList;
