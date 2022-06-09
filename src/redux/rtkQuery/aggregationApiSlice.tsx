import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aggregationApiSlice = createApi({
  reducerPath: "aggregationApi",
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
  tagTypes: ["Aggregate", "Task"],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: function (
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
  ): Definitions {
    return {
      getTasksByDate: builder.query({
        query: ({
          projectReferenceId,
          phaseReferenceId,
        }: {
          projectReferenceId: string;
          phaseReferenceId: string;
        }) =>
          `/aggregate/tasks/date?projectReferenceId=${projectReferenceId}&phaseReferenceId=${phaseReferenceId}`,
        providesTags: ["Aggregate", "Task"],
      }),
      getPhasesByProject: builder.query({
        query: ({
          projectReferenceId,
        }: {
          projectReferenceId: string;
          phaseReferenceId: string;
        }) =>
          `/aggregate/phases/project?projectReferenceId=${projectReferenceId}`,
        transformResponse: (res) =>
          res.sort((a: any, b: any) => {
            return a.phaseOrder - b.phaseOrder;
          }),

        invalidatesTags: ["Task", "Aggregate"],
      }),
    };
  },
});

export const { useGetTasksByDateQuery, useGetPhasesByProjectQuery } =
  aggregationApiSlice;
