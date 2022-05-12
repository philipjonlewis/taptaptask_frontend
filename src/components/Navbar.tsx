import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const navStyle = "ml-4 text-sm font-sans font-semibold text-gray-500 ";

  return (
    <nav className=" p-4 flex justify-end border-b border-red-400">
      <div className="">
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
          <NavLink className={navStyle} to={"/products"}>
            Products
          </NavLink>

          <NavLink className={navStyle} to={"/profile"}>
            Profile
          </NavLink>

          {!isAuthenticated && (
            <NavLink className={navStyle} to={"/login"}>
              LogIn
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
