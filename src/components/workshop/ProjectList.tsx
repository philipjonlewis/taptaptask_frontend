import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentProjectHandler } from "../../redux/projectState";

const ProjectList = (props) => {
  const { setSelectedProject } = props;
  const { projectList } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const setCurrentProject = (id) => {

    dispatch(currentProjectHandler(id));
  };
  return (
    <>
      {projectList.map(
        ({ id, projectName, projectDescription, projectImage }) => {
          return (
            <div key={id} className="project-card-container">
              <img src={projectImage} alt="" className="project-image" />

              <div className="project-text">
                <span className="project-name">{projectName}</span>
                <span className="project-description">
                  {projectDescription}
                </span>
              </div>
              <div className="project-button-container">
                <Link to={`${id}`} onClick={() => setCurrentProject(id)}>
                  Go To Project
                </Link>
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default ProjectList;
