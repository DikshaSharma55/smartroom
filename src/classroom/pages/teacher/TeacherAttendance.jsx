import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Login.css";

export default function TeacherAttendance() {
  const [teacher, setTeacher] = useState({
    todayClasses: 3,
    studentsPresent: 25,
    pendingAttendance: 5,
    selfAttendanceStatus: "Absent",
    pastRecords: [
      { date: "2025-09-15", status: "Present" },
      { date: "2025-09-16", status: "Late" },
    ],
  });

  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [alerts, setAlerts] = useState([
    "Teacher absent >3 times → Salary deduction",
    "Missed marks → Warning notification",
  ]);

  // 🔥 Time + Location states
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState(null);
  const classStartTime = "09:00"; // Teacher reporting time
  const schoolLocation = { lat: 28.6139, lng: 77.2090 };
  const allowedDistance = 0.1; // km

  // 🔥 Distance Calculation Function
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (selectedClass) {
      setStudents([
        { id: 1, name: "John Doe", attendance: "Present" },
        { id: 2, name: "Jane Smith", attendance: "Absent" },
        { id: 3, name: "Alice Johnson", attendance: "Late" },
      ]);
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  // 🔥 Get live location
  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const dist = getDistance(
            pos.coords.latitude,
            pos.coords.longitude,
            schoolLocation.lat,
            schoolLocation.lng
          );
          setDistance(dist.toFixed(3));
        },
        () => setStatus("Error: Location access denied"),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      setStatus("Error: Geolocation supported nahi hai");
    }

    return () => {
      if (navigator.geolocation && watchId)
        navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // 🔥 Mark Attendance Logic
  const markAttendance = () => {
    const now = new Date();
    const [hours, minutes] = classStartTime.split(":");
    const classTime = new Date();
    classTime.setHours(parseInt(hours));
    classTime.setMinutes(parseInt(minutes));
    classTime.setSeconds(0);

    const tenMinutesLater = new Date(classTime.getTime() + 10 * 60000);

    if (!(now >= classTime && now <= tenMinutesLater)) {
      setStatus("Attendance nahi mark ho sakti: Reporting time khatam ⏰");
      return;
    }

    if (distance !== null && distance <= allowedDistance) {
      setTeacher((prev) => ({ ...prev, selfAttendanceStatus: "Present" }));
      setStatus("Attendance lag gayi ✅");
    } else {
      setStatus("Error: Aap school ke bahar ho 📍");
    }
  };

  return (
    <div className="container-fluid mt-4">
      {/* Section 1: Teacher Self-Attendance */}
      <div className="card mb-4 shadow-lg border-0 rounded-4 p-4 bg-light">
        <h5 className="text-secondary mb-3">Self Attendance</h5>
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3 gap-3">
          <span>
            Status:{" "}
            <strong
              className={
                teacher.selfAttendanceStatus === "Present"
                  ? "text-success"
                  : teacher.selfAttendanceStatus === "Absent"
                  ? "text-danger"
                  : "text-warning"
              }
            >
              {teacher.selfAttendanceStatus}
            </strong>
          </span>
          <button className="btn btn-success btn-sm" onClick={markAttendance}>
            Mark My Attendance
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <p
            className="fw-semibold"
            style={{ color: status.includes("✅") ? "green" : "red" }}
          >
            {status}
          </p>
        )}

        {/* Show Distance Info */}
        <p className="text-muted small">
          Distance from school: {distance ? `${distance} km` : "Loading..."}
        </p>

        <h6 className="mt-3 mb-2">Past Attendance Records</h6>
        <div className="table-responsive">
          <table className="table table-sm table-hover table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teacher.pastRecords.map((record, idx) => (
                <tr key={idx}>
                  <td>{record.date}</td>
                  <td
                    style={{
                      color:
                        record.status === "Present"
                          ? "green"
                          : record.status === "Absent"
                          ? "red"
                          : "orange",
                      fontWeight: "600",
                    }}
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Student Attendance */}
      <div className="card mb-4 shadow-lg border-0 rounded-4 p-4 bg-light">
        <h5 className="text-secondary mb-3">Student Attendance</h5>
        <div className="mb-3 d-flex flex-column flex-md-row align-items-md-center gap-3">
          <label className="mb-1 mb-md-0 fw-semibold">
            Select Class/Section:
          </label>
          <select
            className="form-select w-100 w-md-auto"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="10A">10A</option>
            <option value="10B">10B</option>
          </select>
        </div>
        {students.length > 0 && (
          <div className="table-responsive">
            <table className="table table-sm table-hover table-bordered mb-3">
              <thead className="table-light">
                <tr>
                  <th>Student Name</th>
                  <th>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={s.attendance}
                        onChange={(e) => {
                          const updated = students.map((st) =>
                            st.id === s.id
                              ? { ...st, attendance: e.target.value }
                              : st
                          );
                          setStudents(updated);
                        }}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {students.length > 0 && (
          <button className="btn btn-primary btn-sm" style={{ color: "black" }}>
            Save Attendance
          </button>
        )}
      </div>

      {/* Section 3: Attendance Summary & Alerts */}
      <div className="card mb-4 shadow-lg border-0 rounded-4 p-4 bg-light">
        <h5 className="text-secondary mb-3">Attendance Summary & Alerts</h5>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="p-3 bg-white rounded-3 shadow-sm mb-3 mb-md-0">
              <p className="mb-1">
                Today's Classes: <strong>{teacher.todayClasses}</strong>
              </p>
              <p className="mb-0">
                Students Present: <strong>{teacher.studentsPresent}</strong>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-white rounded-3 shadow-sm mb-3 mb-md-0">
              <p className="mb-0">
                Pending Attendance:{" "}
                <strong>{teacher.pendingAttendance}</strong>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-white rounded-3 shadow-sm">
              <h6 className="fw-semibold">Alerts:</h6>
              <ul className="mb-0 ps-3">
                {alerts.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
