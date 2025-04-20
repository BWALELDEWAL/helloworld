const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

router.post("/bookings", authenticate,authorizeRole(['User']), bookingController.bookTickets);
router.get("/bookings/:id", authenticate,authorizeRole(['User']), bookingController.getBookingById);
router.delete("/bookings/:id", authenticate,authorizeRole(['User']), bookingController.cancelBooking);

module.exports = router;
