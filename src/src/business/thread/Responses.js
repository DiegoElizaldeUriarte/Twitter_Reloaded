import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../database/firebase";

const Responses = (props) => {
  const [tweets, setTweets] = useState([]);

  const getResponses = () => {
    const q = collection(db, "replies");

    try {
      onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          if (doc.get("responseTo") === props.tweet.id) {
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

  useEffect(() => {}, [tweets]);

  return (
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
  );
};

export default Responses;
