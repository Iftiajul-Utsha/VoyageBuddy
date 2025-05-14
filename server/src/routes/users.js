const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/me', protect, userController.getMe);

// Admin only routes
router.get('/', protect, authorize('admin'), userController.getUsers);
router.put('/:id/role', protect, authorize('admin'), userController.updateUserRole);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router; 