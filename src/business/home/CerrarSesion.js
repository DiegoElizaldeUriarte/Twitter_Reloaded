const CerrarSesion = (props) => {
  const handleLogout = async () => {
    console.log(props);
    try {
      await props.logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-dark custom-btn"
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  );
};

export default CerrarSesion;
