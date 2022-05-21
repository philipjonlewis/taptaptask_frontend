import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { isEqual, format } from "date-fns";
import { postRequest } from "../../helpers/postRequest";
import { convertToObject, ObjectFlags } from "typescript";

import { addTaskToExistingDate } from "../../redux/taskListState";

const PhaseMenuSidebar = ({ fetchedTaskList, setFetchedTaskList }) => {
  const dispatch = useDispatch();
  const { auth, activePhase, activeProject, taskList } = useSelector(
    (state) => state
  );

  const [isMenuOpen, setIsMenuOpen] = useState(!fetchedTaskList.length >= 1);

  const [taskFormContent, setTaskFormContent] = useState({
    user: auth._id,
    taskId: uuidv4(),
    projectReferenceId: activeProject.projectId,
    phaseReferenceId: activePhase.phaseId,
    taskContent: "",
    dateOfDeadline: new Date(),
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
              <input
                required
                spellCheck="false"
                autoCorrect="false"
                type="text"
                placeholder="Add Task"
                value={taskFormContent.taskContent}
                onChange={(e) => {
                  setTaskFormContent((state) => {
                    return { ...state, taskContent: e.target.value };
                  });
                }}
                // onMouseLeave={() => {
                //   setTaskFormContent((state) => {
                //     return { ...state, taskContent: "" };
                //   });
                // }}
              />
              <input
                required
                type="date"
                value={taskFormContent.dateOfDeadline}
                // onMouseLeave={() => {
                //   setTaskFormContent((state) => {
                //     return { ...state, dateOfDeadline: new Date() };
                //   });
                // }}
                onChange={(e) => {
                  setTaskFormContent((state) => {
                    const formattedDate = format(
                      new Date(e.target.value),
                      "yyyy-MM-dd"
                    );
                    return {
                      ...state,
                      dateOfDeadline: formattedDate,
                    };
                  });
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();

                  postRequest(
                    taskFormContent,
                    "http://192.168.0.22:4000/tasks"
                  );

                  setFetchedTaskList((state) => {
                    // this is what happens if theres already an existing date
                    if (
                      state.some((dateObject) => {
                        const matchedDate = isEqual(
                          new Date(dateObject._id),
                          new Date(taskFormContent.dateOfDeadline)
                        );

                        return matchedDate;
                      })
                    ) {
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
                          return {
                            ...dateObject,
                            taskContent: [...newTaskContent],
                          };
                        }
                        return dateObject;
                      });

                      return [...newState];
                    }

                    // this is what'll happen if there is no existing date

                    const newState = [
                      ...state,
                      {
                        _id: new Date(
                          taskFormContent.dateOfDeadline
                        ).toISOString(),
                        taskContent: [taskFormContent],
                      },
                    ];

                    const formattedState = newState.sort(function (a, b) {
                      var dateA = new Date(a._id);
                      var dateB = new Date(b._id);
                      return dateA - dateB;
                    });

                    return [...formattedState];
                  });

                  setTaskFormContent((state) => {
                    return {
                      ...state,
                      taskContent: "",
                      dateOfDeadline: new Date(),
                      taskId: uuidv4(),
                    };
                  });
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
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
