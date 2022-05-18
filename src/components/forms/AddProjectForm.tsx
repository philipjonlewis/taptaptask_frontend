import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProject } from "../../redux/projectListState";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";

const AddProjectForm = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const projectId = uuidv4();
  const [form, setForm] = useState({
    user: auth._id,
    projectId,
    projectName: "",
    projectDescription: "",
    dateOfDeadline: "" || new Date(),
  });

  const formHandler = (e) => {
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });

    console.log(form);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(addProject(form));

    (async () => {
      const rawResponse = await fetch("http://localhost:4000/projects", {
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

    setForm({
      user: auth._id,
      projectId,
      projectName: "",
      projectDescription: "",
      dateOfDeadline: "" || new Date(),
    });
  };

  return (
    <div className="add-project-form">
      <div className="form-title">
        <p>Add Project</p>
      </div>
      <form action="#">
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={formHandler}
          required
          spellCheck="false"
        />

        <label htmlFor="projectDescription">Project Description</label>
        <textarea
          type="text"
          name="projectDescription"
          placeholder="Project Description"
          value={form.projectDescription}
          onChange={formHandler}
        />
        <label htmlFor="dateOfDeadline">Deadline</label>
        <div className="calendar-container">
          <input
            type="date"
            name="dateOfDeadline"
            id="dateOfDeadline"
            onChange={formHandler}
          />
        </div>
        <div className="button-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm({
                user: auth._id,
                projectId,
                projectName: "",
                projectDescription: "",
                dateOfDeadline: "" || new Date(),
              });
            }}
            className="clear-form-button"
          >
            Clear Form
          </button>
          <button onClick={submitHandler} className="submit-button">
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
