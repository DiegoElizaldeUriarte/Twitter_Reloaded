import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        setError("Error: Contraseña incorrecta");
      } else if (error.code === "auth/user-not-found") {
        setError("Error: usuario no encontrado");
      } else if (error.code === "auth/missing-password") {
        setError("Ingresa la contraseña, por favor");
      } else if (error.code === "auth/invalid-email") {
        setError("Usuario invalido");
      } else if (error.code === "auth/configuration-not-found") {
        setError("Error al ingresar");
      }
    }
  };

  const handleForgot = () => {
    navigate("/forgotPassword");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="app-title">
          <h1>Twitter Reloaded</h1>
        </div>
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
                className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column align-items-center">
              <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Ingresar
                </button>
              </div>
              <div className="d-flex flex-column mt-3">
                <button
                  onClick={handleForgot}
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 m-auto"
                >
                  Olvidé mi contraseña
                </button>
                <button
                  onClick={handleRegister}
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Registrarme
                </button>
              </div>
            </div>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
          >
            Google Login
          </button>
        </div>
      </div>
    </>
  );
}
