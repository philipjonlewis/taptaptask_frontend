import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveProject } from "../../redux/activeProjectState";

const WorkshopProjectSidebar = () => {
  const { projectList } = useSelector((state) => state);
  const dispatch = useDispatch();

  const linkHandler = (projectId) => {
    dispatch(setActiveProject(projectId));
  };

  return (
    <div className="workshop-sidebar">
      <div className="logo-container">
        <NavLink to={"/"}>
          {" "}
          <img src="/datetask_logo.png" alt="" /> <p>datetask.</p>
        </NavLink>
      </div>

      <NavLink to={"dashboard"} className="link-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
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

      <NavLink to={"projects"} className="link-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
        <p>Projects</p>
        <div
          className="add-project-button-container"
          onClick={() => {
            console.log("add new project");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="add-project-button"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </NavLink>

      <div className="project-list-container">
        {projectList.map(({ projectId, projectName }) => {
          return (
            <NavLink
              key={projectId}
              className="project-link"
              to={`projects/${projectId}`}
              onClick={() => linkHandler(projectId)}
            >
              <p className="">{projectName}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default WorkshopProjectSidebar;
