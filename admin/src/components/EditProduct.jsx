import { useEditProduct } from "../hooks/useEditProduct";

function EditProduct() {
  const { form, handleChange, handleSubmit, loading } = useEditProduct();

  return (
    <div className="max-w-xl p-6 mx-auto bg-white shadow-sm rounded-xl">
      <h1 className="mb-6 text-2xl font-bold">Editar Producto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <button
          disabled={loading}
          className="w-full p-3 text-white bg-black rounded-lg"
        >
          {loading ? "Actualizando..." : "Actualizar Producto"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
