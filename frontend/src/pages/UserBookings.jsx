import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canceling, setCanceling] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/v1/users/bookings", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    setCanceling(bookingId);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setBookings(bookings.filter(b => b._id !== bookingId));
    } catch (err) {
      alert("Failed to cancel booking.");
    } finally {
      setCanceling(null);
    }
  };

  const activeBookings = bookings.filter(b => b.status !== "canceled");

  if (loading) return <div>Loading your bookings...</div>;
  if (error) return <div className="form-error">{error}</div>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {activeBookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="event-list">
          {activeBookings.map((booking) => (
            <div key={booking._id}
              style={{
                maxWidth: 400,
                margin: "24px auto",
                padding: 0,
                border: "1px solid #eee",
                borderRadius: 12,
                background: "#f9fbff",
                boxShadow: "0 2px 12px rgba(25, 118, 210, 0.08)",
                overflow: "hidden"
              }}
            >
              <div style={{ marginBottom: 0 }}>
                <EventCard event={booking.event} />
              </div>
              <div style={{ padding: "0 22px 8px 22px" }}>
                <Link
                  to={`/bookings/${booking._id}`}
                  style={{
                    display: "inline-block",
                    margin: "12px 0 0 0",
                    color: "#1976d2",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    fontSize: "1rem"
                  }}
                >
                  View Details
                </Link>
              </div>
              <hr style={{ border: "none", borderTop: "1px solid #d0d7de", margin: "0 0 0 0" }} />
              <div style={{ padding: "16px 22px" }}>
                <p style={{ margin: "10px 0", color: "#333", fontSize: "1.05rem" }}>
                  <strong>Tickets:</strong> {booking.numTickets}
                </p>
                <p style={{ margin: "10px 0", color: "#1976d2", fontWeight: "bold", fontSize: "1.08rem" }}>
                  <strong>Total Price:</strong> ${booking.totalPrice}
                </p>
                <button
                  className="button"
                  style={{ width: "100%", background: "#d32f2f", marginTop: 8 }}
                  onClick={e => {
                    e.preventDefault();
                    handleCancel(booking._id);
                  }}
                  disabled={canceling === booking._id}
                >
                  {canceling === booking._id ? "Cancelling..." : "Cancel Booking"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
