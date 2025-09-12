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
                      <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
                      <p className="text-gray-600 mt-1">Welcome back, Dr. Johnson. Here's your daily overview.</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-sm">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            <p className="text-green-600 text-sm mt-1">{stat.change}</p>
                          </div>
                          <div className="p-3 bg-teal-50 rounded-lg">
                            {stat.icon}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Today's Schedule */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <FaCalendarAlt className="text-teal-600 mr-2" />
                        Today's Schedule
                      </h2>
                      <button className="text-teal-600 font-medium hover:text-teal-800 text-sm">
                        View Full Calendar
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {todaySchedule.map((appointment) => (
                            <tr key={appointment.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.time}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.patient}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appointment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Access */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <FaHospital className="text-teal-600 mr-2" />
                        Quick Access
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quickAccessData.map((item, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all cursor-pointer"
                          >
                            <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                              {item.icon}
                            </div>
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Patient Updates */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <FaNotesMedical className="text-teal-600 mr-2" />
                        Recent Patient Updates
                      </h2>
                      <div className="space-y-4">
                        {patientUpdates.map((update) => (
                          <div key={update.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
                            <div className="bg-teal-100 p-2 rounded-full mr-3">
                              <FaUserInjured className="text-teal-600 text-sm" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{update.patient}</p>
                              <p className="text-gray-600 text-sm">{update.update}</p>
                            </div>
                            <span className="text-gray-500 text-sm">{update.time}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 text-teal-600 font-medium hover:text-teal-800 text-sm">
                        View all updates
                      </button>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <FaBell className="text-teal-600 mr-2" />
                      Notifications
                    </h2>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-teal-50 border-l-4 border-teal-500'}`}
                        >
                          <div className="flex justify-between">
                            <p className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                              {notification.text}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-teal-600 font-medium hover:text-teal-800 text-sm">
                      View all notifications
                    </button>
                  </div>
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