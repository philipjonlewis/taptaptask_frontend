import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { logout } from "../../redux/authState";

const LandingNavBar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navStyle = "ml-12 text-sm font-sans font-semibold text-gray-500 ";

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    return navigate("/login");
  };

  return (
    <nav className=" py-6  flex justify-end border-b">
      <div className=" mx-16">
        <div className="display-flex gap-1 links jc-end">
          <NavLink className={navStyle} to={"/"}>
            Home
          </NavLink>
          <NavLink className={navStyle} to={"/about"}>
            About
          </NavLink>
          <NavLink className={navStyle} to={"/contact"}>
            Contact
          </NavLink>
          <NavLink className={navStyle} to={"/pricing"}>
            Pricing
          </NavLink>

          {isAuthenticated && (
            <NavLink className={navStyle} to={"/workshop"}>
              Workshop
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink className={navStyle} to={"/signup"}>
              Sign Up
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink className={navStyle} to={"/login"}>
              Log In
            </NavLink>
          )}

          {isAuthenticated && (
            <button className={navStyle} onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;
