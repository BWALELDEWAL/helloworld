import { Link } from "react-router-dom";

const cardStyle = {
  cursor: "pointer",
  background: "#f4f8fd",
  borderRadius: "14px",
  boxShadow: "0 2px 12px rgba(25, 118, 210, 0.08)",
  padding: "28px 22px",
  width: "320px",
  textAlign: "left",
  borderLeft: "6px solid #1976d2",
  transition: "box-shadow 0.2s, border-color 0.2s",
  margin: "12px 0",
};
const titleStyle = { marginTop: 0, color: "#1976d2", fontSize: "1.35rem" };
const dateStyle = { margin: "10px 0", color: "#333", fontSize: "1.05rem" };
const locationStyle = { margin: "10px 0", color: "#333", fontSize: "1.05rem" };
const priceStyle = { margin: "10px 0", color: "#1976d2", fontWeight: "bold", fontSize: "1.08rem" };

const EventCard = ({ event }) => (
  <Link
    to={`/events/${event._id || event.id}`}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div style={cardStyle}>
      <h3 style={titleStyle}>{event.title}</h3>
      <p style={dateStyle}>{event.date}</p>
      <p style={locationStyle}>{event.location}</p>
      <p style={priceStyle}>${event.ticketPricing}</p>
    </div>
  </Link>
);

export default EventCard;