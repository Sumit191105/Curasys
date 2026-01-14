const express = require('express');
const router = express.Router();
const Emergency = require('../models/Emergency'); 

// 1. POST: Patient se SOS Alert receive karna
router.post('/sos-alert', async (req, res) => {
  const { patientName, email, latitude, longitude } = req.body;
  
  try {
    const newAlert = new Emergency({
      patientName,
      email,
      latitude,
      longitude,
      status: 'Critical' // SOS hamesha Critical status ke saath save hoga
    });
    
    await newAlert.save();
    console.log(`🚨 SOS Alert Received from ${patientName}`);
    res.status(200).json({ success: true, message: "Emergency team notified!" });
  } catch (err) {
    console.error("SOS Route Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. GET: Admin ke liye Active/Critical alerts fetch karna
router.get('/active-alerts', async (req, res) => {
  try {
    // $in operator ka use karein dono status dhoondne ke liye
    const alerts = await Emergency.find({ 
      status: { $in: ['Active', 'Critical'] } 
    }).sort({ createdAt: -1 });
    
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. PATCH: SOS ko resolve karna (Ambulance dispatch hone par)
router.patch('/resolve/:id', async (req, res) => {
  try {
    await Emergency.findByIdAndUpdate(req.params.id, { status: 'Resolved' });
    res.json({ success: true, message: "Emergency Resolved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;