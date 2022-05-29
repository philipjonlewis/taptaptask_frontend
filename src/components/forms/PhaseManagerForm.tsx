import React, { useState } from "react";
import { Reorder } from "framer-motion";
import PhaseReorderCard from "../cards/PhaseReorderCard";
const PhaseManagerForm = () => {
  const initialData = [
    { phaseOrder: 1, phaseName: "Schematic Design" },
    { phaseOrder: 2, phaseName: "Design Development" },
    { phaseOrder: 3, phaseName: "Contract Document" },
    { phaseOrder: 4, phaseName: "Project Turnover" },
  ];

  const [phases, setPhases] = useState(initialData);
  return (
    <div className="phase-management-container">
      <div className="title-container">
        <p>Phase Manager</p>
      </div>
      <Reorder.Group
        axis="y"
        values={phases}
        onReorder={setPhases}
        className="interactive-phase-container"
      >
        {phases.map((phase) => {
          return <PhaseReorderCard key={phase.phaseOrder} item={phase} />;
        })}
      </Reorder.Group>
    </div>
  );
  // return (
  //   <div className="phase-management-container">
  //     <div className="title-container">
  //       <p>Phase Manager</p>
  //     </div>

  //     <Reorder.Group axis="y" values={phases} onReorder={setPhases}>
  //       {phases.map((phase) => {
  //         return (
  //           <Reorder.Item key={phase.phaseOrder} value={phase.phaseName}>
  //             {phase.phaseName}
  //           </Reorder.Item>
  //         );
  //       })}
  //     </Reorder.Group>

  //   </div>
  // );
};

export default PhaseManagerForm;
