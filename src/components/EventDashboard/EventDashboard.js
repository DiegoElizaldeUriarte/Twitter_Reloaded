import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const EventDashboard = () => {
  const navigate = useNavigate();
  const today = new Date();
  const users = [];
  const userEvents = [];
  const usersOp = [];
  const [mostUser, setMostUser] = useState([]);
  const [mostCommentedTweet, setMostCommentedTweet] = useState([]);
  const [usersOpenApp, setUsersOpenApp] = useState("");

  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const getAppUsers = () => {
    const q = collection(db, "events");
    try {
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.get("timestamp") === date) {
            if (!users.includes(doc.get("user"))) {
              users.push(doc.get("user"));
              userEvents.push({ user: doc.get("user"), apps: 0 });
            } else {
              let objIndex = userEvents.findIndex(
                (obj) => obj.user === doc.get("user")
              );
              let newValue = userEvents[objIndex].apps + 1;
              userEvents[objIndex].apps = newValue;
            }
          }
        });
        userEvents.sort(function compare(a, b) {
          return b.apps - a.apps;
        });
        setMostUser(userEvents);
      });
    } catch (error) {
      alert("Error al obtener eventos");
    }
  };

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
  const getAppOpens = () => {
    const q = collection(db, "events");
    let opens = 0;

    try {
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.get("timestamp") === date) {
            if (doc.get("typeOfAction") === "oppenApplication") {
              if (!usersOp.includes(doc.get("user"))) {
                opens += 1;
                usersOp.push(doc.get("user"));
                setUsersOpenApp(opens);
              }
            }
          }
        });
      });
    } catch (error) {
      alert("Error al obtener eventos");
    }
  };

  useEffect(() => {
    getAppUsers();
    getMostRepliesTweet();
    getAppOpens();
  }, []);

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
          <h2>Event Dashboard</h2>
        </div>

        <div className="reports">
          <div className="row">
            <div className="col-sm">
              <div className="col-title">Usuarios con más eventos</div>
              <div className="tweetsDashboard">
                <div className="d-flex flex-column justify-content-center tweetsDashboard ">
                  {mostUser.map((user) => (
                    <div
                      className="card mb-1 w-80 mt-10 mr-3 tweet-card"
                      key={user.user}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h4>{user.user}</h4>
                        </div>
                        <p className="body">Numero actividades: {user.apps}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="col-title"> Tweet más comentado del día</div>
              <div className="tweetsDashboard">
                <div className="d-flex flex-column justify-content-center tweetsDashboard ">
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
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="col-title">
                Usuarios que abrieron la aplicación hoy
              </div>
              <div className="app-users">{usersOpenApp}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDashboard;
