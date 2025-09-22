import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ParentDashboard.css"; 

import { FaBars, FaHome, FaUserCircle, FaBook,FaSignOutAlt, FaBell, FaMoneyCheck, FaComments } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import ParentCommunication from "./ParentCommunication";
import ParentFees from "./ParentFees";
import ParentNotifications from "./ParentNotifications";
import ChildOverviewDashboard from "./ChildOverviewDashboard";
import ReportsDashboard from "./ReportsDashboard";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ParentDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem("username");
      localStorage.removeItem("user_password");
      navigate("/login"); // redirect to login page
    };
  // Example Parent Data
  const parent = {
    name: "Parent",
    childName: "John Doe",
    attendance: 92,
    monthlyReport: "Good",
    finalReport: "Excellent",
    assignmentsPending: 2,
    testsUpcoming: 1,
    feeStatus: "Partially Paid",
    feeDeductions: "₹2000 (Scholarship)",
    nextDue: "25 Sept 2025",
    alerts: [
      { msg: "Low performance in Math", level: "warning" },
      { msg: "Pending Assignment in Science", level: "danger" },
      { msg: "Fee due reminder", level: "info" },
    ],
  };

  // Chart data (sample)
  const students = [
    { name: "John Doe", scores: [70, 96, 80, 78, 85], attendance: 92 },
    { name: "Jane Smith", scores: [60, 65, 70, 72, 68], attendance: 85 },
    { name: "Alice Johnson", scores: [88, 90, 92, 95, 94], attendance: 97 },
    { name: "Bob Brown", scores: [50, 55, 48, 60, 58], attendance: 72 },
  ];

  // Pie - distribution of average score bands
  const pieData = {
    labels: ["Excellent", "Good", "Average", "Poor"],
    datasets: [
      {
        data: [
          students.filter(s => average(s.scores) >= 85).length,
          students.filter(s => average(s.scores) >= 70 && average(s.scores) < 85).length,
          students.filter(s => average(s.scores) >= 50 && average(s.scores) < 70).length,
          students.filter(s => average(s.scores) < 50).length,
        ],
        backgroundColor: ["#28a745", "#0d6efd", "#ffc107", "#dc3545"],
        hoverOffset: 6,
      },
    ],
  };

  // Line - per student latest score (last test) or trend average
  const lineData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: "Latest Test Score",
        data: students.map(s => s.scores[s.scores.length - 1]),
        tension: 0.3,
        borderColor: "#0d6efd",
        pointBackgroundColor: "#0d6efd",
        fill: false,
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  };
  const lineOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  function average(arr) {
    if (!arr || arr.length === 0) return 0;
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  }

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="d-flex align-items-center gap-3 p-3" style={{ cursor: "pointer" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaUserCircle size={25} />
          {sidebarOpen && <span>Welcome, {parent.name}</span>}
        </div>
        <ul className="list-unstyled mt-4">
          <li onClick={() => setActivePage("dashboard")}><FaHome /> {sidebarOpen && "Dashboard"}</li>
          <li onClick={() => setActivePage("child")}><FaBook /> {sidebarOpen && "Child Overview"}</li>
          <li onClick={() => setActivePage("fees")}><FaMoneyCheck /> {sidebarOpen && "Fees"}</li>
          <li onClick={() => setActivePage("notifications")}><FaBell /> {sidebarOpen && "Notifications"}</li>
          <li onClick={() => setActivePage("communication")}><FaComments /> {sidebarOpen && "Communication"}</li>
          <li onClick={() => setActivePage("reports")}><FaBook /> {sidebarOpen && "Reports"}</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        {/* Header */}
        <div className="header d-flex justify-content-between align-items-center px-3 shadow-sm">
                  {/* Left: Sidebar Toggle */}
                  <div className="d-flex align-items-center">
                    <FaBars size={20} style={{ cursor: "pointer" }} onClick={() => setSidebarOpen(!sidebarOpen)} />
                  </div>
                
                  {/* Center: Page Title */}
                  <h5 className="m-0">
                    {activePage === "dashboard" && "Dashboard"}
                    {activePage === "child" && "Child Overview"}
                    {activePage === "fees" && "fees"}
                    {activePage === "notifications" && "Notifications"}
                    {activePage === "communication" && "Communication"}
                    {activePage === "reports" && "Reports"}
                  </h5>
                
                  {/* Right: Dark Mode Toggle + Logout */}
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ cursor: "pointer", marginTop:"-5px"}} onClick={() => setDarkMode(!darkMode)}>
                      {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
                    </div>
                    <div style={{ cursor: "pointer" }} className="d-flex align-items-center gap-1" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </div>
                  </div>
                </div>

        {activePage=="communication" && <ParentCommunication/> }
        {activePage=="fees" && <ParentFees/> }
        {activePage=="notifications" && <ParentNotifications/>}
        {activePage=="child" && <ChildOverviewDashboard/>}
        {activePage=="reports" && <ReportsDashboard/>}
        
        {/* Dashboard view */}
        {activePage === "dashboard" && (
          <>
            <div className="container-fluid">
              {/* Charts row - two parallel charts with fixed height 380px */}
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="card shadow-sm rounded-4 p-3" style={{ height: 380 }}>
                    <h6 className="mb-3">Performance Distribution</h6>
                    <div style={{ height: "calc(100% - 36px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "100%", maxWidth: 360, height: "100%" }}>
                        <Pie data={pieData} options={pieOptions} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card shadow-sm rounded-4 p-3" style={{ height: 380 }}>
                    <h6 className="mb-3">Latest Test Scores (per student)</h6>
                    <div style={{ height: "calc(100% - 36px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "100%", maxWidth: 720, height: "100%" }}>
                        <Line data={lineData} options={lineOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary cards below charts */}
              <div className="row g-4 mb-4">
                <div className="col-md-3">
                  <div className="card shadow-sm rounded-4 p-3 text-center">
                    <h6 className="mb-1">Avg Score</h6>
                    <div className="fs-4 fw-bold">{Math.round(students.reduce((acc, s) => acc + average(s.scores), 0) / students.length)}%</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow-sm rounded-4 p-3 text-center">
                    <h6 className="mb-1">Top Performer</h6>
                    <div className="fw-semibold">{students.reduce((a, b) => (average(a.scores) > average(b.scores) ? a : b)).name}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow-sm rounded-4 p-3 text-center">
                    <h6 className="mb-1">Low Performer</h6>
                    <div className="fw-semibold">{students.reduce((a, b) => (average(a.scores) < average(b.scores) ? a : b)).name}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow-sm rounded-4 p-3 text-center">
                    <h6 className="mb-1">Pending Assignments</h6>
                    <div className="fs-4 fw-bold">{parent.assignmentsPending}</div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="row g-3">
                <div className="col-12">
                  <div className="card shadow p-3">
                    <h6>Notifications & Reminders</h6>
                    <ul className="list-group list-group-flush">
                      {parent.alerts.map((a, i) => (
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>{a.msg}</span>
                          <span className={`badge ${a.level === "danger" ? "bg-danger" : a.level === "warning" ? "bg-warning text-dark" : "bg-info text-dark"}`}>{a.level.toUpperCase()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other Pages - placeholders; you can replace with full pages */}
       
      </div>
    </div>
  );
}
