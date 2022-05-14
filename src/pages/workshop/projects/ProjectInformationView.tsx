import React from "react";
import { useSelector } from "react-redux";

const ProjectInformation = () => {
  const {
    activeProject: { projectId, projectName, projectDescription },
  } = useSelector((state) => state);

  return (
    <div className="project-information-view-container ">
      <p>This is the project information view</p>
      <p>{projectId}</p>
      <p>{projectName}</p>
      <p>{projectDescription}</p>
      <p>Consider putting data about this project here</p>
      <p>Aggregated information regarding the project</p>
      <ul>
        <li>Date of project creation</li>
        <li>Date of project intended deadline</li>
        <li>
          Breakdown of tasks
          <ul>
            <li>Total Number of tasks</li>
            <li>Total Number of unfinished tasks</li>
            <li>Total Number of priority tasks</li>
            <li>Total Number of unfinished priority tasks</li>
            <li>Total Number of finished priority tasks</li>
          </ul>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default ProjectInformation;
