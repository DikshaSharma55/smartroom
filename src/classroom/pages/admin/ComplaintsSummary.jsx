import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ComplaintsSummary() {
  const [complaints, setComplaints] = useState([
    { id: 101, title: "Projector Not Working", submittedBy: "John Doe", role: "Teacher", against: "System", category: "Infrastructure", priority: "High", status: "Resolved", assignedTo: "Admin", date: "2025-09-19", lastUpdated: "2025-09-19 10:30" },
    { id: 102, title: "Internet Issue", submittedBy: "Jane Smith", role: "Teacher", against: "System", category: "Infrastructure", priority: "Medium", status: "Resolved", assignedTo: "Admin", date: "2025-09-18", lastUpdated: "2025-09-18 16:45" },
    { id: 103, title: "Library Access Problem", submittedBy: "Ali Khan", role: "Student", against: "Teacher", category: "Other", priority: "High", status: "Escalated", assignedTo: "Manager", date: "2025-09-17", lastUpdated: "2025-09-18 09:20" },
    { id: 104, title: "Salary Delay", submittedBy: "Priya Verma", role: "Teacher", against: "Manager", category: "Salary", priority: "High", status: "Resolved", assignedTo: "Admin", date: "2025-09-16", lastUpdated: "2025-09-16 11:15" },
    { id: 105, title: "Classroom AC Not Working", submittedBy: "Rohan Mehta", role: "Student", against: "System", category: "Infrastructure", priority: "Medium", status: "In Progress", assignedTo: "Manager", date: "2025-09-15", lastUpdated: "2025-09-16 08:50" },
    { id: 106, title: "Assignment Submission Portal Error", submittedBy: "Anita Sharma", role: "Student", against: "System", category: "Software", priority: "High", status: "Resolved", assignedTo: "Admin", date: "2025-09-14", lastUpdated: "2025-09-14 12:40" },
    { id: 107, title: "Misbehaving Teacher Complaint", submittedBy: "Parent: Sunita Rao", role: "Parent", against: "Teacher", category: "Behavior", priority: "High", status: "Escalated", assignedTo: "Admin", date: "2025-09-13", lastUpdated: "2025-09-14 09:00" },
    { id: 108, title: "Late Fee Not Updated", submittedBy: "Amit Singh", role: "Student", against: "Manager", category: "Fees", priority: "Medium", status: "In Progress", assignedTo: "Manager", date: "2025-09-12", lastUpdated: "2025-09-13 10:30" },
    { id: 109, title: "Cafeteria Hygiene Issue", submittedBy: "Teacher: Meera Joshi", role: "Teacher", against: "Cafeteria", category: "Infrastructure", priority: "Low", status: "Resolved", assignedTo: "Admin", date: "2025-09-11", lastUpdated: "2025-09-11 15:20" },
    { id: 110, title: "System Login Error", submittedBy: "Rahul Jain", role: "Manager", against: "System", category: "Software", priority: "High", status: "Pending", assignedTo: "Admin", date: "2025-09-10", lastUpdated: "2025-09-10 09:10" }
]);


  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredComplaints = complaints.filter(
    c =>
      (c.title.toLowerCase().includes(search.toLowerCase()) ||
       c.submittedBy.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || c.status === statusFilter) &&
      (roleFilter === "" || c.role === roleFilter)
  );

  const pieData = {
    labels: ["Pending", "Resolved", "Escalated"],
    datasets: [{
      data: [
        complaints.filter(c => c.status === "Pending").length,
        complaints.filter(c => c.status === "Resolved").length,
        complaints.filter(c => c.status === "Escalated").length
      ],
      backgroundColor: ["#ffc107", "#28a745", "#dc3545"]
    }]
  };

  return (
    <div className="container mt-4">
      <h4>Complaints Dashboard</h4>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow p-3">Total Complaints: {complaints.length}</div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3">Pending: {complaints.filter(c => c.status === "Pending").length}</div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3">Resolved: {complaints.filter(c => c.status === "Resolved").length}</div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3">Escalated: {complaints.filter(c => c.status === "Escalated").length}</div>
        </div>
      </div>

      <div className="row g-3 mb-4">
  {/* Left: Pie Chart */}
  <div className="col-md-6">
    <div className="card shadow p-3">
      <h6 className="mb-3">Complaints Status</h6>
      <div style={{ height: "300px" }}>
        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  </div>

  {/* Right: Complaints Summary */}
  <div className="col-md-6">
    <div className="card shadow p-3" >
      <h6 className="mb-3">Complaints Overview</h6>
      <ul className="list-group list-group-flush" style={{ height: "300px" }}>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pending</span>
          <span className="badge bg-warning text-dark">{complaints.filter(c => c.status === "Pending").length}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Resolved</span>
          <span className="badge bg-success">{complaints.filter(c => c.status === "Resolved").length}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Escalated</span>
          <span className="badge bg-danger">{complaints.filter(c => c.status === "Escalated").length}</span>
        </li>
      </ul>
    </div>
  </div>
</div>

{/* Below: Search / Filters */}
<div className="row g-2 mb-4">
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search by title or name..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  </div>
  <div className="col-md-4">
    <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
      <option value="">Filter by Status</option>
      <option value="Pending">Pending</option>
      <option value="Resolved">Resolved</option>
      <option value="Escalated">Escalated</option>
    </select>
  </div>
  <div className="col-md-4">
    <select className="form-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
      <option value="">Filter by User Type</option>
      <option value="Student">Student</option>
      <option value="Parent">Parent</option>
      <option value="Teacher">Teacher</option>
    </select>
  </div>
</div>


      {/* Complaints Table */}
      <div className="card shadow p-3 mb-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Ticket No</th>
              <th>Date</th>
              <th>Submitted By</th>
              <th>Against</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.date}</td>
                <td>{c.submittedBy}</td>
                <td>{c.against}</td>
                <td>{c.category}</td>
                <td>{c.priority}</td>
                <td>
                  <span className={`badge ${
                    c.status === "Resolved" ? "bg-success" :
                    c.status === "Pending" ? "bg-warning" :
                    "bg-danger"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td>{c.assignedTo || "Not Assigned"}</td>
                <td>{c.lastUpdated}</td>
                <td className="d-flex gap-2 flex-wrap">
                  <button className="btn btn-sm btn-info">View</button>
                  <button className="btn btn-sm btn-warning">Escalate</button>
                  <button className="btn btn-sm btn-success">Resolve</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
