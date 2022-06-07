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
  tagTypes: ["Task"],
  endpoints: function (
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
  ): Definitions {
    return {
      getTask: builder.query({
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
      addTask: builder.mutation({
        query: (task) => ({
          url: "/task/create",
          method: "POST",
          body: task,
        }),
        invalidatesTags: ["Task"],
      }),
      updateTask: builder.mutation({
        query: (task) => ({
          url: "/task/update",
          method: "PATCH",
          body: task,
        }),
        invalidatesTags: ["Task"],
      }),
      deleteTask: builder.mutation({
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
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
