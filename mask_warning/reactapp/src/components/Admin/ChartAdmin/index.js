import React, { useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const ChartAdmin = ({ newUsers = {} }) => {

  const chartData = {
    labels: [],

    datasets: [
      {
        label: "new user(s)",
        data: newUsers,
        maxBarThickness: 50,
        fill: true,
        backgroundColor: "#6160DC",
        pointBorderColor: "#8884d8",
        borderRadius: "3000",
        pointBorderWidth: 5,
        borderRadius: 40,
        tension: 0.4,
        font: {
          size: "12",
        },
      },
    ],
  };
  const options = {
    plugins: { legend: { display: false } },
    layout: { padding: { bottom: 100 } },
    scales: {
      y: {
        ticks: {
          color: "#2e4355",
          font: {
            size: 14,
          },

        },
        grid: {
          color: "rgba(75, 192, 192, 0.2)",
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          color: "#2e4355",
          font: {
            size: 14,
          },
        },
      },

    },
  };


  return (
    <div className="mt-4">
      <h2>Chart of new user</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default ChartAdmin;
