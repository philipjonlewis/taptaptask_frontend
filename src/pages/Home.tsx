import React from "react";
import {
  useGetProjectQuery,
  useAddProjectDataMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../redux/rtkQuery/projectApiSlice";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  // const {
  //   data: projects,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error: any,
  // } = useGetProjectsQuery("");

  // const [addProjectData] = useAddProjectDataMutation();
  // const [updateProject] = useUpdateProjectMutation();
  // const [deleteProject] = useDeleteProjectMutation();

  // const { data, error, isLoading } = useGetProjectQuery(false);
  // console.log(error);
  // console.log(isLoading);
  // console.log(data);
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
          <div className="cta-container">
            <NavLink to={"/signup"} className="get-started-cta">
              Get Started!
            </NavLink>
            {/* <button>Watch Video</button> */}
          </div>
        </div>

        <div className="home-bg-container">
          <img src="/landing-pic.jpg" alt="" />
          <img src="/landing-pic2.jpg" alt="" />
          <img src="/landing-pic3.jpg" alt="" />
          <img src="/landing-pic4.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
