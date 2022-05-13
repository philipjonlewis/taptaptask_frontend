import { createSlice } from "@reduxjs/toolkit";
import { mockTaskList } from "./mockdata/tasks";

export const taskListSlice = createSlice({
  name: "taskList",
  initialState: mockTaskList,
  reducers: {
    addTask: (state) => {
      console.log(state);
    },
  },
});

const { actions, reducer } = taskListSlice;

export const { addTask } = actions;

export default reducer;
