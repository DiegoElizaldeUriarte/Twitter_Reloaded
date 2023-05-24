import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-secondary btn-block m-5"
      onClick={() => navigate(-1)}
    >
      Regresar
    </button>
  );
};

export default BackButton;
