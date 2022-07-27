import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useGetProjectQuery } from "../../redux/rtkQuery/projectApiSlice";

import AddProjectModal from "../forms/AddProjectModal";
import ProjectList from "../cards/ProjectList";

const WorkshopProjectSidebar = () => {
  // let dispatch: any;

  const [sidebarVisibility, setSidebarVisibility] = useState(
    JSON.parse(localStorage.getItem("workshopMenuSidebar")!) || false
  );

  const [addProjectModalVisibility, setAddProjectModal] = useState(false);

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProjectQuery(false) as any;

  useEffect(() => {
    localStorage.setItem(
      "workshopMenuSidebar",
      JSON.stringify(sidebarVisibility)
    );
  }, [sidebarVisibility]);

  const sidebarHandler = (e) => {
    e.stopPropagation();
    setSidebarVisibility(!sidebarVisibility);
  };

  const addProjectModalHandler = () => {
    setAddProjectModal(!addProjectModalVisibility);
  };

  return (
    <>
      {addProjectModalVisibility && (
        <AddProjectModal
          addProjectModalHandler={addProjectModalHandler}
          setAddProjectModal={setAddProjectModal}
        />
      )}

      <div
        // className="workshop-sidebar"
        className={
          sidebarVisibility
            ? " workshop-sidebar "
            : "workshop-sidebar minimized-sidebar"
        }
      >
        {/* Start of Upper Container */}

        <div className="upper-container">
          <NavLink to={"/"} className="logo-container">
            <img src="/taptaptask.svg" alt="" />
            <p>taptaptask</p>
          </NavLink>

          <div className="minimize-icon-container" onClick={sidebarHandler}>
            {/* <svg
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg> */}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>

        {/* <NavLink to={"dashboard"} className="sidebar-link-container">
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
        </NavLink> */}

        {/* <NavLink to={"notes"} className="sidebar-link-container">
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <p>Notes</p>
        </NavLink> */}

        <NavLink to={"projects"} className="sidebar-link-container">
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

        {/* <div className="sidebar-hotlinks-container">

          <div className="hotlink-icon-container">
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
            <p>Manage</p>
          </div>

          <div className="hotlink-icon-container">
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
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <p>Templates</p>
          </div>
        </div> */}

        <div className="project-list-container">
          <div
            className="add-project-icon-container"
            title="Add New Project"
            onClick={addProjectModalHandler}
          >
            <p>Add a new project</p>
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div className="project-list-title-container">
            <p>Project List</p>
          </div>
          {/* <p>Project List</p> */}

          {isSuccess ? (
            <ProjectList />
          ) : (
            <div className="loading-container">
              <img src="/rings.svg" alt="" />
              <p>Loading Project List</p>
            </div>
          )}

          {/* <p>Scroll Down for more</p> */}
        </div>
        <NavLink to={"settings"} className="bottom-link-container">
          <p>Settings</p>
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </NavLink>
      </div>

      {!sidebarVisibility && (
        <div className="workshop-sidbar-small">
          <div className="maximize-sidebar-container" onClick={sidebarHandler}>
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
          </div>
        </div>
      )}
    </>
  );
};

export default WorkshopProjectSidebar;
