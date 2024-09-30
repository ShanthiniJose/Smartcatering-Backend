// models/ComplaintSchema.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', 
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  complaint: {
    type: String,
    required: true,
  },
  catid: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Caterier',
    required: true,
  },
  custid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', 
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
