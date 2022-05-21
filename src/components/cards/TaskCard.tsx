import React, { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import Taskette from "./Taskette";
import axios from "axios";
import { postRequest } from "../../helpers/postRequest";
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
    phaseReferenceId: phaseId,
    projectReferenceId: projectId,
    taskContent: "",
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
        <div className="new-task-container">
          <form action="#">
            <input
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
            <button
              className={
                activeAddForm == _id
                  ? "new-task-button-container active-add-task"
                  : "new-task-button-container"
              }
              onClick={(e) => {
                e.preventDefault();
                const taskId = uuidv4();
                const newTask = { ...taskForm, taskId };

                postRequest(newTask, "http://192.168.0.22:4000/tasks");

                setLocalTaskList((state) => {
                  return [newTask, ...state];
                });

                setTaskForm((state) => {
                  return {
                    ...state,
                    taskContent: "",
                    isCompleted: false,
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

      <div className="task-list-container">
        {localTaskList.map(({ _id, taskContent, isCompleted }) => {
          return (
            <Taskette
              key={_id}
              _id={_id}
              taskContent={taskContent}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskCard;
