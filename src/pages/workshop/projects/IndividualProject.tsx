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

const IndividualProject = () => {
  const {
    auth,
    projectList,
    phaseList,
    activeProject: { projectPhases },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:4000/phases/byproject/${auth._id}`).then(
      async (res) => {
        dispatch(fetchPhaseList(await res.json()));
      }
    );
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
