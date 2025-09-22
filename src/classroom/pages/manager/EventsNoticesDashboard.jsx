import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const EventsNoticesDashboard = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [events, setEvents] = useState([
    { title: "Annual Day", date: "2025-09-25", time: "10:00 AM", participants: "All Students" },
    { title: "Sports Meet", date: "2025-09-28", time: "08:00 AM", participants: "Class 1-3" },
    { title: "Science Fair", date: "2025-10-05", time: "09:00 AM", participants: "Class 4-6" },
  ]);
  const [notices, setNotices] = useState([
    { title: "Fee Submission Reminder", status: "Published" },
    { title: "Holiday Notification", status: "Draft" },
    { title: "PTA Meeting", status: "Approved" },
  ]);

  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", participants: "" });
  const [newNotice, setNewNotice] = useState({ title: "", status: "Draft" });

  // Dummy recent activities
  const recentActivities = [
    "Annual Day event scheduled",
    "Holiday notice drafted",
    "Sports Meet event updated",
    "Fee Reminder notice published"
  ];

  const addEvent = () => {
    if(newEvent.title && newEvent.date){
      setEvents([...events, newEvent]);
      setNewEvent({ title: "", date: "", time: "", participants: "" });
    }
  };

  const addNotice = () => {
    if(newNotice.title){
      setNotices([...notices, newNotice]);
      setNewNotice({ title: "", status: "Draft" });
    }
  };

  return (
    <div className="container my-5">

      {/* Summary Cards */}
      <div className="row mb-4"  style={{marginTop:"-30px"}}>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Events</h5>
              <p className="h4">{events.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Upcoming Events</h5>
              <p className="h4">{events.filter(e => new Date(e.date) >= new Date()).length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Notices Pending</h5>
              <p className="h4">{notices.filter(n => n.status === "Draft").length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Published Notices</h5>
              <p className="h4">{notices.filter(n => n.status === "Published").length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
  {/* Calendar on left */}
  <div className="col-md-6 mb-3">
    <div className="card shadow-sm" style={{borderRadius:"5px"}}>
      <div className="card-header bg-primary text-white fw-bold">Event Calendar</div>
      <div className="card-body">
        <Calendar onChange={setCalendarDate} value={calendarDate} />
      </div>
    </div>
  </div>

  {/* Upcoming / Selected Date Events on right */}
  <div className="col-md-6 mb-3">
    <div className="card shadow-sm" style={{borderRadius:"5px",height:"360px"}}>
      <div className="card-header bg-info text-white fw-bold">Events on Selected Date</div>
      <div className="card-body">
        <ul className="list-group">
          {events.filter(e => e.date === calendarDate.toISOString().split('T')[0])
                 .map((e, idx) => (
                   <li key={idx} className="list-group-item">
                     <b>{e.title}</b> <br />
                     Time: {e.time} <br />
                     Participants: {e.participants}
                   </li>
          ))}
          {events.filter(e => e.date === calendarDate.toISOString().split('T')[0]).length === 0 &&
            <li className="list-group-item">No events on this date</li>
          }
        </ul>
      </div>
    </div>
  </div>
</div>


      {/* Create / Update Event */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm" style={{borderRadius:"5px"}}>
            <div className="card-header bg-success text-white fw-bold">Schedule / Update Event</div>
            <div className="card-body">
              <input className="form-control mb-2" placeholder="Event Title" value={newEvent.title} onChange={e=>setNewEvent({...newEvent,title:e.target.value})} />
              <input className="form-control mb-2" type="date" value={newEvent.date} onChange={e=>setNewEvent({...newEvent,date:e.target.value})} />
              <input className="form-control mb-2" type="time" value={newEvent.time} onChange={e=>setNewEvent({...newEvent,time:e.target.value})} />
              <input className="form-control mb-2" placeholder="Participants" value={newEvent.participants} onChange={e=>setNewEvent({...newEvent,participants:e.target.value})} />
              <button className="btn btn-success" onClick={addEvent}>Add / Update Event</button>
            </div>
          </div>
        </div>

        {/* Publish Notices */}
        <div className="col-md-6">
          <div className="card shadow-sm" style={{borderRadius:"5px",height:"295px"}}>
            <div className="card-header bg-danger text-white fw-bold">Publish Notices</div>
            <div className="card-body">
              <input className="form-control mb-2" placeholder="Notice Title" value={newNotice.title} onChange={e=>setNewNotice({...newNotice,title:e.target.value})} />
              <select className="form-select mb-2" value={newNotice.status} onChange={e=>setNewNotice({...newNotice,status:e.target.value})}>
                <option value="Draft">Draft</option>
                <option value="Approved">Approved</option>
                <option value="Published">Published</option>
              </select>
              <button className="btn btn-danger" onClick={addNotice}>Add / Publish Notice</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm" style={{borderRadius:"5px"}}>
            <div className="card-header bg-info text-white fw-bold">Recent Activities</div>
            <div className="card-body">
              <ul className="list-group">
                {recentActivities.map((act,idx)=><li key={idx} className="list-group-item">{act}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="col-md-6">
          <div className="card shadow-sm" style={{borderRadius:"5px"}}>
            <div className="card-header bg-warning text-white fw-bold">All Notices</div>
            <div className="card-body table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((n,idx)=><tr key={idx}><td>{n.title}</td><td>{n.status}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm" style={{borderRadius:"5px"}}>
            <div className="card-header bg-secondary text-white fw-bold">All Scheduled Events</div>
            <div className="card-body table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Participants</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e,idx)=><tr key={idx}><td>{e.title}</td><td>{e.date}</td><td>{e.time}</td><td>{e.participants}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EventsNoticesDashboard;
