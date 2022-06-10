import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApiSlice = createApi({
  reducerPath: "taskApi",
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
  tagTypes: ["Task", "Aggregate"],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: function (
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
  ): Definitions {
    return {
      getTaskData: builder.query({
        query: (taskId: boolean | string) => {
          if (taskId) {
            return `/task/read?taskId=${taskId}`;
          } else {
            return `/task/read`;
          }
        },
        // transformResponse : res => res.sort((a,b) => b.phaseOrder - a.phaseOrder),
        providesTags: ["Task"],
      }),
      addTaskData: builder.mutation({
        query: (task) => ({
          url: "/task/create",
          method: "POST",
          body: task,
        }),
        invalidatesTags: ["Task"],
      }),
      updateTaskData: builder.mutation({
        query: (task) => ({
          url: "/task/update",
          method: "PATCH",
          body: task,
        }),
        invalidatesTags: ["Task"],
      }),
      deleteTaskData: builder.mutation({
        query: (task) => ({
          url: "/task/delete",
          method: "DELETE",
          body: task,
        }),
        invalidatesTags: ["Task"],
      }),
    };
  },
});

export const {
  useGetTaskDataQuery,
  useAddTaskDataMutation,
  useUpdateTaskDataMutation,
  useDeleteTaskDataMutation,
} = taskApiSlice;
