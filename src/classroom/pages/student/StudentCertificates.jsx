import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDownload, FaEye } from "react-icons/fa";

export default function StudentCertificates() {
  // Example certificate data
  const certificates = [
  {
    id: 1,
    title: "Math Excellence",
    issuedBy: "Delhi Public School, R.K. Puram",
    date: "2025-05-20",
    status: "Verified",
    file: "math_certificate.pdf",
  },
  {
    id: 2,
    title: "Science Fair Winner",
    issuedBy: "St. Xavier's School, Mumbai",
    date: "2025-04-15",
    status: "Verified",
    file: "science_certificate.pdf",
  },
  {
    id: 3,
    title: "Sports Achievement - Cricket",
    issuedBy: "Modern School, Barakhamba Road",
    date: "2025-03-10",
    status: "Pending",
    file: "sports_certificate.pdf",
  },
  {
    id: 4,
    title: "Art Competition Winner",
    issuedBy: "The Shri Ram School, Gurugram",
    date: "2025-02-28",
    status: "Verified",
    file: "art_certificate.pdf",
  },
  {
    id: 5,
    title: "Debate Champion",
    issuedBy: "Ryan International School, Bangalore",
    date: "2025-01-25",
    status: "Verified",
    file: "debate_certificate.pdf",
  },
  {
    id: 6,
    title: "Music Performance Excellence",
    issuedBy: "Loreto Convent, Kolkata",
    date: "2024-12-10",
    status: "Pending",
    file: "music_certificate.pdf",
  },
  {
    id: 7,
    title: "Coding Workshop Completion",
    issuedBy: "International Indian School, Riyadh",
    date: "2024-11-05",
    status: "Verified",
    file: "coding_certificate.pdf",
  },
  {
    id: 8,
    title: "Environmental Awareness Project",
    issuedBy: "DAV Public School, Chandigarh",
    date: "2024-10-18",
    status: "Verified",
    file: "environment_certificate.pdf",
  },
  {
    id: 9,
    title: "Yoga Champion",
    issuedBy: "Bhavan's Vidya Mandir, Pune",
    date: "2024-09-30",
    status: "Pending",
    file: "yoga_certificate.pdf",
  },
  {
    id: 10,
    title: "Chess Tournament Winner",
    issuedBy: "Kendriya Vidyalaya, New Delhi",
    date: "2024-08-12",
    status: "Verified",
    file: "chess_certificate.pdf",
  },
];


  return (
    <div className="container mt-4">
      <div className="row g-3 mt-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="col-md-4">
            <div className="card shadow p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <h6>{cert.title}</h6>
                <p className="mb-1"><strong>Issued By:</strong> {cert.issuedBy}</p>
                <p className="mb-1"><strong>Date:</strong> {cert.date}</p>
                <p className="mb-1"><strong>Status:</strong> {cert.status}</p>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button  style={{border:"none",borderRadius:"5px"}} 
                  className=" btn-primary d-flex align-items-center gap-1"
                  onClick={() => window.open(cert.file, "_blank")}
                >
                  <FaEye /> View
                </button>
                <button  style={{backgroundColor:"blue",color:"white",border:"none",borderRadius:"5px"}} 
                  className="  btn-success d-flex align-items-center gap-1"
                  onClick={() => window.open(cert.file, "_blank")}
                >
                  <FaDownload /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
