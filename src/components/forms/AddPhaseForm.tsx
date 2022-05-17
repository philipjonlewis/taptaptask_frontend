import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addPhase } from "../../redux/phaseListState";

const AddPhaseForm = () => {
  const { activeProject } = useSelector((state) => state);


  const dispatch = useDispatch();
  const [form, setForm] = useState({
    user: "user-001",
    phaseId: uuidv4(),
    projectReferenceId: activeProject.projectId,
    phaseName: "Phase Name",
    phaseOrder: "Phase Order",
  });

  const formHandler = (e) => {
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(addPhase(form));

    (async () => {
      const rawResponse = await fetch("http://localhost:4000/phases", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const content = await rawResponse.json();

      console.log(content);
    })();
  };

  return (
    <div className="add-phase-form">
      <form action="#">
        <label htmlFor="phaseName">Phase Name</label>
        <input
          type="text"
          name="phaseName"
          placeholder="Phase Name"
          value={form.phaseName}
          onChange={formHandler}
        />

        <label htmlFor="phaseOrder">Phase Order</label>
        <input
          type="number"
          name="phaseOrder"
          placeholder="Phase Order"
          value={form.phaseOrder}
          onChange={formHandler}
        />
        <button onClick={submitHandler}>Add New Phase</button>
      </form>
    </div>
  );
};

export default AddPhaseForm;
