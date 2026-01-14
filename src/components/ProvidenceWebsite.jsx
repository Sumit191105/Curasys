import React, { useState, useEffect } from 'react';
import { Heart, Phone, MapPin, Clock, Users, Award, ChevronRight, Menu, X, Calendar, Stethoscope, Activity, Shield, Send } from 'lucide-react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const ProvidenceWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState(null);

  // --- Backend Integration States ---
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // User login hai ya nahi check karein
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
}, []);

const navigate = useNavigate(); // Hook initialize karein

const handleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const userEmail = result.user.email;

        if (userEmail === "aapki-doctor-email@gmail.com") {
            alert("Logging in as Doctor...");
            navigate("/doctor-portal"); // Exact location for redirection
        } else {
            alert("Welcome User!");
            // Yahan aap user portal par bhej sakte hain agar banaya hai
        }
    } catch (error) {
        console.error("Login failed", error);
    }
};
  const [showRoleModal, setShowRoleModal] = useState(false);

const handleLoginFlow = async (role) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // Ab hum email check nahi kar rahe, sirf role check kar rahe hain

        if (role === 'doctor') {
            alert("✅ Logging in as Doctor... Redirecting to Admin Portal.");
            navigate("/doctor-portal"); // Kisi bhi email se yahan bhej dega
        } else {
            alert(`👋 Welcome Patient: ${result.user.displayName}`);
            navigate("/patient-portal");
        }
        
        setShowRoleModal(false); 
    } catch (err) {
        console.error("Login Flow Error:", err);
        alert("Login failed! Please check your internet or Firebase settings.");
    }
};


const handleDoctorsClick = (e) => {
  e.preventDefault(); // Default link behavior ko rokne ke liye
  
  // Google Maps search query: "Doctors near [User Location]"
  const searchQuery = encodeURIComponent("Best doctors near me");
  const googleMapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
  
  // Naye tab mein Maps kholne ke liye
  window.open(googleMapsUrl, '_blank');
};

  // --- Backend Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/appointments/book', formData);
      if (response.data.success) {
        alert("Success: " + response.data.message);
        setShowModal(false);
        setFormData({ patientName: '', email: '', phone: '', doctor: '', date: '', time: '', message: '' });
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced diagnostic and treatment options."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response and expert medical teams."
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Primary Care",
      description: "Your healthcare partner for preventive care and wellness management."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Women Health",
      description: "Expert specialists providing advanced treatment across multiple disciplines."
    }
  ];

  const stats = [
    { number: "150+", label: "Expert Physicians" },
    { number: "50K+", label: "Patients Served" },
    { number: "25+", label: "Years of Excellence" },
    { number: "24/7", label: "Emergency Care" }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* --- Appointment Booking Modal --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="text-blue-600 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
              <p className="text-sm text-gray-500">Fill details to secure your slot</p>
            </div>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <input 
                type="text" name="patientName" placeholder="Full Name" required 
                onChange={handleChange} value={formData.patientName} 
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="email" name="email" placeholder="Email" required 
                  onChange={handleChange} value={formData.email} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none" 
                />
                <input 
                  type="tel" name="phone" placeholder="Phone" required 
                  onChange={handleChange} value={formData.phone} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none" 
                />
              </div>
              <select 
                name="doctor" required onChange={handleChange} value={formData.doctor} 
                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none bg-white"
              >
                <option value="">Select Department</option>
                {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="date" name="date" required onChange={handleChange} value={formData.date} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none" 
                />
                <input 
                  type="time" name="time" required onChange={handleChange} value={formData.time} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none" 
                />
              </div>
              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:bg-blue-400"
              >
                {isSubmitting ? "Processing..." : <><Send className="w-4 h-4" /> Confirm Booking</>}
              </button>
            </form>
          </div>
        </div>
      )}
   {/* --- STEP 3: ROLE SELECTION MODAL --- */}
{showRoleModal && (
  <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
    <div className="bg-white p-10 rounded-[40px] max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
      <h3 className="text-2xl font-black text-center text-gray-900 mb-8 uppercase tracking-tighter">Identify Yourself</h3>
      
      <div className="space-y-4">
        <button 
          onClick={() => { setShowRoleModal(false); navigate("/admin-login"); }} 
          className="w-full py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-200"
        >
          🔐 LOG IN AS ADMIN
        </button>
        <button 
          onClick={() => handleLoginFlow('doctor')} 
          className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black hover:bg-blue-800 transition-all flex items-center justify-center gap-3"
        >
          👨‍⚕️ LOG IN AS DOCTOR
        </button>
        
        <button 
          onClick={() => handleLoginFlow('patient')} 
          className="w-full py-4 border-2 border-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
        >
          👤 LOG IN AS PATIENT
        </button>
      </div>

      <button 
        onClick={() => setShowRoleModal(false)}
        className="w-full mt-6 text-gray-400 text-xs font-black uppercase tracking-widest hover:text-gray-600"
      >
        Cancel
      </button>
    </div>
  </div>
)}
{user && (
  <button 
    onClick={() => navigate("/patient-portal")}
    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-100 transition-all"
  >
    MY HEALTH PORTAL
  </button>
)}
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-bold ${
                scrollY > 50 ? 'text-gray-800' : 'text-white'
              }`}>Curasys</span>
            </div>
            
        <div className="hidden md:flex items-center space-x-8">
  {['Services', 'About', 'Doctors', 'Contact'].map((item) => {
    if (item === 'Doctors') {
      return (
        <button
          key={item}
          onClick={handleDoctorsClick}
          className={`font-medium transition-colors hover:text-blue-600 bg-transparent border-none cursor-pointer p-0 m-0 outline-none ${
            scrollY > 50 ? 'text-gray-700' : 'text-white'
          }`}
        >
          {item}
        </button>
      );
    }
    return (
      <a
        key={item}
        href={`#${item.toLowerCase()}`}
        className={`font-medium transition-colors hover:text-blue-600 ${
          scrollY > 50 ? 'text-gray-700' : 'text-white'
        }`}
      >
        {item}
      </a>
    );
  })}
  

  {/* LOGIN / LOGOUT LOGIC HERE */}
  {user ? (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-end">
        <span className={`text-xs font-bold ${scrollY > 50 ? 'text-blue-600' : 'text-teal-300'}`}>
          LOGGED IN
        </span>
        <span className={`text-sm font-medium ${scrollY > 50 ? 'text-gray-800' : 'text-white'}`}>
          {user.displayName}
        </span>
      </div>
      <button 
        onClick={() => signOut(auth)} 
        className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-red-600 transition-all shadow-md"
      >
        Logout
      </button>
    </div>
  ) : (
   <button 
  onClick={() => setShowRoleModal(true)} // handleLogin ki jagah ye likhein
  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
>
  <Users className="w-4 h-4" />
  <span>Login / Sign Up</span>
</button>
  )}

  <button 
    onClick={() => setShowModal(true)}
    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2"
  >
    <Calendar className="w-4 h-4" />
    <span>Book Appointment</span>
  </button>
