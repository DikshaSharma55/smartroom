import React from "react";

export default function SalaryPage() {
  const summary = {
    totalTeachers: 12,
    salaryGenerated: 450000,
    pendingApprovals: { count: 2, amount: 77000 },
    approved: { count: 10, amount: 373000 },
  };

  const approvalData = [
    {
      id: "T-101",
      name: "Ravi Sharma",
      month: "Sept 2025",
      baseSalary: 40000,
      deductions: 1000,
      netPay: 39000,
      status: "Pending",
    },
    {
      id: "T-102",
      name: "Neha Singh",
      month: "Sept 2025",
      baseSalary: 38000,
      deductions: 0,
      netPay: 38000,
      status: "Approved",
    },
  ];

  return (
    <div className="container mt-4">
      {/* --- Summary Cards --- */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow p-3 text-center">
            <h6>Total Teachers</h6>
            <h3>{summary.totalTeachers}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 text-center">
            <h6>Salary Generated</h6>
            <h4>₹{summary.salaryGenerated.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 text-center bg-warning text-dark">
            <h6>Pending Approvals</h6>
            <h5>
              {summary.pendingApprovals.count}</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow p-3 text-center bg-success text-white">
            <h6>Approved</h6>
            <h5>
              {summary.approved.count}
            </h5>
          </div>
        </div>
      </div>

      {/* --- Salary Approval Table --- */}
      <div className="card shadow p-3 mb-4">
        <h5 className="mb-3">Salary Approvals</h5>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Teacher</th>
              <th>Month</th>
              <th>Base</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvalData.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>
                  <a href="#" className="text-primary">
                    {t.name}
                  </a>
                </td>
                <td>{t.month}</td>
                <td>₹{t.baseSalary}</td>
                <td>₹{t.deductions}</td>
                <td>₹{t.netPay}</td>
                <td>
                  <span
                    className={`badge ${
                      t.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="d-flex flex-wrap gap-2">
                  {t.status === "Pending" ? (
                    <>
                      <button className="btn btn-sm btn-success" style={{color:"black"}} >
                        ✅ Approve
                      </button>
                      <button className="btn btn-sm btn-danger" style={{color:"black"}}>
                        ❌ Reject
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-sm btn-info" style={{color:"black"}}>✔ View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Salary History Section --- */}
      <div className="card shadow p-3">
        <h5 className="mb-3">Salary History</h5>
        <div className="d-flex gap-3 mb-3">
          <input
            type="month"
            className="form-control"
            style={{ maxWidth: "200px" }}
          />
          <input
            type="text"
            placeholder="Search Teacher"
            className="form-control"
            style={{ maxWidth: "550px" }}
          />
          <select className="form-select" style={{ maxWidth: "180px" }}>
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
          <button className="btn btn-outline-primary">Export</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Teacher</th>
              <th>Month</th>
              <th>Net Pay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ravi Sharma</td>
              <td>Aug 2025</td>
              <td>₹38,500</td>
              <td>
                <span className="badge bg-success">Approved</span>
              </td>
            </tr>
            <tr>
              <td>Neha Singh</td>
              <td>Aug 2025</td>
              <td>₹38,000</td>
              <td>
                <span className="badge bg-success">Approved</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
