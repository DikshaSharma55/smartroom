import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TestPage() {
  // Example test data
  const tests = [
    {
      id: 1,
      name: "Shape And Volume",
      subject: "Mathematics",
      date: "2025-09-22",
      time: "10:00 AM",
      status: "Upcoming", // or "Completed"
    },
    {
      id: 2,
      name: "Light and Speed",
      subject: "Science",
      date: "2025-09-23",
      time: "12:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Grammer topics",
      subject: "Hindi",
      date: "2025-09-23",
      time: "1:00 PM",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Basic of IDK",
      subject: "Indian Knownledge System",
      date: "2025-09-23",
      time: "2:00 PM",
      status: "Upcoming",
    },
  ];

  const [submittedTests, setSubmittedTests] = useState([]);

  const submitTest = (id) => {
    if (!submittedTests.includes(id)) {
      setSubmittedTests([...submittedTests, id]);
      alert("Test submitted successfully ✅");
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-3">
        {tests.map((test) => {
          const isSubmitted = submittedTests.includes(test.id);
          return (
            <div className="col-md-6" key={test.id}>
              <div className="card shadow p-3 h-100">
                <h5>{test.name}</h5>
                <p className="mb-1"><strong>Subject:</strong> {test.subject}</p>
                <p className="mb-1"><strong>Date:</strong> {test.date}</p>
                <p className="mb-3"><strong>Time:</strong> {test.time}</p>

                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: isSubmitted ? "green" : "blue",
                    color: "#ffffff",
                    border: "none",
                    cursor: isSubmitted ? "not-allowed" : "pointer",
                  }}
                  onClick={() => submitTest(test.id)}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? "Submitted ✅" : "Submit Test"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
