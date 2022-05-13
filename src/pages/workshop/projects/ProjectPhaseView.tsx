import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const ProjectPhaseView = () => {
  const {
    activePhase: { phaseId, phaseOrder, phaseName },
    taskList,
  } = useSelector((state) => state);

  const tasks = taskList.filter((task) => task.phaseId === phaseId);

  return (
    <div>
      <p>This is the individual phase view</p>
      <p>{phaseId}</p>
      <p>{phaseName}</p>
      <hr />
      <p>These are the tasks</p>
      <hr />
      {tasks[0] &&
        tasks[0].tasks.map((task) => {
          return <p key={task.taskId}>{task.taskContent}</p>;
        })}
    </div>
  );
};

export default ProjectPhaseView;
