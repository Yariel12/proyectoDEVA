function SidebarToggle({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      className="px-4 py-2 text-white transition bg-gray-900 rounded-lg hover:bg-gray-700"
    >
      {isOpen ? "☰" : "☰"}
    </button>
  );
}

export default SidebarToggle;
