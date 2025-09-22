import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AcademicDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [selectedSection, setSelectedSection] = useState("A");
  const [calendarDate, setCalendarDate] = useState(new Date());

  const classes = ["Class 1","Class 2","Class 3"];
  const sections = ["A","B","C"];

  // Dummy data for students
  const students = [
    { name: "John Doe", attendance: 90, testAvg: 85, assignmentsPending: 1 },
    { name: "Jane Smith", attendance: 95, testAvg: 92, assignmentsPending: 0 },
    { name: "Alex Johnson", attendance: 80, testAvg: 78, assignmentsPending: 2 },
    { name: "Emily Davis", attendance: 88, testAvg: 81, assignmentsPending: 1 },
  ];

  // Graph: Average Test Scores
  const chartData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: "Test Scores",
        data: students.map(s => s.testAvg),
        backgroundColor: "#4285f4"
      },
      {
        label: "Attendance %",
        data: students.map(s => s.attendance),
        backgroundColor: "#34a853"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" }, title: { display: true, text: "Student Performance Overview" } }
  };

  // Recent activities
  const recentActivities = [
    "Chander Prakash submitted Assignment 3",
    "Diksha Test 2 graded",
    "Shaurya Johnson absent on Monday",
    "Tanisha Davis submitted Assignment 2 late",
    "New certificate templates uploaded by admin"
  ];

  // Notices
  const notices = [
    "Assignments for Class 2-B pending submission",
    "Monthly attendance reports ready",
    "Generate certificates for top performers"
  ];

  return (
    <div className="container my-5">

      {/* Select Class & Section */}
      <div className="row mb-4"   style={{marginTop:"-40px"}}>
        <div className="col-md-6 mb-3">
          <select className="form-select" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
            {classes.map((cls, idx) => <option key={idx}>{cls}</option>)}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <select className="form-select" value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
            {sections.map((sec, idx) => <option key={idx}>{sec}</option>)}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4"   style={{marginTop:"-20px"}}>
        <div className="col-md-3 mb-3" >
          <div className="card bg-info text-white shadow-sm">
            <div className="card-body" style={{textAlign:"center"}} >
              <h5 className="card-title">Avg Attendance</h5>
              <p className="h4">{Math.round(students.reduce((a,s)=>a+s.attendance,0)/students.length)}%</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Avg Test Score</h5>
              <p className="h4">{Math.round(students.reduce((a,s)=>a+s.testAvg,0)/students.length)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pending Assignments</h5>
              <p className="h4">{students.reduce((a,s)=>a+s.assignmentsPending,0)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Certificates Generated</h5>
              <p className="h4">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Graph & Calendar */}
      <div className="row mb-4">
        <div className="col-md-8 mb-3">
          <div className="card shadow-sm" style={{borderRadius: "5px" }}>
            <div className="card-header bg-primary text-white fw-bold">Performance Graph</div>
            <div className="card-body">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm" style={{borderRadius: "5px" ,height:"412px"}}>
            <div className="card-header bg-secondary text-white fw-bold">Calendar</div>
            <div className="card-body">
              <Calendar onChange={setCalendarDate} value={calendarDate} />
              <br/>
                <p><b>
                    {calendarDate ? calendarDate.toDateString() : "No date selected"} 
                </b></p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Notices */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm" style={{borderRadius: "5px" }}>
            <div className="card-header bg-info text-white fw-bold">Recent Activities</div>
            <div className="card-body">
              <ul className="list-group">
                {recentActivities.map((act, idx) => <li key={idx} className="list-group-item">{act}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm" style={{borderRadius: "5px",height:"300px" }}>
            <div className="card-header bg-danger text-white fw-bold">Notice Board</div>
            <div className="card-body">
              <ul className="list-group">
                {notices.map((notice, idx) => <li key={idx} className="list-group-item">{notice}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Detailed Student Table */}
      <div className="card shadow-sm mb-4" style={{borderRadius: "5px",height:"300px"}}>
        <div className="card-header bg-warning text-white fw-bold">Student Performance Details</div>
        <div className="card-body table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Student</th>
                <th>Attendance %</th>
                <th>Test Avg</th>
                <th>Assignments Pending</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.name}</td>
                  <td>{s.attendance}%</td>
                  <td>{s.testAvg}</td>
                  <td>{s.assignmentsPending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons to Generate Reports */}
      <div className="d-flex gap-3 mb-5">
        <button className="btn btn-success">Generate Monthly Certificates</button>
        <button className="btn btn-primary">Generate Progress Reports</button>
        <button className="btn btn-info">Generate Consolidated Reports</button>
      </div>

    </div>
  );
};

export default AcademicDashboard;
