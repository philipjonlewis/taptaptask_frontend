import React, { useState } from "react";
import { useParams, Link, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProjectNavbar } from "../../../components";
const IndividualProject = () => {
  const [currentPhase, setCurrentPhase] = useState("");

  const {
    activeProject: { projectPhases },
  } = useSelector((state) => state);

  return (
    <div>
      <ProjectNavbar/>
      {/* Maybe we should add another sidebar here? for other data */}
      <Outlet />
    </div>
  );
};

export default IndividualProject;
