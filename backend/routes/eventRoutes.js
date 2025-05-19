const express = require('express');
const router = express.Router({ caseSensitive: true });
const eventController = require('../controllers/eventController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

// Organizer routes
router.post('/events', authenticate, authorizeRole(['Organizer']), eventController.createEvent);

// Organizer or Admin routes
router.put('/events/:id', authenticate, authorizeRole(['Organizer', 'Admin']), eventController.updateEvent);
/////////////////////////////////////////////////////////////

// Admin routes
router.get('/events/all', authenticate, authorizeRole(['Admin']), eventController.getAllEvents);

// Public routes
router.get('/events', eventController.getApprovedEvents);
router.get('/events/:id', eventController.getEvent);

// Organizer or Admin routes
router.delete('/events/:id', authenticate, authorizeRole(['Organizer', 'Admin']), eventController.deleteEvent);

module.exports = router;