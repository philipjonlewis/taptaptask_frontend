import { createSlice } from "@reduxjs/toolkit";

import { patchRequest } from "../helpers/patchRequest";
import { deleteRequest } from "../helpers/deleteRequest";
import { postRequest } from "../helpers/postRequest";
export const phaseListSlice = createSlice({
  name: "phaseList",
  initialState: [],
  reducers: {
    addPhase: (state, actions) => {
      return [...state, actions.payload];
    },
    editPhase: (state, actions) => {
      const { phaseId, phaseName } = actions.payload;

      const newState = [...state].map((phase) => {
        if (phase.phaseId == phaseId) {
          return { ...phase, phaseName: phaseName };
        }
        return {...phase};
      });

      return [...newState];
    },
    deletePhase: (state, actions) => {
      const { phaseId } = actions.payload;

      const newState = state.filter((phases) => phases.phaseId !== phaseId);
      return [...newState];
    },
    editPhaseListOrder: (state: any, actions: any): any => {
      return [...actions.payload];
      // return [...state];
    },
    fetchPhaseList: (state, actions): any => {
      // console.log(actions.payload);

      // state = actions.payload;
      return [...actions.payload];
    },
    activePhasesList: (state, actions) => {
      const projectId = actions.payload;

      // return state.filter((phase) => phase.projectReferenceId == projectId);
    },
  },
});

const { actions, reducer } = phaseListSlice;

export const {
  addPhase,
  editPhase,
  deletePhase,
  fetchPhaseList,
  activePhasesList,
  editPhaseListOrder,
} = actions;

export default reducer;
