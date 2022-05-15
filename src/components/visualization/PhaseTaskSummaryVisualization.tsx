import React from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PhaseTaskSummaryVisualization = () => {
  const { phaseList } = useSelector((state) => state);

  console.log(phaseList);
  const data = {
    labels: ["Lapsed", "Ongoing", "Priority", "Completed"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
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
