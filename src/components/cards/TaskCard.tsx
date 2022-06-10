import React, { useEffect, useState, useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import Taskette from "./Taskette";
import { useAddTaskDataMutation } from "../../redux/rtkQuery/taskApiSlice";

const TaskCard = ({ taskObject, deleteTaskCardHandler }) => {
  const { auth, activePhase, activeProject } = useSelector((state: any) => {
    return {
      auth: state.auth,
      activePhase: state.activePhase,
      activeProject: state.activeProject,
    };
  });



  const [addTaskData] = useAddTaskDataMutation();
  const [localTaskList, setLocalTaskList] = useState([]) as any;

  const [taskCardMenuContainer, setTaskCardMenuContainer] = useState(false);

  const [taskForm, setTaskForm] = useState({
    user: auth._id,
    taskId: uuidv4(),
    dateOfDeadline: format(new Date(taskObject._id), "yyyy-MM-dd"),
    isCompleted: false,
    phaseReferenceId: activePhase.phaseId,
    projectReferenceId: activeProject.projectId,
    taskContent: "",
  });

  const addNewTaskhandler = (e) => {
    e.preventDefault();
    const newTask = { ...taskForm, taskId: uuidv4() };

    addTaskData([{ ...newTask }]);

    setLocalTaskList((state) => {
      return [{ ...newTask }, ...state];
    });

    setTaskForm((state) => {
      return {
        ...state,
        taskContent: "",
        isCompleted: false,
      };
    });
  };

  useEffect(() => {
    setLocalTaskList(() => {
      return [...taskObject.taskContent].reverse();
    });
  }, [taskObject._id]);

  return (
    <div className="task-date-container">
      <div
        className="label-container"
        onClick={() => setTaskCardMenuContainer(!taskCardMenuContainer)}
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
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </div>
      <div className="deadline-container">
        <p className="date-format">
          {format(new Date(taskObject._id), "LLL dd ")}{" "}
          <span className="year">{format(new Date(taskObject._id), "y")}</span>
        </p>
        <div className="date-distance">
          <p className="due-statement">
            due{" "}
            {formatDistanceToNow(new Date(taskObject._id), {
              addSuffix: true,
            })}
          </p>

          {localTaskList.filter((task) => task.isCompleted == false).length ==
          0 ? (
            <p className="task-count">Everything looks great for this day</p>
          ) : (
            <p className="task-count">
              {localTaskList.filter((task) => task.isCompleted == true).length}{" "}
              / {localTaskList.length} completed{" "}
            </p>
          )}
        </div>

        <div className="new-task-container">
          <form action="#">
            <input
              maxLength={96}
              required
              type="text"
              placeholder="Add Task"
              spellCheck="false"
              autoCorrect="false"
              value={taskForm.taskContent}
              onChange={(e) => {
                setTaskForm((state) => {
                  return { ...state, taskContent: e.target.value };
                });
              }}
            />
            <div className="character-count-container">
              <p>{taskForm.taskContent.length} / 96</p>
            </div>
            <button
              className="new-task-button-container"
              onClick={addNewTaskhandler}
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
      <div className="task-list-container">
        {localTaskList.map((taskObject: any) => {
          return (
            <React.Fragment key={taskObject.taskId}>
              <Taskette
                taskObject={taskObject}
                setLocalTaskList={setLocalTaskList}
              />
            </React.Fragment>
          );
        })}
      </div>
      {taskCardMenuContainer && (
        <div
          className="task-card-menu-container"
          onMouseLeave={() => setTaskCardMenuContainer(false)}
        >
          <div className="edit-task-container">
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
            <p>Edit TaskCard</p>
          </div>

          <div
            className="delete-task-container"
            onClick={() => deleteTaskCardHandler(taskObject._id)}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <p>Delete TaskCard</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
