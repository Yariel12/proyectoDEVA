import InfoAuth from "../data/InfoAuth.json";

function LoginHeader() {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold text-gray-800">
        {InfoAuth.Login.title}
      </h1>
      <p className="mt-1 text-sm font-semibold text-gray-600">
        {InfoAuth.Login.subtitle}
      </p>
    </div>
  );
}

export default LoginHeader;
