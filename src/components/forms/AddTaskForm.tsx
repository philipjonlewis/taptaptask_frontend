import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/taskListState";
const AddTaskForm = () => {
  const { activeProject, activePhase } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    user: "user-001",
    taskId: uuidv4(),
    projectReferenceId: activeProject.projectId,
    phaseReferenceId: activePhase.phaseId,
    taskContent: "Sample Task",
    dateOfDeadline: "2020-06-01T00:00:00.000Z",
    isCompleted: false,
    isPriority: false,
    isLapsed: false,
  });

  const formHandler = (e) => {
    console.log("is this working");
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(addTask(form));

    (async () => {
      const rawResponse = await fetch("http://localhost:4000/tasks", {
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
    <div className="add-task-form">
      <form action="#">
        <label htmlFor="taskContent">Task Content</label>
        <input
          type="text"
          name="taskContent"
          placeholder="Task Name"
          value={form.taskContent}
          onChange={formHandler}
        />
        <button onClick={submitHandler}>Add New Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
