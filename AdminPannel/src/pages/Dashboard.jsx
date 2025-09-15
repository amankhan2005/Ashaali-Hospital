 import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import AppointmentsAdmin from "./AppointmentsAdmin";
import BlogsAdmin from "./BlogsAdmin";
import GalleryAdmin from "./GalleryAdmin";
import InquiriesAdmin from "./InquiriesAdmin";
import DoctorsAdmin from "./DoctorsAdmin";
import { 
  FaUserMd, FaCalendarAlt, FaBlog, FaImages, FaEnvelope, FaChartLine, 
  FaClock, FaUsers, FaBell, FaSearch, FaHeartbeat, FaStethoscope, 
  FaProcedures, FaFileMedical, FaHospital, FaUserInjured, FaNotesMedical 
} from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New appointment request", time: "5 min ago", read: false },
    { id: 2, text: "Lab results available", time: "1 hour ago", read: true },
    { id: 3, text: "Patient follow-up reminder", time: "3 hours ago", read: false },
  ]);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Stats data
  const statsData = [
    { title: "Patients Today", value: "24", icon: <FaUserInjured className="text-blue-600" />, change: "+3 from yesterday" },
    { title: "Appointments", value: "18", icon: <FaCalendarAlt className="text-green-600" />, change: "2 urgent cases" },
    { title: "Pending Reports", value: "8", icon: <FaFileMedical className="text-yellow-600" />, change: "3 critical" },
    { title: "Satisfaction", value: "98%", icon: <FaHeartbeat className="text-red-600" />, change: "+2% this month" },
  ];

  // Quick access cards
  const quickAccessData = [
    { title: "Patient Records", icon: <FaFileMedical className="text-2xl" />, description: "Access patient medical history", color: "bg-blue-100 text-blue-600" },
    { title: "Appointments", icon: <FaCalendarAlt className="text-2xl" />, description: "Manage your schedule", color: "bg-green-100 text-green-600" },
    { title: "Medical Blog", icon: <FaBlog className="text-2xl" />, description: "Publish health articles", color: "bg-purple-100 text-purple-600" },
    { title: "Procedures", icon: <FaProcedures className="text-2xl" />, description: "Track surgical procedures", color: "bg-yellow-100 text-yellow-600" },
    { title: "Lab Results", icon: <FaStethoscope className="text-2xl" />, description: "Review patient diagnostics", color: "bg-red-100 text-red-600" },
  ];

  // Today's schedule
  const todaySchedule = [
    { id: 1, time: "9:00 AM", patient: "John Smith", type: "Consultation", status: "Confirmed" },
    { id: 2, time: "10:30 AM", patient: "Emma Johnson", type: "Follow-up", status: "Confirmed" },
    { id: 3, time: "12:00 PM", patient: "Michael Brown", type: "Examination", status: "Pending" },
    { id: 4, time: "2:00 PM", patient: "Sophia Davis", type: "Consultation", status: "Confirmed" },
  ];

  // Recent patient updates
  const patientUpdates = [
    { id: 1, patient: "Robert Wilson", update: "Lab results uploaded", time: "2 hours ago" },
    { id: 2, patient: "Linda Martinez", update: "Appointment rescheduled", time: "3 hours ago" },
    { id: 3, patient: "James Taylor", update: "Prescription renewed", time: "5 hours ago" },
    { id: 4, patient: "Jennifer Anderson", update: "Discharge summary ready", time: "Yesterday" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Sidebar */}
      <Sidebar className="bg-gradient-to-b from-teal-800 to-teal-600 text-white shadow-xl" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar className="shadow-md bg-white border-b border-gray-200" />
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h1 className="text-5xl font-bold text-gray-900">Admin Dashboard</h1>
                      <p className="text-gray-600 mt-1"> Ashaali Hospital - Best Orthopedic Surgeon, Eye Care, Obstetrician And Gynecologist, Neuro-spine Brain Hospital In Lucknow</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm">
                        <FaClock className="text-gray-500 mr-2" />
                        <span className="font-medium">{currentTime}</span>
                      </div>
                      <div className="relative">
                        <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 relative">
                          <FaBell className="text-gray-600" />
                          {notifications.filter(n => !n.read).length > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                              {notifications.filter(n => !n.read).length}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
              
                  {/* Today's Schedule */}
          

                  

                   
                </div>
              }
            />
            <Route path="/doctors" element={<DoctorsAdmin />} />
            <Route path="/appointments" element={<AppointmentsAdmin />} />
            <Route path="/blogs" element={<BlogsAdmin />} />
            <Route path="/gallery" element={<GalleryAdmin />} />
            <Route path="/inquiries" element={<InquiriesAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;