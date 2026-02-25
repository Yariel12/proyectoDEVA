function LoginButton({ isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-2 text-white transition bg-black rounded-lg hover:bg-gray-800 disabled:opacity-60"
    >
      {isLoading ? "Cargando..." : "Iniciar Sesión"}
    </button>
  );
}

export default LoginButton;
