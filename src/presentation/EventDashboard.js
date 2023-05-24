import { useNavigate } from "react-router-dom";
import UserEvents from "../business/dashboard/UsersEvents";
import MostCommented from "../business/dashboard//MostCommented";
import OpenUserApp from "../business/dashboard/OpenUserApp";

const EventDashboard = () => {
  const navigate = useNavigate();

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
            <UserEvents />
            <MostCommented />
            <OpenUserApp />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDashboard;
