import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { isEqual, format } from "date-fns";
import { postRequest } from "../../helpers/postRequest";

const PhaseMenuSidebar = ({
  fetchedTaskList,
  setFetchedTaskList,
  setActivePhaseSidebarTab,
  activePhaseSidebarTab,
}) => {
  const dispatch = useDispatch();
  const { auth, activePhase, activeProject, taskList } = useSelector(
    (state) => state
  );

  const [isMenuOpen, setIsMenuOpen] = useState(
    JSON.parse(localStorage.getItem("phaseMenuSidebar")) || false
  );

  const [taskFormContent, setTaskFormContent] = useState({
    user: auth._id,
    taskId: uuidv4(),
    projectReferenceId: activeProject.projectId,
    phaseReferenceId: activePhase.phaseId,
    taskContent: "",
    dateOfDeadline: format(new Date(), "yyyy-MM-dd"),
    isCompleted: false,
  });

  useEffect(() => {
    localStorage.setItem("phaseMenuSidebar", JSON.stringify(isMenuOpen));
  }, [isMenuOpen]);

  const openMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const taskContentFormHandler = (e) => {
    setTaskFormContent((state) => {
      return { ...state, taskContent: e.target.value };
    });
  };

  const dateOfDeadlineFormHandler = (e) => {
    setTaskFormContent((state) => {
      const formattedDate = format(new Date(e.target.value), "yyyy-MM-dd");
      return {
        ...state,
        dateOfDeadline: formattedDate,
      };
    });
  };

  const submitTaskFormHandler = (e) => {
    e.preventDefault();

    if (taskFormContent.taskContent.length <= 0) {
      return;
    }

    postRequest(taskFormContent, "http://192.168.0.22:4000/tasks");

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
            const newTaskContent = [...dateObject.taskContent, taskFormContent];
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
          _id: new Date(taskFormContent.dateOfDeadline).toISOString(),
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
        dateOfDeadline: format(new Date(), "yyyy-MM-dd"),
        taskId: uuidv4(),
      };
    });
  };

  return (
    <>
      {isMenuOpen ? (
        <div className="phase-menu-container">
          <div
            className="minimize-phase-sidebar-container"
            onClick={openMenuHandler}
            title="Task History"
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
          </div>
          <div className="icon-links-container">
            <div className="task-history-icon-menu-container">
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
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                />
              </svg>
            </div>

            <div
              className="close-icon-menu-container"
              onClick={openMenuHandler}
              title="Task History"
            ></div>
          </div>

          <div className="phase-information-container">
            <p>Add a new task</p>
          </div>

          <form action="#" className="add-task-form-container">
            <label htmlFor="taskContent">Task</label>
            <input
              required
              spellCheck="false"
              autoCorrect="false"
              type="text"
              placeholder="Add Task"
              value={taskFormContent.taskContent}
              onChange={taskContentFormHandler}
            />
            <label htmlFor="dateOfDeadine">Deadline</label>
            <input
              required
              type="date"
              value={taskFormContent.dateOfDeadline}
              onChange={dateOfDeadlineFormHandler}
            />
            <button onClick={submitTaskFormHandler}>Add Task</button>
          </form>
          <div
            className="clear-form-container"
            onClick={() => {
              setTaskFormContent((state) => {
                return {
                  ...state,
                  taskContent: "",
                };
              });
            }}
          >
            <p>Clear Form</p>
          </div>
        </div>
      ) : (
        <div className="phase-menu-container-small">
          <div className="open-menu-icon-container" onClick={openMenuHandler}>
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
          <div
            className={
              activePhaseSidebarTab == "add-task"
                ? "add-task-icon-container active-sidebar-icon"
                : "add-task-icon-container"
            }
            onClick={() => {
              activePhaseSidebarTab == "add-task"
                ? setActivePhaseSidebarTab("")
                : setActivePhaseSidebarTab("add-task");
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            {/* <p>Add Task</p> */}
          </div>
          <div
            className={
              activePhaseSidebarTab == "filter-tasks"
                ? "filter-icon-menu-container active-sidebar-icon"
                : "filter-icon-menu-container"
            }
            onClick={() => {
              activePhaseSidebarTab == "filter-tasks"
                ? setActivePhaseSidebarTab("")
                : setActivePhaseSidebarTab("filter-tasks");
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
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <div
            className={
              activePhaseSidebarTab == "task-history"
                ? "task-history-icon-menu-container active-sidebar-icon"
                : "task-history-icon-menu-container"
            }
            onClick={() => {
              activePhaseSidebarTab == "task-history"
                ? setActivePhaseSidebarTab("")
                : setActivePhaseSidebarTab("task-history");
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
                d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default PhaseMenuSidebar;
