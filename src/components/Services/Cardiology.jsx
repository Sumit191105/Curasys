import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cardiology = () => {
  const [openIndex, setOpenIndex] = useState(1); // Second item open by default
  const navigate = useNavigate();

  const accordion = [
    {
      title: "01. Heart experts",
      content: "Our team comprises highly qualified and experienced cardiologists dedicated to providing the best cardiac care.",
    },
    {
      title: "02. Outpatient Department?",
      content: "Our doctors are available at OPD for consultation at the first step, if the degree of illness is higher our doctor recommends necessary tests.",
    },
    {
      title: "03. Precaution is better than cure",
      content: "We emphasize preventive cardiology, helping patients adopt healthy lifestyles to avoid heart disease.",
    },
  ];

  return (
    <section className="w-full bg-white">

      {/* Appointment Booking Section */}
      <div className="w-full bg-[#ff466b] py-12 px-4 flex flex-col md:flex-row items-center justify-center relative">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img src="/c.jpg" alt="Doctor" className="h-72 object-cover rounded-xl shadow-lg" /> 
        </div>
        <div className="w-full md:w-2/3 max-w-2xl bg-white bg-opacity-10 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-2">Book Your Appointment Today!</h2>
          <p className="text-white mb-6 font-medium">OPD Timing :- 10 AM - 6 PM</p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Full Name *" className="p-3 rounded border border-gray-300 bg-white text-[#ff466b]" />
            <input type="text" placeholder="Your Phone Number *" className="p-3 rounded border border-gray-300 bg-white text-[#ff466b]" />
            <input type="text" placeholder="Alternative Mob. Number *" className="p-3 rounded border border-gray-300 bg-white text-[#ff466b]" />
            <select className="p-3 rounded border bg-white text-[#ff466b]">
              <option>Select Your Centre</option>
              {/* Add options */}
            </select>
            <select className="p-3 rounded border border-gray-300 bg-white text-[#ff466b]">
              <option>Select Your Doctor</option>
              {/* Add options */}
            </select>
            <select className="p-3 rounded border border-gray-300 bg-white text-[#ff466b]">
              <option>Select Your Time Slot</option>
              {/* Add options */}
            </select>
            <input type="date" className="p-3 rounded border border-gray-300 bg-white text-[#ff466b]" />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 mt-4 bg-white text-[#ff466b] font-bold py-3 rounded-lg border-2 border-[#ff466b] hover:bg-[#ff466b] hover:text-white transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>

      {/* What We Offer Section */}
      <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-10 py-16 px-4">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#23255A] mb-4">What We Offer</h2>
          <p className="text-gray-500 text-lg mb-6">
            We offer world-class consultation and treatment facilities along with advanced diagnostic techniques and a detailed understanding of the patient’s extent of disease.
          </p>
          <div className="flex items-center gap-4 mb-6">
            <img
              src="/doctor.jpg"
              alt="Dr. Anupam Kumar Singh"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <div className="font-bold text-[#23255A] text-lg">Dr. Anupam Kumar Singh</div>
              <div className="text-gray-500 text-sm">MBBS, MD MEDICINE, DM CARDIOLOGY</div>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center text-[#ff466b] font-semibold text-lg hover:underline"
          >
            <span className="mr-2">&#9679;</span> Readmore
          </a>
        </div>

        {/* Right Side - Accordion */}
        <div style={{width: "100%",display: "flex",flexDirection: "column",gap: "1rem"}}>
  {accordion.map((item, idx) => (
    <div
      key={idx}
      style={{
        border: "1px solid #f1f1f1",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(44,44,44,0.07)",
        transition: "all 0.2s"}}>
      <button
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 1.5rem",
          textAlign: "left",
          background: "none",
          border: "none",
          outline: "none",
          cursor: "pointer" }}
        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}>
        <span style={{ fontWeight: "bold", fontSize: "1.1rem",color: "#23255A" }}>
          {item.title}
        </span>
        <span style={{
          fontSize: "2rem",
          color: "#23255A" }}>
          {openIndex === idx ? "−" : "+"}
        </span>
      </button>
      {openIndex === idx && (
        <div style={{
          padding: "0.25rem 1.5rem 1.25rem 1.5rem",
          color: "#6b7280",
          fontSize: "1rem" }}>
          {item.content}
        </div>
      )}
    </div>
  ))}
</div>
         </section>

      {/* Back Button */}
      <div className="w-full flex justify-center pb-12">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-white border-2 border-[#ff466b] text-[#ff466b] font-bold rounded-lg shadow hover:bg-[#ff466b] hover:text-white transition"
        >
          ← Go Back
        </button>
      </div>
    </section>
  );
};

export default Cardiology;
