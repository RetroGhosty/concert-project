import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicHeader = () => {
  const { user, logout } = useContext(AuthContext);

  let isOrganizer = false

  if (!user) {
    isOrganizer = false
  } else{
    if (user.isOrganizer === true) {
      isOrganizer = true
    }
  } 

  return (
    <div className="mb-5 py-2 bg-dark">
      <nav className="navbar container navbar-expand-lg ">
        <Link to="/" className="navbar-brand text-light">
          Concert
        </Link>

        {isOrganizer === true && <Link to="/dashboard" className="btn btn-info">Dashboard</Link>}


        <div
          className="navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link to="/concerts" className="nav-item nav-link active text-light">
              View Concerts
            </Link>

            {!user ? (
              <>
                <Link to="/login" className="nav-item nav-link active text-light">
                  Login
                </Link>
                <Link to="/register" className="nav-item nav-link active text-light">
                  Register
                </Link>
              </>
            ) : (
              <>

                <Link to="/account" className="nav-item nav-link activate text-info">Account settings</Link>


                <button
                  onClick={logout}
                  className="nav-item nav-link active btn btn-danger px-4 text-light ms-4"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PublicHeader;
