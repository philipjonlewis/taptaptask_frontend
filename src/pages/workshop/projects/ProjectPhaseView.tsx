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

import { useGetTasksByDateQuery } from "../../../redux/rtkQuery/aggregationApiSlice";

import { useDeleteTasksByDateMutation } from "../../../redux/rtkQuery/aggregationApiSlice";

import { useGetLapsedTasksQuery } from "../../../redux/rtkQuery/aggregationApiSlice";

import { createSelector } from "reselect";

const ProjectPhaseView = () => {
  const { activePhaseId, activeProjectId } = useSelector((state: any) => {
    return {
      activePhaseId: state.activePhase.phaseId,
      activeProjectId: state.activeProject.projectId,
    };
  });

  const [deleteTasksByDate] = useDeleteTasksByDateMutation();
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
    }

    return () => {
      setFetchedTaskList([]);
    };
  }, [activePhaseId, activeProjectId, isLoading, data]);

  const deleteTaskCardHandler = (taskObjectId) => {
    confirm("are you sure you want to delete this card?");
    setFetchedTaskList((state) => {
      const newState = [...state].filter((taskObj) => {
        if (taskObj._id != taskObjectId) {
          return taskObj;
        }
      });

      return [...newState];
    });

    deleteTasksByDate({ dateOfDeadline: taskObjectId });
  };

  let taskDataContent;

  if (isLoading) {
    refetch();
    taskDataContent = <p>Loading</p>;
  } else if (isSuccess) {
    taskDataContent = (
      <div className="task-card-container ">
        {fetchedTaskList.length >= 1 &&
          fetchedTaskList.map((taskObject: any) => {
            return (
              <React.Fragment key={taskObject._id}>
                <TaskCard
                  deleteTaskCardHandler={deleteTaskCardHandler}
                  taskObject={taskObject}
                  key={taskObject._id}
                />
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
        <TaskHistoryTab
          activePhaseId={activePhaseId}
          activeProjectId={activeProjectId}
        />
      )}

      {/* 
      {activePhaseSidebarTab == "filter-tasks" && (
        <FilterTasksTab setActivePhaseSidebarTab={setActivePhaseSidebarTab} />
      )} */}

      {taskDataContent}
    </div>
  );
};

export default ProjectPhaseView;
