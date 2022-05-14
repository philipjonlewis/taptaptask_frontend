import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProjectsDashboard from "../dashboard/ProjectsDashboard";

const Projects = () => {
  const { projectId } = useParams();

  return (
    <div className="projects-page">
 
      <div className="outlet-container">
        {projectId ? <Outlet /> : <ProjectsDashboard />}
      </div>
    </div>
  );
};

export default Projects;
