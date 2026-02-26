function LoginInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-500">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition"
      />
    </div>
  );
}

export default LoginInput;
