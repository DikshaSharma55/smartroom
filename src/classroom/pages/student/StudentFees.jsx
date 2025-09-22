import React from "react";

export default function StudentFees() {
  // Example fees data
  const feesData = {
    totalFees: 100000,
    paidFees: 60000,
    pendingFees: 40000,
    dueDate: "2025-10-10",
    paymentHistory: [
      { date: "2025-06-01", amount: 15000, mode: "Offline" },
      { date: "2025-07-01", amount: 15000, mode: "Offline" },
      { date: "2025-08-01", amount: 15000, mode: "Offline" },
      { date: "2025-09-01", amount: 15000, mode: "Offline" },
    ],
  };

  return (
    <div className="container mt-4">
      <h4>Fees Summary</h4>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow p-3" style={{ backgroundColor: "#0d6efd", color: "white", height:"130px" }}>
            <h6>Total Fees</h6>
            <h3>₹{feesData.totalFees}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3" style={{ backgroundColor: "#198754", color: "white" , height:"130px"  }}>
            <h6>Paid Fees</h6>
            <h3>₹{feesData.paidFees}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3" style={{ backgroundColor: "#ffc107", color: "white", height:"130px"  }}>
            <h6>Pending Fees</h6>
            <h3>₹{feesData.pendingFees}</h3>
            <small>Due Date: {feesData.dueDate}</small>
          </div>
        </div>
      </div>

      <h5>Payment History</h5>
      <div className="card shadow p-3 mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {feesData.paymentHistory.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>₹{payment.amount}</td>
                <td>{payment.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-primary">Pay Fees Online</button>
        <button className="btn btn-secondary">Download Fee Receipt</button>
      </div>
    </div>
  );
}
