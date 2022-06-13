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

import { EditButtonSvg, DeleteButtonSvg, ReorderIconSvg } from "../svgs";

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
    confirm("Are you sure you want to delete this phase?");
    setLocalPhaseList((state) => {
      const newState = state.filter((phases) => phases.phaseId !== phaseId);
      return [...newState];
    });
    dispatch(deletePhase({ phaseId: phaseId }));
    deletePhaseData({
      phaseId: phaseId,
      projectReferenceId: activeProject.projectId,
    });
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
        <EditButtonSvg />
      </div>
      <div className="delete-phase-container" onClick={deletePhaseHandler}>
        <DeleteButtonSvg />
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
        <ReorderIconSvg dragControls={dragControls} />
      </div>
    </Reorder.Item>
  );
};

export default PhaseReorderCard;
