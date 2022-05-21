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

  // const creationDate = format(new Date(createdAt), "MMMM dd yyyy");
  // const daysSinceCreation = formatDistanceToNow(new Date(createdAt), {
  //   addSuffix: true,
  // });

  // const deadlineDate = format(new Date(dateOfDeadline), "MMMM dd yyyy");
  // const daysTillDeadline = formatDistanceToNow(new Date(dateOfDeadline), {
  //   addSuffix: true,
  // });

  return (
    <div className="project-information-view-container ">
      <div className="project-title-container">
        <p className="label">Project</p>
        <p className="title">{projectName}</p>
      </div>
      <div className="project-date-container">
        <div className="project-created">
          <p>Created</p>
          {/* <p>{creationDate && creationDate}</p> */}
          <div className="days-since-container">
            {/* <p>{daysSinceCreation && daysSinceCreation}</p> */}
          </div>
        </div>
        <div className="project-deadline">
          <p>Deadline</p>
          {/* <p>{deadlineDate && deadlineDate}</p> */}
          <div className="days-since-container">
            {/* <p>{daysTillDeadline && daysTillDeadline}</p> */}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ProjectInformation;
