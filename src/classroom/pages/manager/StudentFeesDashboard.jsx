import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentFeesDashboard = () => {
  // Dummy data
  const [students] = useState([
    { name: "John Doe", annualFee: 50000, paid: 40000, installments: 2 },
    { name: "Jane Smith", annualFee: 60000, paid: 60000, installments: 3 },
    { name: "Alex Johnson", annualFee: 45000, paid: 30000, installments: 1 },
    { name: "Emily Davis", annualFee: 55000, paid: 50000, installments: 2 },
  ]);

  const [calendarDate, setCalendarDate] = useState(new Date());

  // Graph data
  const feeData = {
    labels: students.map(s => s.name),
    datasets: [
      {
        label: "Paid",
        data: students.map(s => s.paid),
        backgroundColor: "#34a853"
      },
      {
        label: "Pending",
        data: students.map(s => s.annualFee - s.paid),
        backgroundColor: "#fbbc04"
      }
    ]
  };

  const feeOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Fees Paid vs Pending" }
    }
  };

  // Recent activities dummy
  const recentActivities = [
    "Chander Prakash paid installment #2",
    "Diksha scholarship applied: 10%",
    "Shorya Jangid late fee applied: $200",
    "Tanisha paid installment #1",
    "Manish paid installment #2",
    "Ankit paid installment #1",
    "New fee notice sent to Class 2-B"
  ];

  // Notices dummy
  const notices = [
    "Last date for fee submission: 25th Sept",
    "Scholarship for meritorious students available",
    "Late fee penalty applies after 5th Oct"
  ];

  return (
    <div className="container my-5">

      {/* Summary Cards */}
      <div className="row mb-4"  style={{marginTop:"-40px"}}>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-success shadow-sm" >
        <div className="card-body" style={{height:"130px"}}>
              <h5 className="card-title">Total Fees Collected</h5>
              <p className="card-text h4">₹ {students.reduce((a,s)=>a+s.paid,0)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body" style={{height:"130px"}}>
              <h5 className="card-title">Pending Fees</h5>
              <p className="card-text h4">₹ {students.reduce((a,s)=>a+s.annualFee-s.paid,0)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-info shadow-sm">
            <div className="card-body" style={{height:"130px"}}>
              <h5 className="card-title">Scholarships / Discounts</h5>
              <p className="card-text h4">₹ 12000</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body" style={{height:"130px"}}>
              <h5 className="card-title">Late Fees Applied</h5>
              <p className="card-text h4">₹ 5000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graph & Calendar Row */}
      <div className="row mb-4">
        <div className="col-md-8 mb-3">
          <div className="card shadow-sm" style={{borderRadius:"5px"}}>
            <div className="card-header bg-primary text-white fw-bold">Fees Graph</div>
            <div className="card-body">
              <Bar data={feeData} options={feeOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm" style={{borderRadius:"5px",height:"412px"}}>
            <div className="card-header bg-secondary text-white fw-bold">Fee Due Calendar</div>
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
          <div className="card shadow-sm" style={{borderRadius:"5px"}}>
            <div className="card-header bg-info text-white fw-bold">Recent Activities</div>
            <div className="card-body">
              <ul className="list-group">
                {recentActivities.map((act, idx) => (
                  <li key={idx} className="list-group-item">{act}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm" style={{borderRadius:"5px",height:"390px"}}>
            <div className="card-header bg-danger text-white fw-bold">Notice Board</div>
            <div className="card-body">
              <ul className="list-group">
                {notices.map((notice, idx) => (
                  <li key={idx} className="list-group-item">{notice}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Pending Fee Table */}
      <div className="card shadow-sm mb-4"  style={{borderRadius:"5px"}}>
        <div className="card-header bg-warning text-white fw-bold">Pending Fees Per Student</div>
        <div className="card-body table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Student</th>
                <th>Annual Fee</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Installments Paid</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.name}</td>
                  <td>₹ {s.annualFee}</td>
                  <td>₹ {s.paid}</td>
                  <td>₹ {s.annualFee - s.paid}</td>
                  <td>{s.installments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default StudentFeesDashboard;
