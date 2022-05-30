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
  const dispatch = useDispatch();
  const {
    auth: { _id },
    phaseList,
    activeProject: { projectId },
  } = useSelector((state) => state);

  const [canFetch, setCanFetch] = useState(true);

  const [localPhaseList, setLocalPhaseList] = useState([]);

  const [form, setForm] = useState({
    user: _id,
    phaseId: uuidv4(),
    projectReferenceId: projectId,
    phaseName: "",
    phaseOrder: localPhaseList.length + 1,
  });

  const formHandler = (e) => {
    setForm((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setLocalPhaseList((state) => {
      return [
        ...phaseList.filter((phase) => phase._id == projectId)[0].phaseList,
      ].sort((a, b) => {
        return a.phaseOrder - b.phaseOrder;
      });
    });
  }, [projectId]);

  const submitHandler = (e) => {
    e.preventDefault();

    setLocalPhaseList((state) => {
      return [...state, form];
    });
    dispatch(addPhase(form));
    postRequest(form, "http://192.168.0.22:4000/phases");

    setForm((state) => {
      return { ...state, phaseId: uuidv4(), phaseName: "" };
    });
  };

  useEffect(() => {
    if (canFetch) {
      dispatch(editPhaseListOrder({ projectId, localPhaseList }));
      setCanFetch(false);
    }
  }, [localPhaseList]);

  // useEffect(() => {
  //   if (canFetch) {
  //     const newPhaseList = [...localPhaseList].map((phaseObject) => {
  //       return {
  //         ...phaseObject,
  //         phaseOrder: localPhaseList.indexOf(phaseObject) + 1,
  //       };
  //     });

  //     console.log(newPhaseList);

  //     // patchRequest("http://192.168.0.22:4000/phases/changeorder", newPhaseList);
  //     // setCanFetch(false);
  //   }
  // }, [localPhaseList]);

  // useEffect(() => {}, [localPhaseList]);
  return (
    <div className="phase-management-container">
      <div className="title-container">
        <p>Phase Manager</p>
      </div>
      <form className="add-phase-form-container">
        <label htmlFor="addPhase">Add Phase</label>

        <div className="input-button-container">
          <input
            type="text"
            required
            placeholder="Add a new phase"
            name="phaseName"
            id="phaseName"
            value={form.phaseName}
            onChange={formHandler}
          />
          <button onClick={submitHandler}>Add Phase</button>
        </div>
      </form>
      <Reorder.Group
        axis="y"
        values={localPhaseList}
        onReorder={setLocalPhaseList}
        className="interactive-phase-container"
        onMouseEnter={() => setCanFetch(true)}

        // onMouseLeave={() => setCanFetch(false)}
      >
        {localPhaseList.map((phase) => {
          return <PhaseReorderCard key={phase.phaseId} item={phase} />;
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
