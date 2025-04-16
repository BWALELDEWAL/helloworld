const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/api/v1/bookings", authMiddleware, bookingController.bookTickets);
router.get("/api/v1/bookings/:id", authMiddleware, bookingController.getBookingById);
router.delete("/api/v1/bookings/:id", authMiddleware, bookingController.cancelBooking);

module.exports = router;
