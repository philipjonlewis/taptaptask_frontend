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
      <div className="logo-container">
        <img src="/datetask_logo.png" alt="" />
        <p>datetask.</p>
      </div>
      <div className="links-container">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <NavLink to={"/pricing"}>Pricing</NavLink>

        {isAuthenticated && <NavLink to={"/workshop"}>Workshop</NavLink>}

        {!isAuthenticated && <NavLink to={"/signup"}>Sign Up</NavLink>}

        {!isAuthenticated && <NavLink to={"/login"}>Log In</NavLink>}

        {isAuthenticated && <button onClick={handleLogout}>Log Out</button>}
      </div>
    </nav>
  );
};

export default LandingNavBar;
