import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addPhase } from "../../redux/phaseListState";

const AddPhaseForm = () => {
  const { activeProject, projectList, auth } = useSelector((state) => state);
  console.log(projectList);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    user: auth._id,
    phaseId: uuidv4(),
    projectReferenceId: activeProject.projectId,
    phaseName: "",
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
      const rawResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_PORT}/phases`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const content = await rawResponse.json();
    })();
    setForm({
      user: "",
      phaseId: uuidv4(),
      projectReferenceId: activeProject.projectId,
      phaseName: "",
    });
  };

  return (
    <div className="add-phase-form">
      <div className="form-title">
        <p>Add Phase</p>
      </div>
      <form action="#">
        {/* Start of Drop Down */}

        <label htmlFor="project">Project</label>
        <select
          required
          value={form.projectReferenceId}
          name="projectReferenceId"
          onChange={formHandler}
        >
          {projectList.map((project) => {
            return (
              <option value={project.projectId}>{project.projectName}</option>
            );
          })}
        </select>

        {/* ENd of Drop Down */}
        <label htmlFor="phaseName">Phase Name</label>
        <input
          type="text"
          name="phaseName"
          placeholder="Phase Name"
          value={form.phaseName}
          onChange={formHandler}
        />

        <div className="button-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm({
                user: "",
                phaseId: uuidv4(),
                projectReferenceId: activeProject.projectId,
                phaseName: "",
              });
            }}
            className="clear-form-button"
          >
            Clear Form
          </button>
          <button onClick={submitHandler} className="submit-button">
            Add Phase
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPhaseForm;
