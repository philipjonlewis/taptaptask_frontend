import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { logout } from "../../redux/authState";

const LandingNavBar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    return navigate("/login");
  };

  return (
    <nav className="landing-navbar">
      <div className="links-container">
        <div className="navlinks-left">
          <div className="logo-container">
            <p>
              taptaptask
              <span>.com</span>
            </p>
          </div>
          <NavLink to={"/"}>Home</NavLink>
          {/* <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink to={"/pricing"}>Pricing</NavLink> */}
        </div>

        <div className="navlinks-right">
          {isAuthenticated && (
            <NavLink className="right-link workshop-link" to={"/workshop"}>
              Workshop
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink className="right-link signup-link" to={"/signup"}>
              Sign Up
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink className="right-link login-link" to={"/login"}>
              Log In
            </NavLink>
          )}

          {isAuthenticated && (
            <button className="right-link logout-link" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;
