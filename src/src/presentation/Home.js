import { useEffect } from "react";
import { useAuth } from "../business/context/authContext";
import TweetForm from "../business/home/TweetForm";
import DisplayTweets from "../business/home/DisplayTweets";
import CerrarSesion from "../business/home/CerrarSesion";
import DisplayDashboard from "../business/home/DisplayDashboard";

export function Home(navigation) {
  const { user, logout, loading } = useAuth();

  useEffect(() => {}, [user]);

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <div className="container">
        <div className="logoutContainer mt-3">
          <CerrarSesion {...{ logout }} />
        </div>
        <div className="app-welcome">
          <h2>Bienvenido, {user.displayName}</h2>
        </div>
        <div className="row-buttons">
          <DisplayDashboard />
        </div>
        <div className="newTweetContainer mt-5">
          <TweetForm {...{ user }} />
        </div>
        <div className="tweetsDashboard">
          <DisplayTweets {...{ user }} />
        </div>
      </div>
    </>
  );
}
