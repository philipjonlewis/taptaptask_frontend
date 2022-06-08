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
    editPhase: (state) => {
      console.log(state);
    },
    deletePhase: (state, actions) => {
      const { phaseId, projectReferenceId } = actions.payload;

      deleteRequest(
        phaseId,
        `${import.meta.env.VITE_BACKEND_PORT}/phases/delete`
      );

      state = [...state].map((phases) => {
        if (phases._id == projectReferenceId) {
          // console.log(phases._id, projectReferenceId);

          const currentPhaseList = [...phases.phaseList];

          const newPhaseList = [...currentPhaseList].filter((phase) => {
            if (phase.phaseId !== phaseId) {
              return phase;
            }
          });

          return { _id: phases._id, phaseList: [...newPhaseList] };
        }
        return phases;
      });

      return [...state];
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
