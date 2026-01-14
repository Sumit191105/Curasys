import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.email === "admin@hms.com") {
        navigate('/admin-portal');
      } else {
        setError("Access Denied: You are not an Admin!");
      }
    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800 rounded-[40px] p-10 shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/20">
            <ShieldAlert className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Admin Access</h2>
          <p className="text-slate-400 mt-2 font-medium">Restricted Personnel Only</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-500" size={20} />
            <input 
              type="email" placeholder="Admin Email" required 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 p-4 bg-slate-900 border-none rounded-2xl text-white outline-none focus:ring-2 focus:ring-red-500 font-bold"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-500" size={20} />
            <input 
              type="password" placeholder="Password" required 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 p-4 bg-slate-900 border-none rounded-2xl text-white outline-none focus:ring-2 focus:ring-red-500 font-bold"
            />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-red-500/20 uppercase tracking-widest">
            Enter Command Center
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;