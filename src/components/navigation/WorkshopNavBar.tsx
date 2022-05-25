import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const WorkshopNavBar = () => {
  return (
    <div className="workshop-navbar">
      <div className="left-nav-container"></div>

      <div className="right-nav-container"></div>
    </div>
  );
};

export default WorkshopNavBar;
