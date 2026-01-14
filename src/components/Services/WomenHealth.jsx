import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const gynaecologicalIssues = [
  "Heavy and painful menstrual periods",
  "Periodic irregularities",
  "Discharge from the cervix",
  "Bleeding After",
  "Menopause",
  "Lower abdominal discomfort",
  "Unable to conceive",
  "PMS (pre-menstrual Syndrome)",
  "Miscarriage",
  "Incontinence of the Urine (Inability to hold urine while coughing, sneezing, exercise)",
  "Feeling of something passing through the vagina"
];

const slideInVariants = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.4, 0.2, 0.2, 1] } }
};

const WomenHealth = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh", width: "100%" }}>
      {/* Banner Section */}
      <div
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #e6f2fa 0%, #f3eafd 100%)",
          minHeight: "340px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "2.5rem"
        }}
      >
        <div style={{ maxWidth: "1400px", width: "100%", display: "flex", alignItems: "center", padding: "2.5rem 2rem" }}>
          {/* Left: Text */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#8c5bb4", marginBottom: "1.3rem", lineHeight: 1.1 }}>
              EMPOWERING<br />
              NEXT GENERATION OF<br />
              SUPER SPECIALISTS
            </div>
            <div style={{ fontSize: "1.25rem", color: "#444" }}>
              Care that goes<br />beyond the diagnosis!
            </div>
          </div>
          {/* Right: Image */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <img
              src="/women.jpg" 
              alt="Women Health Training"
              style={{
                width: "340px",
                height: "auto",
                borderRadius: "50%",
                objectFit: "cover",
                border: "8px solid #e2d8fd",
                boxShadow: "0 2px 24px rgba(44,44,44,0.10)",
                position: "relative",
                zIndex: 1
              }}
            />
            {/* Decorative arc */}
            <div style={{
              position: "absolute",
              left: "50%",
              width: "270px",
              height: "270px",
              border: "8px solid #cfa6f7",
              borderRadius: "50%",
              transform: "translate(-50%, 0) rotate(-15deg)",
              zIndex: 0
            }} />
          </div>
        </div>
      </div>

      {/* Skip the Phone Call Section */}
      <div
        style={{
          background: "linear-gradient(90deg, #fbeafd 0%, #e2d8fd 100%)",
          borderRadius: "18px",
          maxWidth: "900px",
          margin: "2.5rem auto 2rem auto",
          padding: "2.5rem 2rem 2.2rem 2rem",
          boxShadow: "0 2px 16px rgba(44,44,44,0.08)",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: "2rem", color: "#8c5bb4", fontWeight: 400, marginBottom: "1.3rem" }}>
          Skip the Phone Call and Avoid Waiting on Hold!
        </div>
        <div style={{ color: "#555", fontSize: "1.18rem", marginBottom: "1.7rem" }}>
          We are excited to announce that patients can now send text messages to contact our practice. You can send us a text to:
        </div>
        <div style={{ color: "#444", fontSize: "1.11rem", marginBottom: "1.1rem" }}>
          <b>Schedule appointments:</b> Text <i>“appointment”, “appt”, or “apt”</i>
        </div>
        <div style={{ color: "#444", fontSize: "1.11rem", marginBottom: "1.1rem" }}>
          <b>Refill medications:</b> Text <i>“refill”</i>
        </div>
        <div style={{ color: "#444", fontSize: "1.11rem", marginBottom: "1.1rem" }}>
          <b>Ask a nurse a question:</b> Text <i>“ask nurse” or “question”</i>
        </div>
        <div style={{ color: "#555", fontSize: "1.08rem", marginBottom: "2.2rem" }}>
          No log-in or app download required. Simply text our main phone number:
        </div>
        <button
          style={{
            background: "#7b3fa1",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.9rem 2.5rem",
            fontWeight: "bold",
            fontSize: "1.15rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(123,63,161,0.10)",
            transition: "all 0.2s"
          }}
        >
          TEXT US
        </button>
      </div>

      {/* Gynecological Issues Section with Slide-in Effect */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
          maxWidth: "1200px",
          margin: "2.5rem auto",
          padding: "2.5rem 2rem"
        }}
      >
        {/* Left: Image */}
        <div style={{ flex: "1 1 340px", minWidth: 280, maxWidth: 420, marginRight: "2rem" }}>
          <img
            src="/w.jpg"
            alt="Gynecological Consultation"
            style={{
              width: "100%",
              borderRadius: "14px",
              objectFit: "cover",
              boxShadow: "0 2px 16px rgba(44,44,44,0.09)",
              height: "500px"
            }}
          />
        </div>
        
        {/* Right: Animated Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInVariants}
          style={{ flex: "2 1 380px", minWidth: 280 }}
        >
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "#1cb5b3", marginBottom: "1.2rem" }}>
            Some Typical Gynaecological Issues
          </div>
          <ul style={{ fontSize: "1.18rem", color: "#222", lineHeight: 1.7, paddingLeft: "1.3rem" }}>
            {gynaecologicalIssues.map((issue, i) => (
              <li key={i} style={{ marginBottom: "0.7rem", listStyle: "disc" }}>
                {issue}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Go Back Button */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "2.5rem 0" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.9rem 2.5rem",
            background: "#fff",
            border: "2px solid #8c5bb4",
            color: "#8c5bb4",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(140,91,180,0.08)",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseOver={e => {
            e.target.style.background = "#8c5bb4";
            e.target.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.target.style.background = "#fff";
            e.target.style.color = "#8c5bb4";
          }}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default WomenHealth;
