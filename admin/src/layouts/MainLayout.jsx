import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SidebarToggle from "../components/SidebarToggle";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} />

      <div className="flex-1">
        <div className="p-4 bg-[#F8F6F2] shadow">
          <SidebarToggle isOpen={isOpen} toggle={toggleSidebar} />
        </div>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
