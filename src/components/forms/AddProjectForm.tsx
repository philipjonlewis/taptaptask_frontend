import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProject } from "../../redux/projectListState";
import { v4 as uuidv4 } from "uuid";

const AddProjectForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    user: "user-001",
    projectId: uuidv4(),
    projectName: "Sample Project Name",
    projectDescription: "Sample Project Description",
    dateOfDeadline: "2020-06-01",
  });

  const formHandler = (e) => {
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
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
  };

  return (
    <div className="add-project-form">
      <form action="#">
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={formHandler}
        />

        <label htmlFor="projectDescription">Project Description</label>
        <input
          type="text"
          name="projectDescription"
          placeholder="Project Description"
          value={form.projectDescription}
          onChange={formHandler}
        />
        <button onClick={submitHandler}>Add New Project</button>
      </form>
    </div>
  );
};

export default AddProjectForm;
