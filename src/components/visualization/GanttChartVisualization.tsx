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
    "Schematic Design",
    "Schematic Design Phase",
    new Date(2022, 2, 22),
    new Date(2022, 5, 20),
    null,
    20,
    null,
  ],
  [
    "2014Summer",
    "Design Development",
    "summer",
    new Date(2022, 5, 21),
    new Date(2022, 8, 20),
    null,
    30,
    null,
  ],
  [
    "2014Autumn",
    "Contract Document",
    "autumn",
    new Date(2022, 8, 21),
    new Date(2022, 11, 20),
    null,
    60,
    null,
  ],
  [
    "2014Winter",
    "Project Turnover",
    "winter",
    new Date(2022, 11, 21),
    new Date(2023, 2, 21),
    null,
    80,
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
    innerGridTrack: { fill: "$neutral-500" },
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
    fill: "$neutral-500",
  },
};

const GanttChartVisualization = () => {
  return (
    <div style={{ width: "900px" }}>
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

export default GanttChartVisualization;
