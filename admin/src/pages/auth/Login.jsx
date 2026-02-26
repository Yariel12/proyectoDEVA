import LoginForm from "../../components/LoginForm";
import articulo_1 from "../../assets/articulo_LoginPage_1.jpeg";
import articulo_2 from "../../assets/articulo_LoginPage_2.webp";
import articulo_3 from "../../assets/articulo_LoginPage_3.jpg";
import articulo_4 from "../../assets/articulo_LoginPage_4.avif";

function Login() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] flex">
      <div className="hidden w-1/2 grid-cols-2 grid-rows-3 gap-4 p-6 md:grid">
        <div className="row-span-2 overflow-hidden rounded-xl">
          <img src={articulo_1} className="object-cover w-full h-full" />
        </div>

        <div className="row-span-2 overflow-hidden rounded-xl">
          <img src={articulo_2} className="object-cover w-full h-full" />
        </div>

        <div className="h-40 col-span-1 overflow-hidden rounded-xl">
          <img src={articulo_3} className="object-cover w-full h-full" />
        </div>

        <div className="h-40 col-span-1 overflow-hidden rounded-xl">
          <img src={articulo_4} className="object-cover w-full h-full" />
        </div>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="w-full max-w-md p-10 bg-white border border-gray-200 shadow-sm rounded-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
