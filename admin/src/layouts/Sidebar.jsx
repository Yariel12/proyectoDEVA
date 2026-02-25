import { NavLink } from "react-router-dom";
import { useState } from "react";
import navigation from "../data/navigation.json";
import * as FiIcons from "react-icons/fi";

function Sidebar({ isOpen }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <aside
      className={`bg-[#F5F1EB] text-[#2E2E2E] transition-all duration-300 
  ${isOpen ? "w-64" : "w-20"} min-h-screen border-r border-[#E5E0D8]`}
    >
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        {isOpen ? "Deva" : "FD"}
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => {
          const Icon = FiIcons[item.icon];

          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center justify-between w-full px-4 py-3 text-black transition-all duration-200 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={20} />}
                    {isOpen && <span>{item.name}</span>}
                  </div>
                </button>

                {/* SUBMENU */}
                {openMenu === item.name && isOpen && (
                  <div className="flex flex-col gap-2 mt-2 ml-8">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `px-5 py-2 rounded-lg text-sm transition-all
                          ${
                            isActive
                              ? " text-black font-semibold"
                              : " text-gray-400 transition-all duration-200 rounded-lg hover:bg-gray-200"
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // SI NO TIENE HIJOS (NORMAL)
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
