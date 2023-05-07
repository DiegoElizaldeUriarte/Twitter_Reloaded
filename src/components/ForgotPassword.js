import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { useAuth } from "../context/authContext";

export function ForgotPassword() {
  const [user, setUser] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user.email) return setError("Por favor ingresa tu correo");

    try {
      await resetPassword(user.email);
      setError("Revisa tu correo para restablecer tu contraseña");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm text-fold my-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@company.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Recuperar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}
