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

  const [fetchedTaskList, setFetchedTaskList] = useState([]);
  const [isFinishedFetching, setIsFinishedFetching] = useState(false);
  const [activePhaseSidebarTab, setActivePhaseSidebarTab] = useState("");

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetTasksByDateQuery({
      projectReferenceId: projectId,
      phaseReferenceId: phaseId,
    });

  console.log("phase id", phaseId);
  console.log("project id", projectId);

  useEffect(() => {
    if (isLoading == false && data !== undefined) {
      setFetchedTaskList(() => {
        return [...data];
      });
    }

    return () => {
      setFetchedTaskList([]);
    };
  }, [phaseId, projectId]);

  let content;

  if (isLoading) {
    refetch();
    content = <p>Loading</p>;
  } else if (isSuccess) {
    content = <p>Tama</p>;
  } else if (isError) {
    refetch();
    content = <div>{error.toString()}</div>;
  }

  // return (
  //   <section className="posts-list">
  //     <h2>Posts</h2>
  //     {content}
  //   </section>
  // );

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

      {isSuccess ? (
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
      ) : (
        <div style={{ backgroundColor: "$neutral-500" }}></div>
      )}
    </div>
  );
};

export default ProjectPhaseView;
