const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env file se variables load karne ke liye

// 1. Routes ko import karein
const appointmentRoutes = require('./routes/appointmentRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

const app = express();

// 2. Middlewares
app.use(cors({ origin: "http://localhost:5173" })); // Frontend ko connect karne ke liye
app.use(express.json()); // JSON data handle karne ke liye
app.use('/api/emergency', emergencyRoutes);

// 3. Database Connection
const DB_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hms_database';

mongoose.connect(DB_URL)
    .then(() => {
        console.log("✅ MongoDB Compass se connection jud gaya hai!");
    })
    .catch((err) => {
        console.error("❌ Database connection mein galti:", err);
    });

// 4. Routes Linking (Ye sabse important hai)
// Iska matlab hai ki har appointment related request "/api/appointments" se shuru hogi
app.use('/api/appointments', appointmentRoutes);

// 5. Root route (Sirf check karne ke liye ki server chal raha hai)
app.get('/', (req, res) => {
    res.send("🚀 HMS Backend Server is running smoothly!");
});

// 6. Port Setting
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server chal raha hai port: ${PORT}`);
    console.log(`🔗 Test URL: http://localhost:${PORT}/api/appointments/all`);
});