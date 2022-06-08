import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApiSlice = createApi({
  reducerPath: "projectApi",
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
  tagTypes: ["Project"],
  refetchOnMountOrArgChange: 1,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: function (
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
  ): Definitions {
    return {
      getProject: builder.query({
        query: (projectId: boolean | string) => {
          if (projectId) {
            return `/project/read?projectId=${projectId}`;
          } else {
            return `/project/read`;
          }
        },
        // transformResponse : res => res.sort((a,b) => b.phaseOrder - a.phaseOrder),
        providesTags: ["Project"],
      }),
      addProjectData: builder.mutation({
        query: (project) => ({
          url: "/project/create",
          method: "POST",
          body: project,
        }),
        invalidatesTags: ["Project"],
      }),
      updateProject: builder.mutation({
        query: (project) => ({
          url: "/project/update",
          method: "PATCH",
          body: project,
        }),
        invalidatesTags: ["Project"],
      }),
      deleteProject: builder.mutation({
        query: (project) => ({
          url: "/project/delete",
          method: "DELETE",
          body: project,
        }),
        invalidatesTags: ["Project"],
      }),
    };
  },
});

export const {
  useGetProjectQuery,
  useAddProjectDataMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
