const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  catid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Caterier'
  },
  foodid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Food'
  },
  custid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  count: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comments: {
    type: String
  },
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model('Order', orderSchema);
