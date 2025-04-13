require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route (verify server works)
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// Database connection (without routes)
mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/event-ticketing')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB error:', err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server ready at http://localhost:${PORT}`);
  console.log('No routes mounted yet - add them later');
});