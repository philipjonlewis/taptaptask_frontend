import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import PhaseReorderCard from "../cards/PhaseReorderCard";
import { useSelector, useDispatch } from "react-redux";
import {
  activePhasesList,
  editPhaseListOrder,
} from "../../redux/phaseListState";

import { patchRequest } from "../../helpers/patchRequest";

const PhaseManagerForm = () => {
  const {
    auth: { _id },
    phaseList,
    activeProject: { projectId },
  } = useSelector((state) => state);
  const [canFetch, setCanFetch] = useState(false);
  const dispatch = useDispatch();

  const [localPhaseList, setLocalPhaseList] = useState(
    [...phaseList.filter((phase) => phase._id == projectId)[0].phaseList].sort(
      (a, b) => {
        return a.phaseOrder - b.phaseOrder;
      }
    )
  );

  useEffect(() => {
    if (canFetch) {
      console.log(canFetch);
      const newOrder = localPhaseList.map((phaseObject) => {
        return {
          ...phaseObject,
          phaseOrder: localPhaseList.indexOf(phaseObject) + 1,
        };
      });

      patchRequest("http://192.168.0.22:4000/phases/changeorder", newOrder);
    }
  }, [localPhaseList]);

  useEffect(() => {
    dispatch(editPhaseListOrder({ projectId, localPhaseList }));
  }, [localPhaseList]);

  return (
    <div className="phase-management-container">
      <div className="title-container">
        <p>Phase Manager</p>
      </div>
      <form className="add-phase-form-container">
        <label htmlFor="addPhase">Add Phase</label>
        <input type="text" required placeholder="Add a new phase" />
        <button>Add a new phase</button>
      </form>
      <Reorder.Group
        axis="y"
        values={localPhaseList}
        onReorder={setLocalPhaseList}
        className="interactive-phase-container"
        onMouseEnter={() => setCanFetch(true)}
      >
        {localPhaseList.map((phase) => {
          return <PhaseReorderCard key={phase.phaseOrder} item={phase} />;
        })}
      </Reorder.Group>
    </div>
  );
  // return (
  //   <div className="phase-management-container">
  //     <div className="title-container">
  //       <p>Phase Manager</p>
  //     </div>

  //     <Reorder.Group axis="y" values={phases} onReorder={setPhases}>
  //       {phases.map((phase) => {
  //         return (
  //           <Reorder.Item key={phase.phaseOrder} value={phase.phaseName}>
  //             {phase.phaseName}
  //           </Reorder.Item>
  //         );
  //       })}
  //     </Reorder.Group>

  //   </div>
  // );
};

export default PhaseManagerForm;
