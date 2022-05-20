import React from "react";
import { Chart } from "react-google-charts";

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "2014Spring",
    "Architectural Project",
    "Schematic Design Phase",
    new Date(2022, 2, 22),
    new Date(2023, 2, 21),
    null,
    20,
    null,
  ],
  [
    "2014Summer",
    "Software Project",
    "summer",
    new Date(2022, 9, 21),
    new Date(2023, 4, 20),
    null,
    30,
    null,
  ],
  [
    "2014Autumn",
    "Exam and Certification",
    "autumn",
    new Date(2022, 4, 21),
    new Date(2023, 10, 20),
    null,
    60,
    null,
  ],

  //   [
  //     "2020Completion",
  //     "Completion",
  //     "completion",
  //     new Date(2023, 2, 21),
  //     new Date(2023, 6, 21),
  //     null,
  //     80,
  //     null,
  //   ],
];

export const data = [columns, ...rows];

export const options = {
  height: 200,
  gantt: {
    trackHeight: 30,
    innerGridTrack: { fill: "#253449" },
    innerGridDarkTrack: { fill: "#273b57" },
    labelStyle: {
      fontName: "arial",
      fontSize: 14,
      fill: "rgb(255, 255, 255);",
    },
    innerGridHorizLine: {
      stroke: "transparent",
      strokeWidth: 0.5,
    },
  },
  backgroundColor: {
    fill: "#253449",
  },
};

const ProjectsDashboardGanttChart = () => {
  return (
    <div style={{ width: "1200px" }}>
      <Chart
        chartType="Gantt"
        width="100%"
        height="50%"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ProjectsDashboardGanttChart;
