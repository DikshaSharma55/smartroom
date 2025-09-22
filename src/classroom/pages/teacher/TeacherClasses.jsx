// src/classroom/pages/teacher/TeacherClasses.jsx
import React, { useState } from "react";
import { Video } from "lucide-react";
import "./TeacherClasses.css";

const TeacherClasses = () => {
  const [activeTab, setActiveTab] = useState("today");

  const classesToday = [
    {
      id: 1,
      subject: "Mathematics",
      section: "10-A",
      startTime: "09:00 AM",
      endTime: "09:45 AM",
      room: "Room 101",
      status: "Upcoming",
      online: false,
    },
    {
      id: 2,
      subject: "Science",
      section: "10-A",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      room: "Online",
      status: "Live",
      online: true,
    },
    {
      id: 3,
      subject: "English",
      section: "10-A",
      startTime: "11:00 AM",
      endTime: "11:45 AM",
      room: "Room 102",
      status: "Completed",
      online: false,
    },
  ];

  return (
    <div className="teacher-page container py-4">
      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "today" ? "active" : ""}`}
            onClick={() => setActiveTab("today")}
          >
            Today's Classes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "timetable" ? "active" : ""}`}
            onClick={() => setActiveTab("timetable")}
          >
            Timetable
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "alerts" ? "active" : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            Reminders & Alerts
          </button>
        </li>
      </ul>

      {/* TAB: TODAY */}
      {activeTab === "today" && (
        <div className="row g-3">
          {classesToday.map((cls) => (
            <div key={cls.id} className="col-12">
              <div className="card shadow-sm class-card">
                <div className="card-body d-flex flex-column flex-md-row justify-content-between">
                  <div>
                    <h5 className="card-title mb-1">
                      {cls.subject} ({cls.section})
                    </h5>
                    <p className="mb-1 text-muted">
                      {cls.startTime} - {cls.endTime} | {cls.room}
                    </p>
                    <span className={`badge status-badge ${cls.status.toLowerCase()}`}>
                      {cls.status}
                    </span>
                  </div>
                  <div className="mt-3 mt-md-0">
                    {cls.online && (
                      <button className="btn btn-primary btn-sm me-2">
                        <Video size={14} className="me-1" /> Join
                      </button>
                    )}
                    <button className="btn btn-success btn-sm me-2">
                      Start Class
                    </button>
                    <button className="btn btn-dark btn-sm">
                      Mark Attendance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: TIMETABLE */}
      {activeTab === "timetable" && (
  <div className="card shadow-sm p-3">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0">Weekly Timetable</h5>
      <input
        type="text"
        className="form-control w-50 search-panel"
        placeholder="Search Subject or Section"
      />
    </div>

    <div className="table-responsive">
      <table className="table table-bordered align-middle text-center timetable-table">
        <thead className="table-light">
          <tr>
            <th>Day</th>
            <th>Period 1 (09:00-09:45)</th>
            <th>Period 2 (10:00-10:45)</th>
            <th>Period 3 (11:00-11:45)</th>
            <th>Period 4 (12:15-1:00)</th>
            <th>Period 5 (1:00-01:45)</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              day: "Monday",
              classes: [
                "Math",
                "Science",
                "English ",
                "Socail Studies",
                "Computer",
              ],
            },
            {
              day: "Tuesday",
              classes: [
                "Physics",
                "Socail Studies",
                "Chemistry",
                "English",
                "Math",
              ],
            },
            {
              day: "Wednesday",
              classes: [
                "Biology",
                "Math",
                "Socail Studies",
                "Geography",
                "Science Lab",
              ],
            },
            {
              day: "Thursday",
              classes: [
                "Socail Studies",
                "English",
                "Computer",
                "Physics",
                "History",
              ],
            },
            {
              day: "Friday",
              classes: [
                "Math",
                "Chemistry",
                "PT / Sports",
                "Socail Studies",
                "Science",
              ],
            },
            {
              day: "Saturday",
              classes: [
                "Workshop",
                "Club Activity",
                "Seminar",                
                "Early Dismissal",
                "Games",
              ],
            },
          ].map((row, index) => (
            <tr
              key={index}
              className={new Date().toLocaleDateString("en-US", { weekday: "long" }) === row.day ? "current-day" : ""}
            >
              <td className="fw-bold">{row.day}</td>
              {row.classes.map((cls, idx) => (
                <td key={idx}>{cls}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-3 d-flex justify-content-end">
      <button className="btn btn-outline-dark btn-sm me-2">Export PDF</button>
      <button className="btn btn-dark btn-sm">Print</button>
    </div>
  </div>
)}


      {/* TAB: ALERTS */}
      {activeTab === "alerts" && (
        <div className="card shadow-sm p-3">
          <h5 className="mb-3">Reminders & Alerts</h5>
          <div className="alert alert-warning">⏰ Science class starts in 10 min</div>
          <div className="alert alert-danger">📢 Room Change: Math → Room 103</div>
          <div className="alert alert-info">🧑‍🏫 Substitute Request: English</div>
        </div>
      )}
    </div>
  );
};

export default TeacherClasses;
