const Navbar = () => {
  const backgroundBrown = {
    backgroundColor: "#a97449    ",
  };

  return (
    <nav className="navbar navbar-expand-lg " style={backgroundBrown}>
      <div className="container-fluid" style={backgroundBrown}>
        <a className="navbar-brand" href="#">
          <img
            width="40"
            src="src/components/easter-island-svgrepo-com.svg"
          ></img>
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="http://localhost:5173/index"
              >
                Kursy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:5173/shop">
                Sklep
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:5173/list">
                Zarejestrowane
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <button
              onClick={() => {
                const deleteCookie = (name: string) => {
                  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
                };

                deleteCookie("username");
              }}
              className="btn btn-danger"
              type="submit"
            >
              Wyloguj
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
