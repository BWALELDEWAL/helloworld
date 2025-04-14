// In routes/userRoutes.js
const express = require('express');
const router = express.Router({ caseSensitive: true }); // Explicit Express 4 router
const userController = require('../controllers/userController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/forgetPassword', userController.forgetPassword);

// Protected routes
router.get('/users/profile', authenticate, userController.getProfile);
router.put('/users/profile', authenticate, userController.updateProfile);

// Admin routes
router.get('/users', authenticate, authorizeRole(['Admin']), userController.getAllUsers);
router.get('/users/:id', authenticate, authorizeRole(['Admin']), userController.getUser);
router.put('/users/:id', authenticate, authorizeRole(['Admin']), userController.updateUserRole);
router.delete('/users/:id', authenticate, authorizeRole(['Admin']), userController.deleteUser);

module.exports = router;