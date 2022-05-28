import React, { useState, useEffect } from "react";
import { useSelector, current } from "react-redux";
import PhaseTaskSummaryVisualization from "../../../components/visualization/PhaseTaskSummaryVisualization";
// ChartJS.register(ArcElement, Tooltip, Legend);

import GanttChartVisualization from "../../../components/visualization/GanttChartVisualization";
import { format, formatDistanceToNow } from "date-fns";

const ProjectInformation = () => {
  const {
    activeProject: {
      projectId,
      projectName,
      projectDescription,
      dateOfDeadline,
      createdAt,
    },
  } = useSelector((state) => state);

  const creationDate = format(new Date(createdAt), "LLL dd y");
  const daysSinceCreation = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const deadlineDate = format(new Date(dateOfDeadline), "LLL dd y");
  const daysTillDeadline = formatDistanceToNow(new Date(dateOfDeadline), {
    addSuffix: true,
  });

  // return (
  //   <div className="project-information-view-container ">

  // <div className="project-date-container">
  //   <div className="project-created">
  //     <p>Created</p>
  //     <p>{creationDate && creationDate}</p>
  //     <div className="days-since-container">
  //       <p>{daysSinceCreation && daysSinceCreation}</p>
  //     </div>
  //   </div>
  //   <div className="project-deadline">
  //     <p>Deadline</p>
  //     <p>{deadlineDate && deadlineDate}</p>
  //     <div className="days-since-container">
  //       <p>{daysTillDeadline && daysTillDeadline}</p>
  //     </div>
  //   </div>
  // </div>;
  //     <hr />
  //   </div>
  // );

  return (
    <div className="project-information-view-container">
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
            <div className="edit-content-button-container">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>

          <div className="upper-left-right-container">
            <div className="project-date">
              <div className="label-title-container">
                <p className="label">
                  Created{" "}
                  <p className="sublabel">
                    {daysSinceCreation && daysSinceCreation}
                  </p>
                </p>
                <p className="title">{creationDate && creationDate}</p>
              </div>
              <div className="label-subtitle-container">
                {/* <p className="label">days since creation</p> */}
              </div>
              <div className="label-title-container">
                <p className="label">
                  Deadline{" "}
                  <p className="sublabel">
                    {daysTillDeadline && daysTillDeadline}
                  </p>
                </p>
                <p className="title">{deadlineDate && deadlineDate}</p>
              </div>
            </div>

            <div className="team-members-container">
              <p className="label">Team Members</p>
              <div className="facepile-container">
                <img
                  src="https://randomuser.me/api/portraits/women/51.jpg"
                  alt=""
                />
                <img
                  src="https://randomuser.me/api/portraits/women/20.jpg"
                  alt=""
                />
                <img
                  src="https://randomuser.me/api/portraits/men/20.jpg"
                  alt=""
                />
                <img
                  src="https://randomuser.me/api/portraits/men/25.jpg"
                  alt=""
                />
                <img
                  src="https://randomuser.me/api/portraits/men/51.jpg"
                  alt=""
                />
                <img
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  alt=""
                />
                <img
                  src="https://randomuser.me/api/portraits/men/6.jpg"
                  alt=""
                />
              </div>
              <div className="see-more-container">
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
          </div>
        </div>
        <div className="lower-left-container">Upper left</div>
      </div>
      <div className="right-container">Right</div>
    </div>
  );
};

export default ProjectInformation;
