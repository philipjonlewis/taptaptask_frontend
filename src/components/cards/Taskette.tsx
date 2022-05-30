import React, { useEffect, useState, useLayoutEffect } from "react";
import { patchRequest } from "../../helpers/patchRequest";
import { deleteRequest } from "../../helpers/deleteRequest";

const Taskette = ({ taskObject, setLocalTaskList }) => {
  const { taskId, taskContent, isCompleted } = taskObject;
  const [isLocalCompleted, setIsLocalCompleted] = useState(isCompleted);
  const [tasketteMenu, setTasketteMenu] = useState(false);
  const [isTaskBeingEdited, setIsTaskBeingEdited] = useState(false);

  const [localTaskContent, setLocalTaskContent] = useState(taskContent);

  const editTaskHandler = (e) => {
    setTasketteMenu(false);
    setIsTaskBeingEdited(true);
  };

  const submitEditTaskHandler = () => {
    setLocalTaskList((state) => {
      const newState = state.map((task) => {
        if (task.taskId == taskId) {
          return { ...task, taskContent: localTaskContent };
        }
        return task;
      });

      return [...newState];
    });
    patchRequest("http://192.168.0.22:4000/tasks/edit", {
      taskId,
      taskContent: localTaskContent,
    });
    setIsTaskBeingEdited(false);
  };

  const deleteTaskhandler = () => {
    setLocalTaskList((state) => {
      deleteRequest(taskId, "http://192.168.0.25:4000/tasks/delete");
      const newState = state.filter((task) => task.taskId !== taskId);
      return [...newState];
    });
    setTasketteMenu(false);
    setIsTaskBeingEdited(false);
  };

  return (
    <div
      key={taskId}
      className={
        isLocalCompleted
          ? "task-content-container completed-task"
          : "task-content-container"
      }
      onMouseLeave={() => {
        if (isTaskBeingEdited) {
          setIsTaskBeingEdited(false);
          submitEditTaskHandler();
        }
      }}
    >
      <div className="icon-container">
        <div
          className={
            isLocalCompleted
              ? "checkbox-container completed-checkbox"
              : "checkbox-container"
          }
          onClick={() => {
            if (taskId !== undefined) {
              setLocalTaskList((state) => {
                const newState = state.map((task) => {
                  if (task.taskId == taskId) {
                    return { ...task, isCompleted: !isLocalCompleted };
                  }
                  return task;
                });

                return [...newState];
              });
              patchRequest({
                taskId: taskId,
                isCompleted: !isLocalCompleted,
              });
              setIsLocalCompleted(() => {
                return !isLocalCompleted;
              });
            }
          }}
        >
          {isLocalCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          )}
        </div>
      </div>
      <div className="task-content">
        <textarea
          maxLength={96}
          required
          autoCorrect="false"
          spellCheck="false"
          defaultValue={taskContent}
          disabled={!isTaskBeingEdited}
          name={taskId}
          id=""
          onChange={(e) => {
            setLocalTaskContent(e.target.value);
          }}
        >
          {/* {localTaskContent} */}
        </textarea>
        {isTaskBeingEdited && (
          <div
            className="submit-edited-task-button-container"
            onClick={submitEditTaskHandler}
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        )}
        {/* <input>{taskContent}</input> */}
      </div>
      <div
        className="task-menu-container"
        onClick={() => setTasketteMenu(!tasketteMenu)}
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

      {tasketteMenu && (
        <div
          className="taskette-menu-container"
          onMouseLeave={() => setTasketteMenu(!tasketteMenu)}
        >
          <div className="edit-task-container" onClick={editTaskHandler}>
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
            <p>Edit Task</p>
          </div>

          <div className="delete-task-container" onClick={deleteTaskhandler}>
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
            <p>Delete Task</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskette;
