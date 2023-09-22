import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
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
            <NavLink to="/concerts" className="nav-item nav-link text-light mx-2">
              View Concerts
            </NavLink>

            {!user ? (
              <>
                <NavLink to="/login" className="nav-item nav-link text-light mx-2">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-item nav-link text-light mx-2">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/account" className="nav-item nav-link activate text-info mx-2">Account settings</NavLink>
                <button
                  onClick={logout}
                  className="btn btn-danger px-4 text-light ms-4"
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
