import { createSlice, current } from "@reduxjs/toolkit";
import { mockPhaseList } from "./mockdata/phases";

export const activePhaseSlice = createSlice({
  name: "activePhase",
  initialState: {
    phaseId: "sam",
    phaseOrder: 1,
    phaseName: "This is the initial state",
  },

  reducers: {
    setActivePhase: (state, actions) => {
      const phase = actions.payload;

      // Make api call to phases api using id to populate tasks under it

      return { ...state, ...actions.payload };
    },
  },
});

const { actions, reducer } = activePhaseSlice;

export const { setActivePhase } = actions;

export default reducer;
