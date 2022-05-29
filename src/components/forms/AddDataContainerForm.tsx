import React, { useState } from "react";
import { motion } from "framer-motion";
import AddProjectForm from "./AddProjectForm";
import AddPhaseForm from "./AddPhaseForm";
// import AddTaskForm from "./AddTaskForm";
const AddDataContainerForm = () => {
  const [openForm, setOpenForm] = useState("add-project");

  return (
    <motion.div drag className="add-data-container-form">
      <div className="form-tabs-container">
        <div
          className={
            openForm == "add-project"
              ? "tab-container add-project-tab active-form-tab"
              : "tab-container add-project-tab"
          }
          onClick={() => setOpenForm("add-project")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>Add Project</p>
        </div>
        <div
          className={
            openForm == "add-phase"
              ? "tab-container add-phase-tab active-form-tab"
              : "tab-container add-phase-tab"
          }
          onClick={() => setOpenForm("add-phase")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p>Add Phase</p>
        </div>
        <div
          className={
            openForm == "add-task"
              ? "tab-container add-task-tab active-form-tab"
              : "tab-container add-task-tab"
          }
          onClick={() => setOpenForm("add-task")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <p>Add Task</p>
        </div>
      </div>
      <div className="active-form-content">
        {openForm == "add-project" && <AddProjectForm />}
        {openForm == "add-phase" && <AddPhaseForm />}
        {/* {openForm == "add-task" && <AddTaskForm />} */}
      </div>
    </motion.div>
  );
};

export default AddDataContainerForm;
