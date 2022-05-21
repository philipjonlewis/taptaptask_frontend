import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import isEqual from "date-fns/isEqual";
import { postRequest } from "../../helpers/postRequest";
import { convertToObject, ObjectFlags } from "typescript";

import { addTaskToExistingDate } from "../../redux/taskListState";

const PhaseMenuSidebar = ({ fetchedTaskList, setFetchedTaskList }) => {
  const dispatch = useDispatch();
  const { auth, activePhase, activeProject, taskList } = useSelector(
    (state) => state
  );

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [taskFormContent, setTaskFormContent] = useState({
    user: auth._id,
    taskId: uuidv4(),
    projectReferenceId: activeProject.projectId,
    phaseReferenceId: activePhase.phaseId,
    taskContent: "Ano na naman",
    dateOfDeadline: "2022-06-08",
    isCompleted: false,
  });

  return (
    <>
      {isMenuOpen ? (
        <div className="phase-menu-container">
          <div
            className="close-icon-menu-container"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <div className="phase-information-container">
            {/* <p>Phase</p> */}
          </div>

          <div className="add-task-form-container">
            <form action="#">
              <label htmlFor="addTask">Add Task</label>
              <input
                type="text"
                placeholder="Add Task"
                value={taskFormContent.taskContent}
                onChange={(e) => {
                  setTaskFormContent((state) => {
                    return { ...state, taskContent: e.target.value };
                  });
                }}
              />
              <input
                type="date"
                value={taskFormContent.dateOfDeadline}
                onChange={(e) => {
                  setTaskFormContent((state) => {
                    return {
                      ...state,
                      dateOfDeadline: new Date(e.target.value).toISOString(),
                    };
                  });
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();

                  // postRequest(
                  //   taskFormContent,
                  //   "http://192.168.0.22:4000/tasks"
                  // );

                  setFetchedTaskList((state) => {
                    const newState = state.map((dateObject) => {
                      if (
                        isEqual(
                          new Date(dateObject._id),
                          new Date(taskFormContent.dateOfDeadline)
                        )
                      ) {
                        const newTaskContent = [
                          ...dateObject.taskContent,
                          taskFormContent,
                        ];
                        console.log("hello");
                        // console.log({
                        //   ...dateObject,
                        //   taskContent: [...newTaskContent],
                        // });

                        return {
                          ...dateObject,
                          taskContent: [...newTaskContent],
                        };
                      }
                      return dateObject;
                    });
                    console.log(newState);
                    // console.log(state);
                    // console.log("testing adding");
                    return [...newState];
                  });
                }}
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="phase-menu-container-small">
          <div
            className="open-menu-icon-container"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default PhaseMenuSidebar;
