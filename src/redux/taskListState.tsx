import { createSlice, current } from "@reduxjs/toolkit";
import { mockTaskList } from "./mockdata/tasks";
import isEqual from "date-fns/isEqual";

export const taskListSlice = createSlice({
  name: "taskList",
  initialState: mockTaskList,
  reducers: {
    addTask: (state, actions) => {
      // console.log(state);

      return [...state, actions.payload];
    },
    fetchTaskList: (state, actions) => {
      return [...actions.payload];
    },
    addTaskToExistingDate: (state, actions) => {
      const newTask = actions.payload;

      state = state.filter((x) => {
        if (x._id != "2022-06-01T00:00:00.000Z") {
          return x;
        } else {
          const specificDate = current(x);
          const newContent = [...specificDate.taskContent, { ...newTask }];

          return { ...specificDate, taskContent: [...newContent] };
        }
      });

      return [...state];
    },
  },
});

const { actions, reducer } = taskListSlice;

export const { addTask, fetchTaskList, addTaskToExistingDate } = actions;

export default reducer;
