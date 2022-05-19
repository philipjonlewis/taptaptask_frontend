import React, { useState } from "react";
import { useParams, Link, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ProjectNavbar,
  HotLink,
  AddDataForm,
  AddDataContainerForm,
} from "../../../components";
import { motion } from "framer-motion";
const IndividualProject = () => {
  const [currentPhase, setCurrentPhase] = useState("");

  const {
    activeProject: { projectPhases },
  } = useSelector((state) => state);

  return (
    <div className="individual-project-container">
      {/* <HotLink />
      <AddDataForm /> */}
      {/* <AddDataContainerForm /> */}
      <ProjectNavbar />

      <Outlet />
    </div>
  );
};

export default IndividualProject;
