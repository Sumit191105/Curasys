import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Phone, CheckCircle, AlertTriangle, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 
import { auth } from '../firebase'; 

const AdminDashboard = () => {
  const navigate = useNavigate(); // 2. YEH LINE MISSING HAI, ise add karein
  const [emergencies, setEmergencies] = useState([]);
  const [lastAlertCount, setLastAlertCount] = useState(0);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const fetchSOS = async () => {
    try {
   const res = await axios.get('http://localhost:5000/api/emergency/active-alerts');
      setEmergencies(res.data);
      
      // Agar naye alerts aaye hain toh Siren bajao
      if (res.data.length > lastAlertCount) {
        const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3'); // Siren sound link
        audio.play();
      }
      setLastAlertCount(res.data.length);
    } catch (err) {
      console.error("Alert fetch failed", err);
    }
  };

  useEffect(() => {
    fetchSOS(); // First time fetch
    const interval = setInterval(fetchSOS, 5000); // Har 5 sec mein refresh
    return () => clearInterval(interval);
  }, [lastAlertCount]);

  const resolveEmergency = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/emergency/resolve/${id}`);
      fetchSOS(); // Refresh list
    } catch (err) { alert("Failed to resolve"); }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
     <header className="flex justify-between items-center mb-10 border-b border-slate-700 pb-6">
  <div>
    <h1 className="text-4xl font-black tracking-tighter text-red-500 flex items-center gap-3">
      <AlertTriangle className="animate-pulse" /> EMERGENCY COMMAND CENTER
    </h1>
    <p className="text-slate-400 font-bold uppercase text-xs mt-2 tracking-widest">Hospital Administration Panel</p>
  </div>
  <div className="flex items-center gap-4">
    <button 
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
    >
      LOGOUT
    </button>
    
    <div className="bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20">
      <span className="text-red-500 font-black text-2xl">{emergencies.length}</span>
      <span className="ml-2 text-red-300 font-bold text-sm uppercase">Active SOS</span>
    </div>
  </div>
</header>
      <div className="grid gap-6">
        {emergencies.length > 0 ? emergencies.map((alert) => (
          <div key={alert._id} className="bg-slate-800 border-l-8 border-red-600 p-8 rounded-[32px] flex flex-col md:flex-row justify-between items-center transition-all hover:bg-slate-700 shadow-2xl">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <Truck color="white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{alert.patientName}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="flex items-center gap-1 text-slate-400 font-bold text-sm"><Phone size={14}/> {alert.email}</span>
                  <span className="text-slate-500 font-bold text-sm">|</span>
                  <span className="text-red-400 font-bold text-sm">Status: {alert.status}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6 md:mt-0">
              {/* Google Maps Link */}
            <a 
href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
  target="_blank" 
  rel="noreferrer"
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black transition-all"
>
  <MapPin size={20} /> VIEW ON MAP
</a>
              
              <button 
                onClick={() => resolveEmergency(alert._id)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-black transition-all"
              >
                <CheckCircle size={20} /> DISPATCHED
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-40 bg-slate-800/50 rounded-[40px] border-2 border-dashed border-slate-700">
            <p className="text-slate-500 font-black text-2xl uppercase tracking-widest">No Active Emergencies</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;