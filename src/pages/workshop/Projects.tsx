import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { ProjectList } from "../../components";
import { useParams } from "react-router-dom";

const Projects = () => {
  const { projectId } = useParams();
  const { currentProject } = useSelector((state) => state.projects);
  const [projectForm, setProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(false);
  // console.log(projectId);

  return (
    <>
      <div className="projects-page">
        {!projectId && <ProjectList />}

        <Outlet />
      </div>
    </>
  );
};

export default Projects;
