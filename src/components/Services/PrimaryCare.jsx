import React from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";

// Top "Find Specialized Care and Treatment" data
const specializedCare = [
  {
    title: "Spine Care",
    desc: "Physical therapy and pain management to surgery, our expert teams can help you restore function and improve your quality of life.",
    color: "#b07a3f"
  },
  {
    title: "Cancer",
    desc: "Our care includes access to nationally-recognized cancer treatment programs and the most current technologies available for treating cancer.",
    color: "#b07a3f"
  },
  {
    title: "Heart & Vascular Care",
    desc: "Choosing to receive your heart care at one of our locations means choosing doctors that stay personally involved in your long-term heart health.",
    color: "#b07a3f"
  },
  {
    title: "Orthopedics",
    desc: "We treat injuries including joint pain, back pain, joint replacement, and recovery from strains and sprains.",
    color: "#b07a3f"
  }
];

// Key Specialities data (replace icon paths as needed)
const keySpecialities = [
  { icon: "/icons/o.jpg", label: "Obstetrics" },
  { icon: "/icons/gy.jpg", label: "Gynaecology" },
  { icon: "/icons/p.jpg", label: "Paediatrics & Neonatology" },
  { icon: "/icons/i.jpg", label: "General Medicine" },
  { icon: "/icons/ge.jpg", label: "General Surgery" },
];
// Facilities and Key Specialities data (as before)
const primaryFacilities = [
  {
    icon: "/icons/mri.png",
    title: "24x7 Radiology",
    desc: "The most reliable, accurate diagnostic services.",
    button: "View Facility",
    bg: "#fff8e1",
    btnColor: "#a86b3a",
    textColor: "#222",
    shadow: true,
  },
  {
    icon: "/icons/doc.jpg",
    title: "Our Doctors",
    desc: "Search by name, specialty, location and more.",
    button: "Find A Doctor",
    bg: "#b97b44",
    btnColor: "#a86b3a",
    textColor: "#fff",
    shadow: false,
  },
  {
    icon: "/icons/bed.jpg",
    title: "24x7 Critical Care Unit",
    desc: "Round-the-clock critical care services for emergencies.",
    button: "View Facility",
    bg: "#fff8e1",
    btnColor: "#a86b3a",
    textColor: "#222",
    shadow: true,
  },
  {
    icon: "/icons/mo.jpg",
    title: "Mother & Child Care Unit",
    desc: "Safe, Natural, and Memorable Birthing Experience!",
    button: "Explore More",
    bg: "#b97b44",
    btnColor: "#a86b3a",
    textColor: "#fff",
    shadow: false,
  },
];


const PrimaryCare = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh" }}>
      {/* --- Specialized Care Section --- */}
      <div style={{ width: "100%",background: "#fff", padding: "3.2rem 0 2.2rem 0" }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.5rem"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: 500,
            color: "#222",
            textAlign: "center",
            marginBottom: "2.2rem"
          }}>
            Find Specialized Care and Treatment
          </h2>
          <div style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "nowrap",
            overflowX: "auto",
            justifyContent: "flex-start"
          }}>
            {specializedCare.map((care, idx) => (
              <div key={care.title} style={{
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 2px 12px rgba(44,44,44,0.08)",
                width: "300px",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "2.1rem 1.5rem 1.2rem 1.5rem",
                marginBottom: "1.5rem",
                border: "4px solid #f5f5f5",
                flex: "0 0 300px"
              }}>
                <div style={{ width: "32px",height: "32px", marginBottom: "1.2rem"}}>
                  <Stethoscope size={32} color={care.color} />
                </div>
                <div style={{
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  color: care.color,
                  marginBottom: "0.5rem"
                }}>{care.title}</div>
                <div style={{
                  fontSize: "1.06rem",
                  color: "#444",
                  marginBottom: "0.2rem"
                }}>{care.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* --- Key Specialities Section --- */}
      <div style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "2.5rem 0 2rem 0",
        margin: "2.5rem auto 0 auto",
        maxWidth: "1200px"
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: "2.1rem",
          color: "#232323",
          marginBottom: "2rem",
          paddingLeft: "2rem"
        }}>
          Key Specialities
        </div>
        <div style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          padding: "0 2rem"
        }}>
          {keySpecialities.map(s => (
            <div key={s.label} style={{
              background: "#fff",
              borderRadius: "14px",
              boxShadow: "0 2px 12px rgba(44,44,44,0.08)",
              width: "200px",
              minHeight: "220px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2.1rem 1.2rem 1.2rem 1.2rem",
              marginBottom: "1.5rem"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "2px solid #b07a3f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <img src={s.icon} alt={s.label} style={{ width: 46, height: 46 }} />
              </div>
              <div style={{
                fontWeight: 500,
                fontSize: "1.08rem",
                color: "#b07a3f",
                textAlign: "center"
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Facilities Section --- */}
      <div style={{
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
        padding: "2.5rem 0",
        flexWrap: "wrap"
      }}>
        {primaryFacilities.map((f, i) => (
          <div
            key={f.title}
            style={{
              background: f.bg,
              borderRadius: "18px",
              boxShadow: f.shadow ? "0 6px 16px rgba(44,44,44,0.08)" : "none",
              width: "270px",
              padding: "2rem 1.5rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: f.textColor,
              position: "relative"
            }}
          >
            <div style={{
              width: "92px",
              height: "92px",
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.55)",
              borderRadius: "50%",
              boxShadow: "0 0 0 8px rgba(255,255,255,0.28)"
            }}>
              <img src={f.icon} alt={f.title} style={{ width: 60, height: 60 }} />
            </div>
            <div style={{
              fontWeight: 700,
              fontSize: "1.25rem",
              marginBottom: "0.5rem",
              textAlign: "center"
            }}>{f.title}</div>
            <div style={{
              fontSize: "1.07rem",
              marginBottom: "1.3rem",
              textAlign: "center",
              minHeight: "48px"
            }}>{f.desc}</div>
            <button style={{
              background: "#fff",
              color: f.btnColor,
              fontWeight: 500,
              border: "none",
              borderRadius: "7px",
              padding: "0.85rem 2.1rem",
              boxShadow: "0 4px 8px rgba(44,44,44,0.07)",
              fontSize: "1.06rem",
              cursor: "pointer",
              marginTop: "auto"
            }}>
              {f.button}
            </button>
            {/* Optional: Add the floating arrow for last card */}
            {i === 3 && (
              <div style={{
                position: "absolute",
                right: "1.1rem",
                bottom: "1.2rem",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(44,44,44,0.10)",
                padding: "0.25rem 0.4rem",
                display: "flex",
                alignItems: "center"
              }}>
                <span style={{
                  display: "inline-block",
                  border: "solid #b97b44",
                  borderWidth: "0 3px 3px 0",
                  padding: "5px",
                  transform: "rotate(-45deg)",
                  marginRight: 0
                }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --- Go Back Button --- */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "2.5rem 0" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.9rem 2.5rem",
            background: "#fff",
            border: "2px solid #b97b44",
            color: "#b97b44",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(185,123,68,0.08)",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseOver={e => {
            e.target.style.background = "#b97b44";
            e.target.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.target.style.background = "#fff";
            e.target.style.color = "#b97b44";
          }}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default PrimaryCare;
