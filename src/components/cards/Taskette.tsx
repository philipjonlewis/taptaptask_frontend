import React, { useState } from "react";
import { patchRequest } from "../../helpers/patchRequest";

const Taskette = ({ _id, taskContent, isCompleted }) => {
  const [isLocalCompleted, setIsLocalCompleted] = useState(isCompleted);

  return (
    <div
      className={
        isLocalCompleted
          ? "task-content-container completed-task"
          : "task-content-container"
      }
    >
      <div className="icon-container">
        <div
          className={
            isLocalCompleted
              ? "checkbox-container completed-checkbox"
              : "checkbox-container"
          }
          onClick={() => {
            setIsLocalCompleted(!isLocalCompleted);
            patchRequest({ _id: _id, isCompleted: !isLocalCompleted });
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
        <p>{taskContent}</p>
      </div>
      <div className="task-menu-container">
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
    </div>
  );
};

export default Taskette;
