import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActivePhase } from "../../redux/activePhaseState";
import { v4 as uuidv4 } from "uuid";
import { postRequest } from "../../helpers/postRequest";
import { addPhase } from "../../redux/phaseListState";
// import { mockPhaseList } from "../../redux/mockdata/phases";
const ProjectNavbar = () => {
  const [activeTab, setActiveTab] = useState("hello");
  const dispatch = useDispatch();

  const {
    auth,
    activeProject: { projectId, projectName, projectDescription },
    phaseList,
    activePhase,
  } = useSelector((state) => state);

  const filteredProjectPhases = phaseList.filter(
    (phase) => phase.projectReferenceId == projectId
  );

  const [phaseForm, setPhaseForm] = useState({
    user: auth._id,
    projectReferenceId: projectId,
    phaseId: uuidv4(),
    phaseName: "",
  });
  //Must have a use effect that removes the current phase as the active phase whenever it unmounts

  const submitPhaseFormHandler = (e) => {
    e.preventDefault();
    dispatch(addPhase(phaseForm));
    postRequest(phaseForm, "http://192.168.0.22:4000/phases");
    setPhaseForm((state) => {
      return { ...state, phaseId: uuidv4(), phaseName: "" };
    });
  };

  const activePhaseHandler = (phase) => {
    dispatch(setActivePhase(phase));
  };

  const activeTabHandler = () => {
    dispatch(
      setActivePhase({
        phaseId: "",
        phaseName: "",
      })
    );
  };

  return (
    <div className="project-navbar-container">
      <Link
        to={`information`}
        className={
          activePhase.phaseName == ""
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
        <p>Project Details</p>
      </Link>
      {/* 
      <div className="add-phase-container">
        <form action="#">
          <input
            type="text"
            placeholder="Add Phase"
            value={phaseForm.phaseName}
            onChange={(e) => {
              setPhaseForm((state) => {
                return { ...state, phaseName: e.target.value };
              });
            }}
          />
          <button onClick={submitPhaseFormHandler}>
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
      </div> */}

      <div className="phase-information-container">
        {/* <div className="phase-title-container">
          <p>Project Phases</p>
        </div> */}
        <div className="phase-link-container">
          {filteredProjectPhases.length >= 1 &&
            filteredProjectPhases.map((phase) => {
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
