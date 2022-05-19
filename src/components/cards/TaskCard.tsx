import React, { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
const TaskCard = ({ taskObject, activeAddForm, activeAddFormhandler }) => {
  const { _id, taskContent } = taskObject;

  const {
    auth,
    activePhase: { phaseId, phaseName },
    activeProject: { projectId },
    taskList,
  } = useSelector((state) => state);

  const [localTaskList, setLocalTaskList] = useState([]);

  const [taskForm, setTaskForm] = useState({
    user: auth._id,
    dateOfDeadline: _id,
    isCompleted: false,
    isLapsed: true,
    isPriority: false,
    phaseReferenceId: phaseId,
    projectReferenceId: projectId,
    taskContent: "Trial from the new form",
  });

  useEffect(() => {
    const newList = [...taskContent].reverse();
    setLocalTaskList(newList);

    // console.log("local", localTaskList);
  }, []);

  return (
    <div className="task-date-container">
      <div className="label-container">
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
        {/* <p>Deadline</p> */}
      </div>
      <div className="deadline-container">
        <p className="date-format">{format(new Date(_id), "MMMM dd yyyy")}</p>
        <p className="date-distance">
          deadline{" "}
          {formatDistanceToNow(new Date(_id), {
            addSuffix: true,
          })}
        </p>
        <div
          className={
            activeAddForm == _id
              ? "open-new-task-container active-add-task"
              : "open-new-task-container"
          }
          onClick={() => {
            activeAddFormhandler(_id);
            (async () => {
              const rawResponse = await fetch(
                "http://192.168.0.22:4000/tasks",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ...taskForm, taskId: uuidv4() }),
                }
              );
              const content = await rawResponse.json();
              console.log(content);
            })();

            setLocalTaskList((state) => {
              return [{ ...taskForm, taskId: uuidv4() }, ...state];
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
        </div>
      </div>

      {activeAddForm == _id && <div className="new-task-container"></div>}

      <div className="task-list-container">
        {localTaskList.reverse().map(({ _id, taskContent, isCompleted }) => {
          return (
            <div
              key={_id}
              className={
                isCompleted
                  ? "task-content-container completed-task"
                  : "task-content-container"
              }
            >
              <form action="#">
                <input type="checkbox" />
              </form>
              <p>{taskContent}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskCard;
