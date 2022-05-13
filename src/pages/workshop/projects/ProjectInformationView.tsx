import React from "react";
import { useSelector } from "react-redux";

const ProjectInformation = () => {
  const {
    activeProject: { projectId, projectName, projectDescription },
  } = useSelector((state) => state);

  return (
    <div>
      <p>This is the project information view</p>
      <p>{projectId}</p>
      <p>{projectName}</p>
      <p>{projectDescription}</p>
      <p>Consider putting data about this project here</p>
      <hr />
    </div>
  );
};

export default ProjectInformation;
