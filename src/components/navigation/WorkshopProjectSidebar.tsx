import React from "react";
import { NavLink } from "react-router-dom";

const WorkshopProjectSidebar = () => {
  return (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"dashboard"}>Dashboard</NavLink>
      <NavLink to={"projects"}>Projects</NavLink>
    </>
  );
};

export default WorkshopProjectSidebar;
