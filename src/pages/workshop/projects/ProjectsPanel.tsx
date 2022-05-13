import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import ProjectList from "./ProjectList";
import { useParams } from "react-router-dom";
import ProjectsDashboard from "../dashboard/ProjectsDashboard";

const Projects = () => {
  const { projectId } = useParams();

  return (
    <>
      <div className="projects-page">
        <ProjectList />
        {projectId ? <Outlet /> : <ProjectsDashboard />}
      </div>
    </>
  );
};

export default Projects;
