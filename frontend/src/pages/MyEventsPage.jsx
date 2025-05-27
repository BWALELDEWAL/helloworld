import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import EventCard from "../components/EventCard";

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch events only if user is organizer
  const fetchMyEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/v1/users/events", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.data.success) {
        setEvents(res.data.events);
      } else {
        console.error("Failed to load events");
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "Organizer") {
      navigate("/unauthorized");
      return;
    }
    fetchMyEvents();
  }, [user, navigate, fetchMyEvents]);

  const handleEdit = (eventId) => navigate(`/my-events/${eventId}/edit`);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/events/${eventId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <p>Loading your events...</p>;

  return (
    <div className="container">
      <h2>My Events</h2>
      {events.length === 0 ? (
        <p>
          No events created yet.{" "}
          <Link to="/my-events/new" style={{ color: "#007BFF" }}>
            Create one
          </Link>
          .
        </p>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <EventCard event={event} />
              <div className="actions">
                <button onClick={() => handleEdit(event._id)}>Edit</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;

