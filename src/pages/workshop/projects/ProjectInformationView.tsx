import React, { useState, useEffect } from "react";
import { useSelector, current } from "react-redux";
import PhaseTaskSummaryVisualization from "../../../components/visualization/PhaseTaskSummaryVisualization";
// ChartJS.register(ArcElement, Tooltip, Legend);

import GanttChartVisualization from "../../../components/visualization/GanttChartVisualization";
import { format, formatDistanceToNow } from "date-fns";

const ProjectInformation = () => {
  const [taskData, setTaskData] = useState({
    lapsed: 0,
    completed: 0,
    ongoing: 0,
  });
  const {
    activeProject: {
      projectId,
      projectName,
      projectDescription,
      dateOfDeadline,
      createdAt,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    fetch(
      `http://192.168.0.22:4000/aggregate/tasks/count/${projectId}?isLapsed=true`
    )
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        setTaskData((state) => {
          return { ...state, lapsed: dat[0]?.taskContent || 0 };
        });
      });

    fetch(
      `http://192.168.0.22:4000/aggregate/tasks/count/${projectId}?isCompleted=true`
    )
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        setTaskData((state) => {
          return { ...state, completed: dat[0]?.taskContent || 0 };
        });
      });

    fetch(
      `http://192.168.0.22:4000/aggregate/tasks/count/${projectId}?isOngoing=true`
    )
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        setTaskData((state) => {
          return { ...state, ongoing: dat[0]?.taskContent || 0 };
        });
      });
  }, []);

  const creationDate = format(new Date(createdAt), "MMMM dd yyyy");
  const daysSinceCreation = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const deadlineDate = format(new Date(dateOfDeadline), "MMMM dd yyyy");
  const daysTillDeadline = formatDistanceToNow(new Date(dateOfDeadline), {
    addSuffix: true,
  });

  console.log(creationDate);
  console.log(daysSinceCreation);
  return (
    <div className="project-information-view-container ">
      <div className="project-title-container">
        <p className="label">Project</p>
        <p className="title">{projectName}</p>
      </div>
      <div className="project-date-container">
        <div className="project-created">
          <p>Created</p>
          <p>{creationDate}</p>
          <div className="days-since-container">
            <p>{daysSinceCreation}</p>
          </div>
        </div>
        <div className="project-deadline">
          <p>Deadline</p>
          <p>{deadlineDate}</p>
          <div className="days-since-container">
            <p>{daysTillDeadline}</p>
          </div>
        </div>
      </div>
      <hr />
      <h3>Gantt Chart</h3>
      <GanttChartVisualization />
      <PhaseTaskSummaryVisualization
        doughtnutData={[taskData.lapsed, taskData.completed, taskData.ongoing]}
      />

      <ul>
        {/* <li>Date of project creation {createdAt}</li>
        <li>Date of project intended deadline{revisedDate}</li> */}
        {/* <li>
          Breakdown of tasks
          <ul>
            <li>Total Number of tasks</li>
            <li>Total Number of unfinished tasks</li>
            <li>Total Number of priority tasks</li>
            <li>Total Number of unfinished priority tasks</li>
            <li>Total Number of finished priority tasks</li>
          </ul>
        </li> */}
      </ul>
    </div>
  );
};

export default ProjectInformation;
