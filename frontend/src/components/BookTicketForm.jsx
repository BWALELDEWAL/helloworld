import React, { useState } from "react";
import axios from "axios";

const BookTicketForm = ({ eventId, availableTickets = 1, ticketPrice = 0 }) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(availableTickets, Number(e.target.value)));
    setQuantity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    // Add this line to debug
    console.log("Submitting booking:", { eventId, quantity });

    if (quantity > availableTickets) {
      setError("Not enough tickets available.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/v1/bookings",
        { eventId, numTickets: quantity }, 
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setMessage("Tickets booked successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: 400 }}>
      <h3 className="form-title" style={{ fontSize: "1.2rem" }}>Book Tickets</h3>
      {message && <div className="form-success">{message}</div>}
      {error && <div className="form-error">{error}</div>}
      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          min={1}
          max={availableTickets}
          value={quantity}
          onChange={handleQuantityChange}
          className="form-input"
          style={{ width: 80 }}
        />
        <span style={{ marginLeft: 12, color: "#888" }}>
          (Available: {availableTickets})
        </span>
      </div>
      <div className="form-group">
        <label>Total Price:</label>
        <div style={{ fontWeight: 600, color: "#1976d2" }}>
          ${ticketPrice * quantity}
        </div>
      </div>
      <button
        type="submit"
        className="button"
        style={{ width: "100%", marginTop: 18 }}
        disabled={loading || availableTickets === 0}
      >
        {loading ? "Booking..." : "Book"}
      </button>
    </form>
  );
};

export default BookTicketForm; 