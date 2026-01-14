import React from "react";
import { useNavigate } from "react-router-dom";

const EmergencyCare = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Top Support Banner */}
      <div style={{
        background: "#f5f7fa",
        borderTop: "6px solid #ffd600",
        padding: "2.5rem 0 2rem 0",
        textAlign: "center",
        marginBottom: "0"
      }}>
        <div style={{fontSize: "2.5rem", fontWeight: 400, color: "#222", letterSpacing: "-1px"}}>
          We provide 24/7 patient support.
        </div>
        <div style={{fontSize: "1.3rem", color: "#444", marginTop: "0.5rem"}}>
          Please feel free to contact us at{" "}
          <span style={{color: "#2056b3", fontWeight: 700}}>0651 1101010</span>
          {" "}for emergency case.
        </div>
      </div>

      {/* Emergency Section */}
      <div style={{
        background: "#0097b2",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        minHeight: "260px"
      }}>
        {/* Vertical Emergency Tab */}
        <div style={{
          position: "absolute",
          left: 0,
          top: "30px",
          bottom: "30px",
          width: "40px",
          background: "#df3b3b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          borderRadius: "0 8px 8px 0"
        }}>
          <div style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.15em",
            fontSize: "1.1rem"
          }}>
            EMERGENCY
          </div>
        </div>
        {/* Left: Hospital Info */}
        <div style={{
          flex: 1,
          padding: "3rem 2rem 3rem 4.5rem",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <div style={{fontWeight: 700, fontSize: "1.7rem", marginBottom: "1.5rem"}}>
            BEST EMERGENCY CARE HOSPITAL IN INDIA
          </div>
          <div style={{display: "flex", alignItems: "center", marginBottom: "0.7rem", fontSize: "1.1rem"}}>
            <span style={{
              display: "inline-block",
              width: "23px",
              height: "23px",
              borderRadius: "50%",
              background: "#33d6b5",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "23px",
              marginRight: "0.7rem"
            }}>✓</span>
            20+ years of experience
          </div>
          <div style={{display: "flex", alignItems: "center", fontSize: "1.1rem"}}>
            <span style={{
              display: "inline-block",
              width: "23px",
              height: "23px",
              borderRadius: "50%",
              background: "#33d6b5",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "23px",
              marginRight: "0.7rem"
            }}>✓</span>
            <span style={{fontWeight: 700}}>15000+</span> new patients annually
          </div>
        </div>
        {/* Right: Call Back Form */}
        <div style={{
          minWidth: "350px",
          background: "#00b5c2",
          borderRadius: "0 0 0 32px",
          padding: "2.5rem 2rem",
          margin: "2rem 2rem 2rem 0",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)"
        }}>
          <div style={{fontWeight: 700, fontSize: "1.2rem", marginBottom: "1.2rem", letterSpacing: "0.01em"}}>
            GET A CALL BACK FROM OUR HEALTH ADVISOR
          </div>
          <form>
            <div style={{display: "flex", alignItems: "center", marginBottom: "1rem"}}>
              <span style={{
                background: "#fff",
                color: "#0097b2",
                padding: "0.4rem 0.7rem",
                borderRadius: "6px 0 0 6px",
                fontWeight: 600,
                fontSize: "1rem",
                border: "1px solid #d7e6e8",
                borderRight: "none"
              }}>+91</span>
              <input
                type="tel"
                placeholder="Enter Mobile Number*"
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  border: "1px solid #d7e6e8",
                  borderRadius: "0 6px 6px 0",
                  outline: "none",
                  fontSize: "1rem"
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Enter Full Name*"
              style={{
                width: "100%",
                padding: "0.6rem",
                border: "1px solid #d7e6e8",
                borderRadius: "6px",
                outline: "none",
                fontSize: "1rem",
                marginBottom: "1rem"
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#13304b",
                color: "#fff",
                fontWeight: 700,
                border: "none",
                borderRadius: "6px",
                padding: "0.7rem",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                cursor: "pointer"
              }}
            >
              SUBMIT
            </button>
            <div style={{display: "flex", alignItems: "center", marginBottom: "0.5rem"}}>
              <input type="checkbox" style={{marginRight: "0.5rem"}} />
              <span style={{fontSize: "0.95rem"}}>Get Updates on Whatsapp. I agree to the T&C.</span>
            </div>
            <div style={{fontSize: "0.95rem", marginBottom: "0.3rem"}}>
              Email - <span style={{color: "#fff", fontWeight: 600}}>digitalquery@providencecare.com</span>
            </div>
            <div style={{fontSize: "0.85rem", color: "#e0f7fa"}}>
              <span style={{fontWeight: 500}}>ⓘ</span> We will never share your personal info
            </div>
          </form>
        </div>
      </div>

<div style={{ width: "100%",background: "#fff",padding: "2.5rem 0 1.5rem 0"}}>
  <div style={{maxWidth: "1200px",margin: "0 auto",padding: "0 1.5rem"}}>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem"
    }}>
      <h2 style={{
        fontSize: "2rem",
        fontWeight: 600,
        color: "#222"
      }}>Our Team of Experts</h2>
      <a href="#" style={{
        color: "#d08c7a",
        fontWeight: 500,
        textDecoration: "none",
        fontSize: "1rem"
      }}>View all</a>
    </div>
    <div style={{
      display: "flex",
      gap: "1.5rem",
      flexWrap: "wrap",
      justifyContent: "flex-start"
    }}>
      {/* Doctor Card 1 */}
      <div style={{
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(44,44,44,0.08)",
        width: "260px",
        marginBottom: "1.5rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        <img src="/doctors/e3.jpg" alt="Dr. Sandeep Balanrao Gore" style={{
          width: "100%",
          height: "210px",
          objectFit: "cover"
        }} />
        <div style={{padding: "1.2rem 1.2rem 0.5rem 1.2rem"}}>
          <div style={{fontWeight: 700, fontSize: "1.1rem", color: "#222"}}>Dr. Sunita Balanrao Gore</div>
          <div style={{fontSize: "1rem", color: "#444", marginBottom: "1.2rem"}}>DIRECTOR & HOD </div>
        </div>
        <div style={{display: "flex", borderTop: "1px solid #f3e7e5"}}>
          <button style={{
            flex: 1,
            padding: "0.8rem 0",
            border: "none",
            background: "#0097b2",
            color: "#fff",
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            Book An Appointment
          </button>
        </div>
      </div>
      {/* Doctor Card 2 */}
      <div style={{
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(44,44,44,0.08)",
        width: "260px",
        marginBottom: "1.5rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        <img src="/doctors/e1.jpg" alt="Dr. Amit D.Nabar" style={{
          width: "100%",
          height: "210px",
          objectFit: "cover"
        }} />
        <div style={{padding: "1.2rem 1.2rem 0.5rem 1.2rem"}}>
          <div style={{fontWeight: 700, fontSize: "1.1rem", color: "#222"}}>Dr. Amit D.Nabar</div>
          <div style={{fontSize: "1rem", color: "#444", marginBottom: "1.2rem"}}>Consultant</div>
        </div>
        <div style={{display: "flex", borderTop: "1px solid #f3e7e5"}}>
          <button style={{
            flex: 1,
            padding: "0.8rem 0",
            border: "none",
            background: "#0097b2",
            color: "#fff",
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            Book An Appointment
          </button>
        </div>
      </div>
      {/* Doctor Card 3 */}
      <div style={{
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(44,44,44,0.08)",
        width: "260px",
        marginBottom: "1.5rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        <img src="/doctors/e2.jpg" alt="Dr. Anoop Purkayastha" style={{
          width: "100%",
          height: "210px",
          objectFit: "cover",
          overflow:"hidden"
        }} />
        <div style={{padding: "1.2rem 1.2rem 0.5rem 1.2rem"}}>
          <div style={{fontWeight: 700, fontSize: "1.1rem", color: "#222"}}>Dr. Anoop Purkayastha</div>
          <div style={{fontSize: "1rem", color: "#444", marginBottom: "1.2rem"}}>CONSULTANT EMERGENCY</div>
        </div>
        <div style={{display: "flex", borderTop: "1px solid #f3e7e5"}}>
          <button style={{
            flex: 1,
            padding: "0.8rem 0",
            border: "none",
            background: "#0097b2",
            color: "#fff",
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            Book An Appointment
          </button>
        </div>
      </div>
      {/* Doctor Card 4 */}
      <div style={{
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(44,44,44,0.08)",
        width: "260px",
        marginBottom: "1.5rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        <img src="/doctors/e4.jpg" alt="Dr. Mohammad Nadeem" style={{
          width: "100%",
          height: "210px",
          objectFit: "cover"
        }} />
        <div style={{padding: "1.2rem 1.2rem 0.5rem 1.2rem"}}>
          <div style={{fontWeight: 700, fontSize: "1.1rem", color: "#222"}}>Dr. Mohammad Nadeem</div>
          <div style={{fontSize: "1rem", color: "#444", marginBottom: "1.2rem"}}>CONSULTANT EMERGENCY</div>
        </div>
        <div style={{display: "flex", borderTop: "1px solid #f3e7e5"}}>
          <button style={{
            flex: 1,
            padding: "0.8rem 3 3 3",
            border: "none",
            background: "#0097b2",
            color: "#fff",
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Back to Main Page Button */}
      <div style={{width: "100%", display: "flex", justifyContent: "center", padding: "2rem 0"}}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.8rem 2.5rem",
            background: "#fff",
            border: "2px solid #0097b2",
            color: "#0097b2",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,151,178,0.08)",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseOver={e => {
            e.target.style.background = "#0097b2";
            e.target.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.target.style.background = "#fff";
            e.target.style.color = "#0097b2";
          }}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default EmergencyCare;
