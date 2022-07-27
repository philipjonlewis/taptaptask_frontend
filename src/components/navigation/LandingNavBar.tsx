import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { logout } from "../../redux/authState";

const LandingNavBar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_PORT}/auth/logout`,

        {
          withCredentials: true,
        }
      )
      .then(function (response: any) {
        console.log("logout", response);

        if (response.status == 200 && response.data.message == "Logged Out") {
          dispatch(logout());
          navigate("/");
          setTimeout(() => {
            return window.location.reload();
          }, 200);
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <nav className="landing-navbar">
      <div className="links-container">
        <div className="left-navlinks-container">
          <NavLink to={"/"}>
            <div className="logo-container">
              <img src="/taptaptask.svg" alt="" />
              <p>taptaptask</p>
            </div>
          </NavLink>
          <NavLink to={"/"} className="landing-navbar-link">
            Home
          </NavLink>
          {/* {!isAuthenticated && (
            <NavLink className="landing-navbar-link" to={"/signup"}>
              Sign Up
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink className="landing-navbar-link" to={"/login"}>
              Log In
            </NavLink>
          )} */}
          {/* 
          <NavLink to={"/about"} className="landing-navbar-link">
            About
          </NavLink>
          <NavLink to={"/contact"} className="landing-navbar-link">
            Contact
          </NavLink>
          <NavLink to={"/pricing"} className="landing-navbar-link">
            Pricing
          </NavLink> */}
        </div>

        <div className="right-navlinks-container">
          {!isAuthenticated && (
            <NavLink className="landing-navbar-link" to={"/signup"}>
              Sign Up
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink className="landing-navbar-link" to={"/login"}>
              Log In
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink className="landing-navbar-link" to={"/workshop/projects"}>
              Workshop
            </NavLink>
          )}

          {isAuthenticated && (
            <button className="landing-navbar-link" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </div>
      {/* <div className="mobile-links-container">
        {" "}
        <NavLink to={"/"}>Home</NavLink>
        {!isAuthenticated && <NavLink to={"/signup"}>Sign Up</NavLink>}
        {!isAuthenticated && <NavLink to={"/login"}>Log In</NavLink>}
        {isAuthenticated && (
          <NavLink to={"/workshop/projects"}>Workshop</NavLink>
        )}
        {isAuthenticated && <button onClick={handleLogout}>Log Out</button>}
      </div> */}
    </nav>
  );
};

export default LandingNavBar;
