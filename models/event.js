const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Music', 'Sports', 'Conference', 'Workshop', 'Theater', 'Other'],
    },
    image: {
      type: String, 
      required: false,
    },
    ticketPricing: {
      type: Number,
      required: true,
      min: 0,
    },
    totalTickets: {
      type: Number,
      required: true,
      min: 1,
    },
    remainingTickets: {
      type: Number,
      required: true,
      min: 0,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
