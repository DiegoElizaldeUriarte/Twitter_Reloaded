import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../database/firebase";

const OpenUserApp = () => {
  const [usersOpenApp, setUsersOpenApp] = useState("");
  const usersOp = [];

  const today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

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
    getAppOpens();
  }, []);

  return (
    <div className="col-sm">
      <div className="col-title">Usuarios que abrieron la aplicación hoy</div>
      <div className="app-users">{usersOpenApp}</div>
    </div>
  );
};

export default OpenUserApp;
