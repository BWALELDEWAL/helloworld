import React from "react";
import { useNavigate } from "react-router-dom";

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ textAlign: "center" }}>
      <h2>Organizer Dashboard</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <button
          className="button"
          onClick={() => navigate("/my-events/new")}
        >
          + Create Event
        </button>
        <button
          className="button"
          onClick={() => navigate("/my-events")}
        >
          Manage My Events
        </button>
        <button
          className="button"
          onClick={() => navigate("/my-events/analytics")}
        >
          Event Analytics
        </button>
      </div>
    </div>
  );
};

export default OrganizerDashboard;