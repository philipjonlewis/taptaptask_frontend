import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useGetProjectQuery } from "../../redux/rtkQuery/projectApiSlice";
import { useDispatch } from "react-redux";
import { setActiveProject } from "../../redux/activeProjectState";
import { setActivePhase } from "../../redux/activePhaseState";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProjectQuery(false) as any;

  const linkHandler = (project: any) => {
    dispatch(
      setActivePhase({
        phaseId: "",
        phaseName: "",
      })
    );
    dispatch(setActiveProject(project));
  };

  return (
    <div className="list-of-projects">
      {isLoading == false &&
        data.length >= 1 &&
        data.map((project: any) => {
          return (
            <NavLink
              key={project.projectId}
              className="project-link"
              to={`projects/${project.projectName.split(" ").join("_")}`}
              onClick={() => linkHandler(project)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
              <p className="">{project.projectName}</p>
            </NavLink>
          );
        })}
    </div>
  );
};

export default React.memo(ProjectList);
