import React from "react";
import { useSelector } from "react-redux";
import PhaseTaskSummaryVisualization from "../../../components/visualization/PhaseTaskSummaryVisualization";
// ChartJS.register(ArcElement, Tooltip, Legend);

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

  const revisedDate = Date(dateOfDeadline);
  const today = Date.now();

  return (
    <div
      className="project-information-view-container "
      style={{ padding: "1rem" }}
    >
      <h2>Task Summary</h2>
      {/* <PhaseTaskSummaryVisualization /> */}
      <p>This is the project information view</p>
      <p>{projectId}</p>
      <p>{projectName}</p>
      <p>{projectDescription}</p>
      <p>Consider putting data about this project here</p>
      <p>Aggregated information regarding the project</p>
      <ul>
        <li>Date of project creation {createdAt}</li>
        <li>Date of project intended deadline{revisedDate}</li>
        <li>
          Breakdown of tasks
          <ul>
            <li>Total Number of tasks</li>
            <li>Total Number of unfinished tasks</li>
            <li>Total Number of priority tasks</li>
            <li>Total Number of unfinished priority tasks</li>
            <li>Total Number of finished priority tasks</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ProjectInformation;
