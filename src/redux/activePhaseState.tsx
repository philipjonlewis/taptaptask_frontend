import { createSlice, current } from "@reduxjs/toolkit";
import { mockPhaseList } from "./mockdata/phases";

export const activePhaseSlice = createSlice({
  name: "activePhase",
  initialState: {
    phaseId: "0o1",

    phaseName: "project-information",
  },

  reducers: {
    setActivePhase: (state, actions) => {
      // Make api call to phases api using id to populate tasks under it
      console.log(actions.payload);
      return actions.payload;
    },
  },
});

const { actions, reducer } = activePhaseSlice;

export const { setActivePhase } = actions;

export default reducer;
