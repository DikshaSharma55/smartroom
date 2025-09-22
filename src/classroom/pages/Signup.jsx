import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserPlus, FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./Login.css"; // reuse same CSS for theme

export default function Signup() {
  const [role, setRole] = useState("student");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={` hello login-container d-flex justify-content-center align-items-center vh-100 ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className={`card forgot-card shadow-lg position-relative`}>
        
        {/* Theme Toggle Icon */}
                <div
                  className="position-absolute top-0 end-0 p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <BsSun size={22} style={{ color: "yellow" }} />
                  ) : (
                    <FaMoon size={20} className="text-secondary" />
                  )}
                  </div>

        {/* Icon + Title */}
        <div className="text-center mb-3 d-flex justify-content-center align-items-center gap-2">
          <FaUserPlus size={30} />
          <h3 className="fw-bold m-0">
            Sign Up
          </h3>
        </div>

        {/* Role Dropdown */}
        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Enter username" />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" placeholder="Confirm password" />
        </div>

        {/* Signup Button */}
        <button className="btn btn-primary w-100 rounded-pill">Sign Up</button>

        {/* Back to Login */}
        <p className={`text-center mt-3 `}>
          Already have an account?{" "}
          <Link to="/login" className="text-info fw-bold text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
