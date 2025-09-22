import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClassTimetableDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
    const classSectionKey = (cls, sec) => `${cls}-${sec}`;

  
  const [subjects, setSubjects] = useState([
    "Math", "English", "Science", "Games", "Music", "Yoga", "Labs"
  ]);
  const [teachers, setTeachers] = useState([
    "Mr. Sharma", "Ms. Priya", "Mr. Singh", "Ms. Kavita", "Mr. Raj", "Ms. Anjali"
  ]);
  

  const [newTimetable, setNewTimetable] = useState(
    Array(5).fill(Array(7).fill({subject:"", teacher:""})) // 5 days x 7 periods
  );

  const classes = ["Class 1", "Class 2", "Class 3"];
  const sections = ["A", "B", "C"];
const generateDummyData = () => {
  const data = {};
  classes.forEach(cls => {
    sections.forEach(sec => {
      data[classSectionKey(cls, sec)] = [
        [
          { subject: "Math", teacher: "Mr. Sharma" },
          { subject: "English", teacher: "Ms. Priya" },
          { subject: "Science", teacher: "Mr. Singh" },
          { subject: "Games", teacher: "Ms. Kavita" },
          { subject: "Music", teacher: "Mr. Raj" },
          { subject: "Yoga", teacher: "Ms. Anjali" },
          { subject: "Labs", teacher: "Mr. Singh" },
        ],
        [
          { subject: "English", teacher: "Ms. Priya" },
          { subject: "Math", teacher: "Mr. Sharma" },
          { subject: "Science", teacher: "Mr. Singh" },
          { subject: "Games", teacher: "Ms. Kavita" },
          { subject: "Music", teacher: "Mr. Raj" },
          { subject: "Yoga", teacher: "Ms. Anjali" },
          { subject: "Labs", teacher: "Mr. Singh" },
        ],
        [
          { subject: "Science", teacher: "Mr. Singh" },
          { subject: "Math", teacher: "Mr. Sharma" },
          { subject: "English", teacher: "Ms. Priya" },
          { subject: "Games", teacher: "Ms. Kavita" },
          { subject: "Music", teacher: "Mr. Raj" },
          { subject: "Yoga", teacher: "Ms. Anjali" },
          { subject: "Labs", teacher: "Mr. Singh" },
        ],
        [
          { subject: "Math", teacher: "Mr. Sharma" },
          { subject: "English", teacher: "Ms. Priya" },
          { subject: "Science", teacher: "Mr. Singh" },
          { subject: "Games", teacher: "Ms. Kavita" },
          { subject: "Music", teacher: "Mr. Raj" },
          { subject: "Yoga", teacher: "Ms. Anjali" },
          { subject: "Labs", teacher: "Mr. Singh" },
        ],
        [
          { subject: "Math", teacher: "Mr. Sharma" },
          { subject: "English", teacher: "Ms. Priya" },
          { subject: "Science", teacher: "Mr. Singh" },
          { subject: "Games", teacher: "Ms. Kavita" },
          { subject: "Music", teacher: "Mr. Raj" },
          { subject: "Yoga", teacher: "Ms. Anjali" },
          { subject: "Labs", teacher: "Mr. Singh" },
        ],
      ];
    });
  });
  return data;
};

const [timetable, setTimetable] = useState(generateDummyData());
  const handleTimetableChange = (dayIdx, periodIdx, field, value) => {
    const updated = newTimetable.map((row, i) => 
      i === dayIdx ? row.map((cell, j) => j === periodIdx ? {...cell, [field]: value} : cell) : row
    );
    setNewTimetable(updated);
  };

  const saveTimetable = () => {
    setTimetable({...timetable, [`${selectedClass}-${selectedSection}`]: newTimetable});
    alert("Timetable Saved!");
  };

  return (
    <div className="container my-5">

      {/* Select Class & Section */}
      <div className="card mb-4 shadow-sm "  style={{borderRadius:"5px"}}>
        <div className="card-header fw-bold  bg-primary bg-gradient">Select Class & Section</div>
        <div className="card-body d-flex gap-3 flex-wrap align-items-center">
          <select
            className="form-select w-auto"
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((cls, idx) => <option key={idx}>{cls}</option>)}
          </select>
          <select
            className="form-select w-auto"
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {sections.map((sec, idx) => <option key={idx}>{sec}</option>)}
          </select>
        </div>
      </div>

      {/* Display Current Timetable */}
      {selectedClass && selectedSection && (
        <div className="card mb-4 shadow-sm"  style={{borderRadius:"5px"}}>
          <div className="card-header fw-bold bg-success bg-gradient">Current Timetable</div>
          <div className="card-body table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Day / Period</th>
                  {[...Array(7)].map((_, i) => <th key={i}>Period {i+1}</th>)}
                </tr>
              </thead>
              <tbody>
                {["Monday","Tuesday","Wednesday","Thursday","Friday"].map((day, dayIdx) => (
                  <tr key={dayIdx}>
                    <td>{day}</td>
                    {[...Array(7)].map((_, periodIdx) => {
                      const cell = timetable[`${selectedClass}-${selectedSection}`]?.[dayIdx]?.[periodIdx];
                      return <td key={periodIdx}>{cell ? `${cell.subject} (${cell.teacher})` : "-"}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Update Timetable */}
      {selectedClass && selectedSection && (
        <div className="card mb-4 shadow-sm"  style={{borderRadius:"5px"}}>
          <div className="card-header fw-bold bg-success bg-gradient">Create / Update Timetable</div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Day / Period</th>
                    {[...Array(7)].map((_, i) => <th key={i}>Period {i+1}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {["Monday","Tuesday","Wednesday","Thursday","Friday"].map((day, dayIdx) => (
                    <tr key={dayIdx}>
                      <td>{day}</td>
                      {[...Array(7)].map((_, periodIdx) => (
                        <td key={periodIdx}>
                          <select
                            className="form-select mb-1"
                            value={newTimetable[dayIdx][periodIdx].subject}
                            onChange={e => handleTimetableChange(dayIdx, periodIdx, "subject", e.target.value)}
                          >
                            <option value="">Subject</option>
                            {subjects.map((sub, idx) => <option key={idx}>{sub}</option>)}
                          </select>
                          <select
                            className="form-select"
                            value={newTimetable[dayIdx][periodIdx].teacher}
                            onChange={e => handleTimetableChange(dayIdx, periodIdx, "teacher", e.target.value)}
                          >
                            <option value="">Teacher</option>
                            {teachers.map((t, idx) => <option key={idx}>{t}</option>)}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary mt-3" onClick={saveTimetable}>
              Save / Update Timetable
            </button>
          </div>
        </div>
      )}

      {/* Send Class Reminders */}
      {selectedClass && selectedSection && (
        <div className="card mb-4 shadow-sm" style={{borderRadius:"5px"}}>
          <div className="card-header fw-bold bg-success bg-gradient">Send Class Reminders</div>
          <div className="card-body d-flex flex-column gap-2">
            <button className="btn btn-secondary" onClick={() => alert("Reminder sent 10 min before class")}>
              Automatic Reminder: 10 min before class
            </button>
            <button className="btn btn-danger" onClick={() => alert("Reminder sent 5 min before class")}>
              Automatic Reminder: 5 min before class
            </button>
            <button className="btn btn-info" onClick={() => alert("Notified Teacher & Students")}>
              Notify Teacher & Students
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassTimetableDashboard;
