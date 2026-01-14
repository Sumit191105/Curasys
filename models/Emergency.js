const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Active' // 'Active', 'Resolved', ya 'Dispatched'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Emergency', EmergencySchema);