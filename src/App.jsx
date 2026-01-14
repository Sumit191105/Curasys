import React, { useEffect } from "react";
import "./App.css";
import ProvidenceWebsite from "./components/ProvidenceWebsite.jsx";
import DoctorDashboard from './components/DoctorDashboard.jsx'
import PatientProfile from './components/PatientProfile.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

// Components
import Cardiology from "./components/Services/Cardiology";
import EmergencyCare from "./components/Services/EmergencyCare";
import PrimaryCare from "./components/Services/PrimaryCare";
import WomenHealth from "./components/Services/WomenHealth";
import MedicalChatbot from "./components/MedicalChatbot.jsx";


const App = () => {
  
  // --- 1-Hour Alert Logic ---
  useEffect(() => {
    const checkAppointments = async () => {
      try {
        // Filhal hum saare appointments fetch kar rahe hain test karne ke liye
        // Real app mein yahan logged-in user ki email pass hogi
        const res = await axios.get('http://localhost:5000/api/appointments/all');
        const appointments = res.data;

        const now = new Date();

        appointments.forEach(appt => {
          // Date aur Time ko combine karke Date object banayein
          const apptTime = new Date(`${appt.date}T${appt.time}`);
          
          // Difference minutes mein nikalein
          const diffInMinutes = (apptTime - now) / (1000 * 60);

          // Agar appointment agle 60 minutes mein hai aur abhi tak beeta nahi hai
          if (diffInMinutes > 0 && diffInMinutes <= 60) {
            // Browser Alert
            alert(`⚠️ Reminder: Your appointment for ${appt.doctor} is scheduled at ${appt.time} (within 1 hour)!`);
          }
        });
      } catch (err) {
        console.error("Alert check failed:", err);
      }
    };

    
    checkAppointments();

    // Har 5 minute mein background mein check karte rahein
    const interval = setInterval(checkAppointments, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProvidenceWebsite />} />
          
          {/* Doctor Portal Route */}
          <Route path="/doctor-portal" element={<DoctorDashboard />} />
          <Route path="/patient-portal" element={<PatientProfile />} />
          <Route path="/admin-portal" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Service Routes */}
          <Route path="/services/cardiology" element={<Cardiology />} />
          <Route path="/services/emergency-care" element={<EmergencyCare />} />
          <Route path="/services/primary-care" element={<PrimaryCare />} />
          <Route path="/services/women-health" element={<WomenHealth />} />
        </Routes>
        <MedicalChatbot />
      </div>
    </Router>
  );
};

export default App;