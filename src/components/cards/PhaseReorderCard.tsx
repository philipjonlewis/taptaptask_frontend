import React, { useEffect, useState } from "react";
import {
  Reorder,
  useMotionValue,
  useDragControls,
  DragControls,
} from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deletePhase } from "../../redux/phaseListState";
import axios from "axios";
import { useDeletePhaseDataMutation } from "../../redux/rtkQuery/phaseApiSlice";
import { useUpdatePhaseDataMutation } from "../../redux/rtkQuery/phaseApiSlice";
import { editPhase } from "../../redux/phaseListState";
import { v4 as uuidv4 } from "uuid";
const PhaseReorderCard = ({ phase, localPhaseList, setLocalPhaseList }) => {
  const { phaseName, phaseOrder, phaseId } = phase;
  const activeProject = useSelector((state: any) => state.activeProject);

  const [localPhaseName, setLocalPhaseName] = useState("");
  const [isPhaseNameBeingEdited, setIsPhaseNameBeingEdited] = useState(false);

  const [deletePhaseData] = useDeletePhaseDataMutation();
  const [updatePhaseData] = useUpdatePhaseDataMutation();

  const dispatch = useDispatch();

  const y = useMotionValue(0);
  const dragControls = useDragControls();

  useEffect(() => {
    setLocalPhaseName(phaseName);
  }, []);

  const deletePhaseHandler = () => {
    // if (localPhaseList.length <= 1) {
    //   alert("cant have no phases");
    // } else {
      confirm("Are you sure you want to delete this phase?");
      setLocalPhaseList((state) => {
        const newState = state.filter((phases) => phases.phaseId !== phaseId);
        return [...newState];
      });
      dispatch(deletePhase({ phaseId: phaseId }));
      deletePhaseData({
        phaseId: phaseId,
        projectReferenceId: activeProject.projectId,
      }).then((res) => {
        console.log(res);
      });
    // }
  };

  const editPhaseHandler = () => {
    setIsPhaseNameBeingEdited(!isPhaseNameBeingEdited);
  };

  const submitEditPhaseNameHandler = () => {
    updatePhaseData([
      {
        phaseId: phaseId,
        projectReferenceId: activeProject.projectId,
      },
      {
        phaseName: localPhaseName,
      },
    ]).then((res) => {
      setLocalPhaseList((state) => {
        const newState = [...state].map((phase) => {
          if (phase.phaseId == phaseId) {
            return { ...phase, phaseName: localPhaseName };
          }
          return { ...phase };
        });

        return [...newState];
      });

      dispatch(editPhase({ phaseId: phaseId, phaseName: localPhaseName }));

      setIsPhaseNameBeingEdited(false);

      console.log(res);
    });
  };

  // useEffect(() => {
  //   setLocalPhaseList((state) => {
  //     const newState = state.map((phase) => {
  //       if (phase.phaseId == phaseId) {
  //         return { ...phase, phaseName: localPhaseName };
  //       }
  //       return phase;
  //     });

  //     return [...newState];
  //   });
  // }, [localPhaseName]);

  return (
    <Reorder.Item
      key={phase.phaseId}
      value={phase}
      id={phaseOrder}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="edit-phase-container" onClick={editPhaseHandler}>
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
      <div className="delete-phase-container" onClick={deletePhaseHandler}>
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
      <div className="phase-content-container">
        {isPhaseNameBeingEdited ? (
          <input
            className="phase-name-edit-input"
            type="text"
            value={localPhaseName}
            placeholder={`Edit Phase Name`}
            onChange={(e) => setLocalPhaseName(e.target.value)}
          />
        ) : (
          <p className="noselect phase-name"> {phaseName}</p>
        )}

        {isPhaseNameBeingEdited && (
          <button
            className="submit-edit-phase-name-button"
            onClick={submitEditPhaseNameHandler}
          >
            Edit Phase Name
          </button>
        )}
      </div>
      <div className="reorder-container">
        <ReorderIcon dragControls={dragControls} />
      </div>
    </Reorder.Item>
  );
};

function ReorderIcon({ dragControls }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39 39"
      width="39"
      height="39"
      onPointerDown={(event) => dragControls.start(event)}
    >
      <path
        d="M 5 0 C 7.761 0 10 2.239 10 5 C 10 7.761 7.761 10 5 10 C 2.239 10 0 7.761 0 5 C 0 2.239 2.239 0 5 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 0 C 21.761 0 24 2.239 24 5 C 24 7.761 21.761 10 19 10 C 16.239 10 14 7.761 14 5 C 14 2.239 16.239 0 19 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 0 C 35.761 0 38 2.239 38 5 C 38 7.761 35.761 10 33 10 C 30.239 10 28 7.761 28 5 C 28 2.239 30.239 0 33 0 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 14 C 35.761 14 38 16.239 38 19 C 38 21.761 35.761 24 33 24 C 30.239 24 28 21.761 28 19 C 28 16.239 30.239 14 33 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 14 C 21.761 14 24 16.239 24 19 C 24 21.761 21.761 24 19 24 C 16.239 24 14 21.761 14 19 C 14 16.239 16.239 14 19 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 5 14 C 7.761 14 10 16.239 10 19 C 10 21.761 7.761 24 5 24 C 2.239 24 0 21.761 0 19 C 0 16.239 2.239 14 5 14 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 5 28 C 7.761 28 10 30.239 10 33 C 10 35.761 7.761 38 5 38 C 2.239 38 0 35.761 0 33 C 0 30.239 2.239 28 5 28 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 19 28 C 21.761 28 24 30.239 24 33 C 24 35.761 21.761 38 19 38 C 16.239 38 14 35.761 14 33 C 14 30.239 16.239 28 19 28 Z"
        fill="#CCC"
      ></path>
      <path
        d="M 33 28 C 35.761 28 38 30.239 38 33 C 38 35.761 35.761 38 33 38 C 30.239 38 28 35.761 28 33 C 28 30.239 30.239 28 33 28 Z"
        fill="#CCC"
      ></path>
    </svg>
  );
}

export default PhaseReorderCard;
