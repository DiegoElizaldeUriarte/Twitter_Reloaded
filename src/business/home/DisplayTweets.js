import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../database/firebase";
import { useEffect, useState } from "react";

const DisplayTweets = (props) => {
  const [tweets, setTweets] = useState([]);

  const today = new Date();

  var onlyDay =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

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
        localStorage.setItem("tweets", JSON.stringify(slicedArray));
        setTweets(slicedArray);
      });
    } catch (error) {
      getTweetsCache();
    }
  };

  const getTweetsCache = () => {
    let array;

    try {
      array = JSON.parse(localStorage.getItem("tweets"));
      console.log(array);
      setTweets(array);
    } catch (error) {
      alert("Error al intentar obtener Tweets");
    }
  };

  const appOpen = async () => {
    await addDoc(collection(db, "events"), {
      typeOfAction: "oppenApplication",
      user: props.user.displayName,
      timestamp: onlyDay,
    });
  };

  useEffect(() => {
    getTweets();
    appOpen();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center tweetsDashboard ">
      {tweets.map((tweet) => (
        <div className="card mb-1 w-80 mt-10 mr-3 tweet-card" key={tweet.id}>
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
              <i className="material-icons text-dark pr-2">insert_comment</i>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayTweets;
