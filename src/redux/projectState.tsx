import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: [
    {
      id: 1,
      projectName: "Sample Project 001",
      projectDescription: "This project is something something",
      projectImage: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 2,
      projectName: "Sample Project 003",
      projectDescription: "This project is something something",
      projectImage: "https://picsum.photos/seed/picsum/600/600",
    },
    {
      id: 3,
      projectName: "Sample Project 004",
      projectDescription: "This project is something something",
      projectImage: "https://picsum.photos/seed/picsum/200/300",
    },
  ],
  reducers: {
    addProject: (state) => {
      console.log(state);
    },
    editProject: (state) => {
      console.log(state);
    },
    deleteProject: (state) => {
      console.log(state);
    },
  },
});

const { actions, reducer } = projectSlice;

export const { addProject, editProject, deleteProject } = actions;

export default reducer;
