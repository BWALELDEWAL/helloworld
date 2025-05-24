import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../components/EventCard";

const fetchBookingDetails = async (bookingId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to fetch booking details");
    return await res.json();
};

const BookingDetails = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooking = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBookingDetails(bookingId);
                setBooking(data); // instead of setBooking(data.booking)
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        loadBooking();
    }, [bookingId]);

    if (loading) return <div>Loading booking details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!booking) return <div>No booking found.</div>;

    return (
        <div
            style={{
                maxWidth: 500,
                margin: "2rem auto",
                padding: 24,
                border: "1px solid #eee",
                borderRadius: 12,
                background: "#f9fbff",
                boxShadow: "0 2px 12px rgba(25, 118, 210, 0.08)",
            }}
        >
            <h2 style={{ marginBottom: 24 }}>Booking Details</h2>
            <div style={{ marginBottom: 18 }}>
                {booking.event && <EventCard event={booking.event} />}
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #d0d7de", margin: "18px 0" }} />
            <div style={{ padding: "0 8px" }}>
                <p><strong>Booking ID:</strong> {booking._id}</p>
                <p><strong>Tickets:</strong> {booking.numTickets}</p>
                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default BookingDetails;
