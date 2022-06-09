import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  TaskCard,
  AddTaskCardForm,
  PhaseMenuSidebar,
  TaskHistoryTab,
  FilterTasksTab,
  PhaseDataTab,
} from "../../../components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useGetTasksByDateQuery } from "../../../redux/rtkQuery/aggregationApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { fetchTaskList, getTaskList } from "../../../redux/taskListState";

const ProjectPhaseView = () => {
  const dispatch = useDispatch();
  const { activePhaseId, activeProjectId } = useSelector((state: any) => {
    return {
      activePhaseId: state.activePhase.phaseId,
      activeProjectId: state.activeProject.projectId,
    };
  });

  const [fetchedTaskList, setFetchedTaskList] = useState([]) as any;
  const [activePhaseSidebarTab, setActivePhaseSidebarTab] = useState("") as any;

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetTasksByDateQuery(
      {
        phaseReferenceId: activePhaseId,
        projectReferenceId: activeProjectId,
      },
      {
        pollingInterval: 1000,
        refetchOnMountOrArgChange: true,
        skip: false,
      }
      // activePhaseId
      //   ? {
      //       phaseReferenceId: activePhaseId,
      //       projectReferenceId: activeProjectId,
      //     }
      //   : skipToken
    ) as any;

  useEffect(() => {
    if (isLoading == false && data !== undefined) {
      setFetchedTaskList(data);
      dispatch(fetchTaskList(data));
    }

    return () => {
      setFetchedTaskList([]);
    };
  }, [activePhaseId, activeProjectId, isLoading, data]);

  let taskDataContent;

  if (isLoading) {
    refetch();
    taskDataContent = <p>Loading</p>;
  } else if (isSuccess) {
    taskDataContent = (
      <div className="task-card-container ">
        {data.length >= 1 &&
          data.map((taskObject) => {
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
      <PhaseMenuSidebar
        setFetchedTaskList={setFetchedTaskList}
        fetchedTaskList={fetchedTaskList}
        setActivePhaseSidebarTab={setActivePhaseSidebarTab}
        activePhaseSidebarTab={activePhaseSidebarTab}
      />

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
