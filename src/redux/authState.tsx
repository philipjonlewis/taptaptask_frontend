import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    _id: "user-001",
    username: "philip",
    password: "lewis",
    isEmailVerified: "",
    isBlocked: "",
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      // console.log(action.payload);
      // validation code should be here
      // Make API calls here
      const { email, password, _id } = action.payload;

      return { ...state, isAuthenticated: true, email, password, _id };
    },
    signup: (state, action) => {
      // console.log(action.payload);
      // validation code should be here
      // Make API calls here
      const { _id, email } = action.payload;

      return { ...state, isAuthenticated: true, email, _id };
    },
    logout: (state) => {
      state = {
        username: "",
        password: "",
        isEmailVerified: "",
        isBlocked: "",
        isAuthenticated: false,
      };
    },
  },
});

export const { signup, login, logout } = authSlice.actions;

export default authSlice.reducer;
