import LoginForm from "../../components/LoginForm";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
