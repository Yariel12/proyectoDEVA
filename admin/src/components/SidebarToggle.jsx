function SidebarToggle({ isOpen, toggle }) {
  return (
    <button onClick={toggle} className="px-4 py-2 text-black w-15">
      {isOpen ? "☰" : "☰"}
    </button>
  );
}

export default SidebarToggle;
