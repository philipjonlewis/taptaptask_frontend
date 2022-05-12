import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IndividualProject = () => {
  const { currentProject } = useSelector((state) => state.projects);
  return <div>{currentProject.id}</div>;
};

export default IndividualProject;
