import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/events/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(res.data.events);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load events");
      }
    };
/////////////////
    fetchEvents();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/events/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEvents((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: res.data.event.status } : e))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="admin-container">
      <h2>All Events</h2>
      {error && <p className="error">{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.status}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>
                {event.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleStatusChange(event._id, "approved")}
                      style={{ marginRight: 8 }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(event._id, "declined")}
                      style={{ color: "red" }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span style={{ fontStyle: "italic" }}>No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEventsPage;
