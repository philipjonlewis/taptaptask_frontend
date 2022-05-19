import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTaskList } from "../../../redux/taskListState";
import { format, formatDistanceToNow } from "date-fns";
import { TaskCard } from "../../../components";
const ProjectPhaseView = () => {
  const dispatch = useDispatch();
  const {
    activePhase: { phaseId, phaseName },
    activeProject: { projectId },
    taskList,
  } = useSelector((state) => state);
  const [fetchedTaskList, setFetchedTaskList] = useState([]);
  const [isFinishedFetching, setIsFinishedFetching] = useState(false);
  const [activeAddForm, setActiveAddForm] = useState("phase-001");
  // console.log(activePhase);
  // console.log(taskList);

  // console.log(tasks);

  const activeAddFormhandler = (_id) => {
    setActiveAddForm(_id);
  };

  useEffect(() => {
    fetch(
      `http://192.168.0.22:4000/aggregate/tasks/date/${projectId}/${phaseId}`
    )
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        setFetchedTaskList(dat);
        // dispatch(fetchTaskList(dat));
      })
      .then(() => setIsFinishedFetching(true));
  }, []);
  return (
    <div className="project-phase-container">
      {isFinishedFetching ? (
        <div className="task-list-container ">
          {fetchedTaskList.length >= 1 &&
            fetchedTaskList.map((taskObject) => {
              return (
                <>
                  <TaskCard
                    key={taskObject._id}
                    taskObject={taskObject}
                    activeAddForm={activeAddForm}
                    activeAddFormhandler={activeAddFormhandler}
                  />
                </>
              );
            })}
        </div>
      ) : (
        <div style={{ backgroundColor: "#253449" }}></div>
      )}
    </div>
  );
};

export default ProjectPhaseView;
