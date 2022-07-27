import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/projectListState";
import format from "date-fns/format";
import { v4 as uuidv4 } from "uuid";
import { useAddProjectDataMutation } from "../../redux/rtkQuery/projectApiSlice";

const AddProjectModal = ({ addProjectModalHandler, setAddProjectModal }) => {
  const dispatch = useDispatch();

  const [addProjectData, { isError, isLoading, isSuccess, isUninitialized }] =
    useAddProjectDataMutation();

  const { auth, projectList } = useSelector((state: any) => state);

  const [triggerFetch, setTriggerFetch] = useState(false);

  const [addProjectNotice, setAddProjectNotice] = useState(false);

  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
    dateOfDeadline: format(new Date(), "yyyy-MM-dd"),
  });

  const modalVisibilityHandler = (e) => {
    if (e.target.className == "add-project-modal") {
      confirm("Are you sure you want to close this modal?") &&
        setAddProjectModal(false);
    }
  };

  const inputHandler = (e) => {
    setForm((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setAddProjectNotice(true);
    const projectId = uuidv4();

    addProjectData([{ ...form, projectId }]);

    dispatch(addProject({ ...form, projectId }));

    setTriggerFetch(!triggerFetch);

    setTimeout(() => {
      setAddProjectNotice(false);
      setAddProjectModal(false);
      setForm((state) => {
        return {
          ...state,
          projectName: "",
          projectDescription: "",
        };
      });
    }, 1500);
  };

  return (
    <div className="add-project-modal" onClick={modalVisibilityHandler}>
      <div className="modal-form-container">
        {addProjectNotice && (
          <div className="add-project-notice-container">
            <div className="message-container">
              <img src="/rings.svg" alt="" />
              <p>Adding your project</p>
            </div>
          </div>
        )}
        <div
          className="close-add-form-modal-button"
          onClick={addProjectModalHandler}
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

        <div className="left-segment">
          <div className="form-title-container">
            <p>Create a new project</p>
          </div>
          <form action="#" className="add-project-form-container">
            {/* Project Name */}
            <label htmlFor="projectName">Project Name</label>
            <input
              name="projectName"
              type="text"
              placeholder="Add New Project"
              autoCorrect="false"
              spellCheck="false"
              value={form.projectName}
              required
              // value={form.projectName}
              onChange={inputHandler}
            />
            {/* Project Description */}
            <label htmlFor="projectName">Project Description</label>
            <input
              name="projectDescription"
              type="text"
              placeholder="Project Description"
              autoCorrect="false"
              spellCheck="false"
              value={form.projectDescription}
              required
              // value={form.projectDescription}
              onChange={inputHandler}
            />
            {/* Date of Deadline */}
            <label htmlFor="projectName">Date of Intended Deadline</label>
            <input
              name="dateOfDeadline"
              type="date"
              autoCorrect="false"
              spellCheck="false"
              value={form.dateOfDeadline}
              required
              // value={form.dateOfDeadline}
              onChange={inputHandler}
            />
            <button onClick={handleFormSubmit}>Add Project</button>
          </form>
          <div
            className="clear-form-container"
            onClick={() => {
              setForm((state) => {
                return {
                  ...state,
                  projectName: "",
                  projectDescription: "",
                  projectId: uuidv4(),
                };
              });
            }}
          >
            <p>Clear Form</p>
          </div>
        </div>
        <div className="right-segment"></div>
      </div>
    </div>
  );
};

export default AddProjectModal;
