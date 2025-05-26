import React, { useState } from "react";
import EventForm from "../components/EventForm";
import axios from "axios";

const NewEvent = () => {
  const [success, setSuccess] = useState(false);

  const handleCreate = async (eventData) => {
    try {
      console.log(eventData); // <-- Add this
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/v1/events", eventData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSuccess(true);
    } catch (err) {
      alert("Failed to create event.");
      console.error(err.response ? err.response.data : err);
    }
  };

  return (
    <div className="app-container">
      {success ? (
        <div style={{ color: "green", margin: "20px 0", textAlign: "center" }}>
          Event created successfully!
        </div>
      ) : (
        <EventForm onSubmit={handleCreate} />
      )}
    </div>
  );
};

export default NewEvent;