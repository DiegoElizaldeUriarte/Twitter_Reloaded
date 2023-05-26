import { useNavigate } from "react-router-dom";

const DisplayDashboard = () => {
  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <button
      type="button"
      className="btn btn-secondary custom-btn"
      onClick={handleDashboard}
    >
      Event Dashboard
    </button>
  );
};

export default DisplayDashboard;
