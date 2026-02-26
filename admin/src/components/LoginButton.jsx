function LoginButton({ isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 text-white rounded-lg transition-all duration-300 bg-[#007bff] hover:bg-[#0056b3] disabled:opacity-60"
    >
      {isLoading ? "Cargando..." : "INGRESAR"}
    </button>
  );
}

export default LoginButton;
