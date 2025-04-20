const express = require('express');
const router = express.Router({ caseSensitive: true });
const eventController = require('../controllers/eventController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

// Organizer routes
router.post('/events', authenticate, authorizeRole(['Organizer']), eventController.createEvent);

// Organizer or Admin routes
router.put('/events/:id', authenticate, authorizeRole(['Organizer', 'Admin']), eventController.updateEvent);
/////////////////////////////////////////////////////////////