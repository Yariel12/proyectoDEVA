import { useCategoryList } from "../hooks/useCategoryList";
import { useProductsList } from "../hooks/useProductsList";
import { Link } from "react-router-dom";
import LOGO_DEVA_BIG from "../assets/MINI_LOGO.jpeg";
import infoHome from "../data/infoHome.json";

function Home() {
  const { pagination } = useCategoryList();
  const { total } = useProductsList();

  return (
    <div className="flex items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid items-center w-full gap-16 px-8 mx-auto max-w-7xl md:grid-cols-2">
        <div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-gray-900">
            {infoHome.home.title}
          </h1>

          <p className="max-w-xl mb-10 text-lg text-gray-600">
            {infoHome.home.description}
          </p>

          <div className="flex flex-wrap gap-6">
            <Link to={"/products/List"}>
              <button className="px-8 py-3 text-white transition duration-300  bg-[#007bff] rounded-xl hover:scale-105 hover:shadow-lg">
                {infoHome.home.buttons.products}
              </button>
            </Link>

            <Link to={"/categories/List"}>
              <button className="px-8 py-3 transition duration-300 border border-gray-400 rounded-xl hover:bg-gray-200 hover:scale-105">
                {infoHome.home.buttons.categories}
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-center mt-14">
            <div className="p-6 bg-white shadow-md rounded-2xl">
              <h3 className="text-3xl font-bold text-gray-900">{total}</h3>
              <p className="mt-2 text-sm text-gray-500">Productos</p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-2xl">
              <h3 className="text-3xl font-bold text-gray-900">
                {pagination?.total || 0}
              </h3>
              <p className="mt-2 text-sm text-gray-500">Categorías</p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-2xl">
              <h3 className="text-3xl font-bold text-gray-900">98%</h3>
              <p className="mt-2 text-sm text-gray-500">Disponibilidad</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGO */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center bg-white shadow-2xl w-96 h-96 rounded-[40px] p-10 transition duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
            {/* Fondo blur */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-gray-200 to-transparent opacity-40 blur-2xl"></div>

            {/* Logo más grande */}
            <img
              src={LOGO_DEVA_BIG}
              alt="Logo Deva"
              className="relative object-contain w-[160%] h-[160%] transition duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
