import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Login.css"; // ✅ Ensure ye line top me ho

export default function AttendancePage() {
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
  const classStartTime = "13:00"; // 1:00 PM
  const classLocation = { lat: 28.6139, lng: 77.2090 };
  const allowedDistance = 0.1;

  // Example subject & teacher
  const subjectName = "Mathematics";
  const teacherName = "Mr. Sharma";

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
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const dist = getDistance(
            pos.coords.latitude,
            pos.coords.longitude,
            classLocation.lat,
            classLocation.lng
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
      if (navigator.geolocation && watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const markAttendance = () => {
    const now = new Date();
    const [hours, minutes] = classStartTime.split(":");
    const classTime = new Date();
    classTime.setHours(parseInt(hours));
    classTime.setMinutes(parseInt(minutes));
    classTime.setSeconds(0);

    const tenMinutesLater = new Date(classTime.getTime() + 10 * 60000);

    if (!(now >= classTime && now <= tenMinutesLater)) {
      setStatus("Attendance nahi mark ho sakti: Class ka time khatam ⏰");
      return;
    }

    if (distance !== null && distance <= allowedDistance) {
      setStatus("Attendance lag gayi ✅");
    } else {
      setStatus("Error: Aap school me nahi ho 📍");
    }
  };

  return (
    <div className="container my-5">

      {/* Class Info Box */}
      <div style={{ border: "1px solid #d1d5db", borderRadius: "12px", padding: "20px", backgroundColor: "#f8fafc", marginBottom: "20px" }}>
        <h5 style={{ color: "#0a192f", marginBottom: "15px" }}>Class Info :</h5>
        <div className="row">
          {/* Subject Box */}
          <div className="col-md-6 mb-2">
            <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "15px", textAlign: "center", backgroundColor: "#ffffff" }}>
              <p style={{ margin: 0, fontWeight: "500", color: "#0a192f" }}>Subject</p>
              <p style={{ margin: 0, fontWeight: "600",color: "#0a192f" }}>{subjectName}</p>
            </div>
          </div>

          {/* Teacher Box */}
          <div className="col-md-6 mb-2">
            <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "15px", textAlign: "center", backgroundColor: "#ffffff" }}>
              <p style={{ margin: 0, fontWeight: "500", color: "#0a192f" }}>Teacher</p>
              <p style={{ margin: 0, fontWeight: "600",color: "#0a192f" }}>{teacherName}</p>
            </div>
          </div>
        </div>

        
      </div>

      {/* Attendance Button */}
      <div style={{ textAlign: "center" }}>
        <button className="mark-attendance" 
          onClick={markAttendance} 
          style={{ 
            border: "none", 
            padding: "12px 30px", 
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "1rem"
          }}
        >
          Mark Attendance
        </button>
        <p style={{ marginTop: "15px", fontWeight: "500", color: status.includes("✅") ? "green" : "red" }}>{status}</p>
      </div>
      {/* Distance Info */}
        <footer style={{ marginTop: "10px", fontSize: "0.95rem", color: "#6b7280" }}>
          Distance from school: {distance !== null ? `${distance} km` : "Loading..."}
        </footer>
    </div>
    
  );
}
