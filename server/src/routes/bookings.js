const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Mock controller for development
const bookingController = {
  getBookings: (req, res) => {
    res.status(200).json({
      success: true,
      data: [
        {
          _id: '1',
          userId: req.user ? req.user._id : '101',
          destination: {
            _id: '1',
            name: "Cox's Bazar",
            location: "Chittagong Division",
            image: "https://images.unsplash.com/photo-1619112004223-a0ae50c130e4?q=80&w=2071&auto=format&fit=crop"
          },
          date: new Date('2023-12-25'),
          travelers: 2,
          status: 'Confirmed',
          note: 'Looking forward to this beach vacation!'
        },
        {
          _id: '2',
          userId: req.user ? req.user._id : '101',
          destination: {
            _id: '3',
            name: "Sylhet Tea Gardens",
            location: "Sylhet Division",
            image: "https://images.unsplash.com/photo-1566192091742-75a5edca2e99?q=80&w=2000&auto=format&fit=crop"
          },
          date: new Date('2024-01-15'),
          travelers: 4,
          status: 'Pending',
          note: 'Visiting with family, prefer a guide who speaks English.'
        }
      ]
    });
  },
  getUserBookings: (req, res) => {
    res.status(200).json({
      success: true,
      data: [
        {
          _id: '1',
          userId: req.user._id,
          destination: {
            _id: '1',
            name: "Cox's Bazar",
            location: "Chittagong Division",
            image: "https://images.unsplash.com/photo-1619112004223-a0ae50c130e4?q=80&w=2071&auto=format&fit=crop"
          },
          date: new Date('2023-12-25'),
          travelers: 2,
          status: 'Confirmed',
          note: 'Looking forward to this beach vacation!'
        }
      ]
    });
  },
  createBooking: (req, res) => {
    res.status(201).json({
      success: true,
      data: {
        _id: Date.now().toString(),
        userId: req.user._id,
        ...req.body,
        status: 'Pending',
        createdAt: new Date()
      }
    });
  },
  updateBookingStatus: (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        _id: req.params.id,
        status: req.body.status || 'Confirmed',
        updatedAt: new Date()
      }
    });
  },
  cancelBooking: (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        _id: req.params.id,
        status: 'Cancelled',
        updatedAt: new Date()
      }
    });
  }
};

// Protected routes - only authenticated users can access
router.get('/', protect, authorize('admin'), bookingController.getBookings);
router.get('/user', protect, bookingController.getUserBookings);
router.post('/', protect, bookingController.createBooking);
router.put('/:id/status', protect, authorize('admin'), bookingController.updateBookingStatus);
router.put('/:id/cancel', protect, bookingController.cancelBooking);

module.exports = router; 