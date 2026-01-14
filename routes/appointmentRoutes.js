const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// 1. POST: Naya appointment book karne ke liye
router.post('/book', async (req, res) => {
    try {
        const { doctor, date, time } = req.body;

        // Check if slot is already taken
        const existing = await Appointment.findOne({ doctor, date, time });
        if (existing) {
            return res.status(400).json({ success: false, message: "Doctor is busy at this time slot." });
        }

        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        
        res.status(201).json({ success: true, message: "Appointment Booked!", data: newAppointment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. GET: Saare appointments dekhne ke liye (Admin ke liye)
router.get('/all', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/my-appointments/:email', async (req, res) => {
  try {
    // Ye line aapki email ke basis par appointments dhoondti hai
    const appointments = await Appointment.find({ email: req.params.email }).sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;