import { createSlice } from "@reduxjs/toolkit";
import { mockPhaseList } from "./mockdata/phases";
import { current } from "@reduxjs/toolkit";

import { patchRequest } from "../helpers/patchRequest";
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
    editPhaseListOrder: (state, actions) => {
      const { projectId, localPhaseList } = actions.payload;

      const newPhaseList = [...localPhaseList].map((phaseObject) => {
        return {
          ...phaseObject,
          phaseOrder: localPhaseList.indexOf(phaseObject) + 1,
        };
      });

      state = state.map((groupedPhase) => {
        if (groupedPhase._id == projectId) {
          const newObject = { _id: projectId, phaseList: newPhaseList };
          // console.log(newObject);
          return { ...newObject };
        }
        return groupedPhase;
      });

      return [...state];
    },
    fetchPhaseList: (state, actions) => {
      return actions.payload;
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
