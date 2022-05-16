import { createSlice, current } from "@reduxjs/toolkit";
import { mockProjectList } from "./mockdata/projects";

export const projectListSlice = createSlice({
  name: "projectList",
  initialState: mockProjectList,
  reducers: {
    addProject: (state) => {
      return [
        ...state,
        {
          projectId: "PR0o4",
          projectName: "Sample Additional Project",
          projectDescription: "Music Video Thingy",
          projectImage: "https://picsum.photos/id/953/200/300",
        },
      ];
    },
    editProject: (state) => {
      console.log(state);
    },
    deleteProject: (state) => {
      const newState = state.filter((project) => project.projectId !== "PR0o4");
      return newState;
    },
    fetchProjectList: (state, actions) => {
      return actions.payload;
    },
  },
});

const { actions, reducer } = projectListSlice;

export const { addProject, editProject, deleteProject, fetchProjectList } =
  actions;

export default reducer;