</div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrollY > 50 ? 'text-gray-800' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrollY > 50 ? 'text-gray-800' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-2">
              {['Services', 'About', 'Doctors', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => setShowModal(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600"></div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Caring for Your
            <span className="block bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
              Health & Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience compassionate, innovative healthcare that puts you first. Our expert team is dedicated to your wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Appointment</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Emergency: (555) 123-4567</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Medical Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions tailored to meet your unique needs with cutting-edge technology and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-blue-600 mb-4 group-hover:text-blue-700 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={
                    service.title === "Cardiology"
                      ? "/services/cardiology"
                      : service.title === "Emergency Care"
                      ? "/services/emergency-care"
                      : service.title === "Primary Care"
                      ? "/services/primary-care"
                      : service.title === "Women Health"
                      ? "/services/women-health"
                      : "/"
                  }
                  className="inline-flex items-center px-4 py-2 border-2 border-blue-600 text-blue-700 font-semibold rounded-lg bg-white shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <span>Learn More</span>
                  <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Excellence in Healthcare Since 1999
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Curasys Healthcare has been at the forefront of medical innovation, providing exceptional patient care with a commitment to healing, compassion, and community service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">Joint Commission Accredited</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">150+ Board-Certified Physicians</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">24/7 Emergency Services</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-200 to-teal-200 p-8 flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-white bg-opacity-50 flex items-center justify-center">
                  <Heart className="w-32 h-32 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Schedule Your Visit?
            </h2>
            <p className="text-xl text-gray-300">
              Contact us today to book an appointment or learn more about our services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">(555) 123-4567</p>
            </div>
            <div className="text-center p-6">
              <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">123 Healthcare Blvd<br />Medical City, MC 12345</p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-300">24/7 Emergency<br />Mon-Fri: 8AM-6PM</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Book Your Appointment Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Curasys</span>
            </div>
            <div className="text-gray-400 text-center">
              <p>&copy; 2026 Curasys Healthcare. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProvidenceWebsite;