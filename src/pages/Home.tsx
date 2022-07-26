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
    <div className="home-page">
      <div className="main-content-container">
        <div className="hero-content">
          <div className="title-container">
            <p>Move projects forward,</p>
            <p>One task at a time</p>
          </div>
          <div className="subtitle-container">
            <p>taptaptask is a task management tool for phase-based projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
