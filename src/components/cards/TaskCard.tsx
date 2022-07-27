import React, { useEffect, useState, useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import Taskette from "./Taskette";
import { useAddTaskDataMutation } from "../../redux/rtkQuery/taskApiSlice";
import {
  ThreeDotsSvg,
  PlusIconSvg,
  EditButtonSvg,
  DeleteButtonSvg,
} from "../svgs";

const TaskCard = ({ taskObject, deleteTaskCardHandler }) => {
  const { auth, activePhase, activeProject } = useSelector((state: any) => {
    return {
      auth: state.auth,
      activePhase: state.activePhase,
      activeProject: state.activeProject,
    };
  });

  useEffect(() => {
    console.log("changes", taskObject._id);
    console.log(taskObject.taskContent, taskObject.taskContent.length);
  }, [taskObject.taskContent.length]);

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

    setLocalTaskList((state: []) => {
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
    // }, [taskObject._id]);
  }, [taskObject._id, taskObject.taskContent.length]);

  return (
    <div className="task-date-container">
      <div
        className="label-container"
        onClick={() => setTaskCardMenuContainer(!taskCardMenuContainer)}
      >
        <ThreeDotsSvg />
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
              <PlusIconSvg />
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
            <EditButtonSvg />
            <p>Edit TaskCard</p>
          </div>

          <div
            className="delete-task-container"
            onClick={() => deleteTaskCardHandler(taskObject._id)}
          >
            <DeleteButtonSvg />
            <p>Delete TaskCard</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
