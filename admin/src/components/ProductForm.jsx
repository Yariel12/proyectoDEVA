import { useCreateProduct } from "../hooks/useCreateProduct";
import infoProducts from "../data/infoProducts.json";

function ProductForm() {
  const {
    formData,
    categories,
    providers,
    loading,
    handleChange,
    handleImages,
    handleSubmit,
  } = useCreateProduct();

  return (
    <div className="w-full min-h-screen px-16 py-10">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">
        {infoProducts.products.title}
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
                {infoProducts.products.fields.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-[#EFEDE9] border border-[#D8D4CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89B5E]"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {infoProducts.products.fields.description}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 bg-[#EFEDE9] border border-[#D8D4CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89B5E]"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {infoProducts.products.fields.stock}
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 bg-[#EFEDE9] border border-[#D8D4CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89B5E]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {infoProducts.products.fields.price}
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 bg-[#EFEDE9] border border-[#D8D4CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89B5E]"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {infoProducts.products.fields.category}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-[#EFEDE9] border border-[#D8D4CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89B5E]"
                required
              >
                <option value="">
                  {infoProducts.products.placeholders.category}
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {infoProducts.products.fields.provider}
              </label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full p-3 bg-[#EFEDE9] border border-[#D8D4CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89B5E]"
                required
              >
                <option value="">
                  {infoProducts.products.placeholders.provider}
                </option>
                {providers.map((prov) => (
                  <option key={prov._id} value={prov._id}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-500">
                {infoProducts.products.fields.images}
              </label>
              <input
                type="text"
                name="images"
                onChange={handleImages}
                className="w-full p-3 bg-[#EFEDE9] border border-[#D8D4CC] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C89B5E]"
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

export default ProductForm;
