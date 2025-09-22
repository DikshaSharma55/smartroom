import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs"; 
import { Link, useNavigate } from "react-router-dom";

import "./Login.css"; // reuse same CSS for theme

export default function ForgotPassword() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
  className={`login-container d-flex justify-content-center align-items-center vh-100 ${
    darkMode ? "dark-mode" : "light-mode"
  }`}
>
  <div className={`card forgot-card shadow-lg position-relative`}>
    
    {/* Theme Toggle */}
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
<div className="login-header text-center mb-3 d-flex justify-content-center align-items-center gap-2">
  <FaEnvelope
    size={30}
    style={{ color: darkMode ? "#ffffff" : "#0a192f" }} // visible in both themes
  />
  <h3 className="fw-bold m-0" >
    Forgot Password
  </h3>
</div>


    {/* Email Input */}
    <div className="mb-3">
      <label className="form-label">Enter your registered email</label>
      <input type="email" className="form-control" placeholder="Email Address" />
    </div>

    {/* Reset Button */}
    <button className="btn btn-primary w-100 rounded-pill">Send Reset Link</button>

    {/* Back to Login */}
    <p className={`text-center mt-3 ` }>
      Remember your password?{" "}
      <Link to="/login" className="text-info fw-bold text-decoration-none">
        Login
      </Link>
    </p>
  </div>
</div>

  );
}
