import { createSlice, current } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    currentProject: {
      status: false,
      id: 0,
      projectName: "",
      projectDescription: "",
      projectPhases: [],
    },
    projectList: [
      {
        id: 0o1,
        projectName: "Sample Project 001",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/123/200/300",
        projectPhases: [
          {
            phaseId: Math.random() * 99,
            phaseCount: 1,
            phaseName: "Schematic Design",
          },
          {
            phaseId: Math.random() * 99,
            phaseCount: 2,
            phaseName: "Design Development",
          },
          {
            phaseId: Math.random() * 99,
            phaseCount: 3,
            phaseName: "Construction",
          },
        ],
      },
      {
        id: 0o2,
        projectName: "Sample Project 003",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/432/600/600",
        projectPhases: [{ phaseCount: 1, phaseName: "First Phase" }],
      },
      {
        id: 0o3,
        projectName: "Sample Project 004",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/666/200/300",
        projectPhases: [{ phaseCount: 1, phaseName: "First Phase" }],
      },
      {
        id: 0o4,
        projectName: "Sample Project 005",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/532/200/300",
        projectPhases: [{ phaseCount: 1, phaseName: "First Phase" }],
      },
      {
        id: 0o5,
        projectName: "Sample Project 006",
        projectDescription: "This project is something something",
        projectImage: "https://picsum.photos/id/987/200/300",
        projectPhases: [{ phaseCount: 1, phaseName: "First Phase" }],
      },
    ],
  },
  reducers: {
    currentProjectHandler: (state, action) => {
      const id = action.payload;
      state.currentProject.status = true;
      state.currentProject.id = id;

      const curPro = state.projectList.find((proj) => proj.id == id);

      state.currentProject.projectName = curPro.projectName;
      state.currentProject.projectPhases = curPro.projectPhases;

      console.log(current(state));
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
