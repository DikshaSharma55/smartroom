import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaGraduationCap } from "react-icons/fa";
export default function FinalReportPage() {
  // Example student data
  const student = {
    name: "Vijay",
    grade: "10th",
    attendance: 92,
    daysPresent: 180,
    averageMarks: 85,
    pendingAssignments: 2,
    upcomingTests: 2,
    feesPending: 5000,
    record:"Excellent",
  };

  return (
    <div className="container my-5">
      {/* Student Info */}

    <div
    className="d-flex align-items-center mb-4 p-3 shadow-sm"
    style={{ backgroundColor: "#f8fafc", borderRadius: "12px", gap: "15px" }}
    >
    {/* User */}
    <div className="d-flex  align-items-center">
        <FaUserCircle size={40} style={{ color: "#0a192f" }} />
        <span style={{ fontWeight: "600", fontSize: "1rem", color: "#0a192f", marginLeft:"12px" }}>Vijay</span>
    </div>

    {/* Class */}
    <div className="d-flex  align-items-center">
        <FaGraduationCap size={40} style={{ color: "#0a192f" , marginLeft:"40px" }} />
        <span style={{ fontWeight: "600", fontSize: "1rem", color: "#0a192f" , marginLeft:"12px" }}>Class 10th</span>
    </div>
    </div>


      {/* Performance Cards */}
      <div className="row g-3 mb-4">
        {/* Attendance */}
        <div className="col-md-3 text-center">
          <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center align-items-center">
            <div
              className="rounded-circle border border-3 border-success d-flex justify-content-center align-items-center mb-2"
              style={{ width: "80px", height: "80px" }}
            >
              <h5>{student.attendance}%</h5>
            </div>
            <h6>Attendance</h6>
            <small>Days Present: {student.daysPresent}</small>
          </div>
        </div>

        {/* Average Marks */}
        <div className="col-md-3 text-center">
          <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center align-items-center">
            <div
              className="rounded-circle border border-3 border-primary d-flex justify-content-center align-items-center mb-2"
              style={{ width: "80px", height: "80px" }}
            >
              <h5>{student.averageMarks}%</h5>
            </div>
            <h6>Average Marks</h6>
            <small>Performance:{student.record}</small>
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="col-md-3 text-center">
          <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center align-items-center">
            <div
              className="rounded-circle border border-3 border-warning d-flex justify-content-center align-items-center mb-2"
              style={{ width: "80px", height: "80px" }}
            >
              <h5>{student.pendingAssignments}</h5>
            </div>
            <h6>Pending Assignments</h6>
            <small>Due Today: {student.pendingAssignments}</small>
          </div>
        </div>

        {/* Fees Pending */}
        <div className="col-md-3 text-center">
          <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center align-items-center">
            <div
              className="rounded-circle border border-3 border-danger d-flex justify-content-center align-items-center mb-2"
              style={{ width: "80px", height: "80px" }}
            >
              <h5>₹{student.feesPending}</h5>
            </div>
            <h6>Fees Pending</h6>
            <small>Clear to continue</small>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="card shadow p-3">
        <h5>Detailed Summary</h5>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Test Marks</th>
              <th>Assignments Submitted</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mathematics</td>
              <td>88%</td>
              <td>5/5</td>
            </tr>
            <tr>
              <td>Science</td>
              <td>82%</td>
              <td>4/5</td>
            </tr>
            <tr>
              <td>English</td>
              <td>90%</td>
              <td>5/5</td>
            </tr>
            <tr>
              <td>History</td>
              <td>80%</td>
              <td>3/4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
