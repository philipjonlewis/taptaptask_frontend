import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { isEqual, format } from "date-fns";

import { postRequest } from "../../helpers/postRequest";

const AddTaskCardForm = ({
  fetchedTaskList,
  setFetchedTaskList,
  setActivePhaseSidebarTab,
}) => {
  const { auth, activePhase, activeProject, taskList } = useSelector(
    (state) => state
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
    <div className="add-task-card-form">
      <div className="add-task-title">Add a new task</div>
      <form action="#" className="add-task-form">
        <label htmlFor="taskContent">Task</label>
        <input
          required
          spellCheck="false"
          autoCorrect="false"
          type="text"
          placeholder="Add your task here"
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
  );
};

export default AddTaskCardForm;
