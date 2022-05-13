import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActivePhase } from "../../redux/activePhaseState";
// import { mockPhaseList } from "../../redux/mockdata/phases";
const ProjectNavbar = () => {
  const dispatch = useDispatch();

  const {
    activeProject: { projectId, projectName, projectDescription },
    phaseList,
  } = useSelector((state) => state);

  const phases = phaseList.filter((phase) => phase.projectId == projectId);

  const { projectPhases } = phases[0];

  // console.log(projectPhases);

  const activePhaseHandler = (phase) => {
    dispatch(setActivePhase(phase));
  };

  return (
    <div>
      <Link to={`information`}>Go To information</Link>
      {projectPhases.map((phase) => {
        return (
          <Link
            key={phase.phaseId}
            to={"phase"}
            onClick={() => activePhaseHandler(phase)}
          >
            {phase.phaseName}
          </Link>
        );
      })}
      <hr />
    </div>
  );
};

export default ProjectNavbar;
