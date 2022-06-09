import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActivePhase } from "../../redux/activePhaseState";

const ProjectNavbar = () => {
  const { activeProjectId, activePhaseName, phaseList } = useSelector(
    (state: any) => {
      return {
        activeProjectId: state.activeProject.projectId,
        activePhaseName: state.activePhase.phaseName,
        phaseList: state.phaseList,
      };
    }
  );

  const dispatch = useDispatch();

  const [localPhaseList, setLocalPhaseList] = useState([]) as any;

  useEffect(() => {
    setLocalPhaseList([...phaseList]);
  }, [phaseList, activeProjectId]);

  const cleanActivePhaseHandler = () => {
    dispatch(
      setActivePhase({
        phaseId: "",
        phaseName: "",
      })
    );
  };

  const activePhaseHandler = (phase) => {
    dispatch(setActivePhase(phase));
  };

  return (
    <div className="project-navbar-container">
      <Link
        to={`information`}
        className={
          activePhaseName == ""
            ? "project-information-link active-information"
            : "project-information-link"
        }
        onClick={cleanActivePhaseHandler}
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
      </Link>

      <div className="phase-information-container">
        <div className="phase-link-container">
          {localPhaseList.map((phase: any) => {
            return (
              <Link
                className={
                  activePhaseName == phase.phaseName
                    ? "phase-link active-phase-tab"
                    : "phase-link"
                }
                key={phase.phaseId}
                to={"phase"}
                onClick={() => activePhaseHandler(phase)}
                // onMouseEnter={() => {
                //   console.log("entering");
                //   dispatch(setActivePhase(phase));
                // }}
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
