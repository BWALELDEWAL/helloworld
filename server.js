require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware 
app.use(express.json());

// Database Connection 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  }
};
connectDB();

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1', userRoutes);
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/v1', bookingRoutes); 


// Health Check
app.get('/', (req, res) => res.status(200).json({
  status: 'UP',
  message: 'All good'
}));

// Error Handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); 
