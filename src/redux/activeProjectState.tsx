import { createSlice, current } from "@reduxjs/toolkit";
import { mockProjectList } from "./mockdata/projects";

export const activeProjectSlice = createSlice({
  name: "activeProject",
  initialState: {
    projectId: "9q1",
    projectName: "Sample Active Project",
    projectDescription: "Sample Active Project",
    projectImage: "https://picsum.photos/id/962/200/300",
  },
  reducers: {
    setActiveProject: (state, actions) => {
      const projectId = actions.payload;
      const currentProject = mockProjectList.filter(
        (project) => project.projectId === projectId
      );

      state = currentProject[0];
      // console.log(current(state));
      // get id payload
      // Make API call for the project, its phases and tasks - better if GraphQL

      return {
        ...currentProject[0],
      };
    },
  },
});

const { actions, reducer } = activeProjectSlice;

export const { setActiveProject } = actions;

export default reducer;
