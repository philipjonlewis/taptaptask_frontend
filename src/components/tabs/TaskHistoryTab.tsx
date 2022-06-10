import React, { useState, useEffect } from "react";
import { LapsedTaskCard } from "../index";
import { useGetLapsedTasksQuery } from "../../redux/rtkQuery/aggregationApiSlice";
import { format, formatDistanceToNow } from "date-fns";

const TaskHistoryTab = ({ activePhaseId }) => {
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetLapsedTasksQuery({ phaseId: activePhaseId });

  const [localLapsedTasks, setLocalLapsedTasks] = useState([]) as any;

  useEffect(() => {
    if (isLoading == false && data !== undefined) {
      setLocalLapsedTasks(data);
      console.log(data);
    }

    return () => {};
  }, [activePhaseId]);

  let content;

  if (isLoading) {
    refetch();
    content = <p>Loading</p>;
  } else if (isSuccess) {
    content = (
      <div>
        {localLapsedTasks.length >= 1 &&
          localLapsedTasks.map((taskObject) => {
            return (
              <div>
                <hr />
                <div className="date-container">
                  {format(new Date(taskObject._id), "LLL dd ")}
                </div>
                {taskObject.taskContent.map((task) => {
                  return <LapsedTaskCard taskContent={task.taskContent} />;
                  // return <div>{task.taskContent}</div>;
                })}
              </div>
            );
          })}
      </div>
    );
  } else if (isError) {
    refetch();
    content = <div style={{ backgroundColor: "$neutral-500" }}></div>;
  }

  return (
    <div className="task-history-tab-container">
      <div> Task History </div>
      <div>{content}</div>
    </div>
  );
};

export default TaskHistoryTab;
