import { useCreateProvider } from "../hooks/useCreateProvider";
import inforProviders from "../data/inforProviders.json";

function ProvidersForm() {
  const { formData, loading, error, handleChange, handleSubmit } =
    useCreateProvider();

  return (
    <div className="w-full px-10 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        {inforProviders.Providers.titulo}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-10"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
            className="p-3 border rounded md:col-span-2"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 text-white bg-black rounded"
          >
            {loading ? "Creando..." : "Crear Proveedor"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProvidersForm;
