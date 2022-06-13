import React, { useState } from "react";
import format from "date-fns/format";
import { DownArrowIcon, UpArrowIcon, ThreeDotsSvg } from "../svgs";
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
            <UpArrowIcon />
          ) : (
            <DownArrowIcon />
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
                <ThreeDotsSvg />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LapsedTaskCard;
