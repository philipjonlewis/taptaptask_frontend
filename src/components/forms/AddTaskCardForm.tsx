import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { isEqual, format, parse, isValid } from "date-fns";
import { enGB } from "date-fns/locale";

import { postRequest } from "../../helpers/postRequest";
import { useAddTaskDataMutation } from "../../redux/rtkQuery/taskApiSlice";

const AddTaskCardForm = ({ setFetchedTaskList, fetchedTaskList }) => {
  const { auth, activePhase, activeProject, taskList } = useSelector(
    (state) => state
  );

  const [addTaskData] = useAddTaskDataMutation();

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
    // console.log(e.target.value);

    if (isValid(new Date(e.target.value))) {
      setTaskFormContent((state) => {
        // console.log(e.target.value);
        const formattedDate = format(new Date(e.target.value), "yyyy-MM-dd");
        return {
          ...state,
          dateOfDeadline: formattedDate,
        };
      });
    } else {
      console.log("wrong");
    }
  };

  const submitTaskFormHandler = (e) => {
    e.preventDefault();

    if (taskFormContent.taskContent.length <= 0) {
      return;
    }

    addTaskData([{ ...taskFormContent, taskId: uuidv4() }]);

    if (
      fetchedTaskList.some((dateObject: any) => {
        const matchedDate = isEqual(
          new Date(dateObject._id),
          new Date(taskFormContent.dateOfDeadline)
        );
        return matchedDate;
      })
    ) {
      const newState = fetchedTaskList.map((dateObject: any) => {
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
      setFetchedTaskList([...newState]);
    } else {
      const newState = [
        ...fetchedTaskList,
        {
          _id: new Date(taskFormContent.dateOfDeadline).toISOString(),
          taskContent: [taskFormContent],
        },
      ];

      const formattedState = newState.sort(function (a, b) {
        var dateA = new Date(a._id) as any;
        var dateB = new Date(b._id) as any;
        return dateA - dateB;
      });
      setFetchedTaskList([...formattedState]);
    }

    setTaskFormContent((state) => {
      return {
        ...state,
        taskContent: "",
        // dateOfDeadline: format(new Date(), "yyyy-MM-dd"),
        taskId: uuidv4(),
      };
    });
  };
  let today = new Date().toISOString().slice(0, 10);

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
          // min={taskFormContent.dateOfDeadline}
          min={today}
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
