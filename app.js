const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Simple route to check if the server is working
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server and listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
