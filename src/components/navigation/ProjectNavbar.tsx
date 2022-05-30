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
  const [localPhaseList, setLocalPhaseList] = useState([]);
  const dispatch = useDispatch();

  const {
    auth: { _id },
    activeProject: { projectId, projectName, projectDescription },
    phaseList,
    activePhase,
  } = useSelector((state) => state);

  const [phaseForm, setPhaseForm] = useState({
    user: _id,
    projectReferenceId: projectId,
    phaseId: uuidv4(),
    phaseName: "",
  });
  useEffect(() => {
    setLocalPhaseList((state) => {
      if (phaseList?.length >= 1) {
      const filteredPhaseList = [...phaseList].filter(
        (phase) => phase._id == projectId
      )[0]?.phaseList;

      if (filteredPhaseList?.length >= 1) {
        const sortedPhaseList = [...filteredPhaseList]?.sort((a, b) => {
          return a.phaseOrder - b.phaseOrder;
        });

        return [...sortedPhaseList];
      } else {
        setLocalPhaseList([]);

        // if (localPhaseList.length == 0) {
        //   dispatch(
        //     addPhase({
        //       newPhase: {
        //         user: _id,
        //         projectReferenceId: projectId,
        //         phaseId: uuidv4(),
        //         phaseName: "New Phase",
        //       },
        //       projectReferenceId: projectId,
        //     })
        //   );
        // }
        console.log("walang laman");
      }
      }

      return state;
    });
  }, [projectId, phaseList]);

  // useEffect(() => {
  //   const filteredPhaseList = [...phaseList].filter(
  //     (phase) => phase._id == projectId
  //   )[0]?.phaseList;

  //   if (filteredPhaseList == undefined || filteredPhaseList.length < 1) {
  //     setLocalPhaseList([]);
  //     dispatch(
  //       addPhase({
  //         newPhase: {
  //           user: _id,
  //           projectReferenceId: projectId,
  //           phaseId: uuidv4(),
  //           phaseName: "New Phase",
  //         },
  //         projectReferenceId: projectId,
  //       })
  //     );
  //   }
  // }, [phaseList]);

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
        {/* <p>Project Details</p> */}
      </Link>

      <div className="phase-information-container">
        {/* <div className="phase-title-container">
          <p>Project Phases</p>
        </div> */}
        <div className="phase-link-container">
          {localPhaseList.length >= 1 &&
            localPhaseList.map((phase) => {
              return (
                <Link
                  className={
                    activePhase.phaseName == phase.phaseName
                      ? "phase-link active-phase-tab"
                      : "phase-link"
                  }
                  key={uuidv4()}
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
