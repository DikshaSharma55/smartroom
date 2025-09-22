// ParentCommunication.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaPaperPlane,
  FaFileUpload,
  FaPlusCircle,
  FaBell,
  FaFilter
} from "react-icons/fa";

export default function ParentCommunication() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Projector Not Working",
      status: "Pending",
      priority: "High",
      assignedTo: "Manager",
      history: ["Submitted to Manager", "Manager: We're checking the bulb", "Parent: Please resolve asap"],
      unread: 1
    },
    {
      id: 2,
      title: "Internet Issue",
      status: "Resolved",
      priority: "Medium",
      assignedTo: "Admin",
      history: [
        "Submitted to Manager",
        "Manager: Reported to admin",
        "Admin: Rebooted router - issue fixed",
        "Parent: Thanks!"
      ],
      unread: 0
    },
    {
      id: 3,
      title: "Fan not working",
      status: "Escalated",
      priority: "Low",
      assignedTo: "Admin",
      history: ["Submitted to Manager", "Manager: Escalated to Admin", "Admin: Spare part ordered"],
      unread: 0
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newComplaintTitle, setNewComplaintTitle] = useState("");
  const [filter, setFilter] = useState("All");

  const totalUnread = complaints.reduce((sum, c) => sum + (c.unread || 0), 0);

  useEffect(() => {
    if (selectedComplaint) {
      const el = document.getElementById("chat-box");
      if (el) el.scrollTop = el.scrollHeight;
    }
  }, [selectedComplaint, complaints]);

  const handleSend = () => {
    if (!newMessage || !selectedComplaint) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const updated = complaints.map(c => {
      if (c.id === selectedComplaint.id) {
        return {
          ...c,
          history: [...c.history, `Parent: ${newMessage} || ${nowStr}`],
          unread: 0
        };
      }
      return c;
    });
    setComplaints(updated);
    setNewMessage("");
  };

  const handleAddComplaint = () => {
    if (!newComplaintTitle) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newComp = {
      id: complaints.length + 1,
      title: newComplaintTitle,
      status: "Pending",
      priority: "High",
      assignedTo: "Manager",
      history: [`Submitted to Manager || ${nowStr}`],
      unread: 1
    };
    setComplaints([newComp, ...complaints]);
    setNewComplaintTitle("");
  };

  const statusIcon = status => {
    switch (status) {
      case "Pending":
        return <FaHourglassHalf className="text-warning" title="Pending" />;
      case "Resolved":
        return <FaCheckCircle className="text-success" title="Resolved" />;
      case "Escalated":
        return <FaExclamationTriangle className="text-danger" title="Escalated" />;
      case "In Progress":
        return <FaArrowRight className="text-primary" title="In Progress" />;
      default:
        return null;
    }
  };

  const priorityBadge = priority => {
    switch (priority) {
      case "High":
        return <span className="badge bg-danger ms-2">{priority}</span>;
      case "Medium":
        return <span className="badge bg-warning text-dark ms-2">{priority}</span>;
      case "Low":
        return <span className="badge bg-success ms-2">{priority}</span>;
      default:
        return null;
    }
  };

  function parseHistoryItem(item) {
    if (typeof item === "object" && item.actor) return item;
    let text = item;
    let providedTime = null;
    if (item.includes("||")) {
      const parts = item.split("||").map(s => s.trim());
      text = parts[0];
      providedTime = parts[1];
    }
    const colonIndex = text.indexOf(":");
    if (colonIndex > 0) {
      const actor = text.slice(0, colonIndex).trim();
      const message = text.slice(colonIndex + 1).trim();
      return { actor, text: message, time: providedTime || null };
    }
    const lower = text.toLowerCase();
    if (lower.includes("submitted to manager") || lower.includes("submitted to admin")) {
      const actor = lower.includes("admin") ? "Admin" : "Manager";
      return { actor, text, time: providedTime || null };
    }
    return { actor: "System", text, time: providedTime || null };
  }

  function actorInitials(actor) {
    if (!actor) return "S";
    const parts = actor.split(" ");
    if (parts.length === 1) return actor[0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const containerStyle = { color: "#212529", minHeight: "100vh", padding: "20px" };
  const cardStyle = { backgroundColor: "#ffffff", color: "#212529", borderRadius: "12px", transition: "0.3s" };
  const inputStyle = { backgroundColor: "#ffffff", color: "#212529", border: "1px solid #ced4da" };
  const filteredComplaints = complaints.filter(c => (filter === "All" ? true : c.status === filter));

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div className="d-flex justify-content-center align-items-center mb-4 mt-3 position-relative">
        <div className="position-absolute end-0"  style={{marginTop:"-40px"}}>
          <FaBell size={28} className="text-primary" />
          {totalUnread > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalUnread}
            </span>
          )}
        </div>
      </div>

      <div className="row g-3"  style={{marginTop:"-40px"}}>
        {/* Complaints column */}
        <div className="col-md-5">
          <div className="card shadow-lg p-3" style={{ ...cardStyle, border: "2px solid #0d6efd" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ margin: 0 }}>Complaints / Queries</h5>
              <button className="btn btn-sm btn-primary" onClick={handleAddComplaint}>
                <FaPlusCircle className="me-1" /> New
              </button>
            </div>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter new complaint title..."
              value={newComplaintTitle}
              onChange={e => setNewComplaintTitle(e.target.value)}
              style={{ borderRadius: "12px" }}
            />
            {/* Filters */}
            <div className="d-flex justify-content-around mb-2">
              {["All", "Pending", "Resolved", "Escalated"].map(f => (
                <button
                  key={f}
                  className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setFilter(f)}
                >
                  <FaFilter className="me-1" /> {f}
                </button>
              ))}
            </div>
            <ul className="list-group mt-2" style={{ maxHeight: "260px", overflowY: "auto", padding: 0 }}>
              {filteredComplaints.map(c => (
                <li
                  key={c.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${selectedComplaint?.id === c.id ? "selected-complaint" : ""}`}
                  style={{ cursor: "pointer", ...cardStyle, marginBottom: "8px", display: "flex", gap: "10px" }}
                  onClick={() => {
                    setSelectedComplaint(c);
                    const updated = complaints.map(comp => (comp.id === c.id ? { ...comp, unread: 0 } : comp));
                    setComplaints(updated);
                  }}
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "#0d6efd",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        boxShadow: "0 2px 6px rgba(13,110,253,0.2)",
                        fontSize: 14
                      }}
                    >
                      {actorInitials(c.assignedTo)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {c.title} {priorityBadge(c.priority)}
                      </div>
                      <small className="text-muted">
                        Assigned: {c.assignedTo} • <strong style={{ color: "#0d6efd" }}>{c.status}</strong>
                      </small>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {statusIcon(c.status)}
                    {c.unread > 0 && <span className="badge bg-danger ms-2">{c.unread}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat column */}
        <div className="col-md-7">
          <div className="card shadow-sm p-3 d-flex flex-column" style={{ ...cardStyle, height: "640px" }}>
            {selectedComplaint ? (
              <>
                {/* Chat header */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h5>{selectedComplaint.title}</h5>
                    <small className="text-muted">
                      Assigned: {selectedComplaint.assignedTo} • Status: <strong>{selectedComplaint.status}</strong>
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm"
                      onClick={() => {
                        const updated = complaints.map(c => c.id === selectedComplaint.id ? { ...c, status: "Escalated" } : c);
                        setComplaints(updated);
                        setSelectedComplaint(prev => ({ ...prev, status: "Escalated" }));
                      }}>Escalate</button>
                    <button className="btn btn-outline-success btn-sm"
                      onClick={() => {
                        const updated = complaints.map(c => c.id === selectedComplaint.id ? { ...c, status: "Resolved" } : c);
                        setComplaints(updated);
                        setSelectedComplaint(prev => ({ ...prev, status: "Resolved" }));
                      }}>Resolve</button>
                  </div>
                </div>

                {/* Chat messages */}
                <div id="chat-box" style={{ overflowY: "auto", flexGrow: 1, padding: "8px" }}>
                  {selectedComplaint.history.map((h, i) => {
                    const parsed = parseHistoryItem(h);
                    const isParent = parsed.actor && parsed.actor.toLowerCase() === "parent";
                    const isManager = parsed.actor && parsed.actor.toLowerCase().includes("manager");
                    const isAdmin = parsed.actor && parsed.actor.toLowerCase().includes("admin");
                    const bubbleBg = isParent ? "#dbeafe" : isAdmin ? "#fff4e6" : isManager ? "#fff7ed" : "#f3f4f6";
                    const borderColor = isParent ? "#0d6efd" : isAdmin ? "#f59e0b" : isManager ? "#f97316" : "#6c757d";
                    const align = isParent ? "flex-end" : "flex-start";
                    const actorLabel = isParent ? "You" : parsed.actor || "System";
                    const timeText = parsed.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: align, marginBottom: 8 }}>
                        {!isParent && (
                          <div style={{
                            width: 40, height: 40, borderRadius: "50%", background: borderColor,
                            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
                          }}>
                            {actorInitials(parsed.actor)}
                          </div>
                        )}
                        <div style={{
                          background: bubbleBg, borderLeft: `4px solid ${borderColor}`, borderRadius: 10,
                          padding: "10px 12px", maxWidth: "78%"
                        }}>
                          <div style={{ fontWeight: 600 }}>{parsed.text}</div>
                          <div style={{ fontSize: "0.75rem", color: "#6c757d", textAlign: "right" }}>{timeText}</div>
                        </div>
                        {isParent && (
                          <div style={{
                            width: 40, height: 40, borderRadius: "50%", background: "#0d6efd",
                            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
                          }}>
                            You
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Input */}
                <div className="mt-2 d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    style={{ borderRadius: "12px" }}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                  />
                  <button className="btn btn-primary" onClick={handleSend}>
                    <FaPaperPlane />
                  </button>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <h5 className="text-muted">Select a complaint to view messages</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
