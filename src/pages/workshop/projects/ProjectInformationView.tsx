import React, { useState, useEffect } from "react";
import { useSelector, current } from "react-redux";

import { ExpandButtonSvg } from "../../../components/svgs";
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
    activeProject: {
      projectId,
      projectName,
      projectDescription,
      dateOfDeadline,
      createdAt,
    },
  } = useSelector((state: any) => state);

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
  }) as any;

  const [expandedInformationModal, setExpandedInformationModal] =
    useState(false);

  const [localProjectCredentials, setLocalProjectCredentials] = useState({
    projectName,
    projectDescription,
    dateOfDeadline,
  });

  const projectCredentialsChangeHandler = (e) => {
    setLocalProjectCredentials((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setLocalProjectCredentials((state) => {
      return {
        projectName: projectName,
        projectDescription: projectDescription,
      };
    });
  }, []);

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
          localProjectCredentials={localProjectCredentials}
          setLocalProjectCredentials={setLocalProjectCredentials}
          projectCredentialsChangeHandler={projectCredentialsChangeHandler}
          projectDates={projectDates}
          projectId={projectId}
          setProjectDates={setProjectDates}
        />
      )}
      <div className="left-container">
        <div className="upper-left-container">
          <div className="upper-left-left-container">
            <div className="project-details">
              <div className="label-title-container">
                <p className="label">Project Name</p>
                <p className="title">{localProjectCredentials.projectName}</p>
              </div>
              <div className="label-title-container">
                <p className="label">Project Description</p>
                <p className="title">
                  {localProjectCredentials.projectDescription}
                </p>
              </div>
            </div>
            <div
              className="expand-project-information-button-container"
              onClick={() => {
                setExpandedInformationModal(true);
              }}
            >
              <ExpandButtonSvg />
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
