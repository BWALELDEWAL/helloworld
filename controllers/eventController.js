const mongoose = require('mongoose');
const Event = require('../models/event');

exports.createEvent = async (req, res, next) => {
  try {
    const requiredFields = ['title', 'date', 'location', 'totalTickets'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const newEvent = await Event.create({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      totalTickets: req.body.totalTickets,
      ticketPricing: req.body.ticketPricing,
      description: req.body.description,
      category: req.body.category,
      organizer: req.user.userId,
      remainingTickets: req.body.totalTickets,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      event: {
        id: newEvent._id,
        title: newEvent.title,
        status: newEvent.status,
        date: newEvent.date,
        location: newEvent.location
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An event with this title already exists'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    const updates = { ...req.body };

    if (req.user.role === 'Organizer') {
      if ('status' in updates) {
        delete updates.status;
      }

      if (event.organizer.toString() !== req.user.userId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Not authorized to update this event' 
        });
      }
    }

    if (updates.totalTickets) {
      const diff = updates.totalTickets - event.totalTickets;
      updates.remainingTickets = event.remainingTickets + diff;
    }

    event = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, event });

  } catch (error) {
    next(error);
  }
};
