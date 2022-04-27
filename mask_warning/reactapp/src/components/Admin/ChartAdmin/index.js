import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// const labels = Utils.months({ count: 12 });

const data = {
  labels: [
    "Jan",
    "Mar",
    "May",
    "July",
    "Oct",
    "a",
    "a",
    "a",
    "a",
    "b",
    "b",
    "c",
  ],

  datasets: [
    {
      label: "Iphone sales",
      data: [65, 59, 80, 81, 56, 55, 40, 10, 60, 7, 6, 3],
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
        color: "#243240",
        font: {
          size: "12",
        },
      },
    },
    x: {
      ticks: {
        color: "#2e4355",
        font: {
          size: 18,
        },
      },
    },
  },
};

function ChartAdmin() {
  return (
    <div className="mt-4">
      <h2>Quarterly sales for mobile phones</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ChartAdmin;
