import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; // <-- Import the clickable card

const API_URL = 'http://localhost:5000/api/v1/events';

// Use the same categories as in your schema
const CATEGORY_OPTIONS = [
  'all',
  'Music',
  'Sports',
  'Conference',
  'Workshop',
  'Theater',
  'Other'
];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

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

  // Filter and search logic
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase()) ||
                          event.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || event.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Collect unique categories for filter dropdown
  const categories = CATEGORY_OPTIONS;

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="event-list-page">
      <h2>Approved Events</h2>
      <div className="event-list-controls">
        <input
          type="text"
          className="event-search"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="event-filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="event-list">
        {filteredEvents.length === 0 ? (
          <p>No approved events available.</p>
        ) : (
          filteredEvents.map(event => (
            <EventCard key={event._id || event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;