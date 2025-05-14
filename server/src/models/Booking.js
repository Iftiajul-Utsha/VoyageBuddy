const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: [true, 'Please provide a travel date']
  },
  travelers: {
    type: Number,
    required: [true, 'Please provide number of travelers'],
    min: [1, 'Number of travelers must be at least 1']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  note: {
    type: String,
    trim: true,
    maxlength: [500, 'Note cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual properties to populate referenced data
BookingSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

BookingSchema.virtual('destination', {
  ref: 'Destination',
  localField: 'destinationId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Booking', BookingSchema); 