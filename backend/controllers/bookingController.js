const Booking = require("../models/Booking");
const Event = require("../models/event");
const User = require('../models/User'); // adjust the path if needed

// Book tickets
exports.bookTickets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId, numTickets } = req.body;

    if (!eventId || !numTickets) {
      return res.status(400).json({ message: "Event ID and number of tickets are required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.status !== "approved") {
      return res.status(400).json({ message: "this event is not approved" });
    }
    if (event.remainingTickets < numTickets) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    const totalPrice = numTickets * event.ticketPricing;

    const booking = new Booking({
      user: userId,
      event: eventId,
      numTickets,
      totalPrice,
      status: "confirmed",
    });

    await booking.save();

    // Reduce available tickets
    event.remainingTickets -= numTickets;
    await event.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(" Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("event");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.user.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to view this booking" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Mark as canceled
    booking.status = "canceled";
    await booking.save();

    // Increase available tickets back
    const event = await Event.findById(booking.event);
    if (event) {
      event.remainingTickets += booking.numTickets;
      await event.save();
    }

    res.json({ message: "Booking canceled" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
