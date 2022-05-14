import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const WorkshopNavBar = () => {
  return (
    <div className="workshop-navbar">
      <div className="">Left Container</div>
      <div className="">Middle Container</div>
      <div className="">Right Container</div>
    </div>
  );
};

export default WorkshopNavBar;
