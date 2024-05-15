import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function BP_chart({ chartData }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { low, date, high } = chartData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Blood Pressure",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: false,
      },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: date,
    datasets: [
      {
        label: "Low",
        data: low,
        backgroundColor: "rgb(252, 99, 255, 0.7)",
        yAxisID: "y1",
        barPercentage: 0.6, // Adjust the bar width (0.6 means 60% of the available space)
        borderRadius: 10, // Adjust the border radius to make the bars slightly curved
      },
      {
        label: "High",
        data: high,
        backgroundColor: "rgba(99, 99, 255, 0.7)",
        yAxisID: "y1",
        barPercentage: 0.6,
        borderRadius: 10,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
