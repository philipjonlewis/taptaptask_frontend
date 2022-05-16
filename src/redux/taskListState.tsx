import { createSlice } from "@reduxjs/toolkit";
import { mockTaskList } from "./mockdata/tasks";

export const taskListSlice = createSlice({
  name: "taskList",
  initialState: mockTaskList,
  reducers: {
    addTask: (state) => {
      console.log(state);
    },
    fetchTaskList: (state, actions) => {
      return actions.payload;
    },
  },
});

const { actions, reducer } = taskListSlice;

export const { addTask, fetchTaskList } = actions;

export default reducer;
