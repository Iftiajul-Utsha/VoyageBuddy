const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Mock controller for development
const reviewController = {
  getReviews: (req, res) => {
    res.status(200).json({
      success: true,
      data: [
        {
          _id: '1',
          userId: { _id: '101', name: 'Ahmed Khan' },
          rating: 5,
          text: "Cox's Bazar was an amazing experience! The beach stretches as far as the eye can see.",
          timestamp: new Date('2023-12-10'),
          destination: { _id: '1', name: "Cox's Bazar" }
        },
        {
          _id: '2',
          userId: { _id: '102', name: 'Fatima Rahman' },
          rating: 4,
          text: "Loved exploring Sundarbans! We even caught a glimpse of a Royal Bengal Tiger from our boat!",
          timestamp: new Date('2023-11-15'),
          destination: { _id: '2', name: "Sundarbans" }
        }
      ]
    });
  },
  getReview: (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        _id: req.params.id,
        userId: { _id: '101', name: 'Ahmed Khan' },
        rating: 5,
        text: "Cox's Bazar was an amazing experience! The beach stretches as far as the eye can see.",
        timestamp: new Date('2023-12-10'),
        destination: { _id: '1', name: "Cox's Bazar" }
      }
    });
  },
  createReview: (req, res) => {
    res.status(201).json({
      success: true,
      data: {
        _id: Date.now().toString(),
        userId: req.user._id,
        ...req.body,
        timestamp: new Date()
      }
    });
  },
  updateReview: (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        _id: req.params.id,
        userId: req.user._id,
        ...req.body,
        updatedAt: new Date()
      }
    });
  },
  deleteReview: (req, res) => {
    res.status(200).json({
      success: true,
      data: {}
    });
  }
};

// Public routes
router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReview);

// Protected routes
router.post('/', protect, reviewController.createReview);
router.put('/:id', protect, reviewController.updateReview);
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router; 