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
          navigate("/login");
          return window.location.reload();
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
