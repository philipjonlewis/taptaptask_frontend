import { createSlice } from "@reduxjs/toolkit";
import { mockPhaseList } from "./mockdata/phases";
import { current } from "@reduxjs/toolkit";

import { patchRequest } from "../helpers/patchRequest";
import { deleteRequest } from "../helpers/deleteRequest";
import { postRequest } from "../helpers/postRequest";
export const phaseListSlice = createSlice({
  name: "phaseList",
  initialState: [],
  reducers: {
    addPhase: (state, actions) => {
      const { newPhase, projectReferenceId } = actions.payload;
      postRequest(
        newPhase,
        `${import.meta.env.VITE_BACKEND_PORT}/phase/create`
      );

      state = [...state].map((phases) => {
        if (phases._id == projectReferenceId) {
          const additionalPhase = {
            _id: phases._id,
            phaseList: [...phases.phaseList, { ...newPhase }],
          };

          return { ...additionalPhase };
        }
        return phases;
      });

      return [...state];
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
      const { projectId, localPhaseList } = actions.payload;

      const newPhaseList = [...localPhaseList].map((phaseObject) => {
        return {
          ...phaseObject,
          phaseOrder: localPhaseList.indexOf(phaseObject) + 1,
        };
      });

      patchRequest(`${import.meta.env.VITE_BACKEND_PORT}/phase/changeorder`, [
        ...newPhaseList,
      ]);

      // const newState = [...state].map((groupedPhase) => {
      //   if (groupedPhase._id == projectId) {
      //     const newObject = {
      //       _id: projectId,
      //       phaseList: [...newPhaseList].sort((a, b) => {
      //         return a.phaseOrder - b.phaseOrder;
      //       }),
      //     };
      //     // console.log(newObject);
      //     return { ...newObject };
      //   }
      //   return { ...groupedPhase };
      // });

      return [...newPhaseList];
      // return [...state];
    },
    fetchPhaseList: (state, actions): any => {
      console.log(actions.payload);

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
