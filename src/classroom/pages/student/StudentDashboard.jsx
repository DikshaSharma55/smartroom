import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars,FaRegCheckSquare ,FaSignOutAlt,FaHome, FaUserCircle, FaBook, FaMoneyCheck, FaClipboardList, FaFileAlt, FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import StudentCertificates from "./StudentCertificates";
import AttendancePage from "./AttendancePage";
import StudentFees from "./StudentFees";
import StudentAssignments from "./StudentAssignments";
import TestPage from "./TestPage";
import FinalReportPage from "./FinalReportPage";

export default function StudentDashboard() {
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
  const student = {
    name: "John Doe",
    grade: "10th",
    attendance: 92,
    pendingAssignments: 3,
    upcomingTests: 2,
    feesPending: 500,
    daysPresent:247,
    performance:"A+",
    record:"Good",
    assignmentsDueToday:1,
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : "light-mode"}`}>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="d-flex align-items-center gap-3 p-3" style={{ cursor: "pointer" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaUserCircle size={25} />
          {sidebarOpen && <span>Welcome, Student !</span>}
        </div>
        <ul className="list-unstyled mt-4">
          <li onClick={() => setActivePage("dashboard")}><FaHome /> {sidebarOpen && "Dashboard"}</li>
          <li onClick={() => setActivePage("certificates")}><FaFileAlt /> {sidebarOpen && "Certificates"}</li>
          <li onClick={() => setActivePage("attendance")}><FaRegCheckSquare  /> {sidebarOpen && "Attendance"}</li>
          <li onClick={() => setActivePage("fees")}><FaMoneyCheck /> {sidebarOpen && "Fees"}</li>
          <li onClick={() => setActivePage("assignments")}><FaClipboardList /> {sidebarOpen && "Assignments"}</li>
          <li onClick={() => setActivePage("tests")}><FaClipboardCheck /> {sidebarOpen && "Tests"}</li>
          <li onClick={() => setActivePage("report")}><FaBook /> {sidebarOpen && "Final Report Card"}</li>
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
                  {activePage === "certificates" && "Certificates"}
                  {activePage === "attendance" && "Attendance"}
                  {activePage === "fees" && "Fees"}
                  {activePage === "assignments" && "Assignments"}
                  {activePage === "tests" && "Tests"}
                  {activePage === "report" && "Final Report Card"}
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
{/* Top Cards / Stats */}

{activePage ==="certificates" && <StudentCertificates/>}
{activePage ==="attendance" && <AttendancePage/>}
{activePage ==="fees" && <StudentFees/>}
{activePage ==="assignments" && <StudentAssignments/>}
{activePage ==="tests" && <TestPage/>}
{activePage ==="report" && <FinalReportPage/>}

{activePage === "dashboard" && (
  <div className="row g-3 mb-4 justify-content-center" style={{ maxWidth: "95%", margin: "0 auto" }}>
    {/* Attendance */}
    <div className="col-md-3">
      <div className="card shadow p-3 h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: "#28a745", color: "white", minHeight: "180px" }}>
        <div>
          <h6>Attendance</h6>
          <h3>{student.attendance}%</h3>
          <div className="progress mt-2" style={{ height: "5px" }}>
            <div className="progress-bar bg-light" style={{ width: `${student.attendance}%` }} />
          </div>
        </div>
        <small>Days Present: {student.daysPresent}</small>
      </div>
    </div>

    {/* Pending Assignments */}
    <div className="col-md-3">
      <div className="card shadow p-3 h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: "#198754", color: "white", minHeight: "180px" }}>
        <div>
          <h6>Pending Assignments</h6>
          <h3>{student.pendingAssignments}</h3>
        </div>
        <small>Due Today: {student.assignmentsDueToday}</small>
      </div>
    </div>

    {/* Upcoming Tests */}
    <div className="col-md-3">
      <div className="card shadow p-3 h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: "#0d6efd", color: "white", minHeight: "180px" }}>
        <div>
          <h6>Upcoming Tests</h6>
          <h3>{student.upcomingTests}</h3>
        </div>
        <small>Next: {student.nextTestName} ({student.nextTestDate})</small>
      </div>
    </div>

    {/* Fees Pending */}
    <div className="col-md-3">
      <div className="card shadow p-3 h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: "#ffc107", color: "black", minHeight: "180px" }}>
        <div>
          <h6>Fees Pending</h6>
          <h3>₹{student.feesPending}</h3>
        </div>
        <small>Due Date: {student.feesDueDate}</small>
      </div>
    </div>
  </div>
)}

{/* Notifications / Reminders below widgets */}
{activePage === "dashboard" && (
  <div className="row g-3" style={{ maxWidth: "95%", margin: "20px auto 0 auto" }}>
    <div className="col-12">
      <div className="card shadow p-3">
        <h6>Notifications & Reminders</h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span>Submit Math Assignment</span>
            <span className="badge bg-warning text-dark">Due Today</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Upcoming Science Test</span>
            <span className="badge bg-info text-dark">Tomorrow</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Fee Due Reminder</span>
            <span className="badge bg-danger">Due in 3 days</span>
          </li>
        </ul>
      </div><br></br>
      <div className="row g-3 justify-content-center" style={{ maxWidth: "95%", margin: "0 auto" }}>
  
  {/* Attendance Card */}
  <div className="col-md-4 text-center">
    <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center align-items-center">
      <div
        className="rounded-circle border border-3 border-success d-flex justify-content-center align-items-center mb-2"
        style={{ width: "80px", height: "80px" }}
      >
        <h5>{student.attendance}%</h5>
      </div>
      <h6>Attendance</h6>
      <small>Days Present: {student.daysPresent}</small>
    </div>
  </div>

  {/* Performance Card */}
  <div className="col-md-4 text-center">
    <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center align-items-center">
      <div
        className="rounded-circle border border-3 border-primary d-flex justify-content-center align-items-center mb-2"
        style={{ width: "80px", height: "80px" }}
      >
        <h5>{student.performance}</h5>
      </div>
      <h6>Performance</h6>
      <small>Average Marks:{student.record}</small>
    </div>
  </div>

  {/* Pending Assignments Card */}
  <div className="col-md-4 text-center">
    <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center align-items-center">
      <div
        className="rounded-circle border border-3 border-warning d-flex justify-content-center align-items-center mb-2"
        style={{ width: "80px", height: "80px" }}
      >
        <h5>{student.pendingAssignments}</h5>
      </div>
      <h6>Pending Assignments</h6>
      <small>Due Today: {student.assignmentsDueToday}</small>
    </div>
  </div>

</div>


    </div>
  </div>
)}
      </div>
    </div>
  );
}

       