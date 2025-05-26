import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const EventAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/v1/users/events/analytics",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setAnalytics(res.data.analytics || []);
      } catch (err) {
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!analytics.length) return <div>No events found for analytics.</div>;

  return (
    <div className="app-container">
      <h2 style={{ textAlign: "center" }}>Event Ticket Booking Analytics</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={analytics}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="eventTitle" />
          <YAxis unit="%" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="ticketsBookedPercentage"
            fill="#1976d2"
            name="Booked (%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventAnalyticsPage;