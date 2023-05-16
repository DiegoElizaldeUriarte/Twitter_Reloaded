import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import TweetForm from "./Tweets/TweetForm";
import { Link, useNavigate } from "react-router-dom";

export function Home(navigation) {
  const { user, logout, loading } = useAuth();
  const [tweets, setTweets] = useState([]);

  const navigate = useNavigate();

  const today = new Date();
  var date =
    today.getHours() +
    ":" +
    today.getMinutes() +
    " " +
    today.getDate() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear();

  var onlyDay =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const typeOfTweet = "createTweet";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const createTweet = async (tweetObject) => {
    await addDoc(collection(db, "tweets"), tweetObject);
    await addDoc(collection(db, "events"), {
      typeOfAction: "createTweet",
      user: user.displayName,
      timestamp: onlyDay,
    });
  };

  const getTweets = () => {
    const q = collection(db, "tweets");

    try {
      onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          if (doc.get("action") === "createTweet") {
            docs.push({ ...doc.data(), id: doc.id });
          }
        });
        docs.sort(function compare(a, b) {
          return b.date - a.date;
        });
        const slicedArray = docs.slice(0, 10);
        setTweets(slicedArray);
      });
    } catch (error) {
      alert("Error al obtener los tweets");
    }
  };

  const appOpen = async () => {
    await addDoc(collection(db, "events"), {
      typeOfAction: "oppenApplication",
      user: user.displayName,
      timestamp: onlyDay,
    });
  };

  useEffect(() => {
    getTweets();
    appOpen();
  }, []);

  useEffect(() => {}, [user]);

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <div className="container">
        <div className="logoutContainer mt-3">
          <button
            type="button"
            className="btn btn-dark custom-btn"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
        <div className="app-welcome">
          <h2>Bienvenido, {user.displayName}</h2>
        </div>
        <div className="row-buttons">
          <button
            type="button"
            className="btn btn-secondary custom-btn"
            onClick={handleDashboard}
          >
            Event Dashboard
          </button>
        </div>
        <div className="newTweetContainer mt-5">
          <TweetForm {...{ typeOfTweet, createTweet, user }} />
        </div>
        <div className="tweetsDashboard">
          <div className="d-flex flex-column justify-content-center tweetsDashboard ">
            {tweets.map((tweet) => (
              <div
                className="card mb-1 w-80 mt-10 mr-3 tweet-card"
                key={tweet.id}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4>@{tweet.author}</h4>
                  </div>
                  <p className="body">{tweet.body}</p>
                  <p className="date">{tweet.timestamp}</p>
                </div>
                <div className="footer-tweet">
                  <p>Respuestas: {tweet.replies} </p>
                  <Link to="/thread" state={tweet}>
                    <i className="material-icons text-dark pr-2">
                      insert_comment
                    </i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
