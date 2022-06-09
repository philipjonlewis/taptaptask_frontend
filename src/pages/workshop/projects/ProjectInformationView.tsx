import React, { useState, useEffect } from "react";
import { useSelector, current } from "react-redux";
import PhaseTaskSummaryVisualization from "../../../components/visualization/PhaseTaskSummaryVisualization";
// ChartJS.register(ArcElement, Tooltip, Legend);

import GanttChartVisualization from "../../../components/visualization/GanttChartVisualization";
import { format, formatDistanceToNow } from "date-fns";
import {
  PhaseManagerForm,
  ExpandedProjectInformation,
} from "../../../components";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import { addPhase } from "../../../redux/phaseListState";

import { fetchPhaseList } from "../../../redux/phaseListState";
import axios from "axios";

import { useGetPhasesByProjectQuery } from "../../../redux/rtkQuery/aggregationApiSlice";

const ProjectInformation = () => {
  const {
    auth: { _id },
    activeProject,
  } = useSelector((state: any) => state);

  const {
    projectId,
    projectName,
    projectDescription,
    dateOfDeadline,
    createdAt,
  } = activeProject;

  const dispatch = useDispatch();

  const [isDateLoading, setIsDateLoading] = useState(false);

  const [projectDates, setProjectDates] = useState({
    creation: {
      date: new Date(),
      daysSince: new Date(),
    },
    deadline: {
      date: new Date(),
      daysTill: new Date(),
    },
  });

  const [expandedInformationModal, setExpandedInformationModal] =
    useState(false);

  useEffect(() => {
    const creationDate = format(new Date(createdAt), "LLL dd y") || "";
    const daysSinceCreation =
      formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
      }) || "";
    const deadlineDate = format(new Date(dateOfDeadline), "LLL dd y") || "";
    const daysTillDeadline =
      formatDistanceToNow(new Date(dateOfDeadline), {
        addSuffix: true,
      }) || "";

    setProjectDates(() => {
      return {
        creation: {
          date: creationDate,
          daysSince: daysSinceCreation,
        },
        deadline: {
          date: deadlineDate,
          daysTill: daysTillDeadline,
        },
      };
    });

    setIsDateLoading(true);
  }, []);

  return (
    <div className="project-information-view-container">
      {expandedInformationModal && (
        <ExpandedProjectInformation
          setExpandedInformationModal={setExpandedInformationModal}
          activeProject={activeProject}
          projectDates={projectDates}
          setProjectDates={setProjectDates}
        />
      )}
      <div className="left-container">
        <div className="upper-left-container">
          <div className="upper-left-left-container">
            <div className="project-details">
              <div className="label-title-container">
                <p className="label">Project Name</p>
                <p className="title">{projectName}</p>
              </div>
              <div className="label-title-container">
                <p className="label">Project Description</p>
                <p className="title">{projectDescription}</p>
              </div>
            </div>
            <div
              className="expand-project-information-button-container"
              onClick={() => {
                setExpandedInformationModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </div>
          </div>

          <div className="upper-left-right-container">
            <div className="project-date">
              <div className="label-title-container">
                <div className="label">
                  Created{" "}
                  <p className="sublabel">
                    {isDateLoading && projectDates.creation.daysSince}
                  </p>
                </div>
                <p className="title">
                  {isDateLoading && projectDates.creation.date}
                </p>
              </div>

              <div className="label-title-container">
                <div className="label">
                  Deadline{" "}
                  <p className="sublabel">
                    {isDateLoading && projectDates.deadline.daysTill}
                  </p>
                </div>
                {isDateLoading && projectDates.deadline.date}
              </div>
            </div>

            <div className="team-members-container"></div>
          </div>
        </div>
        <div className="lower-left-container">
          <PhaseManagerForm />
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
};

export default ProjectInformation;
