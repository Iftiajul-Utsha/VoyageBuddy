const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user ID']
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: [true, 'Please provide a destination ID']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  text: {
    type: String,
    required: [true, 'Please provide review text'],
    trim: true,
    maxlength: [500, 'Review cannot be more than 500 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual properties to populate referenced data
ReviewSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

ReviewSchema.virtual('destination', {
  ref: 'Destination',
  localField: 'destinationId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Review', ReviewSchema); 