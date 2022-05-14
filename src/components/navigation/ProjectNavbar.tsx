import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActivePhase } from "../../redux/activePhaseState";
// import { mockPhaseList } from "../../redux/mockdata/phases";
const ProjectNavbar = () => {
  const [activeTab, setActiveTab] = useState("hello");
  const dispatch = useDispatch();

  const {
    activeProject: { projectId, projectName, projectDescription },
    phaseList,
    activePhase,
  } = useSelector((state) => state);

  const phases = phaseList.filter((phase) => phase.projectId == projectId);

  const { projectPhases } = phases[0];

  // console.log(projectPhases);

  const activePhaseHandler = (phase) => {
    dispatch(setActivePhase(phase));
  };

  const activeTabHandler = () => {
    dispatch(
      setActivePhase({
        phaseId: "sam",
        phaseOrder: 1,
        phaseName: "This is the initial state",
      })
    );
  };

  return (
    <div className="project-navbar-container">
      <Link
        to={`information`}
        className={
          activePhase.phaseName == "This is the initial state"
            ? "project-information-link active-information"
            : "project-information-link"
        }
        onClick={activeTabHandler}
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
        <p>Project Information</p>
      </Link>
      <div className="phase-information-container">
        <div className="phase-title-container">
          <p>Project Phases</p>
        </div>
        <div className="phase-link-container">
          {projectPhases.map((phase) => {
            return (
              <Link
                className={
                  activePhase.phaseName == phase.phaseName
                    ? "phase-link active-phase-tab"
                    : "phase-link"
                }
                key={phase.phaseId}
                to={"phase"}
                onClick={() => activePhaseHandler(phase)}
              >
                {phase.phaseName}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectNavbar;
