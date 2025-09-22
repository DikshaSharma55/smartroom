import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars, FaHome,FaSignOutAlt , FaUserCircle, FaBook, FaClipboardList, FaClipboardCheck, FaBell, FaMoneyCheck } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import TeacherAttendance from "./TeacherAttendance";
import TeacherClasses from "./TeacherClasses";
import TeacherAcademicUploads from "./TeacherAcademicUploads";
import StudentPerformancePage from "./StudentPerformancePage.jsx";
import TeacherSalary from "./TeacherSalary.jsx";
import TeacherNotifications from "./TeacherNotifications.jsx";

export default function TeacherDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_password");
    navigate("/login"); // redirect to login page
  };


  // Example data
  const teacher = {
    name: "Teacher",
    todayClasses: 3,
    studentsPresent: 45,
    pendingAttendance: 10,
    upcomingClasses: 2,
    assignmentsUploaded: 5,
    testsUploaded: 3,
    notesUploaded: 8,
    avgFeedback: 4.5,
    pendingResults: 2,
    salaryStatus: "Paid",
    salaryDeduction: 0,
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : "light-mode"}`}>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="d-flex align-items-center gap-3 p-3" style={{ cursor: "pointer" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaUserCircle size={25} />
          {sidebarOpen && <span>Welcome, {teacher.name}</span>}
        </div>
        <ul className="list-unstyled mt-4">
          <li onClick={() => setActivePage("dashboard")}><FaHome /> {sidebarOpen && "Dashboard"}</li>
          <li onClick={() => setActivePage("attendance")}><FaClipboardCheck /> {sidebarOpen && "Attendance"}</li>
          <li onClick={() => setActivePage("classes")}><FaBook /> {sidebarOpen && "Classes"}</li>
          <li onClick={() => setActivePage("uploads")}><FaClipboardList /> {sidebarOpen && "Academic Uploads"}</li>
          <li onClick={() => setActivePage("performance")}><FaBook /> {sidebarOpen && "Student Performance"}</li>
          <li onClick={() => setActivePage("salary")}><FaMoneyCheck /> {sidebarOpen && "Salary"}</li>
          <li onClick={() => setActivePage("notifications")}><FaBell /> {sidebarOpen && "Notifications"}</li>
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
  <h5 className="m-0 text-truncate header-title">
    {activePage === "dashboard" && "Dashboard"}
    {activePage === "attendance" && "Attendance"}
    {activePage === "classes" && "Classes"}
    {activePage === "uploads" && "Academic Uploads"}
    {activePage === "performance" && "Student Performance"}
    {activePage === "salary" && "Salary"}
    {activePage === "notifications" && "Notifications"}
  </h5>

  {/* Right: Dark Mode Toggle + Logout */}
  <div className="d-flex align-items-center gap-3">
    <div style={{ cursor: "pointer", marginTop:"-10px"}} onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
    </div>
    <div style={{ cursor: "pointer" }} className="d-flex align-items-center gap-1" onClick={handleLogout}>
      <FaSignOutAlt /> Logout
    </div>
  </div>
</div>


        {activePage=="attendance" && <TeacherAttendance/>}
        {activePage=="classes" && <TeacherClasses/>}
        {activePage=="uploads" && <TeacherAcademicUploads/>}
        {activePage=="performance" && <StudentPerformancePage/>}
        {activePage=="salary" && <TeacherSalary/>}
        {activePage=="notifications" && <TeacherNotifications/>}


        {/* Dashboard Widgets */}
        {activePage === "dashboard" && (
          <>
{/* Top Row: Attendance, Class Overview, Uploads */}
<div className="container-fluid">
  <div className="row g-4 mb-4 justify-content-center">
    {/* Attendance Summary */}
    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm h-100 p-3 d-flex flex-column justify-content-between"
           style={{ borderRadius: "12px",marginTop:"10px", minHeight: "180px", background: "linear-gradient(135deg, #28a745, #198754)", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Attendance Summary</h6>
          <i className="bi bi-people-fill"></i>
        </div>
        <p className="mb-1">Today's Classes: <strong>{teacher.todayClasses}</strong></p>
        <p className="mb-1">Students Present: <strong>{teacher.studentsPresent}</strong></p>
        <p className="mb-0">Pending Attendance: <strong>{teacher.pendingAttendance}</strong></p>
      </div>
    </div>

    {/* Class Overview */}
    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm h-100 p-3 d-flex flex-column justify-content-between"
           style={{ borderRadius: "12px",marginTop:"10px", minHeight: "180px", background: "linear-gradient(135deg, #0d6efd, #0a58ca)", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Class Overview</h6>
          <i className="bi bi-journal-text"></i>
        </div>
        <p className="mb-1">Upcoming Classes: <strong>{teacher.upcomingClasses}</strong></p>
        <p className="mb-0">Next Class: <strong>Math - 10:00 AM</strong></p>
      </div>
    </div>

    {/* Academic Uploads */}
    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm h-100 p-3 d-flex flex-column justify-content-between"
           style={{ borderRadius: "12px",marginTop:"10px", minHeight: "180px", background: "linear-gradient(135deg, #ffc107, #e0a800)", color: "#212529" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Uploads Status</h6>
          <i className="bi bi-cloud-upload-fill"></i>
        </div>
        <p className="mb-1">Assignments Uploaded: <strong>{teacher.assignmentsUploaded}</strong></p>
        <p className="mb-1">Tests Uploaded: <strong>{teacher.testsUploaded}</strong></p>
        <p className="mb-0">Notes Uploaded: <strong>{teacher.notesUploaded}</strong></p>
      </div>
    </div>
  </div>
</div>

{/* Bottom Row: Salary, Reports, Student Performance */}
<div className="container-fluid">
  <div className="row g-4 mb-4 justify-content-center">
    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm h-100 p-3 d-flex flex-column justify-content-between"
           style={{ borderRadius: "12px", minHeight: "150px", background: "linear-gradient(135deg, #6c757d, #495057)", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Salary Status</h6>
          <i className="bi bi-cash-stack"></i>
        </div>
        <p className="mb-1">Status: <strong>{teacher.salaryStatus}</strong></p>
        <p className="mb-0">Deduction: <strong>₹{teacher.salaryDeduction}</strong></p>
      </div>
    </div>

    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm h-100 p-3 d-flex flex-column justify-content-between"
           style={{ borderRadius: "12px", minHeight: "180px", background: "linear-gradient(135deg, #6f42c1, #5a32a3)", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Reports</h6>
          <i className="bi bi-file-earmark-bar-graph-fill"></i>
        </div>
        <p className="mb-1">Generated Reports: <strong>{teacher.generatedReports}</strong></p>
        <p className="mb-1">Pending Feedback Reports: <strong>{teacher.pendingReports}</strong></p>
        <p className="mb-0">Last Generated: <strong>{teacher.lastReportDate}</strong></p>
      </div>
    </div>

    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm h-100 p-3 d-flex flex-column justify-content-between"
           style={{ borderRadius: "12px", minHeight: "180px", background: "linear-gradient(135deg, #198754, #14532d)", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Student Performance</h6>
          <i className="bi bi-bar-chart-fill"></i>
        </div>
        <p className="mb-1">Avg Feedback: <strong>{teacher.avgFeedback}</strong></p>
        <p className="mb-0">Pending Results: <strong>{teacher.pendingResults}</strong></p>
      </div>
    </div>
  </div>
</div>


            {/* Notifications */}
            <div className="row g-3" style={{ maxWidth: "100%", margin: "-15px auto" }}>
              <div className="col-12">
                <div className="card shadow p-3">
                  <h6>Notifications & Reminders</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Upcoming Class Reminder</span>
                      <span className="badge bg-info text-dark">10 min</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Salary Update</span>
                      <span className="badge bg-warning text-dark">Today</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Admin Alert</span>
                      <span className="badge bg-danger">High</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
