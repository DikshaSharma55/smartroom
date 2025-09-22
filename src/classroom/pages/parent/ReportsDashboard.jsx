// ReportsDashboard.jsx
import { color } from "chart.js/helpers";
import React, { useState } from "react";
import { FaDownload, FaPrint, FaGraduationCap, FaClipboardList, FaTrophy } from "react-icons/fa";

const ReportsDashboard = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const yearEndReport = {
    academic: [
      { subject: "Math", grade: "A+", teacher: "Mr. Sharma" },
      { subject: "Science", grade: "A", teacher: "Ms. Iyer" },
      { subject: "English", grade: "A", teacher: "Mrs. Gupta" },
      { subject: "Computer", grade: "A+", teacher: "Mr. Verma" },
    ],
    attendance: { present: 220, absent: 10, alerts: ["Low attendance in April"] },
    extracurricular: [
      "Winner - School Football Championship",
      "Participated - Art Competition",
      "1st Prize - Science Fair"
    ]
  };

  // Styles
  const boxStyle = (bg) => ({
    background: bg,
    borderRadius: "16px",
    padding: "20px",
    color: "#fff",
    marginBottom: "20px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
    flex: "1 1 45%",
    minWidth: "300px"
  });

  const headerStyle = {
    fontSize: "18px",
    color:"black",
    fontWeight: "bold",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const monthButtonStyle = (bg) => ({
    flex: "1 1 20%",
    minWidth: "80px",
    textAlign: "center",
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "600",
    background: bg,
    margin: "5px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
    transition: "all 0.3s",
  });

  const hoverEffect = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>

        {/* Monthly Certificate */}
        <div style={boxStyle("linear-gradient(135deg, #fff, #fff)")}>
          <div style={headerStyle}><FaGraduationCap /> Monthly Certificates</div>
          
          {/* Months */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {months.map((m, idx) => (
              <button
                key={idx}
                style={{
                  ...monthButtonStyle(selectedMonth === m ? "#10b981" : "linear-gradient(45deg, #34d399, #3b82f6)")
                }}
                onClick={() => setSelectedMonth(m)}
                onMouseEnter={e => Object.assign(e.target.style, hoverEffect)}
                onMouseLeave={e => Object.assign(e.target.style, { transform:"none", boxShadow:"0 3px 6px rgba(0,0,0,0.2)" })}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "15px" }}>
            {["Download PDF", "Print Certificate"].map((action, idx) => (
              <button
                key={idx}
                style={{
                  ...monthButtonStyle("#3b82f6"),
                  flex: "1 1 40%",
                  minWidth: "140px",
                }}
                onClick={() => {
                  if (!selectedMonth) return alert("Please select a month first!");
                  if (idx === 0) alert(`Monthly Certificate PDF for ${selectedMonth} downloaded!`);
                  else alert(`Printing Monthly Certificate for ${selectedMonth}...`);
                }}
                onMouseEnter={e => Object.assign(e.target.style, hoverEffect)}
                onMouseLeave={e => Object.assign(e.target.style, { transform:"none", boxShadow:"0 3px 6px rgba(0,0,0,0.2)" })}
              >
                {idx === 0 ? <FaDownload /> : <FaPrint />} {action}
              </button>
            ))}
          </div>
        </div>

        {/* Year-End Report */}
        <div style={boxStyle("linear-gradient(135deg, #fff, #fff)")}>
          <div style={headerStyle}><FaClipboardList /> Year-End Report Card</div>

          {/* Academic */}
          <div style={{ marginBottom: "15px",color:"black" }}>
            <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} onClick={() => toggleSection("academic")}>
              <span style={{ fontWeight: "600"  }}>Academic Performance</span>
              <span>{expandedSection === "academic" ? "▲" : "▼"}</span>
            </div>
            {expandedSection === "academic" && (
              <ul style={{ marginTop: "10px", listStyle: "none", padding: 0 }}>
                {yearEndReport.academic.map((s, idx) => (
                  <li key={idx} style={{ display: "flex", justifyContent: "space-between", background: "#fff", color: "#333", borderRadius: "10px", padding: "8px", marginBottom: "5px" }}>
                    <span>{s.subject}</span>
                    <span>{s.grade} ({s.teacher})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Attendance */}
          <div style={{ marginBottom: "15px" ,color:"black" }}>
            <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} onClick={() => toggleSection("attendance")}>
              <span style={{ fontWeight: "600" }}>Attendance Summary</span>
              <span>{expandedSection === "attendance" ? "▲" : "▼"}</span>
            </div>
            {expandedSection === "attendance" && (
              <ul style={{ marginTop: "10px", listStyle: "none", padding: 0 }}>
                <li style={{ background: "#a7f3d0", color: "#065f46", borderRadius: "10px", padding: "8px", marginBottom: "5px" }}>
                  Total Days Present: {yearEndReport.attendance.present}
                </li>
                <li style={{ background: "#e5e7eb", color: "#1f2937", borderRadius: "10px", padding: "8px", marginBottom: "5px" }}>
                  Total Days Absent: {yearEndReport.attendance.absent}
                </li>
                {yearEndReport.attendance.alerts.map((a,i) => (
                  <li key={i} style={{ background: "#3b82f6", color: "#fff", borderRadius: "10px", padding: "8px", marginBottom: "5px" }}>{a}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Extracurricular */}
          <div style={{ marginBottom: "15px" ,color:"black" }}>
            <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} onClick={() => toggleSection("extracurricular")}>
              <span style={{ fontWeight: "600" }}>Extracurricular Activities</span>
              <span>{expandedSection === "extracurricular" ? "▲" : "▼"}</span>
            </div>
            {expandedSection === "extracurricular" && (
              <ul style={{ marginTop: "10px", listStyle: "none", padding: 0 }}>
                {yearEndReport.extracurricular.map((e, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "5px", background: "#fff", color: "#333", borderRadius: "10px", padding: "8px", marginBottom: "5px" }}>
                    <FaTrophy style={{ color: "#facc15" }} /> {e}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Generate Report */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "70px" }}>
            <button
              style={{ ...monthButtonStyle("#10b981"), flex:"1 1 40%", minWidth:"140px" }}
              onClick={() => alert("Year-End Report PDF downloaded!")}
            >
              <FaDownload /> Download PDF
            </button>
            <button
              style={{ ...monthButtonStyle("#3b82f6"), flex:"1 1 40%", minWidth:"140px" }}
              onClick={() => alert("Printing Year-End Report...")}
            >
              <FaPrint /> Print
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReportsDashboard;
