import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveProject } from "../../redux/activeProjectState";
import { fetchProjectList } from "../../redux/projectListState";
import { fetchPhaseList } from "../../redux/phaseListState";

import { fetchTaskList } from "../../redux/taskListState";
import { setActivePhase } from "../../redux/activePhaseState";

const WorkshopProjectSidebar = () => {
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [addProjectForm, setAddProjectForm] = useState(false);

  const { projectList } = useSelector((state) => state);

  const dispatch = useDispatch();

  const linkHandler = (project) => {
    // Clean active phase whenever changing project
    dispatch(
      setActivePhase({
        phaseId: "",
        phaseOrder: 0,
        phaseName: "",
      })
    );
    dispatch(setActiveProject(project));

    // already fetch the phases?
  };

  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        dispatch(fetchProjectList(dat));
      });
    fetch("http://localhost:4000/phases")
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        dispatch(fetchPhaseList(dat));
      });
    fetch("http://localhost:4000/tasks")
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        dispatch(fetchTaskList(dat));
      });

    return () => {
      // removes the active project right after unmounting
    };
  }, []);

  return (
    <>
      {sidebarVisibility && (
        <div className="workshop-sidebar">
          <div className="upper-container">
            <NavLink to={"/"}>
              <img src="/datetask_logo.png" alt="" />
              <p>datetask</p>
            </NavLink>
            <div className="profile-container">
              <img
                className="profile-picture"
                src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                alt=""
              />
              <p>philipjonlewis</p>
              <div className="settings-container">
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
              </div>
            </div>
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

                (async () => {
                  const rawResponse = await fetch(
                    "http://localhost:4000/projects",
                    {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        user: "user-001",
                        projectId: "project-004",
                        projectName: "Daylinda Lewis Memorial Project",
                        projectDescription:
                          "This is going to be mamas memorial project",
                        dateOfDeadline: "2020-06-01",
                      }),
                    }
                  );
                  const content = await rawResponse.json();

                  console.log(content);
                })();
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
            {projectList.map((project) => {
              return (
                <NavLink
                  key={project.projectId}
                  className="project-link"
                  to={`projects/${project.projectId}`}
                  onClick={() => linkHandler(project)}
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
                  <p className="">{project.projectName}</p>
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
