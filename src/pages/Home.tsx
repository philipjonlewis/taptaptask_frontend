import React from "react";
import {
  useGetProjectQuery,
  useAddProjectDataMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../redux/rtkQuery/projectApiSlice";

const Home = () => {
  // const {
  //   data: projects,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error: any,
  // } = useGetProjectsQuery("");

  const [addProjectData] = useAddProjectDataMutation();
  // const [updateProject] = useUpdateProjectMutation();
  // const [deleteProject] = useDeleteProjectMutation();

  const { data, error, isLoading } = useGetProjectQuery(false);
  console.log(error);
  console.log(isLoading);
  console.log(data);
  // let content;
  // if (isLoading) {
  //   content = <p>Loading...</p>;
  // } else if (isSuccess) {
  //   content = JSON.stringify(projects);
  // } else if (isError) {
  //   console.log(error);
  //   content = "<p>basta</p>";
  // }

  return (
    <div>
      {/* <div>{content}</div> */}
      <p>This is the Home page</p>
      <button
        onClick={(e) => {
          e.preventDefault();

          // addProject([
          //   {
          //     projectId: "a1a16c10-cc11-422b-acfe-51edd180bda7",
          //     projectName: "<a href=`http://www.google.com`>IU Imnida<a/>",
          //     projectDescription: "Hello, this is IU",
          //     dateOfDeadline: "2023-09-14",
          //   },
          //   {
          //     projectId: "06f69f49-3734-4cb1-aa48-bf272746aa0b",
          //     projectName: "<p>Seventeen Right Here</p>",
          //     projectDescription: "Kimbap Kidding jasmine",
          //     dateOfDeadline: "2022-01-10",
          //   },
          // ]);
          console.log(e);
        }}
      >
        Try Add
      </button>
    </div>
  );
};

export default Home;
