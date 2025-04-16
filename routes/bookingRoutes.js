const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

router.post("/bookings", authenticate, bookingController.bookTickets);
router.get("/bookings/:id", authenticate, bookingController.getBookingById);
router.delete("/bookings/:id", authenticate, bookingController.cancelBooking);

module.exports = router;
