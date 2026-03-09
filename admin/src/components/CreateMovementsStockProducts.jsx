import React from "react";
import { useCreateMovementsStockProducts } from "../hooks/useCreateMovementsStockProducts";

function CreateMovementsStockProducts() {
  const { form, loading, handleChange, handleSubmit } =
    useCreateMovementsStockProducts();

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="product"
        value={form.product}
        onChange={handleChange}
        placeholder="Product"
      />

      <select name="direction" value={form.direction} onChange={handleChange}>
        <option value="in">Entrada</option>
        <option value="out">Salida</option>
      </select>

      <input
        name="reason"
        value={form.reason}
        onChange={handleChange}
        placeholder="Reason"
      />

      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />

      <textarea
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Note"
      />

      <button disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
    </form>
  );
}

export default CreateMovementsStockProducts;
