import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ThreadResponse from "./ThreadResponse";
import { useAuth } from "../../context/authContext";

const TweetThread = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let tweet = location.state;

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

  const typeOfTweet = "replyTweet";

  const [tweets, setTweets] = useState([]);

  const createResponse = async (tweetObject) => {
    await addDoc(collection(db, "replies"), tweetObject);
    await addDoc(collection(db, "events"), {
      typeOfAction: "replyTweet",
      user: user.displayName,
      timestamp: onlyDay,
    });
    const docRef = doc(db, "tweets", tweet.id);
    const docSnap = await getDoc(docRef);

    let replies = docSnap.get("replies");
    //console.log(replies);
    await updateDoc(docRef, {
      replies: replies + 1,
    });
  };

  const getResponses = () => {
    const q = collection(db, "replies");

    try {
      onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          if (doc.get("responseTo") === tweet.id) {
            docs.push({ ...doc.data(), id: doc.id });
          }
        });
        setTweets(docs);
      });
    } catch (error) {
      alert("Error al obtener los tweets");
    }
  };

  useEffect(() => {
    getResponses();
  }, []);

  useEffect(() => {
    let loading = true;
  }, [tweets]);

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <div className="container">
        <button
          className="btn btn-secondary btn-block m-5"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
        <div className="app-welcome">
          <h2>Tweet Thread</h2>
        </div>
        <div className="d-flex flex-column justify-content-center tweetsDashboard ">
          <div className="card mb-1 w-80 mt-10 mr-3 tweet-card" key={tweet.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>@{tweet.author}</h4>
              </div>
              <p className="body">{tweet.body}</p>
              <p className="date">{tweet.timestamp}</p>
            </div>
          </div>
        </div>
        <div className="tweetsDashboard">
          {loading ? (
            <div className="alert alert-info text-center">Loading...</div>
          ) : (
            <div className="tweetsDashboard">
              <div className="d-flex flex-column justify-content-center tweetsDashboard ">
                {tweets.map((response) => (
                  <div
                    className="card mb-1 w-80 mt-10 ml-10 tweet-card"
                    key={response.id}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h4>@{response.author}</h4>
                      </div>
                      <p className="body">{response.body}</p>
                      <p className="date">{response.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="newTweetContainer mt-5">
          <ThreadResponse {...{ typeOfTweet, tweet, user, createResponse }} />
        </div>
      </div>
    </>
  );
};

export default TweetThread;
