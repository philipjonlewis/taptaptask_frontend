import React, { useState, useEffect } from "react";
import { useDeleteProjectMutation } from "../../redux/rtkQuery/projectApiSlice";
import { useNavigate } from "react-router-dom";
import { useUpdateProjectMutation } from "../../redux/rtkQuery/projectApiSlice";
import { useDispatch } from "react-redux";
import {
  editProjectDate,
  editProjectName,
  editProjectDescription,
} from "../../redux/activeProjectState";
import { format, formatDistanceToNow } from "date-fns";

import { EditButtonSvg, WarningIconSvg, CloseButtonSvg } from "../svgs";

const ExpandedProjectInformation = ({
  setExpandedInformationModal,
  localProjectCredentials,
  setLocalProjectCredentials,
  projectCredentialsChangeHandler,
  projectDates,
  projectId,
  setProjectDates,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [editCredentialState, setEditCredentialState] = useState({
    projectName: false,
    projectDescription: false,
    dateOfDeadline: false,
  });

  const [modalProjectCredentials, setModalProjectCredentials] = useState({
    projectName: "",
    projectDescription: "",
    dateOfDeadline: format(new Date(), "yyyy-MM-dd"),
  });

  const [deleteButtonState, setDeleteButtonState] = useState(true);

  const modalInputChangeHandler = (e) => {
    setModalProjectCredentials((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const editDeadlineChangeHandler = (e) => {
    setModalProjectCredentials((state) => {
      return {
        ...state,
        dateOfDeadline: e.target.value,
      };
    });
  };

  const deleteProjectChangeHandler = (e) => {
    if (e.target.value == localProjectCredentials.projectName) {
      setDeleteButtonState(false);
    } else {
      setDeleteButtonState(true);
    }
  };

  const submitEditNameHandler = (e) => {
    e.preventDefault();
    dispatch(editProjectName(localProjectCredentials.projectName));

    setLocalProjectCredentials((state) => {
      return {
        ...state,
        projectName: modalProjectCredentials.projectName,
      };
    });

    updateProject([
      { projectId },
      { projectName: modalProjectCredentials.projectName },
    ]);

    setEditCredentialState((state) => ({
      ...state,
      projectName: false,
    }));
  };

  const submitEditDescriptionHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProjectDescription(localProjectCredentials.projectDescription)
    );

    setLocalProjectCredentials((state) => {
      return {
        ...state,
        projectDescription: modalProjectCredentials.projectDescription,
      };
    });

    updateProject([
      { projectId },
      { projectDescription: modalProjectCredentials.projectDescription },
    ]);

    setEditCredentialState((state) => ({
      ...state,
      projectDescription: false,
    }));
  };

  const submitEditDeadlineHandler = (e) => {
    e.preventDefault();
    dispatch(editProjectDate(modalProjectCredentials.dateOfDeadline));

    const deadlineDate = format(
      new Date(modalProjectCredentials.dateOfDeadline),
      "LLL dd y"
    );
    const daysTillDeadline = formatDistanceToNow(
      new Date(modalProjectCredentials.dateOfDeadline),
      {
        addSuffix: true,
      }
    );

    setProjectDates((state: any) => {
      return {
        ...state,
        deadline: {
          date: deadlineDate,
          daysTill: daysTillDeadline,
        },
      };
    });

    updateProject([
      { projectId },
      { dateOfDeadline: modalProjectCredentials.dateOfDeadline },
    ]);

    setEditCredentialState((state) => ({
      ...state,
      dateOfDeadline: false,
    }));
  };

  const submitDeleteProjectHandler = (e) => {
    e.preventDefault();
    deleteProject({ projectId });
    setExpandedInformationModal(false);
    navigate("/workshop/projects", { replace: true });
  };

  return (
    <div className="expanded-project-information-container">
      <div className="information-container">
        <div
          className="close-modal-button"
          onClick={() => setExpandedInformationModal(false)}
        >
          <CloseButtonSvg />
        </div>

        <div className="project-credential-input-container">
          <label htmlFor="projectName">Project Name</label>
          <div className="input-button-container">
            <div
              className="edit-button-container"
              onClick={() =>
                setEditCredentialState((state) => ({
                  ...state,
                  projectName: !editCredentialState.projectName,
                }))
              }
            >
              <EditButtonSvg />
            </div>
            {editCredentialState.projectName ? (
              <>
                <input
                  type="text"
                  autoCorrect="false"
                  spellCheck="false"
                  value={modalProjectCredentials.projectName}
                  placeholder={localProjectCredentials.projectName}
                  name="projectName"
                  className="project-name-input"
                  onChange={modalInputChangeHandler}
                />

                <button onClick={submitEditNameHandler}>Edit Name</button>
              </>
            ) : (
              <p>{localProjectCredentials.projectName}</p>
            )}
          </div>
        </div>

        <div className="project-credential-input-container">
          <label htmlFor="projectDescription">Project Description</label>
          <div className="input-button-container">
            <div
              className="edit-button-container"
              onClick={() =>
                setEditCredentialState((state) => ({
                  ...state,
                  projectDescription: !editCredentialState.projectDescription,
                }))
              }
            >
              <EditButtonSvg />
            </div>
            {editCredentialState.projectDescription ? (
              <>
                <input
                  type="text"
                  autoCorrect="false"
                  spellCheck="false"
                  value={modalProjectCredentials.projectDescription}
                  placeholder={localProjectCredentials.projectDescription}
                  name="projectDescription"
                  className="project-description-input"
                  onChange={modalInputChangeHandler}
                />

                <button onClick={submitEditDescriptionHandler}>
                  Edit Description
                </button>
              </>
            ) : (
              <p>{localProjectCredentials.projectDescription}</p>
            )}
          </div>
        </div>

        <div className="creation-date-container">
          <p>Created :</p>
          <p>{projectDates.creation.date}</p>
        </div>
        <div className="deadline-date-container">
          <div
            className="edit-deadline-button-container"
            onClick={() =>
              setEditCredentialState((state) => ({
                ...state,
                dateOfDeadline: !editCredentialState.dateOfDeadline,
              }))
            }
          >
            <EditButtonSvg />
          </div>
          <p>Deadline :</p>

          {editCredentialState.dateOfDeadline ? (
            <>
              <input
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                defaultValue={format(
                  new Date(projectDates.deadline.date),
                  "yyyy-MM-dd"
                )}
                name="dateOfDeadline"
                className="project-dateOfDeadline"
                onChange={editDeadlineChangeHandler}
              />

              <button
                className="submit-edit-deadline-button"
                onClick={submitEditDeadlineHandler}
              >
                Edit Deadline
              </button>
            </>
          ) : (
            <p>{projectDates.deadline.date}</p>
          )}
        </div>

        <div className="delete-project-container">
          <div className="delete-project-title">
            <div className="warning-icon">
              <WarningIconSvg />
            </div>
            {/* <p>Only go past this area if you want to delete your project</p> */}
            <p>Delete Project</p>
          </div>
          <form action="#" className="delete-project-form">
            <label htmlFor="deleteProject">
              {`Enter "${localProjectCredentials.projectName}" without quotation marks to delete project`}
            </label>
            <input
              id="deleteProject"
              name="deleteProject"
              required
              spellCheck="false"
              autoCorrect="false"
              type="text"
              placeholder="Enter Project Name Here"
              onChange={deleteProjectChangeHandler}
            />
            <button
              disabled={deleteButtonState}
              onClick={submitDeleteProjectHandler}
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
