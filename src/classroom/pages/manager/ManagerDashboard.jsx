import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBars,
  FaMoon,
  FaSignOutAlt,
  FaUsers,
  FaMoneyCheck,
  FaHome,
  FaClipboardList,
  FaBell,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import "./Dashboard.css";
import TeacherManagementDashboard from "./TeacherManagementDashboard";
import ClassTimetableDashboard from "./ClassTimetableDashboard";
import StudentFeesDashboard from "./StudentFeesDashboard";
import AcademicDashboard from "./AcademicDashboard";
import EventsNoticesDashboard from "./EventsNoticesDashboard";
import ReportsDashboard from "./ReportsDashboard";

export default function ManagerDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
    const navigate = useNavigate();
  
  const handleLogout = () => {
      localStorage.removeItem("username");
      localStorage.removeItem("user_password");
      navigate("/login"); // redirect to login page
    };
  // Pie Chart Data
  const pieData = [
    { name: "Teachers", value: 25 },
    { name: "Students", value: 120 },
    { name: "Pending Fees", value: 8 },
    { name: "Events", value: 3 },
  ];
  const pieColors = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

  // Line Chart Data (Example: Classes per Day)
  const lineData = [
    { day: "Mon", classes: 10 },
    { day: "Tue", classes: 12 },
    { day: "Wed", classes: 8 },
    { day: "Thu", classes: 15 },
    { day: "Fri", classes: 11 },
    { day: "Sat", classes: 9 },
  ];

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="d-flex align-items-center gap-3 p-3">
          <FaUsers size={25} />
          {sidebarOpen && <span>Welcome, Manager!</span>}
        </div>
        <ul className="list-unstyled mt-4">
          <li onClick={() => setActivePage("dashboard")} className={activePage === "dashboard" ? "active" : ""}>
            <FaHome /> {sidebarOpen && "Dashboard"}
          </li>
          <li onClick={() => setActivePage("teachers")} className={activePage === "teachers" ? "active" : ""}>
            <FaUsers /> {sidebarOpen && "Teacher Management"}
          </li>
          <li onClick={() => setActivePage("timetable")} className={activePage === "timetable" ? "active" : ""}>
            <FaCalendarAlt /> {sidebarOpen && "Class & Timetable"}
          </li>
          <li onClick={() => setActivePage("fees")} className={activePage === "fees" ? "active" : ""}>
            <FaMoneyCheck /> {sidebarOpen && "Student Fees"}
          </li>
          <li onClick={() => setActivePage("academic")} className={activePage === "academic" ? "active" : ""}>
            <FaClipboardList /> {sidebarOpen && "Academics"}
          </li>
          <li onClick={() => setActivePage("events")} className={activePage === "events" ? "active" : ""}>
            <FaBell /> {sidebarOpen && "Events & Notices"}
          </li>
          <li onClick={() => setActivePage("reports")} className={activePage === "reports" ? "active" : ""}>
            <FaFileAlt /> {sidebarOpen && "Reports"}
          </li>
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
                    {activePage === "teachers" && "Teacher Management"}
                    {activePage === "timetable" && "Class & Timetable"}
                    {activePage === "fees" && "Student Fees Management"}
                    {activePage === "academic" && "Academic Management"}
                    {activePage === "events" && "Events & Notices"}
                    {activePage === "alerts" && "Notifications / Alerts"}
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

        {/* Reports Page */}
        {activePage === "reports" && <ReportsDashboard />}
        
        {/* Events and Notification Page */}
        {activePage === "events" && <EventsNoticesDashboard />}

        {/* Academic Management Page */}
        {activePage === "academic" && <AcademicDashboard />}

        {/* Teacher Management Page */}
        {activePage === "teachers" && <TeacherManagementDashboard />}

        {/* Fees Management Page */}
        {activePage === "fees" && <StudentFeesDashboard />}

        {/* Teacher Management Page */}
        {activePage === "timetable" && < ClassTimetableDashboard/>}

        {/* Dashboard Page */}
        {activePage === "dashboard" && (
          <div className="container mt-4">
            {/* Stats Cards */}
            <div className="row g-3">
              <div className="col-md-3"><div className="card shadow p-3 text-center bg-primary text-white">Teachers: 25</div></div>
              <div className="col-md-3"><div className="card shadow p-3 text-center bg-success text-white">Classes Today: 12</div></div>
              <div className="col-md-3"><div className="card shadow p-3 text-center bg-warning">Pending Fees: 8</div></div>
              <div className="col-md-3"><div className="card shadow p-3 text-center bg-danger text-white">Upcoming Events: 3</div></div>
            </div>

            {/* Charts Section */}
            <div className="row mt-4 g-3">
              <div className="col-md-6">
                <div className="card shadow p-3">
                  <h6 className="text-center">Overall Overview</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" outerRadius={80} label>
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow p-3">
                  <h6 className="text-center">Classes Trend</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="classes" stroke="#0d6efd" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Tables & Events */}
            <div className="row mt-4 g-3">
              <div className="col-md-6">
                <div className="card shadow p-3 hover-card">
                  <h6>Teacher Salary Approvals</h6>
                  <table className="table table-hover">
                    <thead><tr><th>#</th><th>Teacher</th><th>Status</th></tr></thead>
                    <tbody>
                      <tr><td>1</td><td>Ravi Sharma</td><td>Pending</td></tr>
                      <tr><td>2</td><td>Neha Singh</td><td>Sent to Admin</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow p-3 hover-card">
                  <h6>Recent Alerts</h6>
                  <table className="table table-hover">
                    <thead><tr><th>#</th><th>Alert</th><th>Time</th></tr></thead>
                    <tbody>
                      <tr><td>1</td><td>Class 10A Reminder Sent</td><td>5 min before class</td></tr>
                      <tr><td>2</td><td>Performance Report Submitted</td><td>Yesterday</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Events & Reports */}
            <div className="row mt-4 g-3">
              <div className="col-md-6">
                <div className="card shadow p-3 hover-card">
                  <h6>Upcoming Events</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Teacher’s Day</span>
                      <span className="badge bg-primary">Tomorrow</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Science Fair</span>
                      <span className="badge bg-success">Next Week</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow p-3 hover-card">
                  <h6>Reports Summary</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Teacher Performance Reports - Ready</li>
                    <li className="list-group-item">Student Monthly Reports - Pending</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
