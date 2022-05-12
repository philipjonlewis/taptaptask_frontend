import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    currentProject: {
      status: false,
      id: 0,
      projectName: "",
      projectDescription: "",
    },
    projectList: [
      {
        id: 1,
        projectName: "Sample Project 001",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/123/200/300",
      },
      {
        id: 2,
        projectName: "Sample Project 003",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/432/600/600",
      },
      {
        id: 3,
        projectName: "Sample Project 004",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/666/200/300",
      },
      {
        id: 4,
        projectName: "Sample Project 004",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/532/200/300",
      },
      {
        id: 5,
        projectName: "Sample Project 004",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/987/200/300",
      },
    ],
  },
  reducers: {
    currentProjectHandler: (state, action) => {
      console.log(state);
    },
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

export const { currentProjectHandler, addProject, editProject, deleteProject } =
  actions;

export default reducer;
