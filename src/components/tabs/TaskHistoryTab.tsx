import React, { useState, useEffect } from "react";
import { LapsedTaskCard } from "../index";
import { format, formatDistanceToNow } from "date-fns";
import { useGetLapsedTasksQuery } from "../../redux/rtkQuery/aggregationApiSlice";
import { useSelector } from "react-redux";

const TaskHistoryTab = () => {
  const { activePhaseId } = useSelector((state) => state) as any;

  const [localLapsedTasks, setLocalLapsedTasks] = useState([]) as any;
  const [openLapsedTaskCard, setOpenLapsedTaskCard] = useState("");

  const {
    data: lapsedTaskData,
    isLoading: lapsedTaskLoading,
    isSuccess: lapsedTaskIsSuccess,
    isError: lapsedTaskIsError,
    refetch: lapsedTasksRefresh,
  } = useGetLapsedTasksQuery({ phaseId: activePhaseId });

  useEffect(() => {
    if (lapsedTaskLoading == false && lapsedTaskData !== undefined) {
      setLocalLapsedTasks(lapsedTaskData);
    }

    return () => {};
  }, [activePhaseId]);

  let content;

  if (lapsedTaskLoading) {
    lapsedTasksRefresh();
    content = <p>Loading</p>;
  } else if (lapsedTaskIsSuccess) {
    content = (
      <div>
        {localLapsedTasks.length >= 1 &&
          localLapsedTasks.map((taskObject) => {
            return (
              <LapsedTaskCard
                taskObject={taskObject}
                openLapsedTaskCard={openLapsedTaskCard}
                setOpenLapsedTaskCard={setOpenLapsedTaskCard}
              />
            );
          })}
      </div>
    );
  } else if (lapsedTaskIsError) {
    lapsedTasksRefresh();
    content = <div style={{ backgroundColor: "$neutral-500" }}></div>;
  }

  return (
    <div
      className="task-history-tab-container"
      // onMouseLeave={() => setOpenLapsedTaskCard("")}
    >
      <div className="task-history-title">
        <p> Task History </p>
      </div>
      <div className="lapsed-task-list-container">{content}</div>
    </div>
  );
};

export default TaskHistoryTab;
