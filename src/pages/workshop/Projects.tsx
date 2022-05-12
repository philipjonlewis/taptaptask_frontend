import React, { useState } from "react";
import { useSelector } from "react-redux";

const Projects = () => {
  const { projects } = useSelector((state) => state);
  const [projectForm, setProjectForm] = useState(false);

  return (
    <>
      <div className="m-4 grid grid-cols-6 gap-4 relative ">
        <div className="absolute top-0 right-0">
          <button
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            data-modal-toggle="defaultModal"
          >
            Toggle modal
          </button>
        </div>
        {projects.map(
          ({ id, projectName, projectDescription, projectImage }) => {
            return (
              <div
                key={id}
                className="rounded-lg shadow-md col-span-1 card h-fit hover:shadow-xl transition ease-out"
              >
                <img
                  src={projectImage}
                  alt=""
                  className="h-32 sm:h-48 w-full object-cover"
                />

                <div className="m-4">
                  <span className="font-bold">{projectName}</span>
                  <span className="block text-gray-500 text-sm">
                    {projectDescription}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Projects;
