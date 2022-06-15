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
    <div className="main-container">
      <div className="home-body">
        <div className="left-container">
          <div className="hero-text-container">
            <p>
              <span>taptaptask</span> is <br /> most possibly the{" "}
              <span>best</span>
              <br /> task <span>management</span> tool <br /> better than the{" "}
              <span>calendar</span>
            </p>
          </div>
        </div>
        <div className="right-container">
          <div className="image-container">
            <img src="/workshop.png" alt="" />
          </div>
        </div>
      </div>

      <div className="secondary-container">
        <p>Hello</p>
      </div>
    </div>
  );
};

export default Home;
