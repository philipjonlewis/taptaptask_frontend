import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/taskListState";
const AddTaskForm = () => {
  const { activeProject, activePhase, projectList, auth, phaseList } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    user: auth._id,
    taskId: uuidv4(),
    projectReferenceId: activeProject.projectId,
    phaseReferenceId: activePhase.phaseId,
    taskContent: "",
    dateOfDeadline: new Date(),
    isCompleted: false,
    isPriority: false,
    isLapsed: false,
  });

  const formHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
    console.log(form.isPriority);
  };

  const checkboxHandler = (e) => {
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.checked };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

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
    })();

    setForm({
      user: auth._id,
      taskId: uuidv4(),
      projectReferenceId: activeProject.projectId,
      phaseReferenceId: activePhase.phaseId,
      taskContent: "",
      dateOfDeadline: new Date(),
      isCompleted: false,
      isPriority: false,
      isLapsed: false,
    });
  };

  return (
    <div className="add-task-form">
      <div className="form-title">
        <p>Add Task</p>
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
        {/* Start of Drop Down */}

        <label htmlFor="project">Phase</label>
        <select
          required
          value={form.phaseReferenceId}
          name="phaseReferenceId"
          onChange={formHandler}
        >
          {phaseList.map((phase) => {
            if (form.projectReferenceId == phase.projectReferenceId) {
              return (
                <option key={phase.phaseId} value={phase.phaseId}>
                  {phase.phaseName}
                </option>
              );
            }
          })}
        </select>

        {/* ENd of Drop Down */}
        <label htmlFor="taskContent">Task</label>
        <input
          type="text"
          name="taskContent"
          placeholder="Task Name"
          value={form.taskContent}
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
        {/* Task State */}
        <div className="checkbox-container">
          <div className="checkbox-segment">
            <input
              type="checkbox"
              id="isPriority"
              name="isPriority"
              onChange={checkboxHandler}
            />
            <label htmlFor="isPriority">Priority Task</label>
          </div>
          <div className="checkbox-segment">
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              onChange={checkboxHandler}
            />
            <label htmlFor="isCompleted">Completed Task</label>
          </div>
        </div>

        {/* Task State */}
        <div className="button-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm({
                user: "user-001",
                taskId: uuidv4(),
                projectReferenceId: activeProject.projectId || "project-001",
                phaseReferenceId: activePhase.phaseId || "phase-001-001",
                taskContent: "",
                dateOfDeadline: "",
                isCompleted: false,
                isPriority: false,
                isLapsed: false,
              });
            }}
            className="clear-form-button"
          >
            Clear Form
          </button>
          <button onClick={submitHandler} className="submit-button">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
