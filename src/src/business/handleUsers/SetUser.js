import { useState } from "react";
import { Alert } from "../commons/Alert";
import { updateProfile } from "firebase/auth";
import { auth } from "../../database/firebase";
import { useNavigate } from "react-router-dom";

const SetUser = () => {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, {
      displayName: userInfo,
    });
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="app-welcome">
          <h2>¡Bienvenido, a Twitter Reloaded!</h2>
          <h4>Estas a un solo paso de unirte al mundo de Twitter</h4>
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
                Elige tu usuario
              </label>
              <input
                type="text"
                name="user"
                placeholder="tu-usuario"
                className="shadow appearance-none border rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Iniciar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetUser;
