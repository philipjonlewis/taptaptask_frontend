import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const phaseApiSlice = createApi({
  reducerPath: "phaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_PORT}`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
  tagTypes: ["Phase"],
  endpoints: function (
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
  ): Definitions {
    return {
      getPhase: builder.query({
        query: (phaseId: boolean | string) => {
          if (phaseId) {
            return `/phase/read?phaseId=${phaseId}`;
          } else {
            return `/phase/read`;
          }
        },
        transformResponse: (res) =>
          res.sort((a, b) => {
            return a.phaseOrder - b.phaseOrder;
          }),
        providesTags: ["Phase"],
      }),
      getPhaseByProject: builder.query({
        query: (projectId) => {
          return `/phase/read?projectId=${projectId}`;
        },
        transformResponse: (res) =>
          res.sort((a, b) => {
            return a.phaseOrder - b.phaseOrder;
          }),
        providesTags: ["Phase"],
      }),
      addPhase: builder.mutation({
        query: (phase) => ({
          url: "/phase/create",
          method: "POST",
          body: phase,
        }),
        invalidatesTags: ["Phase"],
      }),
      updatePhase: builder.mutation({
        query: (phase) => ({
          url: "/phase/update",
          method: "PATCH",
          body: phase,
        }),
        invalidatesTags: ["Phase"],
      }),
      deletePhase: builder.mutation({
        query: (phase) => ({
          url: "/phase/delete",
          method: "DELETE",
          body: phase,
        }),
        invalidatesTags: ["Phase"],
      }),
    };
  },
});

export const {
  useGetPhaseQuery,
  useGetPhaseByProjectQuery,
  useAddPhaseMutation,
  useUpdatePhaseMutation,
  useDeletePhaseMutation,
} = phaseApiSlice;
