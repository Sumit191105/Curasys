'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Stethoscope, User, Clock, Calendar, Phone, AlertCircle, Heart } from 'lucide-react';

const MedicalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🩺 Hello! I'm Dr. Assistant, your medical chatbot. I can help you with basic health questions, check symptoms, and find available doctors. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced Medical knowledge base with more conditions and symptoms
  const symptoms = {
    fever: {
      conditions: ["Common Cold", "Flu", "Viral Infection", "Bacterial Infection", "COVID-19", "Malaria", "Dengue"],
      advice: "Rest, drink fluids, monitor temperature. Take paracetamol if needed. See doctor if fever persists >3 days or >101°F",
      urgency: "moderate",
      specialists: ["General Medicine", "Internal Medicine"]
    },
    headache: {
      conditions: ["Tension Headache", "Migraine", "Dehydration", "Stress", "Sinusitis", "High Blood Pressure"],
      advice: "Rest in dark room, stay hydrated, avoid loud noises. Cold compress may help. Consult doctor if severe or frequent",
      urgency: "low",
      specialists: ["General Medicine", "Neurology"]
    },
    "chest pain": {
      conditions: ["Heart Attack", "Angina", "Acid Reflux", "Muscle Strain", "Pneumonia", "Anxiety"],
      advice: "🚨 SEEK IMMEDIATE MEDICAL ATTENTION if severe chest pain, especially with shortness of breath",
      urgency: "high",
      specialists: ["Cardiology", "Emergency Medicine"]
    },
    "difficulty breathing": {
      conditions: ["Asthma", "Pneumonia", "Heart Problems", "Anxiety", "COVID-19", "Allergic Reaction"],
      advice: "🚨 SEEK IMMEDIATE MEDICAL ATTENTION - Call emergency services",
      urgency: "emergency",
      specialists: ["Emergency Medicine", "Cardiology", "Pulmonology"]
    },
    cough: {
      conditions: ["Common Cold", "Bronchitis", "Allergies", "Asthma", "COVID-19", "Pneumonia", "GERD"],
      advice: "Stay hydrated, honey tea, rest. See doctor if cough persists >2 weeks or has blood",
      urgency: "low",
      specialists: ["General Medicine", "Pulmonology"]
    },
    "stomach pain": {
      conditions: ["Indigestion", "Gastritis", "Food Poisoning", "Appendicitis", "Gallstones", "Ulcer"],
      advice: "Avoid solid foods temporarily, stay hydrated. See doctor if severe or worsening pain",
      urgency: "moderate",
      specialists: ["General Medicine", "Gastroenterology"]
    },
    nausea: {
      conditions: ["Food Poisoning", "Gastritis", "Pregnancy", "Migraine", "Motion Sickness", "Medication Side Effect"],
      advice: "Rest, small sips of water, bland foods. Contact doctor if persistent vomiting",
      urgency: "moderate",
      specialists: ["General Medicine", "Gastroenterology"]
    },
    dizziness: {
      conditions: ["Low Blood Pressure", "Dehydration", "Inner Ear Problem", "Anemia", "Medication Side Effect"],
      advice: "Sit or lie down, stay hydrated. See doctor if frequent episodes or with chest pain",
      urgency: "moderate",
      specialists: ["General Medicine", "ENT", "Cardiology"]
    },
    "back pain": {
      conditions: ["Muscle Strain", "Herniated Disc", "Arthritis", "Kidney Stones", "Poor Posture"],
      advice: "Rest, ice/heat therapy, gentle stretching. Avoid heavy lifting. See doctor if pain persists",
      urgency: "low",
      specialists: ["Orthopedics", "Physical Therapy"]
    },
    "joint pain": {
      conditions: ["Arthritis", "Injury", "Gout", "Lupus", "Fibromyalgia", "Overuse"],
      advice: "Rest affected joint, ice for acute injury, heat for chronic pain. See doctor for persistent pain",
      urgency: "low",
      specialists: ["Orthopedics", "Rheumatology"]
    },
    "skin rash": {
      conditions: ["Allergic Reaction", "Eczema", "Dermatitis", "Fungal Infection", "Viral Rash"],
      advice: "Keep area clean and dry, avoid scratching. Consult doctor if spreading or severe",
      urgency: "low",
      specialists: ["Dermatology", "General Medicine"]
    },
    fatigue: {
      conditions: ["Lack of Sleep", "Anemia", "Thyroid Problems", "Depression", "Chronic Fatigue Syndrome"],
      advice: "Ensure adequate sleep, balanced diet, regular exercise. See doctor if persistent",
      urgency: "low",
      specialists: ["General Medicine", "Endocrinology"]
    },
    "sore throat": {
      conditions: ["Viral Infection", "Strep Throat", "Allergies", "Acid Reflux", "Dry Air"],
      advice: "Gargle with salt water, stay hydrated, throat lozenges. See doctor if severe or with fever",
      urgency: "low",
      specialists: ["General Medicine", "ENT"]
    },
    "ear pain": {
      conditions: ["Ear Infection", "Earwax Buildup", "TMJ", "Sinus Infection", "Injury"],
      advice: "Avoid inserting objects in ear, warm compress may help. See doctor for severe pain",
      urgency: "moderate",
      specialists: ["ENT", "General Medicine"]
    },
    "eye pain": {
      conditions: ["Eye Strain", "Dry Eyes", "Infection", "Glaucoma", "Foreign Object"],
      advice: "Rest eyes, use artificial tears. See doctor immediately if sudden severe pain or vision changes",
      urgency: "moderate",
      specialists: ["Ophthalmology", "Emergency Medicine"]
    },
    diabetes: {
      conditions: ["Type 1 Diabetes", "Type 2 Diabetes", "Gestational Diabetes", "Pre-diabetes"],
      advice: "Monitor blood sugar, follow prescribed diet, take medications as directed. Regular checkups essential",
      urgency: "chronic",
      specialists: ["Endocrinology", "General Medicine"]
    },
    hypertension: {
      conditions: ["Primary Hypertension", "Secondary Hypertension", "White Coat Hypertension"],
      advice: "Monitor blood pressure, reduce salt intake, exercise regularly, take medications as prescribed",
      urgency: "chronic",
      specialists: ["Cardiology", "General Medicine"]
    },
    anxiety: {
      conditions: ["Generalized Anxiety", "Panic Disorder", "Social Anxiety", "PTSD"],
      advice: "Practice relaxation techniques, regular exercise, seek counseling. Contact doctor for severe symptoms",
      urgency: "moderate",
      specialists: ["Psychiatry", "Psychology"]
    },
    depression: {
      conditions: ["Major Depression", "Seasonal Depression", "Postpartum Depression", "Bipolar Disorder"],
      advice: "Seek professional help, maintain social connections, regular exercise. Contact crisis line if suicidal thoughts",
      urgency: "moderate",
      specialists: ["Psychiatry", "Psychology"]
    },
    insomnia: {
      conditions: ["Stress-related", "Sleep Apnea", "Medication Side Effect", "Chronic Insomnia"],
      advice: "Maintain sleep schedule, avoid caffeine before bed, create comfortable sleep environment",
      urgency: "low",
      specialists: ["Sleep Medicine", "General Medicine"]
    }
  };

  const availableDoctors = [
    { name: "Dr. Sarah Johnson", specialty: "General Medicine", available: "9:00 AM - 5:00 PM", status: "Available", room: "101", experience: "15 years" },
    { name: "Dr. Michael Chen", specialty: "Cardiology", available: "10:00 AM - 4:00 PM", status: "Available", room: "205", experience: "20 years" },
    { name: "Dr. Emily Davis", specialty: "Pediatrics", available: "8:00 AM - 3:00 PM", status: "Busy", room: "102", experience: "12 years" },
    { name: "Dr. James Wilson", specialty: "Emergency Medicine", available: "24/7", status: "Available", room: "ER", experience: "18 years" },
    { name: "Dr. Lisa Anderson", specialty: "Internal Medicine", available: "1:00 PM - 8:00 PM", status: "Available", room: "103", experience: "22 years" },
    { name: "Dr. Robert Martinez", specialty: "Orthopedics", available: "9:00 AM - 4:00 PM", status: "Available", room: "301", experience: "16 years" },
    { name: "Dr. Jennifer Lee", specialty: "Dermatology", available: "10:00 AM - 5:00 PM", status: "Available", room: "204", experience: "14 years" },
    { name: "Dr. David Kumar", specialty: "Neurology", available: "2:00 PM - 7:00 PM", status: "Available", room: "302", experience: "19 years" },
    { name: "Dr. Maria Rodriguez", specialty: "Gynecology", available: "9:00 AM - 4:00 PM", status: "Busy", room: "202", experience: "17 years" },
    { name: "Dr. Thomas Brown", specialty: "Psychiatry", available: "11:00 AM - 6:00 PM", status: "Available", room: "401", experience: "21 years" },
    { name: "Dr. Priya Sharma", specialty: "Endocrinology", available: "8:00 AM - 2:00 PM", status: "Available", room: "203", experience: "13 years" },
    { name: "Dr. Mark Thompson", specialty: "Gastroenterology", available: "1:00 PM - 6:00 PM", status: "Available", room: "304", experience: "24 years" }
  ];

  const healthTips = [
    {
      category: "General Health",
      tips: [
        "Drink 8-10 glasses of water daily for proper hydration",
        "Get 7-9 hours of sleep each night for optimal health",
        "Exercise for at least 30 minutes, 5 days a week",
        "Eat 5 servings of fruits and vegetables daily",
        "Wash hands frequently to prevent infections"
      ]
    },
    {
      category: "Heart Health",
      tips: [
        "Limit sodium intake to less than 2,300mg per day",
        "Include omega-3 rich foods like fish in your diet",
        "Quit smoking to reduce heart disease risk",
        "Manage stress through meditation or yoga",
        "Monitor blood pressure regularly"
      ]
    },
    {
      category: "Mental Health",
      tips: [
        "Practice mindfulness and meditation daily",
        "Stay connected with friends and family",
        "Engage in hobbies you enjoy",
        "Limit social media use before bedtime",
        "Seek help when feeling overwhelmed"
      ]
    },
    {
      category: "Preventive Care",
      tips: [
        "Get annual health checkups",
        "Stay up to date with vaccinations",
        "Perform monthly self-examinations",
        "Schedule regular dental cleanings",
        "Protect skin with SPF 30+ sunscreen"
      ]
    }
  ];

  const medications = {
    "paracetamol": {
      uses: ["Fever", "Pain relief", "Headache"],
      dosage: "Adults: 500-1000mg every 4-6 hours, max 4g/day",
      sideEffects: ["Rare when used correctly", "Liver damage with overdose"],
      warnings: "Do not exceed recommended dose. Avoid alcohol."
    },
    "ibuprofen": {
      uses: ["Pain relief", "Inflammation", "Fever"],
      dosage: "Adults: 200-400mg every 4-6 hours, max 1200mg/day",
      sideEffects: ["Stomach upset", "Increased bleeding risk"],
      warnings: "Take with food. Avoid if history of stomach ulcers."
    },
    "aspirin": {
      uses: ["Pain relief", "Heart attack prevention", "Stroke prevention"],
      dosage: "Low dose: 75-100mg daily, Pain relief: 300-600mg every 4 hours",
      sideEffects: ["Stomach bleeding", "Increased bleeding risk"],
      warnings: "Not for children under 16. Consult doctor for long-term use."
    }
  };

  const labTests = {
    "blood sugar": {
      normalRanges: "Fasting: 70-100 mg/dL, Random: <140 mg/dL",
      preparation: "Fast for 8-12 hours before test",
      frequency: "Annually for adults over 45, or as recommended by doctor"
    },
    "cholesterol": {
      normalRanges: "Total: <200 mg/dL, LDL: <100 mg/dL, HDL: >40 mg/dL (men), >50 mg/dL (women)",
      preparation: "Fast for 9-12 hours before test",
      frequency: "Every 5 years for adults over 20"
    },
    "blood pressure": {
      normalRanges: "Normal: <120/80 mmHg, High: ≥140/90 mmHg",
      preparation: "No special preparation needed",
      frequency: "At least every 2 years for adults"
    }
  };

  const emergencySymptoms = [
    "chest pain", "difficulty breathing", "unconscious", "severe bleeding", 
    "head injury", "heart attack", "stroke", "poisoning", "severe burn",
    "seizure", "choking", "severe allergic reaction", "suicide thoughts"
  ];

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for emergency symptoms first
    const hasEmergency = emergencySymptoms.some(symptom => message.includes(symptom));
    if (hasEmergency) {
      return "🚨 MEDICAL EMERGENCY DETECTED 🚨\n\nPlease call emergency services immediately: 911\nOr visit the nearest emergency room.\n\nFor immediate assistance at Curasys:\n📞 (555) 123-4567\n🏥 123 Healthcare Blvd, Medical City\n\nDo not delay seeking immediate medical care.";
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help with your health questions. You can:\n\n🩺 Describe your symptoms for basic guidance\n👨‍⚕️ Ask about available doctors\n📅 Get information about appointments\n⏰ Check doctor schedules\n💊 Ask about medications\n📋 Learn about lab tests\n💡 Get health tips\n\nWhat would you like to know?";
    }

    // Health tips
    if (message.includes('health tips') || message.includes('tips') || message.includes('advice')) {
      const randomCategory = healthTips[Math.floor(Math.random() * healthTips.length)];
      let response = `💡 **${randomCategory.category} Tips:**\n\n`;
      randomCategory.tips.forEach((tip, index) => {
        response += `${index + 1}. ${tip}\n`;
      });
      response += "\nWould you like tips for a specific health category? (General Health, Heart Health, Mental Health, Preventive Care)";
      return response;
    }

    // Specific health tip categories
    const healthCategories = ["general health", "heart health", "mental health", "preventive care"];
    const matchedCategory = healthCategories.find(category => message.includes(category));
    if (matchedCategory) {
      const categoryData = healthTips.find(tip => tip.category.toLowerCase().includes(matchedCategory.replace(' health', '')));
      if (categoryData) {
        let response = `💡 **${categoryData.category} Tips:**\n\n`;
        categoryData.tips.forEach((tip, index) => {
          response += `${index + 1}. ${tip}\n`;
        });
        return response;
      }
    }

    // Medication information
    if (message.includes('medication') || message.includes('medicine') || message.includes('drug')) {
      const medicationNames = Object.keys(medications);
      const foundMed = medicationNames.find(med => message.includes(med));
      
      if (foundMed) {
        const med = medications[foundMed];
        return `💊 **${foundMed.charAt(0).toUpperCase() + foundMed.slice(1)} Information:**\n\n**Uses:** ${med.uses.join(', ')}\n\n**Dosage:** ${med.dosage}\n\n**Side Effects:** ${med.sideEffects.join(', ')}\n\n**Important Warnings:** ${med.warnings}\n\n⚠️ **Always consult your doctor or pharmacist before taking any medication.**`;
      }
      
      return "💊 **Medication Information Available:**\n\n• Paracetamol (for fever, pain)\n• Ibuprofen (for pain, inflammation)\n• Aspirin (for pain, heart protection)\n\nType the medication name to get detailed information.\n\n⚠️ **Important:** Always consult healthcare professionals before taking any medication.";
    }

    // Lab test information
    if (message.includes('lab test') || message.includes('blood test') || message.includes('test results')) {
      const testNames = Object.keys(labTests);
      const foundTest = testNames.find(test => message.includes(test));
      
      if (foundTest) {
        const test = labTests[foundTest];
        return `📋 **${foundTest.charAt(0).toUpperCase() + foundTest.slice(1)} Test:**\n\n**Normal Ranges:** ${test.normalRanges}\n\n**Preparation:** ${test.preparation}\n\n**Recommended Frequency:** ${test.frequency}\n\n💡 Always discuss your results with your healthcare provider for proper interpretation.`;
      }
      
      return "📋 **Lab Tests Information Available:**\n\n• Blood Sugar Test\n• Cholesterol Test\n• Blood Pressure\n\nType the test name to get detailed information including normal ranges and preparation instructions.";
    }

    // BMI Calculator
    if (message.includes('bmi') || message.includes('body mass index') || message.includes('weight')) {
      return "📏 **BMI Information:**\n\n**BMI Categories:**\n• Underweight: Below 18.5\n• Normal: 18.5 - 24.9\n• Overweight: 25.0 - 29.9\n• Obese: 30.0 and above\n\n**To calculate your BMI:**\nBMI = Weight (kg) ÷ Height (m)²\n\nFor personalized advice about your weight, please consult with Dr. Sarah Johnson (General Medicine) or Dr. Priya Sharma (Endocrinology).";
    }

    // Doctor availability queries
    if (message.includes('doctor') && (message.includes('available') || message.includes('free'))) {
      let response = "👨‍⚕️ **Available Doctors Today:**\n\n";
      availableDoctors.forEach(doctor => {
        const statusIcon = doctor.status === 'Available' ? '✅' : '🔴';
        response += `${statusIcon} **${doctor.name}**\n`;
        response += `   Specialty: ${doctor.specialty}\n`;
        response += `   Experience: ${doctor.experience}\n`;
        response += `   Hours: ${doctor.available}\n`;
        response += `   Room: ${doctor.room}\n`;
        response += `   Status: ${doctor.status}\n\n`;
      });
      response += "Would you like to book an appointment with any of these doctors?";
      return response;
    }

    // Specific specialty queries
    const specialties = ["cardiology", "neurology", "dermatology", "pediatrics", "psychiatry", "orthopedics"];
    const foundSpecialty = specialties.find(spec => message.includes(spec));
    if (foundSpecialty) {
      const specialists = availableDoctors.filter(doc => 
        doc.specialty.toLowerCase().includes(foundSpecialty) || 
        foundSpecialty.includes(doc.specialty.toLowerCase().split(' ')[0])
      );
      
      if (specialists.length > 0) {
        let response = `🏥 **${foundSpecialty.charAt(0).toUpperCase() + foundSpecialty.slice(1)} Specialists:**\n\n`;
        specialists.forEach(doctor => {
          const statusIcon = doctor.status === 'Available' ? '✅' : '🔴';
          response += `${statusIcon} **${doctor.name}**\n`;
          response += `   Experience: ${doctor.experience}\n`;
          response += `   Hours: ${doctor.available}\n`;
          response += `   Room: ${doctor.room}\n`;
          response += `   Status: ${doctor.status}\n\n`;
        });
        return response;
      }
    }

    // Appointment booking
    if (message.includes('appointment') || message.includes('book')) {
      return "📅 **To book an appointment:**\n\n**Online Booking:**\n1. Visit our website: curasys.com/appointments\n2. Select your preferred doctor\n3. Choose available time slot\n4. Confirm booking\n\n**Phone Booking:**\n📞 Call us: (555) 123-4567\n\n**Walk-in:**\n🏥 Visit us: 123 Healthcare Blvd\n\n**Booking Hours:**\n🕘 Mon-Fri: 8AM-6PM\n🕘 Sat: 9AM-2PM\n🕘 Emergency: 24/7\n\nWhich doctor would you like to see, or would you like me to recommend based on your symptoms?";
    }

    // Insurance and billing
    if (message.includes('insurance') || message.includes('billing') || message.includes('cost') || message.includes('payment')) {
      return "💳 **Insurance & Billing Information:**\n\n**Accepted Insurance:**\n• Blue Cross Blue Shield\n• Aetna\n• Cigna\n• Medicare\n• Medicaid\n• United Healthcare\n\n**Payment Options:**\n• Cash\n• Credit/Debit Cards\n• Payment Plans Available\n• Online Payment Portal\n\n**For specific costs:**\n📞 Call billing: (555) 123-4568\n💻 Visit: curasys.com/billing\n\n**Financial Assistance:**\nWe offer financial assistance programs for qualified patients.";
    }

    // Hospital facilities
    if (message.includes('facilities') || message.includes('services') || message.includes('departments')) {
      return "🏥 **Curasys Healthcare Facilities:**\n\n**Emergency Services** - 24/7 Emergency Room\n**Diagnostic Imaging** - X-Ray, MRI, CT Scan, Ultrasound\n**Laboratory Services** - Blood tests, Pathology\n**Surgical Services** - Operating rooms, Day surgery\n**Pharmacy** - Full-service, prescription fulfillment\n**Physical Therapy** - Rehabilitation services\n**Cardiology Center** - Heart specialists, cardiac testing\n**Women's Health** - Gynecology, obstetrics\n**Pediatric Care** - Children's health services\n**Mental Health** - Counseling, psychiatry\n\n📍 All services located at 123 Healthcare Blvd\n📞 Main: (555) 123-4567";
    }

    // Visiting hours and policies
    if (message.includes('visiting hours') || message.includes('visitor') || message.includes('policy')) {
      return "🕐 **Visiting Hours & Policies:**\n\n**General Visiting Hours:**\n• Weekdays: 10:00 AM - 8:00 PM\n• Weekends: 9:00 AM - 8:00 PM\n\n**ICU Visiting:**\n• Limited to immediate family\n• 2 visitors at a time\n• 15-minute visits every 2 hours\n\n**Maternity Ward:**\n• 24-hour visiting for partners\n• Other visitors: 2:00 PM - 8:00 PM\n\n**COVID-19 Policies:**\n• Masks required\n• Health screening at entrance\n• Limited visitors per patient\n\n**Contact:** (555) 123-4567 for specific unit policies";
    }

    // Symptom analysis (enhanced)
    let foundSymptoms = [];
    let responses = [];
    
    Object.keys(symptoms).forEach(symptom => {
      if (message.includes(symptom)) {
        foundSymptoms.push(symptom);
        const info = symptoms[symptom];
        
        let response = `🩺 **Symptom Analysis: ${symptom.charAt(0).toUpperCase() + symptom.slice(1)}**\n\n`;
        response += `**Possible Conditions:**\n`;
        info.conditions.forEach(condition => {
          response += `• ${condition}\n`;
        });
        response += `\n**Recommended Action:**\n${info.advice}\n\n`;
        
        if (info.urgency === 'high' || info.urgency === 'emergency') {
          response += `⚠️ **Priority Level: ${info.urgency.toUpperCase()}**\n\n`;
        }
        
        // Add specialist recommendations
        if (info.specialists) {
          response += `**Recommended Specialists:**\n`;
          info.specialists.forEach(spec => {
            const doctor = availableDoctors.find(doc => doc.specialty.includes(spec));
            if (doctor) {
              response += `• ${doctor.name} (${doctor.specialty}) - ${doctor.status}\n`;
            }
          });
        }
        
        responses.push(response);
      }
    });

    if (responses.length > 0) {
      let finalResponse = responses.join('\n---\n\n');
      finalResponse += "\n📞 Call (555) 123-4567 to book an appointment\n\n";
      finalResponse += "⚠️ **Disclaimer:** This is basic guidance only. Please consult a healthcare professional for proper diagnosis and treatment.";
      
      return finalResponse;
    }

    // General health queries
    if (message.includes('health') || message.includes('medical')) {
      return "I can help you with:\n\n🩺 **Symptom Checker** - Describe symptoms for guidance\n👨‍⚕️ **Doctor Information** - Find available specialists\n📅 **Appointments** - Booking and scheduling info\n💊 **Medication Info** - Drug information and usage\n📋 **Lab Tests** - Test information and normal ranges\n💡 **Health Tips** - Wellness and prevention advice\n🏥 **Hospital Services** - Facilities and departments\n💳 **Insurance & Billing** - Payment and coverage info\n📏 **BMI Calculator** - Body mass index information\n🕐 **Visiting Hours** - Hospital policies\n\n🚨 **Emergencies** - Immediate guidance for urgent symptoms\n\nWhat specific health concern can I help you with?";
    }

    // Default response
    return "I'd like to help you with your health concern. Here are some ways I can assist:\n\n🩺 **Describe symptoms** (e.g., \"I have a headache and fever\")\n👨‍⚕️ **Find doctors** (e.g., \"cardiologist available?\")\n📅 **Book appointments** (e.g., \"How do I schedule?\")\n💊 **Medication info** (e.g., \"Tell me about paracetamol\")\n📋 **Lab tests** (e.g., \"Blood sugar test info\")\n💡 **Health tips** (e.g., \"Heart health advice\")\n🏥 **Hospital info** (e.g., \"What facilities do you have?\")\n\n🚨 **For medical emergencies, call 911 immediately**\n\nWhat would you like to know?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { text: "🤒 I have symptoms", action: "I have symptoms I'd like to discuss" },
    { text: "👨‍⚕️ Available doctors", action: "Which doctors are available today?" },
    { text: "📅 Book appointment", action: "How do I book an appointment?" },
    { text: "💊 Medication info", action: "I need medication information" },
    { text: "📋 Lab test info", action: "Tell me about lab tests" },
    { text: "💡 Health tips", action: "Give me some health tips" },
    { text: "🏥 Hospital services", action: "What facilities do you have?" },
    { text: "🚨 Emergency help", action: "I need emergency medical help" }
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
            <Stethoscope size={28} className="relative z-10" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <Heart size={14} className="text-white animate-pulse" />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat container */}
          <div className="fixed z-50 
                          bottom-4 right-4 left-4 top-4
                          sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto 
                          sm:w-96 sm:h-[520px]">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Stethoscope size={24} className="text-blue-100" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Dr. Assistant</h3>
                    <p className="text-blue-100 text-xs">Medical Chatbot • Always Available</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Stethoscope size={16} className="text-blue-500" />
                          <span className="text-xs font-medium text-blue-600">Dr. Assistant</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Stethoscope size={16} className="text-blue-500" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                  <p className="text-xs text-gray-600 mb-3 font-medium">Quick Help:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.slice(0, 4).map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(action.action);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-xs p-2 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-left"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {quickActions.slice(4, 8).map((action, index) => (
                      <button
                        key={index + 4}
                        onClick={() => {
                          setInputValue(action.action);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-xs p-2 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-left"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Notice */}
              <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600">
                    For medical emergencies, call 911 or visit ER immediately
                  </p>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your symptoms or ask a question..."
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm bg-white text-gray-900"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-3 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex-shrink-0"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MedicalChatbot;