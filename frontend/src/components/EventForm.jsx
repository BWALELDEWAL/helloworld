import React, { useState } from "react";

const EventForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [date, setDate] = useState(initialData.date ? initialData.date.slice(0, 16) : "");
  const [location, setLocation] = useState(initialData.location || "");
  const [totalTickets, setTotalTickets] = useState(initialData.totalTickets || "");
  const [ticketPricing, setTicketPricing] = useState(initialData.ticketPricing || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !location || !totalTickets || !ticketPricing || !description || !category) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSubmit({
      title,
      date,
      location,
      totalTickets: Number(totalTickets),
      ticketPricing: Number(ticketPricing),
      description,
      category,
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">{initialData._id ? "Edit Event" : "Create Event"}</h2>
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
          {initialData._id ? "Update Event" : "Create Event"}
        </button>
        {onCancel && (
          <button type="button" className="button" onClick={onCancel} style={{ background: "#888" }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;