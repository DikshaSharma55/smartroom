// File: src/classroom/pages/teacher/TeacherNotifications.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./TeacherNotifications.css"; // for custom colors & hover effects
import './TeacherNotifications.css';

export default function TeacherNotifications() {
  const [notifications, setNotifications] = useState({
    classReminders: [
      { time: "10 min before", message: "Math 10A starting soon", action: "Join Class" },
      { time: "5 min before", message: "Science 12B starting soon", action: "Open Attendance" },
    ],
    attendanceAlerts: [
      { message: "You missed marking your attendance", type: "warning" },
      { message: "Final attendance submitted successfully", type: "success" },
      { message: "Attendance window closed for 10A", type: "danger" },
    ],
    salaryPerformance: [
      { message: "Absent > 3 times → Salary Deduction", type: "danger" },
      { message: "Manager feedback received", type: "info" },
      { message: "Monthly student feedback summary available", type: "success" },
    ],
    eventsNotices: [
      { message: "New PTM scheduled", type: "info" },
      { message: "Room changed for Science 12B", type: "warning" },
    ],
    system: [
      { message: "Assignment uploaded successfully", type: "success" },
      { message: "Pending test upload reminder", type: "warning" },
      { message: "System update: New features available", type: "info" },
    ],
  });

  const typeColor = (type) => {
    switch (type) {
      case "success": return "text-success";
      case "info": return "text-primary";
      case "warning": return "text-warning";
      case "danger": return "text-danger";
      default: return "";
    }
  };

  return (
    <div className="container mt-4">
      {/* <h4 className="mb-4 text-center">Teacher Notifications Dashboard</h4> */}

      {/* Class Reminders */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-reminder">
        <h5><i className="bi bi-bell-fill me-2 text-warning"></i>Class Reminders</h5>
        <ul className="list-group list-group-flush">
          {notifications.classReminders.map((n, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i className="bi bi-clock-history me-2 text-warning"></i>
                {n.message} ({n.time})
              </div>
              <button className="btn btn-sm btn-success">{n.action}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Attendance Alerts */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-attendance">
        <h5><i className="bi bi-exclamation-triangle-fill me-2 text-danger"></i>Attendance Alerts</h5>
        <ul className="list-group list-group-flush">
          {notifications.attendanceAlerts.map((n, idx) => (
            <li key={idx} className={`list-group-item ${typeColor(n.type)}`}>
              <i className="bi bi-info-circle me-2"></i>{n.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Salary & Performance Alerts */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-salary">
        <h5><i className="bi bi-cash-stack me-2 text-success"></i>Salary / Performance Alerts</h5>
        <ul className="list-group list-group-flush">
          {notifications.salaryPerformance.map((n, idx) => (
            <li key={idx} className={`list-group-item ${typeColor(n.type)}`}>
              <i className="bi bi-graph-up me-2"></i>{n.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Events & Notices */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-events">
        <h5><i className="bi bi-calendar-event-fill me-2 text-primary"></i>Events & Notices</h5>
        <ul className="list-group list-group-flush">
          {notifications.eventsNotices.map((n, idx) => (
            <li key={idx} className={`list-group-item ${typeColor(n.type)}`}>
              <i className="bi bi-megaphone me-2"></i>{n.message}
            </li>
          ))}
        </ul>
      </div>

      {/* System Notifications */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-system">
        <h5><i className="bi bi-gear-fill me-2 text-secondary"></i>System Notifications</h5>
        <ul className="list-group list-group-flush">
          {notifications.system.map((n, idx) => (
            <li key={idx} className={`list-group-item ${typeColor(n.type)}`}>
              <i className="bi bi-laptop-fill me-2"></i>{n.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
