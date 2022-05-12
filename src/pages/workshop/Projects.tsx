import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { ProjectList } from "../../components";

const Projects = () => {
  const { currentProject } = useSelector((state) => state.projects);
  const [projectForm, setProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(false);

  return (
    <>
      <div className="projects-page">
        {!currentProject.status && <ProjectList />}

        <Outlet />
      </div>
    </>
  );
};

export default Projects;
