import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authState";
import projectListReducer from "./projectListState";
import phaseListReducer from "./phaseListState";

import activeProjectReducer from "./activeProjectState";
import activePhaseReducer from "./activePhaseState";
import taskListReducer from "./taskListState";



export default configureStore({
  reducer: {
    auth: authReducer,

    projectList: projectListReducer,
    phaseList: phaseListReducer,
    taskList: taskListReducer,


    activeProject: activeProjectReducer,
    activePhase: activePhaseReducer,
  },
});
