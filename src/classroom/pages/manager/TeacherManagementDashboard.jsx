import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserTie,
  FaUserCheck,
  FaMoneyBillWave,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import "./Dashboard.css";

const TeacherManagementDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) =>
    setActiveSection(activeSection === section ? null : section);

  // Dummy data for demonstration
  const teachers = ["Mr. Sharma", "Ms. Priya", "Mr. Singh"];
  const substitutes = ["Ms. Anjali", "Mr. Raj", "Ms. Kavita"];
  const classes = ["Class 1", "Class 2", "Class 3"];

  const handleAction = (action, item) => {
    alert(`${action}: ${item}`);
  };

  return (
    <div className="container my-5">

      {/* Manage Teachers */}
      <div className="card mb-3 shadow-sm dashboard-card" style={{ borderRadius: "5px" }}>
  <div
    className="card-header d-flex align-items-center gap-2 fw-bold"
    style={{ cursor: "pointer", background: "#66b0ff" }}
    onClick={() => toggleSection("manageTeachers")}
  >
    <FaUserTie size={20} /> Manage Teachers
  </div>

  <div
    className="card-body"
    style={{
      height: activeSection === "manageTeachers" ? "auto" : "0",
      overflow: "hidden",
      transition: "height 0.3s ease"
    }}
  >
    {activeSection === "manageTeachers" && (
      <>
        <h5>Add New Teacher:</h5>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => handleAction("Add Teacher", "New Teacher Form")}
          >
            Open Form
          </button>
        </div>

        <h5>Edit Teacher Details:</h5>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {teachers.map((t, idx) => (
            <button
              key={idx}
              className="btn btn-outline-info"
              onClick={() => handleAction("Edit Teacher", t)}
            >
              {t}
            </button>
          ))}
        </div>

        <h5>Remove Teacher:</h5>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {teachers.map((t, idx) => (
            <button
              key={idx}
              className="btn btn-outline-danger"
              onClick={() => handleAction("Remove Teacher", t)}
            >
              {t}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
</div>


      {/* Assign Substitute Teacher */}
      <div
        className="card mb-3 shadow-sm dashboard-card"
        style={{borderRadius: "5px" }}
      >
        <div
          className="card-header d-flex align-items-center gap-2 fw-bold"
          style={{ cursor: "pointer",background: "#a8e6b8"}}
          onClick={() => toggleSection("substitute")}
        >
          <FaUserCheck size={20} /> Assign Substitute Teacher
        </div>
        {activeSection === "substitute" && (
          <div className="card-body">
            <h5>Select Absent Teacher:</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {teachers.map((t, idx) => (
                <button
                  key={idx}
                  className="btn btn-outline-primary"
                  onClick={() => handleAction("Absent Teacher Selected", t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <h5>Select Substitute Teacher:</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {substitutes.map((sub, idx) => (
                <button
                  key={idx}
                  className="btn btn-outline-success"
                  onClick={() => handleAction("Substitute Teacher Selected", sub)}
                >
                  {sub}
                </button>
              ))}
            </div>

            <button
              className="btn btn-warning"
              onClick={() =>
                alert("Notification sent to Substitute & Students")
              }
            >
              Notify Substitute & Students
            </button>
          </div>
        )}
      </div>

      {/* Salary Management */}
      <div
        className="card mb-3 shadow-sm dashboard-card"
        style={{  borderRadius: "5px" }}
      >
        <div
          className="card-header d-flex align-items-center gap-2 fw-bold"
          style={{ cursor: "pointer", background: "#ffe380"}}
          onClick={() => toggleSection("salary")}
        >
          <FaMoneyBillWave size={20} /> Salary Management
        </div>
        {activeSection === "salary" && (
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleAction("Generate Salary", "Teacher Salary")}
              >
                Generate Salary
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={() => handleAction("Calculate Deductions", "Absences")}
              >
                Calculate Deductions
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() =>
                  handleAction("Send to Admin", "Salary Approval")
                }
              >
                Send for Approval
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Monitor Performance */}
      <div
        className="card mb-3 shadow-sm dashboard-card"
        style={{borderRadius: "5px" }}
      >
        <div
          className="card-header d-flex align-items-center gap-2 fw-bold"
          style={{ cursor: "pointer",background: "#8ce9f9" }}
          onClick={() => toggleSection("performance")}
        >
          <FaChartLine size={20} /> Monitor Performance
        </div>
        {activeSection === "performance" && (
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleAction("Collect Feedback", "Student Feedback")}
              >
                Collect Feedback
              </button>
              <button
                className="btn btn-outline-info"
                onClick={() => handleAction("Review Submissions", "Tests & Assignments")}
              >
                Review Submissions
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => handleAction("Generate Report", "Teacher Performance")}
              >
                Generate Report
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications / Alerts */}
      <div
        className="card mb-3 shadow-sm dashboard-card"
        style={{borderRadius: "5px" }}
      >
        <div
          className="card-header d-flex align-items-center gap-2 fw-bold"
          style={{ cursor: "pointer",background: "#f79aa0" }}
          onClick={() => toggleSection("notifications")}

        >
          <FaBell size={20} /> Notifications / Alerts
        </div>
        {activeSection === "notifications" && (
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button
                className="btn btn-outline-danger"
                onClick={() => handleAction("Attendance Alert", "Teachers Absent")}
              >
                Attendance Alerts
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={() => handleAction("Salary Status Update", "Teachers")}
              >
                Salary Updates
              </button>
              <button
                className="btn btn-outline-info"
                onClick={() => handleAction("Manager/Admin Notice", "Send Notice")}
              >
                Manager/Admin Notices
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherManagementDashboard;
