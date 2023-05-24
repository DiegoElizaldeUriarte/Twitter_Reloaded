import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebase";
import { useEffect, useState } from "react";

const UserEvents = () => {
  const today = new Date();
  const users = [];
  const userEvents = [];
  const [mostUser, setMostUser] = useState([]);

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

  useEffect(() => {
    getAppUsers();
  }, []);

  return (
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
  );
};

export default UserEvents;
