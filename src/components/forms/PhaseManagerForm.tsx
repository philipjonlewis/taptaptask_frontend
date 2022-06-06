import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import PhaseReorderCard from "../cards/PhaseReorderCard";
import { useSelector, useDispatch } from "react-redux";
import {
  activePhasesList,
  editPhaseListOrder,
} from "../../redux/phaseListState";
import { addPhase } from "../../redux/phaseListState";
import { patchRequest } from "../../helpers/patchRequest";
import { v4 as uuidv4 } from "uuid";
import { postRequest } from "../../helpers/postRequest";

const PhaseManagerForm = () => {
  const {
    auth: { _id },
    phaseList,
    activeProject: { projectId },
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  const [localPhaseList, setLocalPhaseList] = useState([]);

  const [form, setForm] = useState({
    user: _id,
    phaseId: uuidv4(),
    projectReferenceId: projectId,
    phaseName: "",
  });

  const localPhaseListResetter = (phaseList: any) => {
    const filteredPhaseList = [...phaseList].filter(
      (phase) => phase.projectReferenceId == projectId
    );

    const sortedPhaseList = [...filteredPhaseList].sort((a, b) => {
      return a.phaseOrder - b.phaseOrder;
    });

    setLocalPhaseList((): any => {
      return [...sortedPhaseList];
    });
  };

  useEffect(() => {
    localPhaseListResetter(phaseList);
    return () => {
      setLocalPhaseList([]);
    };
  }, [projectId, phaseList]);

  return (
    <div className="phase-management-container">
      <div className="title-container">
        <p>Phase Manager</p>
      </div>
      <form className="add-phase-form-container">
        <label htmlFor="addPhase">Add New Phase</label>

        <div className="input-button-container">
          <input
            type="text"
            required
            placeholder="Add a new phase"
            name="phaseName"
            id="phaseName"
            value={form.phaseName}
            onChange={(e) => {
              setForm((state) => {
                return {
                  ...state,
                  [e.target.name]: e.target.value,
                  phaseOrder: localPhaseList.length + 1,
                };
              });
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addPhase({ newPhase: form, projectReferenceId: projectId })
              );

              setLocalPhaseList((state) => {
                return [...state, form];
              });

              setForm((state) => {
                return { ...state, phaseId: uuidv4(), phaseName: "" };
              });
            }}
          >
            Add Phase
          </button>
        </div>
      </form>
      <Reorder.Group
        axis="y"
        values={localPhaseList}
        onReorder={setLocalPhaseList}
        className="interactive-phase-container"
        onMouseUp={() => {
          dispatch(editPhaseListOrder({ projectId, localPhaseList }));
        }}
      >
        {localPhaseList.map((phase: any) => {
          return (
            <PhaseReorderCard
              key={phase.phaseId}
              item={phase}
              localPhaseList={localPhaseList}
              setLocalPhaseList={setLocalPhaseList}
            />
          );
        })}
      </Reorder.Group>
    </div>
  );
};

export default PhaseManagerForm;
