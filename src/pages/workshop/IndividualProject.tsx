import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IndividualProject = () => {
  const {
    currentProject: { id, projectName, projectPhases },
  } = useSelector((state) => state.projects);
  return (
    <div>
      <p> {id} </p>
      <p>{projectName}</p>
      {projectPhases.map((phase) => {
        return (
          <div key={phase.phaseId}>
            <hr />
            <p>{phase.phaseId}</p>
            <p>{phase.phaseCount}</p>
            <p>{phase.phaseName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default IndividualProject;
