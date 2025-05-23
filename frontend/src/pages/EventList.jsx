import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; // <-- Import the clickable card

const API_URL = 'http://localhost:5000/api/v1/events';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setEvents(res.data.events || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Approved Events</h2>
      <div className="event-list">
        {events.length === 0 ? (
          <p>No approved events available.</p>
        ) : (
          events.map(event => (
            <EventCard key={event._id || event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;