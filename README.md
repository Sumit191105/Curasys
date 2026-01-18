🏥 Curasys HMS - Comprehensive Hospital Management System
Curasys HMS is a sophisticated, full-stack Hospital Management System designed to digitize and streamline healthcare interactions through a seamless MERN and Firebase architecture. The platform prioritizes life-saving efficiency via a dedicated Emergency Command Center, which handles real-time SOS alerts by integrating GPS tracking and automated siren notifications for immediate medical response.

🌟 Key Features
🚑 Emergency Command Center
Real-Time SOS Alerts: Patients can trigger emergency alerts that are instantly transmitted to the Admin Dashboard.

GPS Tracking: Captures and displays the patient's precise latitude and longitude for rapid dispatch.

Siren Notifications: Automated audio alerts (sirens) notify administrators the moment a new critical SOS is received.

Live Mapping: Direct integration with Google Maps to visualize emergency locations for ambulance routing.

🔐 Role-Based Access Control (RBAC)
Secure Portals: Dedicated, secure interfaces for Patients, Doctors, and Administrators powered by Firebase Authentication.

Patient Portal: Allows users to manage health profiles, book appointments, and trigger SOS alerts.

Doctor Portal: A streamlined workspace for physicians to manage daily schedules and view patient queues.

Admin Dashboard: A high-level command center for monitoring active emergencies and managing hospital-wide data.

📅 Appointment & Specialist Management
Department-Wise Booking: Automated scheduling across various departments like Cardiology, Neurology, and Orthopedics.

Live Doctor Discovery: Integration with Google Maps allows patients to discover top-rated nearby specialists in real-time.

Status Tracking: Real-time updates on appointment status (In-Queue, Dispatched, Resolved).

🛠️ Technical Stack
Frontend: React.js, Tailwind CSS, Lucide React (Icons)

Backend: Node.js, Express.js

Database: MongoDB (Data Persistence)

Authentication: Firebase Auth (Google & Email/Password)

API Client: Axios

📁 Project Structure
Plaintext

curasys-hms/
├── frontend/           # Vite + React application
│   ├── src/
│   │   ├── components/ # Dashboard, Portal, and UI components
│   │   ├── firebase.js # Firebase configuration
│   │   └── App.jsx      # Routing and logic
├── backend/            # Node.js + Express server
│   ├── models/         # MongoDB Schemas (Emergency, Appointment)
│   ├── routes/         # API Endpoints (SOS, Appointments)
│   └── server.js       # Main entry point
└── README.md
🚀 Installation & Setup
Clone the Repository:

Bash

git clone 
Setup Backend:

Navigate to the backend folder: cd backend

Install dependencies: npm install

Create a .env file with your MONGO_URI and PORT.

Start the server: npm start

Setup Frontend:

Navigate to the frontend folder: cd frontend

Install dependencies: npm install

Add your Firebase credentials to src/firebase.js.

Start the development server: npm run dev




