import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProjectNavbar } from "../../../components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchPhaseList } from "../../../redux/phaseListState";
import axios from "axios";
import { useGetPhasesByProjectQuery } from "../../../redux/rtkQuery/aggregationApiSlice";
const IndividualProject = () => {
  const {
    auth,
    projectList,
    phaseList,
    activeProject: { projectPhases, projectId },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  return (
    <div className="individual-project-container">
      {/* <HotLink />
      <AddDataForm /> */}

      <ProjectNavbar />

      <Outlet />
    </div>
  );
};

export default IndividualProject;
