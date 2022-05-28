import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskToExistingDate,
  fetchTaskList,
} from "../../../redux/taskListState";
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

const ProjectPhaseView = () => {
  const dispatch = useDispatch();
  const {
    activePhase: { phaseId, phaseName },
    activeProject: { projectId },
    taskList,
  } = useSelector((state) => state);

  const [fetchedTaskList, setFetchedTaskList] = useState([]);
  const [isFinishedFetching, setIsFinishedFetching] = useState(false);
  const [activePhaseSidebarTab, setActivePhaseSidebarTab] = useState("");
  const getData = async () => {
    const resData = await axios.get(
      `http://192.168.0.22:4000/aggregate/tasks/date/${projectId}/${phaseId}`
    );
    setFetchedTaskList(await resData.data);
    setIsFinishedFetching(true);
  };

  useEffect(() => {
    getData();
  }, []);

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

      {isFinishedFetching ? (
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
