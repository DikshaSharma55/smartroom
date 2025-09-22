// File: src/classroom/pages/teacher/TeacherSalary.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeacherSalary.css";

export default function TeacherSalary() {
  const [salary, setSalary] = useState({
    currentMonth: "September 2025",
    status: "Pending",
    approvalDate: null,
    gross: 50000,
    net: 48000,
  });

  const [deductions, setDeductions] = useState([
    { type: "Absent >3 times", amount: 1000, note: "Auto deduction" },
    { type: "Late mark", amount: 1000, note: "Repeated late entry" },
  ]);

  const [history, setHistory] = useState([
    { month: "August 2025", gross: 50000, deductions: 1500, net: 48500, status: "Credited" },
    { month: "July 2025", gross: 50000, deductions: 0, net: 50000, status: "Credited" },
  ]);

  const [alerts, setAlerts] = useState([
    "Salary Generated for September 2025",
    "Salary Approved for August 2025",
    "Deduction Alert: Late mark applied",
  ]);

  return (
    <div className="container mt-4">

      {/* Salary Overview */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-gradient">
        <h5><i className="bi bi-wallet2 me-2"></i>Salary Overview</h5>
        <p>Status: <strong>{salary.status}</strong>{salary.approvalDate && <> | Approved On: {salary.approvalDate}</>}</p>
        <p><i className="bi bi-currency-rupee me-1"></i>Gross Salary: <strong>₹{salary.gross}</strong></p>
        <p><i className="bi bi-cash-stack me-1"></i>Net Salary: <strong>₹{salary.net}</strong></p>
      </div>

      {/* Deductions */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-gradient-deduction">
        <h5><i className="bi bi-exclamation-triangle-fill me-2"></i>Deductions</h5>
        {deductions.map((d, idx) => (
          <p key={idx}>
            <strong>{d.type}:</strong> ₹{d.amount} <em>({d.note})</em>
          </p>
        ))}
      </div>

      {/* Payment History */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-gradient-history">
        <h5><i className="bi bi-table me-2"></i>Payment History</h5>
        <div className="table-responsive">
          <table className="table table-sm table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Month</th>
                <th>Gross</th>
                <th>Deductions</th>
                <th>Net</th>
                <th>Status</th>
                <th>Payslip</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, idx) => (
                <tr key={idx} className={h.status === "Pending" ? "highlight-row" : ""}>
                  <td>{h.month}</td>
                  <td>₹{h.gross}</td>
                  <td>₹{h.deductions}</td>
                  <td>₹{h.net}</td>
                  <td>{h.status}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary btn-hover">
                      <i className="bi bi-download me-1"></i>Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications & Alerts */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-gradient-alert">
        <h5><i className="bi bi-bell-fill me-2"></i>Notifications & Alerts</h5>
        <ul className="alert-list">
          {alerts.map((a, idx) => (
            <li key={idx}><i className="bi bi-exclamation-circle me-1"></i>{a}</li>
          ))}
        </ul>
      </div>

      {/* Queries / Escalation */}
      <div className="card shadow-sm rounded-4 mb-4 p-3 card-gradient-query">
        <h5><i className="bi bi-question-circle-fill me-2"></i>Queries / Escalation</h5>
        <button className="btn btn-warning mb-2 btn-hover">
          <i className="bi bi-arrow-up-right-circle me-1"></i>Raise Salary Query
        </button><br/>
        <p>View previous queries and responses here.</p>
      </div>
    </div>
  );
}
