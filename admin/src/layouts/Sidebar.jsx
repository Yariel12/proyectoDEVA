import { NavLink } from "react-router-dom";
import { useState } from "react";
import navigation from "../data/navigation.json";
import { FiChevronRight } from "react-icons/fi";
import * as FiIcon from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MINI_LOGO from "../assets/MINI_LOGO.jpeg";

function Sidebar({ isOpen }) {
  const [openMenu, setOpenMenu] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const baseItemStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out";

  const inactiveStyle =
    "text-[#5A5A5A] hover:bg-white hover:shadow-sm hover:translate-x-1";

  const activeStyle = "bg-white text-black font-semibold shadow-sm";

  return (
    <aside
      className={`bg-[#D8D4CC] text-[#2E2E2E] transition-all duration-300 
      ${isOpen ? "w-64" : "w-20"} min-h-screen border-r border-[#E5E0D8]`}
    >
      <div className="p-6 text-2xl font-bold border-b border-[#E5E0D8]">
        {isOpen ? (
          "Ferreteria Deva"
        ) : (
          <img
            src={MINI_LOGO}
            alt="Logo"
            className="object-contain w-10 h-10"
          />
        )}
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => {
          const Icon = FiIcon[item.icon];

          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`${baseItemStyle} ${inactiveStyle} w-full justify-between`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={20} />}
                    {isOpen && <span>{item.name}</span>}
                  </div>

                  {isOpen && (
                    <span
                      className={`transition-transform duration-300 ${
                        openMenu === item.name ? "rotate-90" : ""
                      }`}
                    >
                      <FiChevronRight
                        size={18}
                        className={`transition-transform duration-300 ${
                          openMenu === item.name ? "rotate-90" : ""
                        }`}
                      />
                    </span>
                  )}
                </button>

                {/* SUBMENU CON TRANSICIÓN */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMenu === item.name && isOpen
                      ? "max-h-96 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-2 ml-8">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `${baseItemStyle} text-sm ${
                            isActive ? activeStyle : inactiveStyle
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          // ITEMS NORMALES
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (item.path === "/login") {
                  handleLogout();
                }
              }}
              className={({ isActive }) =>
                `${baseItemStyle} ${isActive ? activeStyle : inactiveStyle}`
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
