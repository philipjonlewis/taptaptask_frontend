import React from "react";
import { NavLink } from "react-router-dom";

const WorkshopNavBar = () => {
  return (
    <nav className=" py-6  flex justify-end border-b">
      <div className="mx-16 flex flex-row justify-between w-full">
        <div className="left-container">Left Container</div>
        <div className="middle-container">Middle Container</div>
        <div className="right-container">Right Container</div>
      </div>
    </nav>
  );
};

export default WorkshopNavBar;
