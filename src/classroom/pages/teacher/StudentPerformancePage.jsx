import React, { useEffect, useState } from "react";
import { Chart, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
Chart.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export default function TeacherPerformance() {
  const [students, setStudents] = useState([
  { name: "John Doe", score: 85 },
  { name: "Jane Smith", score: 72 },
  { name: "Alice Johnson", score: 90 },
  { name: "Bob Brown", score: 65 },
  { name: "Charlie Davis", score: 78 },
  { name: "Diana Evans", score: 88 },
  { name: "Frank Green", score: 95 },
  { name: "Grace Hall", score: 22 },
  { name: "Henry King", score: 82 },
  { name: "Ivy Lewis", score: 91 },
  { name: "Jack Martin", score: 90 },
  { name: "Karen Nelson", score: 69 },
  { name: "Liam O'Connor", score: 90 },
  { name: "Mia Perez", score: 90 },
  { name: "Noah Quinn", score: 92 },
  { name: "Olivia Roberts", score: 80 },
  { name: "Paul Smith", score: 73 },
  { name: "Quincy Thompson", score: 86 },
  { name: "Rachel Underwood", score: 90 },
  { name: "Samuel Vega", score: 94 },
]);


  const [summary, setSummary] = useState({
    avgScore: 78,
    topPerformer: "Alice Johnson",
    lowPerformer: "Bob Brown",
    pendingAssignments: 4
  });

  // Pie chart data (performance distribution)
  const pieData = {
    labels: ["Excellent (>85)", "Good (70-85)", "Average (50-70)", "Poor (<50)"],
    datasets: [
      {
        label: 'Students Performance',
        data: [
          students.filter(s => s.score > 85).length,
          students.filter(s => s.score > 70 && s.score <= 85).length,
          students.filter(s => s.score > 50 && s.score <= 70).length,
          students.filter(s => s.score <= 50).length,
        ],
        backgroundColor: ["#28a745", "#0d6efd", "#ffc107", "#dc3545"]
      }
    ]
  };

  // Line chart data (per student score trend)
  const lineData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: "Score",
        data: students.map(s => s.score),
        fill: false,
        borderColor: "#0d6efd",
        tension: 0.3,
      }
    ]
  };

  return (
    <div className="container-fluid mt-4 px-4">

      <div className="row g-4 mb-4">
        {/* Pie Chart */}
<div className="col-md-6">
  <div className="card shadow-sm rounded-4 p-3 d-flex flex-column align-items-center justify-content-center" style={{ height: "380px", backgroundColor:"white" }}>
    <h5 className="mb-3 text-center">Performance Distribution</h5>
    <div style={{ width: "100%", maxWidth: "300px", flex: "1 1 auto" }}>
      <Pie data={pieData}  />
    </div>
  </div>
</div>


        {/* Line Chart */}
        <div className="col-md-6" style={{height:"380px"}}>
          <div className="card shadow-sm rounded-4 p-3 h-100">
            <h5 className="mb-3">Student Performance Trend</h5>
            <Line data={lineData} />
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card shadow-sm rounded-4 p-3 text-center" style={{height:"90px"}}>
            <h6>Average Score</h6>
            <p className="mb-0 fs-4">{summary.avgScore}%</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm rounded-4 p-3 text-center" style={{height:"90px"}}>
            <h6>Top Performer</h6>
            <p className="mb-0 fs-6">{summary.topPerformer}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm rounded-4 p-3 text-center" style={{height:"90px"}}>
            <h6>Low Performer</h6>
            <p className="mb-0 fs-6">{summary.lowPerformer}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm rounded-4 p-3 text-center" style={{height:"90px"}}>
            <h6>Pending Assignments</h6>
            <p className="mb-0 fs-4">{summary.pendingAssignments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
