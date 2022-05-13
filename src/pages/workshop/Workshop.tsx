import React, { useEffect, useState } from "react";
import {
  WorkshopNavBar,
  WorkshopProjectSidebar,
} from "../../components/navigation";

import Dashboard from "./dashboard/DashboardPanel";
import Projects from "./projects/ProjectsPanel";

import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";

const Workshop = (props: { setIsInWorkshop: any }) => {
  const { setIsInWorkshop } = props;
  const { projects } = useSelector((state) => state);

  useEffect(() => {
    setIsInWorkshop(true);
    return () => {
      setIsInWorkshop(false);
    };
  }, []);

  return (
    <div className="workshop">
      <div className="workshop-sidebar">
        <WorkshopProjectSidebar />
      </div>
      <div className="workshop-main-contents">
        <div className="workshop-navbar">
          <WorkshopNavBar />
        </div>
        <div className="workshop-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// const Workshop = (props: { setIsInWorkshop: any }) => {
//   const { setIsInWorkshop } = props;
//   const { projects } = useSelector((state) => state);

//   useEffect(() => {
//     setIsInWorkshop(true);
//     return () => {
//       setIsInWorkshop(false);
//     };
//   }, []);

//   return (
//     <div>
//       <div className="flex flex-row  w-full">
//         <WorkshopProjectSidebar />

//         <div className="flex flex-col">
//           <WorkshopNavBar />

//           <div className="mx-16 my-8 grid grid-cols-6 gap-4">
//             {projects.map(({ id, projectName, projectDescription }) => {
//               return (
//                 <div
//                   key={id}
//                   className="rounded-lg shadow-md col-span-1 card h-fit hover:shadow-xl transition ease-out"
//                 >
//                   <img
//                     src="https://picsum.photos/seed/picsum/800/800"
//                     alt=""
//                     className="h-32 sm:h-48 w-full object-cover"
//                   />

//                   <div className="m-4">
//                     <span className="font-bold">{projectName}</span>
//                     <span className="block text-gray-500 text-sm">
//                       {projectDescription}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Workshop;
