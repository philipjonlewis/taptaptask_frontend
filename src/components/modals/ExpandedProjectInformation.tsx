import React, { useState, useEffect } from "react";

const ExpandedProjectInformation = ({
  setExpandedInformationModal,
  activeProject,
  projectDates,
}) => {
  const {
    projectId,
    projectName,
    projectDescription,
    dateOfDeadline,
    createdAt,
  } = activeProject;

  const [projectNameForDeletion, setProjectNameForDeletion] = useState({
    deleteProject: "",
  });

  const [isDeleteButtonDisabled, setisDeleteButtonDisabled] = useState(true);

  useEffect(() => {
    if (projectNameForDeletion.deleteProject === projectName) {
      setisDeleteButtonDisabled(false);
    } else {
      setisDeleteButtonDisabled(true);
    }
  }, [projectNameForDeletion]);

  return (
    <div
      className="expanded-project-information-container"
      onClick={(e) => {
        if (e.target.className == "expanded-project-information-container") {
          confirm("Are you sure you want to close this modal?") &&
            setExpandedInformationModal(false);
        }
      }}
    >
      <div className="information-container">
        <div
          className="close-modal-button"
          onClick={() => setExpandedInformationModal(false)}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="project-title">
          <p>{projectName}</p>
        </div>
        <div className="project-description">
          <p>{projectDescription}</p>
        </div>
        <div className="creation-date-container">
          <p>Created :</p>
          <p>{projectDates.creation.date}</p>
        </div>
        <div className="deadline-date-container">
          <div className="edit-deadline-button-container">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <p>Deadline :</p>
          <p>{projectDates.deadline.date}</p>
        </div>

        <div className="delete-project-container">
          <div className="delete-project-title">
            <div className="warning-icon">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            {/* <p>Only go past this area if you want to delete your project</p> */}
            <p>Delete Project</p>
          </div>
          <form action="#" className="delete-project-form">
            <label htmlFor="deleteProject">
              Enter "{projectName}" without quotation marks to delete project
            </label>
            <input
              id="deleteProject"
              name="deleteProject"
              required
              spellCheck="false"
              autoCorrect="false"
              type="text"
              placeholder="Enter Project Name Here"
              value={projectNameForDeletion.deleteProject}
              onChange={(e) => {
                setProjectNameForDeletion(() => {
                  return { [e.target.name]: e.target.value };
                });
              }}
            />
            <button
              disabled={isDeleteButtonDisabled}
              onClick={(e) => {
                e.preventDefault();
                console.log(projectNameForDeletion);
                console.log(isDeleteButtonDisabled);
              }}
            >
              Delete Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpandedProjectInformation;
