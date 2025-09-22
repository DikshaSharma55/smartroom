// ParentFees.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  FaFileInvoiceDollar, 
  FaMoneyBillWave, 
  FaBell, 
  FaCheckCircle,
  FaDownload
} from "react-icons/fa";

export default function ParentFees() {
  const [fees, setFees] = useState({
    annual: 50000,
    installment: 15000,
    paid: 10000,
    due: 40000,
  });

  const [deductions, setDeductions] = useState([
    { type: "Scholarship", amount: 5000 },
    { type: "Late Fee", amount: 500 },
  ]);

  const [alerts, setAlerts] = useState([
    { message: "Installment 2 Due in 5 days", type: "warning" },
    { message: "Annual Fees Overdue!", type: "danger" },
  ]);

  return (
    <div 
      className="fees-page d-flex justify-content-center" 
      style={{ minHeight: "100vh", paddingTop: "40px", paddingBottom: "40px" }}
    >
      <div className="fees-container" style={{ maxWidth: "980px", width: "100%",marginTop:"-40px" }}>


        {/* Fee Status Cards */}
        <div className="row g-4 mb-5">
          {[
            { icon: <FaFileInvoiceDollar size={28} />, label: "Annual Fees", value: fees.annual, color: "#0d6efd" },
            { icon: <FaMoneyBillWave size={28} />, label: "Installment Paid", value: fees.paid, color: "#28a745" },
            { icon: <FaMoneyBillWave size={28} />, label: "Due Amount", value: fees.due, color: "#ffc107" },
            { icon: <FaCheckCircle size={28} />, label: "Total Paid", value: fees.paid, color: "#17a2b8" },
          ].map((item, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card shadow-sm rounded-4 p-4 text-center hover-card" style={{ borderLeft: `5px solid ${item.color}` }}>
                <div className="mb-2" style={{ color: item.color }}>{item.icon}</div>
                <h6 className="mb-1 fw-semibold">{item.label}</h6>
                <p className="m-0 fw-bold">₹ {item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Deductions */}
        <div className="card shadow-sm rounded-4 p-4 mb-5 hover-card">
          <h5 className="fw-semibold mb-3">Deductions</h5>
          <ul className="list-group list-group-flush">
            {deductions.map((d, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2" style={{ background: "#f8f9fa" }}>
                {d.type}
                <span className="badge bg-info text-dark rounded-pill">₹ {d.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pay Fees */}
        <div className="card shadow-sm rounded-4 p-4 mb-5 hover-card">
          <h5 className="fw-semibold mb-3">Pay Fees</h5>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-primary rounded-pill px-4 py-2 hover-scale shadow-sm">Full Payment (Annual)</button>
            <button className="btn btn-success rounded-pill px-4 py-2 hover-scale shadow-sm">Partial Payment (Installment)</button>
          </div>
        </div>

        {/* Fee Alerts */}
        <div className="card shadow-sm rounded-4 p-4 mb-5 hover-card">
          <h5 className="fw-semibold mb-3">Fee Alerts</h5>
          <ul className="list-group list-group-flush">
            {alerts.map((a, idx) => (
              <li key={idx} className={`list-group-item d-flex align-items-center rounded-3 mb-2 text-white`} 
                  style={{ background: a.type === "warning" ? "#ffc107" : "#dc3545" }}>
                <FaBell className="me-2"/>
                {a.message}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Confirmation */}
        <div className="card shadow-sm rounded-4 p-4 mb-5 hover-card">
          <h5 className="fw-semibold mb-2">Payment Confirmation</h5>
          <p className="m-0 text-success fw-semibold">
            <FaCheckCircle className="me-2"/> Your payment was successful!
          </p>
        </div>

        {/* Reports */}
        <div className="card shadow-sm rounded-4 p-4 mb-5 hover-card">
          <h5 className="fw-semibold mb-3">Reports</h5>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary rounded-pill px-3 py-2 hover-scale shadow-sm">
              <FaDownload className="me-1"/> View Payment History
            </button>
            <button className="btn btn-outline-secondary rounded-pill px-3 py-2 hover-scale shadow-sm">
              <FaDownload className="me-1"/> Generate Receipts (PDF / Print)
            </button>
          </div>
        </div>

      </div>

      {/* Inline CSS for hover effects */}
      <style>
        {`
          .hover-card:hover { transform: translateY(-6px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: 0.3s; }
          .hover-scale:hover { transform: scale(1.08); transition: 0.3s; }
          .fees-page::-webkit-scrollbar { display: none; }
        `}
      </style>
    </div>
  );
}
