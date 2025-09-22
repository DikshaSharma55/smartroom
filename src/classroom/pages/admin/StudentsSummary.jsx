import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function StudentsSummary() {
  const students = [
    { id: 1, name: "John Doe", class: "10-A", feesPending: true, attendance: 90 },
    { id: 2, name: "Jane Smith", class: "9-B", feesPending: false, attendance: 70 },
    { id: 3, name: "Ali Khan", class: "8-C", feesPending: false, attendance: 60 },
    { id: 4, name: "Priya Verma", class: "10-B", feesPending: false, attendance: 95 },
    { id: 5, name: "Rohan Mehta", class: "9-C", feesPending: false, attendance: 80 },
    { id: 6, name: "Anita Sharma", class: "11-A", feesPending: false, attendance: 88 },
    { id: 7, name: "Rahul Jain", class: "12-B", feesPending: false, attendance: 76 },
    { id: 8, name: "Meera Joshi", class: "10-C", feesPending: false, attendance: 92 },
    { id: 9, name: "Amit Singh", class: "11-B", feesPending: true, attendance: 65 },
    { id: 10, name: "Simran Kaur", class: "12-C", feesPending: false, attendance: 85 },
    { id: 11, name: "Vikram Patel", class: "8-A", feesPending: true, attendance: 55 },
    { id: 12, name: "Sana Ali", class: "9-A", feesPending: false, attendance: 90 },
    { id: 13, name: "Kabir Khan", class: "10-D", feesPending: true, attendance: 72 },
    { id: 14, name: "Neha Gupta", class: "11-C", feesPending: false, attendance: 94 },
    { id: 15, name: "Aditya Reddy", class: "12-A", feesPending: true, attendance: 68 }
];


  const pieData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [
          students.filter(s => !s.feesPending).length,
          students.filter(s => s.feesPending).length,
        ],
        backgroundColor: ["#28a745", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: "Attendance %",
        data: students.map(s => s.attendance),
        backgroundColor: "#0d6efd",
        borderRadius: 5, // professional rounded bars
        barPercentage: 0.5, // width of bars
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Students Summary</h4>

      {/* Charts Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card shadow p-3" style={{ height: "350px" }}>
            <h6>Fees Status</h6>
            <div style={{ height: "280px" }}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow p-3" style={{ height: "350px" }}>
            <h6>Attendance</h6>
            <div style={{ height: "280px" }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card shadow p-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Fees Status</th>
              <th>Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.feesPending ? "Pending" : "Paid"}</td>
                <td>{student.attendance}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
