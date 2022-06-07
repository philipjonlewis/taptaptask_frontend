import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authState";
import projectListReducer from "./projectListState";
import phaseListReducer from "./phaseListState";

import activeProjectReducer from "./activeProjectState";
import activePhaseReducer from "./activePhaseState";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { projectApiSlice } from "./rtkQuery/projectApiSlice";
import { phaseApiSlice } from "./rtkQuery/phaseApiSlice";
import { taskApiSlice } from "./rtkQuery/taskApiSlice";
import { aggregationApiSlice } from "./rtkQuery/aggregationApiSlice";

export default configureStore({
  reducer: {
    auth: authReducer,

    projectList: projectListReducer,
    phaseList: phaseListReducer,

    activeProject: activeProjectReducer,
    activePhase: activePhaseReducer,

    [projectApiSlice.reducerPath]: projectApiSlice.reducer,
    [phaseApiSlice.reducerPath]: phaseApiSlice.reducer,
    [taskApiSlice.reducerPath]: taskApiSlice.reducer,
    [aggregationApiSlice.reducerPath]: aggregationApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectApiSlice.middleware)
      .concat(phaseApiSlice.middleware)
      .concat(taskApiSlice.middleware)
      .concat(aggregationApiSlice.middleware),
});

// setupListeners(configureStore.dispatch);
