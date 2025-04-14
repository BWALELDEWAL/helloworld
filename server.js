require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// --- Middleware ---
app.use(express.json()); // Body parser

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    process.exit(1); // Exit on DB failure
  }
};
connectDB();

// --- Routes ---
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1', userRoutes); // More explicit path

// --- Health Check ---
app.get('/', (req, res) => res.status(200).json({ 
  status: 'UP', 
  message: 'Server is running' 
}));

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Error Handler (Placeholder - Add a proper error middleware later) ---
app.use((err, req, res, next) => {
  console.error('⚠️ Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));