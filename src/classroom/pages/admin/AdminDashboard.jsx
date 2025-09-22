import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  FaBars, 
  FaUserCircle,  // ✅ Add this
  FaMoon, 
  FaHome, 
  FaUsers, 
  FaMoneyCheck, 
  FaCalendarAlt, 
  FaSignOutAlt,
  FaExclamationCircle 
} from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import StudentsSummary from "./StudentsSummary";
import TeacherSummary from "./TeacherSummary";
import SalaryPage from "./SalaryPage";
import EventsPage from "./EventsPage";
import ComplaintsSummary from "./ComplaintsSummary";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("username");
      localStorage.removeItem("user_password");
      navigate("/login"); // redirect to login page
    };
  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        
  <div
    className="d-flex align-items-center gap-3 p-3"
    style={{ cursor: "pointer" }}
    onClick={() => setSidebarOpen(!sidebarOpen)} // ✅ Toggle sidebar on icon click
  >
    <FaUserCircle size={25} />
    {sidebarOpen && <span>Welcome, Admin!</span>}
  </div>

  <ul className="list-unstyled mt-4">
  <li onClick={() => setActivePage("dashboard")}>
    <FaHome /> {sidebarOpen && "Dashboard"}
  </li>
  <li onClick={() => setActivePage("students")}>
    <FaUsers /> {sidebarOpen && "Students"}
  </li>
  <li onClick={() => setActivePage("teachers")}>
    <FaUsers /> {sidebarOpen && "Teachers"}
  </li>
  <li onClick={() => setActivePage("salary")}>
    <FaMoneyCheck /> {sidebarOpen && "Salary"}
  </li>
  <li onClick={() => setActivePage("events")}>
    <FaCalendarAlt /> {sidebarOpen && "Events"}
  </li>
  <li onClick={() => setActivePage("complaints")}>
    <FaExclamationCircle /> {sidebarOpen && "Complaints"}
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
          <h5 className="m-0 text-truncate header-title">
            {activePage === "dashboard" && "Dashboard"}
              {activePage === "students" && "Students Summary"}
              {activePage === "teachers" && "Teachers Summary"}
              {activePage === "salary" && "Salary Summary"}
              {activePage === "events" && "Events"}
              {activePage === "complaints" && "Complaints"}
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

        {/* Stats Cards */}
        {/* Stats Cards & Tables */}
<div className="container mt-4">
  {activePage === "students" && <StudentsSummary />}
  {activePage === "teachers" && <TeacherSummary />}
  {activePage === "salary" && <SalaryPage />} 
  {activePage === "events" && <EventsPage />}
  {activePage === "complaints" && <ComplaintsSummary />}
  {activePage === "dashboard" && (
    <>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card shadow p-3 hover-card coloumn1">Students: 120</div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 hover-card coloumn1">Teachers: 15</div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 hover-card coloumn1">Pending Fees: 8</div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 hover-card coloumn1">Pending Salary: 2</div>
        </div>
      </div>

      {/* Tables */}
      <div className="row mt-4 g-3">
        <div className="col-md-6">
          <div className="card shadow p-3 hover-card coloumn2">
            <h6>Pending Approvals</h6>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Approve</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>Approve</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-3 hover-card coloumn2">
            <h6>Complaints</h6>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Internet issue</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Projector not working</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )}
</div>

      </div>
    </div>
  );
}
