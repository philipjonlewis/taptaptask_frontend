import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveProject } from "../../redux/activeProjectState";

const WorkshopProjectSidebar = () => {
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [addProjectForm, setAddProjectForm] = useState(false);
  const { projectList } = useSelector((state) => state);
  const dispatch = useDispatch();

  const linkHandler = (projectId) => {
    dispatch(setActiveProject(projectId));
  };

  return (
    <>
      {sidebarVisibility && (
        <div className="workshop-sidebar">
          <div className="logo-container">
            <NavLink to={"/"}>
              <img src="/datetask_logo.png" alt="" /> <p>datetask.</p>
            </NavLink>
          </div>

          <NavLink to={"dashboard"} className="link-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="link-icon"
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
              className="link-icon"
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
          </NavLink>

          <div className="project-button-container">
            <button
              className="add-project-button-container"
              onClick={() => {
                setAddProjectForm(!addProjectForm);
                console.log(addProjectForm);
              }}
            >
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <div className="pro-icon">PRO</div>
              <p>Manage Projects</p>
            </button>

            <button
              className="add-project-button-container"
              onClick={() => {
                setAddProjectForm(!addProjectForm);
                console.log(addProjectForm);
              }}
            >
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
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>Add Project</p>
            </button>
          </div>

          <div className="project-list-container">
            {projectList.map(({ projectId, projectName }) => {
              return (
                <NavLink
                  key={projectId}
                  className="project-link"
                  to={`projects/${projectId}`}
                  onClick={() => linkHandler(projectId)}
                >
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
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                  <p className="">{projectName}</p>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkshopProjectSidebar;
