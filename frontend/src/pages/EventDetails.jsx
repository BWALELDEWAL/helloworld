import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BookTicketForm from "../components/BookTicketForm";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/events/${id}`)
      .then((res) => {
        setEvent(res.data.event || res.data); // adjust if your API returns { event: {...} }
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load event details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div className="form-error">{error}</div>;
  if (!event) return <div>No event found.</div>;

  return (
    <div className="form-container" style={{ maxWidth: 600 }}>
      <h2 className="form-title">{event.title}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Ticket Price:</strong> ${event.ticketPricing}</p>
      <p><strong>Available Tickets:</strong> {event.remainingTickets}</p>
      <hr style={{ margin: "24px 0" }} />
      {user ? (
        <BookTicketForm
          eventId={event._id || event.id}
          availableTickets={event.remainingTickets}
          ticketPrice={event.ticketPricing}
        />
      ) : (
        <div style={{ color: "#1976d2", marginTop: 16 }}>
          Please log in to book a ticket.
        </div>
      )}
    </div>
  );
};

export default EventDetails;