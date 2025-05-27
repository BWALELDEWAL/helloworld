import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventForm = ({ accessRole, onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [ticketPricing, setTicketPricing] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Optional: Check user role here if needed
    // Fetch event data if editing
    if (id) {
      // Fetch event by ID and setEvent
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !location || !totalTickets || !ticketPricing || !description || !category) {
      setError("All fields are required.");
      return;
    }
    setError("");
    if (onSubmit) {
      onSubmit({
        title,
        date,
        location,
        totalTickets: Number(totalTickets),
        ticketPricing: Number(ticketPricing),
        description,
        category,
      });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">{id ? "Edit Event" : "Create Event"}</h2>
      {error && <div className="form-error">{error}</div>}
      <div className="form-group">
        <label>Title:</label>
        <input
          className="form-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Date & Time:</label>
        <input
          className="form-input"
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input
          className="form-input"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Total Tickets:</label>
        <input
          className="form-input"
          type="number"
          min={1}
          value={totalTickets}
          onChange={e => setTotalTickets(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Ticket Price:</label>
        <input
          className="form-input"
          type="number"
          min={0}
          value={ticketPricing}
          onChange={e => setTicketPricing(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-input"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select
          className="form-input"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Theater">Theater</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="button" style={{ marginRight: 8 }}>
          {id ? "Update Event" : "Create Event"}
        </button>
        {/* {onCancel && (
          <button type="button" className="button" onClick={onCancel} style={{ background: "#888" }}>
            Cancel
          </button>
        )} */}
      </div>
    </form>
  );
};

export default EventForm;