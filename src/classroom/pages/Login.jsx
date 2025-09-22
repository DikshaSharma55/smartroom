import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSignInAlt, FaMoon,FaEye, FaEyeSlash } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

export default function Login() {
  const [user_password, setuser_password] = useState("admin");
  const [darkMode, setDarkMode] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
  generateCaptcha();
}, []);

  useEffect(() => {
    const saveduser_password = localStorage.getItem("user_password");
    const savedUsername = localStorage.getItem("username");

    const redirectToDashboard = (user_password) => {
      switch (user_password) {
        case "admin":
          navigate("/admin");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "student":
          navigate("/student");
          break;
        case "parent":
          navigate("/parent");
          break;
        default:
          navigate("/login");
      }
    };

    if (saveduser_password && savedUsername) {
      redirectToDashboard(saveduser_password);
    }
  }, [navigate]);
  const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  setCaptcha(code);
};


  const handleLogin = async () => {
  // 1️⃣ CAPTCHA validation
  if (captchaInput !== captcha) {
    setCaptchaError("❌ CAPTCHA does not match!");
    generateCaptcha();
    setCaptchaInput("");
    return;
  }
  setCaptchaError("");

  try {
    // 2️⃣ Send correct payload (adjust keys as per backend)
    const payload = {
      user_id: username.trim(), // backend expects user_id
  password: password,
  type: user_password,
    };
    console.log("🔄 Sending Login Payload:", payload);

    // const res = await axios.post("http://localhost:3000/login", payload);
    const res = await axios.post("http://localhost:5000/login", payload);


    console.log("✅ Server Response:", res.data);

    if (keepLoggedIn) {
      localStorage.setItem("user_password", user_password);
      localStorage.setItem("username", username);
    }

    const userType = res.data.type || res.data.user_password; // fallback if backend sends "user_password"
    if (!userType) {
      alert("❌ Server did not return a valid user_password.");
      return;
    }

    switch (userType.toLowerCase()) {
      case "admin":
        navigate("/admin");
        break;
      case "manager":
        navigate("/manager");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      case "student":
        navigate("/student");
        break;
      case "parent":
        navigate("/parent");
        break;
      default:
        navigate("/login");
    }
  } catch (err) {
    console.error("❌ Login Error:", err);
    alert("❌ Invalid Username or Password");
  }
};

  return (
    <div
  className={`login-container d-flex justify-content-center align-items-center ${
    darkMode ? "dark-mode" : "light-mode"
  }`}
>
  <div className="form-box">
  <div className="card login-card position-relative shadow-lg p-4 rounded-4">
    {/* 🌗 Dark Mode Toggle */}
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

    <div className="login-header text-center mb-3 d-flex justify-content-center align-items-center gap-2">
      <FaSignInAlt size={30} />
      <h3 className="fw-bold m-0">Login</h3>
    </div>

    {/* ✅ Rest of the form remains same */}


        {/* ✅ Form wrapper with autocomplete off */}
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          {/* user_password Dropdown */}
          <div className="mb-3">
            <label className="form-label">Login as</label>
            <select
              className="form-select"
              value={user_password}
              onChange={(e) => setuser_password(e.target.value)}
            >
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
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
      <label className="form-label">Password</label>
      {/* Hidden dummy field */}
      <input
        type="password"
        style={{ display: "none" }}
        autoComplete="new-password"
      />
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      {/* Eye icon */}
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          top: "70%",
          right: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#495057",
        }}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>

          {/* Keep Logged In + Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="keepLoggedIn">
                Keep me logged in
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-decoration-none text-primary small"
            >
              Forgot password?
            </Link>
          </div>
          {/* CAPTCHA */}
{/* CAPTCHA */}
<div className="mb-3">
  <label className="form-label fw-semibold" style={{marginTop:"2px"}}>To continue,type the characters you see in the picture<span style={{color:"#4dabf7"}}> Why?</span></label>

  <div className="d-flex align-items-center gap-2 mb-2">
    {/* CAPTCHA Display */}
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        flex: "1",
        padding: "10px 20px",
        borderRadius: "8px",
        backgroundColor: "#f1f3f5",
        letterSpacing: "3px",
        fontWeight: "bold",
        fontSize: "20px",
        userSelect: "none",
        minHeight: "50px",
        border: "1px solid #ced4da",
      }}
    >
      {captcha.split("").map((char, index) => (
        <span
          key={index}
          style={{
            transform: `rotate(${Math.floor(Math.random() * 30 - 15)}deg)`,
            display: "inline-block",
          }}
        >
          {char}
        </span>
      ))}
    </div>

    {/* Refresh button */}
    <button
      type="button"
      className="btn btn-outline-primary p-2 d-flex justify-content-center align-items-center"
      onClick={generateCaptcha}
      title="Refresh CAPTCHA"
      style={{ minWidth: "45px", fontSize: "18px" }}
    >
      &#x21bb;
    </button>
  </div>

  {/* Input Field */}
  <input
    type="text"
    className="form-control"
    placeholder="Type the code above"
    value={captchaInput}
    onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
  />

  {/* Error */}
  {captchaError && <small className="text-danger mt-1 d-block">{captchaError}</small>}
</div>


          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className={`text-center mt-3`}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-info fw-bold text-decoration-none"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    <div>
    </div>
    
    <div className="mb-3 text-center">
  <h6>Quick Dashboard Access (Demo)</h6>
</div>

    </div>
  );
}
