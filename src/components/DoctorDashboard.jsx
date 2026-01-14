import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Clock, CheckCircle, LogOut, Calendar, Activity } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Backend se data fetch karne ke liye
  useEffect(() => {
    const fetchAppts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments/all');
        setAppointments(res.data);
      } catch (err) { console.error("Error fetching appointments:", err); }
    };
    fetchAppts();
  }, []);

 const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/"); // Home page par bhejne ke liye
  } catch (err) {
    console.error("Logout error:", err);
  }
};
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <div className="w-72 bg-[#0F172A] text-white p-8 hidden md:block">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Activity size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">DR. ADMIN</span>
        </div>
        <nav className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-blue-600/10 text-blue-400 rounded-2xl cursor-pointer">
            <Calendar size={20}/> <span className="font-bold">Dashboard</span>
          </div>
          <div onClick={handleLogout} className="flex items-center gap-4 p-4 text-gray-400 hover:text-red-400 cursor-pointer transition-all">
            <LogOut size={20}/> <span className="font-bold">Logout</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
      <header className="flex justify-between items-center mb-12">
  <div>
    <h1 className="text-4xl font-black text-slate-900">Today's Schedule</h1>
    <p className="text-slate-500 font-medium mt-1">Management portal for upcoming appointments.</p>
  </div>

  <div className="flex items-center gap-6">
    {/* --- NAYA LOGOUT BUTTON --- */}
    <button 
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-red-200 flex items-center gap-2"
    >
      <LogOut size={18} /> LOGOUT
    </button>

    {/* Counter Card */}
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-black">
        {appointments.length}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Patients</p>
        <p className="font-bold text-slate-700">In-Queue</p>
      </div>
    </div>
  </div>
</header>

        {/* Appointments Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Patient Name</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Time Slot</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Department</th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-slate-50/50 transition-all">
                  <td className="p-6 font-bold text-slate-700">{appt.patientName}</td>
                  <td className="p-6 text-slate-500 font-medium flex items-center gap-2">
                    <Clock size={16} className="text-blue-500"/> {appt.time}
                  </td>
                  <td className="p-6">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase">
                      {appt.doctor}
                    </span>
                  </td>
                  <td className="p-6">
                    <button className="text-xs font-black text-teal-600 hover:text-teal-700 uppercase tracking-widest">Complete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;