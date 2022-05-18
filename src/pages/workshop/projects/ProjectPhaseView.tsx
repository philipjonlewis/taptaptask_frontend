import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const ProjectPhaseView = () => {
  const {
    activePhase: { phaseId, phaseName },
    taskList,
  } = useSelector((state) => state);
  // console.log(activePhase);
  // console.log(taskList);
  const tasks = taskList.filter((task) => task.phaseReferenceId === phaseId);
  // console.log(tasks);
  return (
    <div>
      <p>This is the individual phase view</p>
      <p>{phaseId}</p>
      <p>{phaseName}</p>
      <hr />
      <p>These are the tasks</p>
      <hr />
      <ul>
        {tasks.map((task) => {
          return <li key={task.taskId}>{task.taskContent}</li>;
        })}
      </ul>
    </div>
  );
};

export default ProjectPhaseView;
