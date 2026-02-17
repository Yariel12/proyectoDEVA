import { NavLink } from "react-router-dom";
import navigation from "../data/navigation.json";
import * as FiIcons from "react-icons/fi";

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`bg-black text-white transition-all duration-300 
      ${isOpen ? "w-64" : "w-20"} min-h-screen`}
    >
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        {isOpen ? "Ferreteria Deva" : "FD"}
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => {
          const Icon = FiIcons[item.icon];

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
            >
              {Icon && <Icon size={20} />}
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
