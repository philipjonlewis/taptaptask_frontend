import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { isEqual, format } from "date-fns";
import { postRequest } from "../../helpers/postRequest";

const PhaseMenuSidebar = ({
  fetchedTaskList,
  setFetchedTaskList,
  setActivePhaseSidebarTab,
  activePhaseSidebarTab,
}) => {
  const dispatch = useDispatch();
  const { auth, activePhase, activeProject, taskList } = useSelector(
    (state) => state
  );

  return (
    <div className="phase-menu-container">
      <div
        className={
          activePhaseSidebarTab == "phase-data"
            ? "phase-data-icon-container active-sidebar-icon"
            : "phase-data-icon-container"
        }
        onClick={() => {
          activePhaseSidebarTab == "phase-data"
            ? setActivePhaseSidebarTab("")
            : setActivePhaseSidebarTab("phase-data");
        }}
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
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
      </div>
      <div
        className={
          activePhaseSidebarTab == "add-task"
            ? "add-task-icon-container active-sidebar-icon"
            : "add-task-icon-container"
        }
        onClick={() => {
          activePhaseSidebarTab == "add-task"
            ? setActivePhaseSidebarTab("")
            : setActivePhaseSidebarTab("add-task");
        }}
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
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>

      <div
        className={
          activePhaseSidebarTab == "filter-tasks"
            ? "filter-icon-menu-container active-sidebar-icon"
            : "filter-icon-menu-container"
        }
        onClick={() => {
          activePhaseSidebarTab == "filter-tasks"
            ? setActivePhaseSidebarTab("")
            : setActivePhaseSidebarTab("filter-tasks");
        }}
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </div>
      <div
        className={
          activePhaseSidebarTab == "task-history"
            ? "task-history-icon-menu-container active-sidebar-icon"
            : "task-history-icon-menu-container"
        }
        onClick={() => {
          activePhaseSidebarTab == "task-history"
            ? setActivePhaseSidebarTab("")
            : setActivePhaseSidebarTab("task-history");
        }}
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
            d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
          />
        </svg>
      </div>
    </div>
  );
};

export default PhaseMenuSidebar;
