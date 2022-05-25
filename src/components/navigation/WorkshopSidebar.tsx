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
  const [addProjectModalVisibility, setAddProjectModal] = useState(false);

  const [form, setForm] = useState({
    user: auth._id,
    projectId: uuidv4(),
    projectName: "",
    projectDescription: "",
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
      return {
        ...state,
        projectName: "",
        projectDescription: "",
        projectId: uuidv4(),
      };
    });

    setAddProjectModal(false);
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

  const addProjectModalHandler = () => {
    setAddProjectModal(!addProjectModalVisibility);
  };

  const inputHandler = (e) => {
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      {addProjectModalVisibility && (
        <div className="add-project-modal">
          <div className="modal-form-container">
            <div
              className="close-add-form-modal-button"
              onClick={addProjectModalHandler}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="left-segment">
              <div className="form-title-container">
                <p>Add New Project</p>
              </div>
              <form action="#" className="add-project-form-container">
                {/* Project Name */}
                <label htmlFor="projectName">Project Name</label>
                <input
                  name="projectName"
                  type="text"
                  placeholder="Add New Project"
                  autoCorrect="false"
                  spellCheck="false"
                  value={form.projectName}
                  required
                  // value={form.projectName}
                  onChange={inputHandler}
                />
                {/* Project Description */}
                <label htmlFor="projectName">Project Description</label>
                <input
                  name="projectDescription"
                  type="text"
                  placeholder="Project Description"
                  autoCorrect="false"
                  spellCheck="false"
                  value={form.projectDescription}
                  required
                  // value={form.projectDescription}
                  onChange={inputHandler}
                />
                {/* Date of Deadline */}
                <label htmlFor="projectName">Date of Deadline</label>
                <input
                  name="dateOfDeadline"
                  type="date"
                  autoCorrect="false"
                  spellCheck="false"
                  value={form.dateOfDeadline}
                  required
                  // value={form.dateOfDeadline}
                  onChange={inputHandler}
                />
                <button onClick={handleFormSubmit}>submit</button>
              </form>
            </div>
            <div className="right-segment">Right Segment</div>
          </div>
        </div>
      )}
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

            <div className="minimize-icon-container">
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
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </div>
          </div>

          {/* End of Upper Container */}

          {/* <div className="pro-buttons-container">
            <button className="button-reset pro-button-container">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <div className="pro-icon">PRO</div>
              <p>Manage</p>
            </button>

            <button className="button-reset pro-button-container">
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
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              <div className="pro-icon">PRO</div>
              <p>Templates</p>
            </button>
          </div> */}

          <NavLink to={"dashboard"} className="sidebar-link-container">
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

          <NavLink to={"notes"} className="sidebar-link-container">
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
          </NavLink>

          <NavLink to={"inbox"} className="sidebar-link-container">
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
                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
              />
            </svg>
            <p>Inbox</p>
          </NavLink>

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

          <div className="sidebar-hotlinks-container">
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
          </div>

          <div className="project-list-container">
            <div
              className="add-project-icon-container"
              title="Add New Project"
              onClick={addProjectModalHandler}
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="project-list-title-container">
              <p>Project List</p>
            </div>
            {/* <p>Project List</p> */}
            {projectList.length >= 1 &&
              projectList.map((project) => {
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

            {/* <p>Scroll Down for more</p> */}
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
