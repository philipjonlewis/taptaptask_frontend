import React, { useState } from "react";
import format from "date-fns/format";

const LapsedTaskCard = ({
  taskObject,
  openLapsedTaskCard,
  setOpenLapsedTaskCard,
}) => {
  return (
    <div
      className={
        openLapsedTaskCard == taskObject._id
          ? "lapsed-task-card open-lapsed-task-card"
          : "lapsed-task-card"
      }
      // onClick={() => setOpenLapsedTaskCard(taskObject._id)}
    >
      <div className="date-container">
        <p>
          {format(new Date(taskObject._id), "LLL dd ")}{" "}
          <span>{format(new Date(taskObject._id), "y")}</span>
        </p>

        <p>
          {taskObject.taskContent.filter((t) => t.isCompleted === true).length}{" "}
          / {taskObject.taskContent.length}
        </p>

        <div
          className={
            openLapsedTaskCard == taskObject._id
              ? "drop-down-icon-container drop-down-active"
              : "drop-down-icon-container"
          }
          onClick={() => {
            if (openLapsedTaskCard == taskObject._id) {
              setOpenLapsedTaskCard("");
            } else {
              setOpenLapsedTaskCard(taskObject._id);
            }
          }}
        >
          {openLapsedTaskCard == taskObject._id ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="drop-down-active"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

        {/* <p>Task Count : {taskObject.taskContent.length}</p> */}
      </div>

      <div className="lapsed-list-container">
        {taskObject.taskContent.map((taskObj) => {
          return (
            <div
              key={taskObj.taskId}
              className={
                taskObj.isCompleted
                  ? "lapsed-task-content-container completed-lapsed-task"
                  : "lapsed-task-content-container"
              }
            >
              <p>{taskObj.taskContent}</p>

              <div className="edit-lapsed-task-icon-container">
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
        })}
      </div>
    </div>
  );
};

export default LapsedTaskCard;
