import React from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PhaseTaskSummaryVisualization = ({ doughtnutData }) => {
  const { phaseList } = useSelector((state) => state);

  console.log(doughtnutData);
  const data = {
    labels: [
      `Lapsed - ${doughtnutData[0]}`,
      `Completed - ${doughtnutData[1]}`,
      `Ongoing - ${doughtnutData[2]}`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: doughtnutData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      {" "}
      <div
        className="chart-container"
        style={{ position: "relative", height: "400px", width: "500px" }}
      >
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default PhaseTaskSummaryVisualization;
