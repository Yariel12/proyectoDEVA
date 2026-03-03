import { useCreateCategory } from "../hooks/useCreateCategory";
import InfoCategory from "../data/InfoCategory.json";

function CreateCategory() {
  const { formData, loading, handleChange, handleSubmit } = useCreateCategory();

  return (
    <div className="w-full min-h-screen px-16 py-10">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">
        {InfoCategory.category.title}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-12"
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {InfoCategory.category.inputs[0].name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-[#007bff] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007bff]"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {InfoCategory.category.inputs[1].description}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 bg-white border border-[#007bff] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007bff]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-[#C89B5E] text-white rounded-md hover:opacity-90 transition-all"
          >
            {loading ? "Creando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
