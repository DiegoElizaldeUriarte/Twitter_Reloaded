import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Alert } from "../commons/Alert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/setUser");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setError("Error: Correo invalido");
      } else if (error.code === "auth/weak-password") {
        setError(
          "Error: la contraseña debe tener una extensión mínima de 6 caracteres"
        );
      } else if (error.code === "auth/email-already-in-use") {
        setError("Error: correo ya registrado");
      }
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
                className="block text-gray-700 text-sm font-bold my-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="youremail@company.com"
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold my-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
