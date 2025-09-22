  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Login from "./pages/Login";
  import ForgotPassword from "./pages/ForgotPassword";
  import Signup from "./pages/Signup";
  // Placeholder dashboards
  import AdminDashboard from "./pages/admin/AdminDashboard";
  import ManagerDashboard from "./pages/manager/ManagerDashboard";
  import TeacherDashboard from "./pages/teacher/TeacherDashboard";
  import StudentDashboard from "./pages/student/StudentDashboard";
  import ParentDashboard from "./pages/parent/ParentDashboard";

  export default function App() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="*" element={<Login />} /> {/* default redirect */}
        </Routes>
      </Router>
    );
  }
