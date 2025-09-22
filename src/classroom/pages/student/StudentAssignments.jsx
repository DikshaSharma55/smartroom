import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);

  // Example assignments data
  useEffect(() => {
    setAssignments([
      { id: 1, title: "Math Assignment 1", subject: "Math", dueDate: "2025-09-25", status: "Pending" },
      { id: 2, title: "Science Project", subject: "Science", dueDate: "2025-09-28", status: "Submitted" },
      { id: 3, title: "History Essay", subject: "History", dueDate: "2025-09-30", status: "Pending" },
    ]);
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-3 mt-2">
        {assignments.length === 0 ? (
          <div className="col-12">
            <div className="card shadow p-3">
              <p className="m-0">No assignments available.</p>
            </div>
          </div>
        ) : (
          assignments.map((assignment) => (
            <div className="col-md-4" key={assignment.id}>
              <div className="card shadow p-3 h-100">
                <h6>{assignment.title}</h6>
                <p className="mb-1"><strong>Subject:</strong> {assignment.subject}</p>
                <p className="mb-1"><strong>Due Date:</strong> {assignment.dueDate}</p>
                <p className="mb-2">
                  <strong>Status:</strong>{" "}
                  <span className={assignment.status === "Pending" ? "text-danger" : "text-success"}>
                    {assignment.status}
                  </span>
                </p>
                {assignment.status === "Pending" && (
                  <button style={{backgroundColor:"#DC143C",color:"white"}} className="btn   w-100" >Submit Assignment</button>
                  
                )}
                {assignment.status === "Submitted" && (
                  <button style={{backgroundColor:"#228B22",color:"white",cursor:"not-allowed"}} className="btn   w-100" >Submited</button>
                  
                )}
              </div>
            </div>
            
          ))
          
        )}
        
      </div>
    </div>
  );
}
