import { useEffect } from "react";
import { useInventoryMovements } from "../hooks/useInventoryMovements";

function HistoryMovementsList() {
  const { movements, loading, getInventoryMovements } = useInventoryMovements();

  useEffect(() => {
    getInventoryMovements();
  }, [getInventoryMovements]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Movimientos de Inventario</h2>

      <ul>
        {movements.map((movement) => (
          <li key={movement.id}>
            {movement.productName} - {movement.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryMovementsList;
