import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import LoginHeader from "./LoginHeader";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

function LoginForm() {
  const { login, isLoading, error } = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LoginHeader />

      <LoginInput
        label="Correo"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="correo@ejemplo.com"
      />

      <LoginInput
        label="Contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="********"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <LoginButton isLoading={isLoading} />
    </form>
  );
}

export default LoginForm;
