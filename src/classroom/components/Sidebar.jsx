import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ darkMode }) {
  return (
    <div
      className={`d-flex flex-column p-3 vh-100 ${
        darkMode ? "bg-secondary text-white" : "bg-light text-dark"
      }`}
      style={{ width: "220px" }}
    >
      <h5 className="mb-4">Menu</h5>
      <Link to="/admin" className="mb-2 text-decoration-none" style={{ color: darkMode ? "#fff" : "#000" }}>
        Dashboard
      </Link>
      <Link to="/admin/teachers" className="mb-2 text-decoration-none" style={{ color: darkMode ? "#fff" : "#000" }}>
        Teachers
      </Link>
      <Link to="/admin/students" className="mb-2 text-decoration-none" style={{ color: darkMode ? "#fff" : "#000" }}>
        Students
      </Link>
      <Link to="/admin/fees" className="mb-2 text-decoration-none" style={{ color: darkMode ? "#fff" : "#000" }}>
        Fees
      </Link>
      <Link to="/admin/reports" className="mb-2 text-decoration-none" style={{ color: darkMode ? "#fff" : "#000" }}>
        Reports
      </Link>
    </div>
  );
}
