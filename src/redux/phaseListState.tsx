import { createSlice } from "@reduxjs/toolkit";
import { mockPhaseList } from "./mockdata/phases";

export const phaseListSlice = createSlice({
  name: "phaseList",
  initialState: mockPhaseList,
  reducers: {
    addPhase: (state) => {
      console.log(state);
    },
    editPhase: (state) => {
      console.log(state);
    },
    deletePhase: (state) => {
      console.log(state);
    },
    fetchData:state =>{
      console.log(state);
    }
  },
});

const { actions, reducer } = phaseListSlice;

export const { addPhase } = actions;

export default reducer;
