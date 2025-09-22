// Dashboard.jsx
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Labels
const labels = {
  daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
  monthly: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

// Random Data Generator
const randomData = (len) =>
  Array.from({ length: len }, () => Math.floor(Math.random() * 100));

// Dataset Generator
const getData = (type) => ({
  labels: labels[type],
  datasets: [
    {
      label: "Performance",
      data: randomData(labels[type].length),
      backgroundColor: [
        "#FF6B6B",
        "#6BCB77",
        "#4D96FF",
        "#FFD93D",
        "#FF8C32",
        "#00C49F",
        "#845EC2",
        "#D65DB1",
        "#FF9671",
        "#2C73D2",
        "#FFC75F",
        "#F9F871",
      ],
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#fff",
      hoverBackgroundColor: "#000", // fallback hover color
    },
  ],
});

// ChartBox Component
const ChartBox = ({ title, gradient }) => {
  const [view, setView] = useState("daily");

  return (
    <div
      className="p-3 rounded shadow-lg text-white"
      style={{
        background: gradient,
        minHeight: "360px",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-bold m-0">{title}</h5>
        <select
          className="form-select form-select-sm"
          style={{ width: "120px" }}
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="p-2 rounded bg-white">
        <Bar
          data={getData(view)}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#111",
                titleColor: "#fff",
                bodyColor: "#ddd",
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#333",
                  font: { weight: "bold" },
                },
              },
              y: {
                ticks: { color: "#333" },
              },
            },
            animation: {
              duration: 1000,
              easing: "easeOutBounce",
            },
            hover: {
              mode: "index",
              intersect: false,
              animationDuration: 400,
            },
          }}
        />
      </div>
    </div>
  );
};

// Main Dashboard
export default function Dashboard() {
  return (
    <div className="container my-4">
      <div className="row g-4">
        <div className="col-md-6">
          <ChartBox
            title="Assignments"
            gradient="linear-gradient(135deg, #4D96FF, #6BCB77)"
          />
        </div>
        <div className="col-md-6">
          <ChartBox
            title="Tests"
            gradient="linear-gradient(135deg, #FF6B6B, #FFD93D)"
          />
        </div>
        <div className="col-md-6">
          <ChartBox
            title="Attendance"
            gradient="linear-gradient(135deg, #6BCB77, #4D96FF)"
          />
        </div>
        <div className="col-md-6">
          <ChartBox
            title="Overall Performance"
            gradient="linear-gradient(135deg, #FFD93D, #FF6B6B)"
          />
        </div>
      </div>
    </div>
  );
}
