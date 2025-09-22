import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportsDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [selectedSection, setSelectedSection] = useState("A");

  const classes = ["Class 1", "Class 2", "Class 3"];
  const sections = ["A", "B", "C"];

  const teachers = [
    { name: "Mr. Sharma", feedback: 4.5, attendance: 92 },
    { name: "Ms. Priya", feedback: 4.8, attendance: 95 },
    { name: "Mr. Singh", feedback: 4.2, attendance: 88 }
  ];

  const students = [
    { name: "John Doe", attendance: 90, testAvg: 85, assignmentsPending: 1 },
    { name: "Jane Smith", attendance: 95, testAvg: 92, assignmentsPending: 0 },
    { name: "Alex Johnson", attendance: 80, testAvg: 78, assignmentsPending: 2 }
  ];

  const teacherChartData = {
    labels: teachers.map(t => t.name),
    datasets: [
      { label: "Feedback (out of 5)", data: teachers.map(t => t.feedback), backgroundColor: "#4285f4" },
      { label: "Attendance %", data: teachers.map(t => t.attendance), backgroundColor: "#34a853" }
    ]
  };

  const studentChartData = {
    labels: students.map(s => s.name),
    datasets: [
      { label: "Test Avg", data: students.map(s => s.testAvg), backgroundColor: "#fbbc05" },
      { label: "Attendance %", data: students.map(s => s.attendance), backgroundColor: "#ea4335" }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" }, title: { display: true, text: "Performance Overview" } }
  };

  const recentActivities = [
    "Teacher report generated for Mr. Sharma",
    "Student report generated for Class 1-A",
    "Monthly consolidated report sent to Admin"
  ];

  return (
    <div className="container my-5">

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-info text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Teachers</h5>
              <p className="h4">{teachers.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="h4">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-warning text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Reports Generated</h5>
              <p className="h4">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts Side by Side */}
<div className="row mb-4">
  {/* Teacher Performance */}
  <div className="col-md-6 mb-3">
    <div className="card shadow-sm" style={{borderRadius:"5px",height:"460px"}}>
      <div className="card-header bg-primary text-white fw-bold">Teacher Performance</div>
      <div className="card-body">
        <Bar data={teacherChartData} options={chartOptions} />
        <div className="mt-3">
          <p><b>Average Feedback:</b> {(teachers.reduce((sum, t) => sum + t.feedback, 0) / teachers.length).toFixed(2)}</p>
          <p><b>Average Attendance:</b> {(teachers.reduce((sum, t) => sum + t.attendance, 0) / teachers.length).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  </div>

  {/* Student Performance */}
  <div className="col-md-6 mb-3">
    <div className="card shadow-sm"  style={{borderRadius:"5px"}}>
      <div className="card-header bg-success text-white fw-bold">Student Performance</div>
      <div className="card-body">
        <Bar data={studentChartData} options={chartOptions} />
        <div className="mt-3">
          <p><b>Average Test Score:</b> {(students.reduce((sum, s) => sum + s.testAvg, 0) / students.length).toFixed(2)}</p>
          <p><b>Average Attendance:</b> {(students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(2)}%</p>
          <p><b>Total Assignments Pending:</b> {students.reduce((sum, s) => sum + s.assignmentsPending, 0)}</p>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Detailed Tables */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm"  style={{borderRadius:"5px"}}>
            <div className="card-header bg-info text-white fw-bold">Teacher Reports</div>
            <div className="card-body table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Feedback</th>
                    <th>Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, idx) => (
                    <tr key={idx}>
                      <td>{t.name}</td>
                      <td>{t.feedback}</td>
                      <td>{t.attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm"  style={{borderRadius:"5px"}}>
            <div className="card-header bg-success text-white fw-bold">Student Reports</div>
            <div className="card-body table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Attendance %</th>
                    <th>Test Avg</th>
                    <th>Assignments Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.name}</td>
                      <td>{s.attendance}</td>
                      <td>{s.testAvg}</td>
                      <td>{s.assignmentsPending}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card mb-4 shadow-sm" style={{borderRadius:"5px"}}>
        <div className="card-header bg-warning text-white fw-bold">Recent Activities</div>
        <div className="card-body">
          <ul className="list-group">
            {recentActivities.map((act, idx) => <li key={idx} className="list-group-item">{act}</li>)}
          </ul>
        </div>
      </div>

      {/* Submit Reports to Admin */}
      <div className="d-flex gap-3 mb-5">
        <button className="btn btn-primary">Consolidate Reports</button>
        <button className="btn btn-success">Send to Admin</button>
      </div>

    </div>
  );
};

export default ReportsDashboard;
