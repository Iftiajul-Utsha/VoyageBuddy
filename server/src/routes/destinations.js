const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', destinationController.getDestinations);
router.get('/:id', destinationController.getDestination);

// Admin only routes
router.post('/', protect, authorize('admin'), destinationController.createDestination);
router.put('/:id', protect, authorize('admin'), destinationController.updateDestination);
router.delete('/:id', protect, authorize('admin'), destinationController.deleteDestination);

module.exports = router; 