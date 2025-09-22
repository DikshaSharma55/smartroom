import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function TeacherSummary() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Alice Johnson", subject: "Math", class: "10-A", email: "alice@mail.com", phone: "1234567890", status: "Active", salary: 50000, deductions: 2000, bonus: 1000, attendance: 95, leaveRequests: 1 },
    { id: 2, name: "Bob Smith", subject: "Science", class: "9-B", email: "bob@mail.com", phone: "9876543210", status: "On Leave", salary: 48000, deductions: 1000, bonus: 500, attendance: 88, leaveRequests: 0 },
    { id: 3, name: "Carol Lee", subject: "English", class: "8-C", email: "carol@mail.com", phone: "4561237890", status: "Active", salary: 47000, deductions: 0, bonus: 1500, attendance: 92, leaveRequests: 2 },
    { id: 4, name: "David Kumar", subject: "History", class: "10-B", email: "david@mail.com", phone: "3216549870", status: "Active", salary: 46000, deductions: 500, bonus: 800, attendance: 90, leaveRequests: 1 },
    { id: 5, name: "Emily Davis", subject: "Geography", class: "9-C", email: "emily@mail.com", phone: "7890123456", status: "Suspended", salary: 45000, deductions: 0, bonus: 1000, attendance: 94, leaveRequests: 0 },
    { id: 6, name: "Frank Wilson", subject: "Physics", class: "11-A", email: "frank@mail.com", phone: "6549873210", status: "On Leave", salary: 52000, deductions: 1500, bonus: 1200, attendance: 87, leaveRequests: 2 },
    { id: 7, name: "Grace Thomas", subject: "Chemistry", class: "12-B", email: "grace@mail.com", phone: "9873216540", status: "Active", salary: 51000, deductions: 0, bonus: 1300, attendance: 93, leaveRequests: 0 },
    { id: 8, name: "Henry Patel", subject: "Computer Science", class: "10-C", email: "henry@mail.com", phone: "3219876540", status: "Active", salary: 50000, deductions: 1000, bonus: 1500, attendance: 96, leaveRequests: 1 },
    { id: 9, name: "Isabella Singh", subject: "Biology", class: "11-B", email: "isabella@mail.com", phone: "4567890123", status: "Active", salary: 49500, deductions: 0, bonus: 1200, attendance: 91, leaveRequests: 0 },
    { id: 10, name: "Jack Brown", subject: "Math", class: "12-C", email: "jack@mail.com", phone: "1239874560", status: "Active", salary: 50500, deductions: 500, bonus: 1000, attendance: 89, leaveRequests: 1 }
]);


  const [search, setSearch] = useState("");

  const filteredTeachers = teachers.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.class.toLowerCase().includes(search.toLowerCase())
  );

  // Charts Data
  const pieData = {
    labels: ["Active", "On Leave", "Suspended"],
    datasets: [{
      data: [
        teachers.filter(t => t.status === "Active").length,
        teachers.filter(t => t.status === "On Leave").length,
        teachers.filter(t => t.status === "Suspended").length
      ],
      backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      borderWidth: 1,

    }]
  };

  const barData = {
    labels: teachers.map(t => t.name),
    datasets: [{
      label: "Attendance %",
      data: teachers.map(t => t.attendance),
      backgroundColor: "#0d6efd",
      borderRadius: 5, // professional rounded bars
        barPercentage: 0.5, // width of bars
    }]
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

{/* Charts Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card shadow p-3" style={{ height: "350px" }}>
            <h6>Teacher Status</h6>
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

        {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow p-3">Total Teachers: {teachers.length}</div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3">
            On Leave: {teachers.filter(t => t.status === "On Leave").length}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3">
            Pending Leave Requests: {teachers.reduce((acc, t) => acc + t.leaveRequests, 0)}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3">
            Low Attendance: {teachers.filter(t => t.attendance < 75).length}
          </div>
        </div>
      </div>

      
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name, Subject, Class"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Teacher Table */}
      <div className="card shadow p-3 mb-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Status</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Attendance %</th>
              <th>Leave Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>{t.class}</td>
                <td>{t.status}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td>₹{t.salary - t.deductions + t.bonus}</td>
                <td>{t.attendance}%</td>
                <td>{t.leaveRequests}</td>
                <td style={{ minWidth: "280px" }}>
  <div className="d-flex align-items-center gap-2 flex-nowrap">
    <button className="btn btn-sm btn-info">
      <i className="bi bi-eye me-1"></i> View
    </button>
    <button className="btn btn-sm btn-warning">
      <i className="bi bi-pencil-square me-1"></i> Edit
    </button>
    <button className="btn btn-sm btn-success">
      <i className="bi bi-cash-coin me-1"></i> Approve
    </button>
    <button className="btn btn-sm btn-danger">
      <i className="bi bi-trash me-1"></i> Delete
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}
