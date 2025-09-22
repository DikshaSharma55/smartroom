// ParentNotifications.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaExclamationCircle, FaCheckCircle, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function ParentNotifications() {
  const [notifications, setNotifications] = useState([
    // Performance Alerts
    { type: "performance", message: "Low Attendance Alert", status: "unread" },
    { type: "performance", message: "Low Test Scores Alert", status: "unread" },
    { type: "performance", message: "Missing Assignment Alert", status: "unread" },

    // Fee Alerts
    { type: "fee", message: "Upcoming Fee Due Reminder", status: "unread" },
    { type: "fee", message: "Overdue Fee Warning", status: "unread" },
    { type: "fee", message: "Deduction / Adjustment Notification", status: "unread" },

    // Assignment / Test Alerts
    { type: "assignment", message: "Pending Assignment Reminder", status: "unread" },
    { type: "assignment", message: "Upcoming Test Notification", status: "unread" },
    { type: "assignment", message: "Results Published Alert", status: "unread" },
  ]);

  const handleMarkRead = (idx) => {
    const newNotif = [...notifications];
    newNotif[idx].status = "read";
    setNotifications(newNotif);
  };

  const getIconColor = (type) => {
    switch(type){
      case "performance": return "#dc3545"; // red
      case "fee": return "#ffc107"; // yellow
      case "assignment": return "#0d6efd"; // blue
      default: return "#6c757d";
    }
  };

  const getBackground = (status) => status === "unread" ? "#fff" : "#f8f9fa";

  return (
    <div style={{ minHeight: "100vh", padding: "60px 20px",marginTop:"-40px" }}>

      <div className="container" style={{ maxWidth: "900px", overflowY: "auto" }}>
        {notifications.map((n, idx) => (
          <div key={idx} 
               className={`card mb-3 shadow-sm rounded-4 notification-card`} 
               style={{ borderLeft: `6px solid ${getIconColor(n.type)}`, background: getBackground(n.status), transition: "0.3s" }}
               onClick={() => handleMarkRead(idx)}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FaBell size={26} className={`me-3 bell-icon ${n.status === "unread" ? "ringing" : ""}`} style={{ color: getIconColor(n.type) }}/>
                <div>
                  <span className="fw-semibold">{n.message}</span>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    {n.type === "performance" ? "Performance Alert" : n.type === "fee" ? "Fee Alert" : "Assignment/Test Alert"}
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm rounded-pill">View Details</button>
                <button className="btn btn-outline-success btn-sm rounded-pill">Contact Teacher</button>
                <button className="btn btn-outline-danger btn-sm rounded-pill">Escalate</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline CSS for animations & hover */}
      <style>
        {`
          .notification-card {
            cursor: pointer;
          }
          .notification-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          .bell-icon.ringing {
            animation: ring 1s infinite;
          }
          @keyframes ring {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(15deg); }
            30% { transform: rotate(-10deg); }
            45% { transform: rotate(10deg); }
            60% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
            100% { transform: rotate(0deg); }
          }
          .btn-outline-primary:hover { background: #0d6efd; color: #fff; }
          .btn-outline-success:hover { background: #198754; color: #fff; }
          .btn-outline-danger:hover { background: #dc3545; color: #fff; }
        `}
      </style>
    </div>
  );
}
