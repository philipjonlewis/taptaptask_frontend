import { createSlice } from "@reduxjs/toolkit";
import { mockPhaseList } from "./mockdata/phases";

export const phaseListSlice = createSlice({
  name: "phaseList",
  initialState: mockPhaseList,
  reducers: {
    addPhase: (state, actions) => {
    

      return [...state, actions.payload];
    },
    editPhase: (state) => {
      console.log(state);
    },
    deletePhase: (state) => {
      console.log(state);
    },
    fetchPhaseList: (state, actions) => {
      return actions.payload;
    },
  },
});

const { actions, reducer } = phaseListSlice;

export const { addPhase, editPhase, deletePhase, fetchPhaseList } = actions;

export default reducer;
