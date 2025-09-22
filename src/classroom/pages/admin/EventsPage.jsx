import React, { useState } from "react";
import { CalendarDays, PlusCircle } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function EventsPage() {
  const [events, setEvents] = useState([
    { id: 1, name: "Science Exhibition", type: "Competition", date: "2025-09-22", time: "10:00 AM", venue: "Auditorium", createdBy: "Manager", status: "Pending" },
    { id: 2, name: "Parent Teacher Meeting", type: "PTM", date: "2025-09-25", time: "11:00 AM", venue: "Class 10 Block", createdBy: "Teacher", status: "Approved" },
  ]);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date());

  const filteredEvents = events.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ✅ Calendar + Upcoming Events Section */}
<div className="row g-3 mb-4">
  {/* Calendar Widget */}
  <div className="col-md-6">
    <div className="card shadow p-3" style={{ height: "380px" }}>
      <h6 className="mb-3">Event Calendar</h6>
      <Calendar
        onChange={setDate}
        value={date}
        className="rounded shadow-sm"
      />
      <p className="text-muted small mt-3">
        Selected Date: <strong>{date.toDateString()}</strong>
      </p>
    </div>
  </div>

  {/* Upcoming Events */}
  <div className="col-md-6">
    <div className="card shadow p-3" style={{ height: "380px", overflowY: "auto" }}>
      <h6 className="mb-3">Upcoming Events</h6>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span>Teacher's Day Celebration</span>
          <span className="badge bg-primary">Today</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Parent-Teacher Meeting</span>
          <span className="badge bg-warning text-dark">Tomorrow</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Science Fair</span>
          <span className="badge bg-success">Next Week</span>
        </li>
      </ul>
    </div>
  </div>
</div>

{/* Search + Add Event */}
<div className="d-flex justify-content-between align-items-center my-3">
  <input
    type="text"
    className="form-control w-75"  // ✅ width badha di
    placeholder="Search events..."
    value={search}
    onChange={e => setSearch(e.target.value)}
  />
  <button className="btn btn-primary d-flex align-items-center gap-2">
    <PlusCircle size={18} /> Add Event
  </button>
</div>

      

      {/* Events Table */}
      <div className="card shadow p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.type}</td>
                <td>{e.date}</td>
                <td>{e.time}</td>
                <td>{e.venue}</td>
                <td>{e.createdBy}</td>
                <td>
                  <span
                    className={`badge ${
                      e.status === "Approved"
                        ? "bg-success"
                        : e.status === "Pending"
                        ? "bg-warning"
                        : e.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-success">Approve</button>
                  <button className="btn btn-sm btn-danger">Reject</button>
                  <button className="btn btn-sm btn-warning">Edit</button>
                  <button className="btn btn-sm btn-secondary">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
