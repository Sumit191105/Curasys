import React, { useState, useEffect } from 'react';
import { 
  User, Bell, FileText, Pill, Calendar, Activity, 
  TrendingUp, Download, Plus, ChevronRight, Heart, X, Send, Clock 
} from 'lucide-react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  // --- States ---
  const [activeTab, setActiveTab] = useState('Overview');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for New Booking
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    dept: '',
    phone: '',
    message: ''
  });

  // Dummy Medications (Inhe bhi aap DB se fetch kar sakte hain)
  const [medications] = useState([
    { id: 1, name: "Atorvastatin", dosage: "10mg", frequency: "Once daily (Night)", status: "Active" },
    { id: 2, name: "Aspirin", dosage: "75mg", frequency: "After Breakfast", status: "Active" }
  ]);

  // --- 1. Fetch Appointments from DB ---
  const fetchUserData = async () => {
    if (user?.email) {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/appointments/my-appointments/${user.email}`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleSOS = () => {
  // Check karein kya browser location support karta hai
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Real-time API call to Backend
        await axios.post('http://localhost:5000/api/emergency/sos-alert', {
          patientName: user.displayName,
          email: user.email,
          latitude: latitude,
          longitude: longitude
        });
        alert("🚨 SOS SENT! Hospital has received your live location.");
      } catch (err) {
        alert("Failed to send alert. Call 102 immediately!");
      }
    }, (error) => {
      alert("Please enable Location Access to use SOS feature.");
    });
  }
};

  // --- 2. Handle New Booking ---
  const handleNewBooking = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first");

    setIsSubmitting(true);
    const bookingData = {
      ...formData,
      patientName: user.displayName,
      email: user.email,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/appointments/book', bookingData);
      if (res.data.success) {
        alert("🎉 Appointment Booked Successfully!");
        setShowBookingModal(false);
        setFormData({ doctor: '', date: '', time: '', dept: '', message: '' });
        fetchUserData(); // Refresh the list
      }
    } catch (err) {
      alert("Booking failed! Check your server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex">
      {/* --- Sidebar Navigation --- */}
      <div className="w-20 lg:w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6 transition-all">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Heart size={24} fill="white" />
          </div>
          <span className="text-xl font-black text-slate-800 hidden lg:block tracking-tighter">Curasys</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          {[
            { icon: <Activity />, label: "Overview" },
            { icon: <Calendar />, label: "Appointments" },
            { icon: <Pill />, label: "Medications" },
            { icon: <FileText />, label: "Lab Reports" },
            { icon: <Activity className="text-red-500" />, label: "Emergency" },
          ].map((item) => (
            <div 
              key={item.label} 
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                activeTab === item.label ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-blue-50'
              }`}
            >
              {item.icon} <span className="font-bold hidden lg:block">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{activeTab}</h1>
            <p className="text-slate-500 font-medium">Welcome back, {user?.displayName || "Guest"}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowBookingModal(true)}
              className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
            >
              <Plus size={20} /> Book New
            </button>
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border flex items-center justify-center text-slate-600 cursor-pointer hover:bg-gray-50">
              <Bell size={20} />
            </div>
            <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="profile" className="w-12 h-12 rounded-2xl border-2 border-white shadow-md" />
          </div>
        </header>

        {/* --- Tab: Overview --- */}
        {activeTab === 'Overview' && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: <Activity className="text-red-500" />, color: "bg-red-50" },
                { label: "Heart Rate", value: "72", unit: "bpm", icon: <Heart className="text-rose-500" />, color: "bg-rose-50" },
                { label: "Blood Sugar", value: "95", unit: "mg/dL", icon: <TrendingUp className="text-teal-500" />, color: "bg-teal-50" },
                { label: "Weight", value: "68", unit: "kg", icon: <User className="text-blue-500" />, color: "bg-blue-50" },
              ].map((vital, i) => (
                <div key={i} className={`${vital.color} p-6 rounded-[32px] border border-white shadow-sm flex flex-col`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm">{vital.icon}</div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Normal</span>
                  </div>
                  <h4 className="text-slate-500 text-sm font-bold uppercase tracking-tight">{vital.label}</h4>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-slate-900">{vital.value}</span>
                    <span className="text-sm font-bold text-slate-400">{vital.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-slate-800 mb-6">Recent Appointment</h3>
                  {loading ? (
                    <p className="text-center py-10 text-gray-400 font-bold">Loading appointments...</p>
                  ) : appointments.length > 0 ? (
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm font-black text-xs uppercase tracking-tighter">Live</div>
                        <div>
                          <h4 className="font-black text-slate-800">{appointments[0].doctor}</h4>
                          <p className="text-sm text-slate-500 font-bold uppercase tracking-tighter">{appointments[0].dept}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-800">{appointments[0].date}</p>
                        <p className="text-sm text-slate-400 font-bold">{appointments[0].time}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-10 text-gray-400 font-bold">No appointments found.</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                <h3 className="text-2xl font-black mb-2">Health Score</h3>
                <div className="text-6xl font-black mb-6">85<span className="text-2xl text-blue-400">/100</span></div>
                <div className="w-full bg-blue-800 rounded-full h-2 mb-4">
                  <div className="bg-teal-400 h-2 rounded-full w-[85%]"></div>
                </div>
                <p className="text-blue-300 text-sm font-bold">Excellent Condition!</p>
              </div>
            </div>
          </div>
        )}

        {/* --- Tab: Appointments --- */}
        {activeTab === 'Appointments' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {appointments.length > 0 ? appointments.map((apt, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Calendar size={20}/></div>
                  <div>
                    <h4 className="font-black text-slate-800">{apt.doctor}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase">{apt.dept}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="font-black text-slate-800">{apt.date}</p>
                    <p className="text-xs text-slate-400 font-bold">{apt.time}</p>
                  </div>
                  <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">Confirmed</span>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-300">
                <p className="text-slate-400 font-bold">No appointments booked yet.</p>
              </div>
            )}
          </div>
        )}

        {/* --- Tab: Medications --- */}
        {activeTab === 'Medications' && (
          <div className="grid md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
            {medications.map(med => (
              <div key={med.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl"><Pill size={24}/></div>
                <div>
                  <h4 className="text-xl font-black text-slate-800">{med.name}</h4>
                  <p className="text-slate-400 font-bold">{med.dosage} • {med.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* --- Tab: Emergency (SOS) --- */}
{activeTab === 'Emergency' && (
  <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
    <div className="bg-red-500 p-12 rounded-[40px] text-center shadow-2xl shadow-red-100 relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">EMERGENCY SOS</h2>
        <p className="text-red-100 mb-10 font-bold max-w-md mx-auto">
          Pressing this button will instantly send your live GPS location to our 24/7 Trauma Center.
        </p>
        
        {/* SOS Button */}
        <button 
          onClick={handleSOS}
          className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group border-[12px] border-red-400"
        >
          <div className="text-red-600 font-black text-3xl">SOS</div>
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-1">Send Alert</p>
        </button>
      </div>
      
      {/* Decorative Background Icon */}
      <Activity className="absolute -right-10 -bottom-10 text-red-400 w-64 h-64 opacity-20" />
    </div>

    {/* Ambulance Booking Options */}
    <div className="grid md:grid-cols-2 gap-6">
       <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-2">Book Ambulance</h3>
          <p className="text-slate-500 text-sm font-medium mb-6">Dispatch standard or ICU ambulance to your location.</p>
          <div className="space-y-4">
             <button className="w-full py-4 bg-slate-50 text-slate-800 rounded-2xl font-black hover:bg-slate-100 transition-all flex justify-between px-6 items-center">
                <span>Basic Life Support</span>
                <span className="text-blue-600">₹499</span>
             </button>
             <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black hover:bg-black transition-all flex justify-between px-6 items-center">
                <span>Cardiac ICU Mobile</span>
                <span className="text-teal-400">₹1499</span>
             </button>
          </div>
       </div>
       
       <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
          <Clock className="text-blue-600 mb-4" size={40} />
          <h4 className="font-black text-slate-800">24/7 Helpline</h4>
          <p className="text-3xl font-black text-blue-600 mt-2">102 / 108</p>
          <p className="text-slate-400 font-bold text-xs mt-2">Direct Hospital Dispatch</p>
       </div>
    </div>
  </div>
)}

      {/* --- Real-time Booking Modal --- */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative animate-in zoom-in-90 duration-300">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"><X/></button>
            <h2 className="text-3xl font-black mb-2 tracking-tighter text-slate-900">New Slot</h2>
            <p className="text-slate-500 mb-8 font-medium">Fill details to book in DB</p>
            
           <form onSubmit={handleNewBooking} className="space-y-4">
  {/* 1. Doctor Name Input */}
  <input 
    type="text" name="doctor" placeholder="Doctor Name" required 
    onChange={handleChange} value={formData.doctor}
    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
  />

  {/* 2. Phone Number Input (ISSE SELECT SE BAHAR RAKHEIN) */}
  <input 
    type="tel" 
    name="phone" 
    placeholder="Phone Number" 
    required 
    onChange={handleChange} 
    value={formData.phone}
    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
  />

  {/* 3. Department Select */}
  <select 
    name="dept" 
    required 
    onChange={handleChange} 
    value={formData.dept}
    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-600"
  >
    <option value="">Choose Department</option>
    <option value="Cardiology">Cardiology</option>
    <option value="Primary Care">Primary Care</option>
    <option value="Emergency Care">Emergency Care</option>
    <option value="Women Health">Women Health</option>
  </select>

  {/* 4. Date and Time */}
  <div className="grid grid-cols-2 gap-4">
    <input type="date" name="date" required onChange={handleChange} value={formData.date} className="p-4 bg-slate-50 rounded-2xl font-bold border-none" />
    <input type="time" name="time" required onChange={handleChange} value={formData.time} className="p-4 bg-slate-50 rounded-2xl font-bold border-none" />
  </div>

  <button 
    type="submit" 
    disabled={isSubmitting}
    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-blue-300 transition-all"
  >
    {isSubmitting ? "Processing..." : <><Send size={20}/> Confirm & Save</>}
  </button>
</form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;