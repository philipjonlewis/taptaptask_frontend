import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authState";
import projectReducer from "./projectState";

export default configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
  },
});
