import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ProjectNavbar,
  HotLink,
  AddDataForm,
  AddDataContainerForm,
} from "../../../components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchPhaseList } from "../../../redux/phaseListState";
import axios from "axios";
const IndividualProject = () => {
  const {
    auth,
    projectList,
    phaseList,
    activeProject: { projectPhases, projectId },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_PORT}/aggregate/phase/${projectId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((dat: any) => {
        dispatch(fetchPhaseList(dat.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
