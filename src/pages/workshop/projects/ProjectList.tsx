import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setActiveProject } from "../../../redux/activeProjectState";
import { addProject, deleteProject } from "../../../redux/projectListState";

const ProjectList = () => {
  const { projectList } = useSelector((state) => state);

  const dispatch = useDispatch();

  const linkHandler = (projectId) => {
    dispatch(setActiveProject(projectId));
  };

  return (
    <div className="project-list-container">
      <button
        onClick={() => {
          dispatch(addProject());
        }}
      >
        Add Project
      </button>
      <button
        onClick={() => {
          dispatch(deleteProject());
        }}
      >
        Delete Project
      </button>
      {projectList.map(({ projectId, projectName }) => {
        return (
          <div key={projectId} className="project-card-container">
            <div className="project-text">
              <span className="project-name">{projectName}</span>
              <br />
            </div>
            <div className="project-button-container">
              <Link to={`${projectId}`} onClick={() => linkHandler(projectId)}>
                Go
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
