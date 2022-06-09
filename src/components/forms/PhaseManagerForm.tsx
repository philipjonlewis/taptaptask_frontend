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
import { fetchPhaseList } from "../../redux/phaseListState";
import { usePhaseChangeOrderMutation } from "../../redux/rtkQuery/phaseApiSlice";
import { useAddPhaseFetchMutation } from "../../redux/rtkQuery/phaseApiSlice";
import { useGetPhasesByProjectQuery } from "../../redux/rtkQuery/aggregationApiSlice";

const PhaseManagerForm = () => {
  const {
    auth,
    phaseList,
    activeProject: { projectId },
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  const [phaseChangeOrder] = usePhaseChangeOrderMutation();
  const [addPhaseFetch, { isSuccess }] = useAddPhaseFetchMutation() as any;

  const [localPhaseList, setLocalPhaseList] = useState([]) as any;
  const [mouseDownState, setMouseDownState] = useState(false);

  const [form, setForm] = useState({
    user: auth._id,
    phaseId: uuidv4(),
    projectReferenceId: projectId,
    phaseName: "",
  });

  const { data, error, isLoading, refetch } = useGetPhasesByProjectQuery(
    {
      projectReferenceId: projectId,
    }
    // {
    //   pollingInterval: 1000,
    //   refetchOnMountOrArgChange: false,
    //   skip: false,
    // }
  ) as any;

  useEffect(() => {
    refetch();
    if (isLoading == false && error == undefined && projectId) {
      dispatch(fetchPhaseList([...data]));
      setLocalPhaseList(() => {
        return [...data];
      });
    }

    return () => {
      setLocalPhaseList([]);
    };
  }, [projectId, data]);

  const mouseUpHandler = () => {
    const newPhaseList = [...localPhaseList].map((phaseObject) => {
      return {
        ...phaseObject,
        phaseOrder: localPhaseList.indexOf(phaseObject) + 1,
      };
    });

    dispatch(editPhaseListOrder(newPhaseList));

    phaseChangeOrder([...newPhaseList]);
  };

  const addPhaseHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (form.phaseName.length >= 1) {
      const newPhaseFromForm = { ...form, phaseId: uuidv4() };
      addPhaseFetch([newPhaseFromForm]).then((res: any) => {
        dispatch(addPhase(res.data[0]));

        setLocalPhaseList((state: any) => {
          return [...state, res.data[0]];
        });

        setForm((state) => {
          return { ...state, phaseName: "" };
        });
      });
    } else {
      console.log("walang lamn");
    }
  };

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
          <button onClick={addPhaseHandler}>Add Phase</button>
        </div>
      </form>
      <Reorder.Group
        axis="y"
        values={localPhaseList}
        onReorder={setLocalPhaseList}
        className="interactive-phase-container"
        onMouseUp={mouseUpHandler}
      >
        {localPhaseList.map((phase: any) => {
          return (
            <PhaseReorderCard
              key={phase.phaseId}
              phase={phase}
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
