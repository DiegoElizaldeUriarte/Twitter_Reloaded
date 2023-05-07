import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { NavBar } from "./commons/Navbar";

export function Home() {
  const { user, logout, loading } = useAuth();
  console.log(user.displayName);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUser = async () => {
    if (user.displayName === null) {
      let user = prompt("Ingresa tu user deseado");
      await updateProfile(auth.currentUser, {
        displayName: user,
      });
    }
  };

  const createTweet = () => {};

  useEffect(() => {
    handleUser();
    console.log(user.displayName);
  }, []);

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <div className="container">
        <div className="app-welcome">
          <h2>Bienvenido, {user.displayName}</h2>
        </div>
        <div className="row-buttons">
          <button type="button" class="btn btn-primary custom-btn">
            Nuevo tweet
          </button>
          <button type="button" class="btn btn-secondary custom-btn">
            Event Dashboard
          </button>
        </div>
      </div>
    </>
  );
}
