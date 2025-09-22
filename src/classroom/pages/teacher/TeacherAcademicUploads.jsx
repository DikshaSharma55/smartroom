import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TeacherAcademicUploads() {
  const [selectedClass, setSelectedClass] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [tests, setTests] = useState([]);
  const [notes, setNotes] = useState([]);

  const handleUploadAssignment = (e) => {
    e.preventDefault();
    const newAssignment = {
      title: e.target.title.value,
      dueDate: e.target.dueDate.value,
    };
    setAssignments([...assignments, newAssignment]);
    e.target.reset();
    alert("✅ Assignment uploaded & students notified!");
  };

  const handleUploadTest = (e) => {
    e.preventDefault();
    const newTest = {
      title: e.target.testTitle.value,
      date: e.target.testDate.value,
    };
    setTests([...tests, newTest]);
    e.target.reset();
    alert("✅ Test created successfully!");
  };

  const handleUploadNote = (e) => {
    e.preventDefault();
    const newNote = { title: e.target.noteTitle.value };
    setNotes([...notes, newNote]);
    e.target.reset();
    alert("✅ Notes uploaded & students notified!");
  };

  return (
    <div className="container mt-4">

      {/* Select Class */}
      <div className="d-flex justify-content-between align-items-center mb-4" style={{width:"100%"}}>
  {/* Left - Select Class */}
  <div style={{flex: 1}}>
    <label className="form-label fw-bold">Select Class / Section:</label>
    <select
      className="form-select"
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
    >
      <option value="">-- Select --</option>
      <option value="10A">Class 10A</option>
      <option value="10B">Class 10B</option>
      <option value="12Sci">Class 12 Science</option>
    </select>
  </div>

  {/* Right - Actions */}
  <div className="d-flex gap-2 ms-3" style={{marginTop:"30px"}}>
    <button className="btn btn-outline-primary btn-sm">View Students</button>
    <button className="btn btn-outline-success btn-sm">Attendance</button>
    <button className="btn btn-outline-info btn-sm">Performance</button>
    <button className="btn btn-outline-warning btn-sm">Message</button>
  </div>
</div>


      {/* Upload Assignments */}
      <div className="card shadow-sm mb-4 p-3">
        <h5>Assignments</h5>
        <form onSubmit={handleUploadAssignment} className="row g-3 mt-2">
          <div className="col-md-6">
            <input name="title" type="text" className="form-control" placeholder="Assignment Title" required />
          </div>
          <div className="col-md-3">
            <input name="dueDate" type="date" className="form-control" required />
          </div>
          <div className="col-md-3">
            <input type="file" className="form-control" required />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-success btn-sm">Upload Assignment</button>
          </div>
        </form>

        {assignments.length > 0 && (
          <ul className="list-group list-group-flush mt-3">
            {assignments.map((a, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>{a.title} - Due: {a.dueDate}</span>
                <div>
                  <button className="btn btn-primary btn-sm me-2">View</button>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upload Tests */}
      <div className="card shadow-sm mb-4 p-3">
        <h5>Tests</h5>
        <form onSubmit={handleUploadTest} className="row g-3 mt-2">
          <div className="col-md-5">
            <input name="testTitle" type="text" className="form-control" placeholder="Test Title" required />
          </div>
          <div className="col-md-3">
            <input name="testDate" type="datetime-local" className="form-control" required />
          </div>
          <div className="col-md-4">
            <input type="file" className="form-control" required />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-primary btn-sm">Create / Upload Test</button>
          </div>
        </form>

        {tests.length > 0 && (
          <ul className="list-group list-group-flush mt-3">
            {tests.map((t, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>{t.title} - {t.date}</span>
                <div>
                  <button className="btn btn-success btn-sm me-2">Publish</button>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upload Notes */}
      <div className="card shadow-sm mb-4 p-3">
        <h5>Notes / Study Material</h5>
        <form onSubmit={handleUploadNote} className="row g-3 mt-2">
          <div className="col-md-6">
            <input name="noteTitle" type="text" className="form-control" placeholder="Notes Title" required />
          </div>
          <div className="col-md-6">
            <input type="file" className="form-control" multiple required />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-info btn-sm">Upload Notes</button>
          </div>
        </form>

        {notes.length > 0 && (
          <ul className="list-group list-group-flush mt-3">
            {notes.map((n, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>{n.title}</span>
                <div>
                  <button className="btn btn-primary btn-sm me-2">View</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notifications */}
      <div className="alert alert-info">
        📢 Students will be notified automatically when new content is uploaded.  
        ⏳ Reminders will be sent before due dates for assignments & tests.
      </div>
    </div>
  );
}
