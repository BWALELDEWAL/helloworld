import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EventForm from "../components/EventForm";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/v1/events/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setInitialData(res.data);
      } catch (err) {
        alert("Failed to fetch event data.");
        console.error(err.response ? err.response.data : err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (eventData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/v1/events/${id}`, eventData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      alert("Event updated successfully!");
      navigate("/my-events");
    } catch (err) {
      alert("Failed to update event.");
      console.error(err.response ? err.response.data : err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <EventForm
        onSubmit={handleUpdate}
        {...(initialData && {
          title: initialData.title,
          date: initialData.date,
          location: initialData.location,
          totalTickets: initialData.totalTickets,
          ticketPricing: initialData.ticketPricing,
          description: initialData.description,
          category: initialData.category,
        })}
      />
    </div>
  );
};

export default EditEvent;