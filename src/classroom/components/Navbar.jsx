import React from "react";
import { FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_password");

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <nav
      className={`d-flex justify-content-between align-items-center p-3 shadow-sm ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      <h4>SmartClass Admin</h4>
      <div className="d-flex align-items-center gap-3">
        {/* Dark/Light Mode Toggle */ }
        <div style={{ cursor: "pointer" }} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BsSun size={22} className="text-white" /> : <FaMoon size={22} />}
        </div>

        {/* Logout Button */}
        <button
          className="btn btn-outline-danger d-flex align-items-center"
          onClick={handleLogout}
        >
          <BiLogOut size={20} className="me-1" />
          Logout
        </button>
      </div>
    </nav>
  );
}
