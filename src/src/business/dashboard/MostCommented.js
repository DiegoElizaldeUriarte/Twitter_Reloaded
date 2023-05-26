import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../database/firebase";
import { Link } from "react-router-dom";

const MostCommented = () => {
  const [mostCommentedTweet, setMostCommentedTweet] = useState([]);
  const today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const getMostRepliesTweet = () => {
    const q = collection(db, "tweets");
    let mostReplies = 0;

    try {
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.get("day") === date) {
            if (doc.get("replies") >= mostReplies) {
              mostReplies = doc.get("replies");
              setMostCommentedTweet(doc.data());
            }
          }
        });
      });
    } catch (error) {
      alert("Error al obtener los tweets");
    }
  };

  useEffect(() => {
    getMostRepliesTweet();
  }, []);

  return (
    <div className="col-sm">
      <div className="col-title"> Tweet más comentado del día</div>
      <div className="tweetsDashboard">
        <div className="d-flex flex-column justify-content-center tweetsDashboard ">
          {mostCommentedTweet.replies !== 0 && (
            <div
              className="card mb-1 w-80 mt-10 mr-3 tweet-card"
              key={mostCommentedTweet.id}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>@{mostCommentedTweet.author}</h4>
                </div>
                <p className="body">{mostCommentedTweet.body}</p>
                <p className="date">{mostCommentedTweet.timestamp}</p>
              </div>
              <div className="footer-tweet">
                <p>Respuestas: {mostCommentedTweet.replies} </p>
                <Link to="/thread" state={mostCommentedTweet}>
                  <i className="material-icons text-dark pr-2">
                    insert_comment
                  </i>
                </Link>
              </div>
            </div>
          )}
          {mostCommentedTweet.replies === 0 && (
            <div className="sin-replies mt-5">
              <h3>Sin respuestas a tweets hoy</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MostCommented;
