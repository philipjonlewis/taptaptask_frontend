import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
export const taskListSlice = createSlice({
  name: "taskList",
  initialState: [],
  reducers: {
    fetchTaskList: (state, actions) => {
      return [...actions.payload];
    },
    getTaskList: (state) => {
      return [...state];
    },
    editTaskObject: (state, actions) => {
      const { taskCardId, taskObject } = actions.payload;

      const newState = [...state].map((stateTaskObject) => {
        if (stateTaskObject._id == taskCardId) {
          stateTaskObject.taskContent.map((smallTaskObject) => {
            if (smallTaskObject.taskId == taskObject.taskId) {
              return {
                ...smallTaskObject,
                taskContent: taskObject.taskContent,
              };
            }
            return smallTaskObject;
          });
        }
        return stateTaskObject;
      });

      return [...newState];
    },
    deleteTaskObject: (state, actions) => {
      const { taskCardId, taskObject } = actions.payload;

      const newState = [...state].map((taskObject) => {
        if (taskObject._id == taskCardId) {
          const newTaskContent = taskObject.taskContent.map((task) => {
            if (task.taskId == taskObject.taskId) {
              return;
            }

            return task;
          });

          return [...newTaskContent];
        }

        return [...taskObject];
      });

      return [...newState];
    },
  },
});

const { actions, reducer } = taskListSlice;

export const { fetchTaskList, getTaskList, editTaskObject, deleteTaskObject } =
  actions;

export default reducer;
