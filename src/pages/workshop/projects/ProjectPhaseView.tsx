import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { format, formatDistanceToNow } from "date-fns";
import {
  TaskCard,
  AddTaskCardForm,
  PhaseMenuSidebar,
  TaskHistoryTab,
  FilterTasksTab,
  PhaseDataTab,
} from "../../../components";
import axios from "axios";
import { useGetTasksByDateQuery } from "../../../redux/rtkQuery/aggregationApiSlice";

const ProjectPhaseView = () => {
  const dispatch = useDispatch();
  const {
    activePhase: { phaseId, phaseName },
    activeProject: { projectId },
  } = useSelector((state) => state);

  const [fetchedTaskList, setFetchedTaskList] = useState([]) as any;
  const [isFinishedFetching, setIsFinishedFetching] = useState(false) as any;
  const [activePhaseSidebarTab, setActivePhaseSidebarTab] = useState("") as any;
  const [skip, setSkip] = useState(false);

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetTasksByDateQuery(
      {
        projectReferenceId: projectId,
        phaseReferenceId: phaseId,
      },
      { skip }
    );

  useEffect(() => {
    setSkip(false);

    if (isLoading == false && data !== undefined) {
      setFetchedTaskList(() => {
        return data;
      });
    }

    return () => {
      setSkip(true);
      setFetchedTaskList([]);
    };
  }, [phaseId, projectId, isLoading]);

  let taskDataContent;

  if (isLoading) {
    refetch();
    taskDataContent = <p>Loading</p>;
  } else if (isSuccess) {
    taskDataContent = (
      <div className="task-card-container ">
        {fetchedTaskList.length >= 1 &&
          fetchedTaskList.map((taskObject) => {
            return (
              <React.Fragment key={taskObject._id}>
                <TaskCard taskObject={taskObject} key={taskObject._id} />
              </React.Fragment>
            );
          })}
      </div>
    );
  } else if (isError) {
    refetch();
    taskDataContent = <div style={{ backgroundColor: "$neutral-500" }}></div>;
  }

  return (
    <div className="project-phase-container">
      {isFinishedFetching && (
        <PhaseMenuSidebar
          setFetchedTaskList={setFetchedTaskList}
          fetchedTaskList={fetchedTaskList}
          setActivePhaseSidebarTab={setActivePhaseSidebarTab}
          activePhaseSidebarTab={activePhaseSidebarTab}
        />
      )}

      {activePhaseSidebarTab == "phase-data" && <PhaseDataTab />}

      {activePhaseSidebarTab == "add-task" && (
        <AddTaskCardForm
          setFetchedTaskList={setFetchedTaskList}
          fetchedTaskList={fetchedTaskList}
          setActivePhaseSidebarTab={setActivePhaseSidebarTab}
        />
      )}

      {activePhaseSidebarTab == "task-history" && (
        <TaskHistoryTab setActivePhaseSidebarTab={setActivePhaseSidebarTab} />
      )}

      {activePhaseSidebarTab == "filter-tasks" && (
        <FilterTasksTab setActivePhaseSidebarTab={setActivePhaseSidebarTab} />
      )}

      {taskDataContent}
    </div>
  );
};

export default ProjectPhaseView;
