import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveProject } from "../../redux/activeProjectState";
import { addProject, fetchProjectList } from "../../redux/projectListState";
import { fetchPhaseList } from "../../redux/phaseListState";

import { fetchTaskList } from "../../redux/taskListState";
import { setActivePhase } from "../../redux/activePhaseState";
import { postRequest } from "../../helpers/postRequest";
import { v4 as uuidv4 } from "uuid";
import format from "date-fns/format";
const WorkshopProjectSidebar = () => {
  const { auth, projectList } = useSelector((state) => state);
  const dispatch = useDispatch();

  let projectId = uuidv4();

  const [sidebarVisibility, setSidebarVisibility] = useState(true);

  const [form, setForm] = useState({
    user: auth._id,
    projectId: uuidv4(),
    projectName: "",
    dateOfDeadline: format(new Date(), "yyyy-MM-dd"),
  });

  const linkHandler = (project) => {
    // Clean active phase whenever changing project
    dispatch(
      setActivePhase({
        phaseId: "",

        phaseName: "",
      })
    );
    dispatch(setActiveProject(project));

    // already fetch the phases?
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postRequest(form, "http://192.168.0.22:4000/projects");
    dispatch(addProject(form));

    setForm((state) => {
      return { ...state, projectName: "", projectId: uuidv4() };
    });
  };

  useEffect(() => {
    // Promise.all([
    //   fetch("http://localhost:4000/projects"),
    //   fetch("http://localhost:4000/phases"),
    //   fetch("http://localhost:4000/tasks"),
    // ]).then(([projects, phases, tasks]) => {
    //   dispatch(fetchProjectList(projects));
    //   dispatch(fetchPhaseList(phases));
    //   dispatch(fetchTaskList(tasks));
    // });

    fetch("http://192.168.0.22:4000/projects")
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        dispatch(fetchProjectList(dat));
      });
    fetch("http://192.168.0.22:4000/phases")
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        dispatch(fetchPhaseList(dat));
      });
    // fetch("http://192.168.0.22:4000/tasks")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((dat) => {
    //     dispatch(fetchTaskList(dat));
    //   });

    return () => {
      // removes the active project right after unmounting
    };
  }, []);

  const sidebarHandler = () => {
    setSidebarVisibility(!sidebarVisibility);
  };

  return (
    <>
      {sidebarVisibility ? (
        <div className="workshop-sidebar">
          {/* Start of Upper Container */}

          <div className="upper-container">
            <NavLink to={"/"} className="logo-container">
              <div className="icon-container">
                <img src="/datetask_logo.png" alt="" />
              </div>
              <div className="title-container">
                <p>datetask</p>
              </div>
            </NavLink>
          </div>

          {/* End of Upper Container */}

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
            <button className="pro-button-container">
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

            <button className="pro-button-container">
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
              <div className="pro-icon">PRO</div>
              <p>Templates</p>
            </button>
          </div>

          <div className="add-project-form-container">
            <form action="#">
              <input
                type="text"
                placeholder="Add Project"
                autoCorrect="false"
                spellCheck="false"
                required
                value={form.projectName}
                onChange={(e) => {
                  setForm((state) => {
                    return { ...state, projectName: e.target.value };
                  });
                }}
              />
              <button onClick={handleFormSubmit}>
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </form>
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
      ) : (
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
