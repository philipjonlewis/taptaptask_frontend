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
  let axiosConfig = {
    withCredentials: true,
  };

  const handleLogout = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_PORT}/auth/logout`,

        axiosConfig
      )
      .then(function (response: any) {
        console.log("logout", response);

        if (response.status == 200) {
          dispatch(logout());
          return navigate("/");
          // return window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <nav className="landing-navbar">
      <div className="links-container">
        <div className="navlinks-left">
          <NavLink to={"/"}>
            <div className="logo-container">
              <img src="/taptaptask.svg" alt="" />
              <p>
                taptaptask
                {/* <span>.com</span> */}
              </p>
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

        <div className="navlinks-right">
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
            <NavLink
              className="right-link workshop-link"
              to={"/workshop/projects"}
            >
              Workshop
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
