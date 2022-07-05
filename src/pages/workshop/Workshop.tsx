import React, { useEffect, useState, FC } from "react";

import { WorkshopNavBar, WorkshopSidebar } from "../../components";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./dashboard/DashboardPanel";
import Projects from "./projects/ProjectsPanel";

import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";

interface FunctionProps {
  setIsInWorkshop: (arg0: boolean) => boolean;
}

const Workshop: FC<FunctionProps> = (props: any) => {
  const { isInWorkshop, setIsInWorkshop } = props;
  // const { projects } = useSelector((state) => state);

  useEffect(() => {
    setIsInWorkshop(true);
    return () => {
      setIsInWorkshop(false);
    };
  }, []);

  return (
    <div className="workshop">
      <WorkshopSidebar />
      <div className="workshop-main-contents">
        <WorkshopNavBar />
        <Outlet />
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
function setIsInWorkshop(arg0: boolean) {
  throw new Error("Function not implemented.");
}
