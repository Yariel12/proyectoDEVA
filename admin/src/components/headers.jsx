import info from "../data/infoHeader.json";

function Header({ onDelete, onSave }) {
  return (
    <header className="flex items-center justify-between px-6 py-2 text-white">
      <h1 className="text-2xl font-bold text-black">{info.Productos.Name}</h1>

      <div className="flex gap-3">
        <button
          onClick={onDelete}
          className="px-4 py-2 transition bg-red-600 rounded-lg hover:bg-red-700"
        >
          Borrar
        </button>

        <button
          onClick={onSave}
          className="px-4 py-2 transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          Guardar
        </button>
      </div>
    </header>
  );
}

export default Header;
