const express = require('express');
const Feedback = require('./ComplaintSchema');


const router = express.Router();

const ViewCustomerComplaint = async (req, res) => {
  const { custid, catid, orderId, rating, complaint } = req.body;

  try {
    if (!custid || !catid) {
      return res.status(400).json({ success: false, message: 'custid and catid are required.' });
    }

    const feedback = new Feedback({
      custid,
      catid,
      orderId,
      rating,
      complaint,
    });
    
    await feedback.save(); 

    return res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!',
      data: feedback,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error submitting feedback.',
      error: error.message,
    });
  }
};

const ViewCustomerComplaintByCus = (req, res) => {
  Feedback.find({ catid: req.params.id })
    .populate('custid') 
    .then((data) => {
      res.json({
        status: 200,
        Message: "Data obtained",
        data: data
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        Message: "Error fetching data",
        error: err.message 
      });
    });
};

const ViewCustomerComplaintByCat = async (req, res) => {
  try {
    const complaints = await Feedback.find()
    .populate('catid') 
      .populate('custid') 
      .populate('orderId'); 

    return res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving complaints.',
      error: error.message,
    });
  }
};




module.exports = {ViewCustomerComplaint,ViewCustomerComplaintByCat,ViewCustomerComplaintByCus};
