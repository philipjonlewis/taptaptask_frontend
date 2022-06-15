import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import {
  DownArrowIcon,
  UpArrowIcon,
  ThreeDotsSvg,
  DeleteButtonSvg,
} from "../svgs";
import { useDeleteTaskDataMutation } from "../../redux/rtkQuery/taskApiSlice";

const LapsedTaskCard = ({
  taskObject,
  openLapsedTaskCard,
  setOpenLapsedTaskCard,
  activePhaseId,
  activeProjectId,
}) => {
  const [localTaskObject, setLocalTaskObject] = useState({}) as any;
  const [deleteTaskData] = useDeleteTaskDataMutation();

  useEffect(() => {
    setLocalTaskObject(taskObject);
  }, []);

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
          {
            localTaskObject?.taskContent?.filter((t) => t.isCompleted === true)
              .length
          }{" "}
          / {localTaskObject?.taskContent?.length}
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
        {localTaskObject?.taskContent?.length >= 1 &&
          localTaskObject.taskContent.map((taskObj) => {
            return (
              <div
                key={taskObj.taskId}
                className={
                  taskObj.isCompleted
                    ? "lapsed-task-content-container completed-lapsed-task"
                    : "lapsed-task-content-container"
                }
              >
                <div className="task-text-container">
                  <p>{taskObj.taskContent}</p>
                </div>

                <div
                  className="edit-lapsed-task-icon-container"
                  onClick={() => {
                    deleteTaskData({
                      taskId: taskObj.taskId,
                      phaseReferenceId: activePhaseId,
                      projectReferenceId: activeProjectId,
                    }).then((res) => {
                      setLocalTaskObject((state) => {
                        const newState = state.taskContent.filter(
                          (task) => task.taskId !== taskObj.taskId
                        );
                        console.log(state);
                        console.log(taskObj.taskId);

                        return { ...state, taskContent: [...newState] };
                      });
                    });
                  }}
                >
                  <DeleteButtonSvg />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LapsedTaskCard;
