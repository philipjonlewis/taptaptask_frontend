import React from "react";
import { NavLink } from "react-router-dom";

const WorkshopProjectSidebar = () => {
  return (
    <nav className="bg-gray-800 h-screen w-72 py-4 flex flex-col justify-start items-center p-2 ">
      <div className="w-full py-4 flex flex-row justify-start items-center border-b border-b-gray-600">
        <NavLink to={"/"}>
          <img src="/datetask_logo.png" alt="" className="h-10" />
        </NavLink>

        <p className="text-white font-normal text-md pl-4 text-center  ">
          datetask
        </p>
      </div>

      <div className="links flex flex-col  py-4 w-full my-4 text-white">
        <NavLink className="link-container" to={"dashboard"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <p>Dashboard</p>
        </NavLink>
        <NavLink className="link-container" to={"projects"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p>Projects</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default WorkshopProjectSidebar;
