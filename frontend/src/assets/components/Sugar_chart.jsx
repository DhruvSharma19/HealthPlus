import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function SugarChart({ chartData }) {
  const { after, before, date } = chartData;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Modify the date array to cut the strings to the first 10 characters

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Glucose Breakfast",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust the tension to control the curvature of the line
      },
    },
  };

  const data = {
    labels: date,
    datasets: [
      {
        label: "Before",
        data: after,
        borderColor: "rgba(0, 205, 145, 0.61)",
        backgroundColor: "white",
        yAxisID: "y",
      },
      {
        label: "After",
        data: before,
        borderColor: "rgba(84, 18, 255, 0.68)",
        backgroundColor: "white",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
