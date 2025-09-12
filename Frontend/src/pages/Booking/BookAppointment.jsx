 import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUserMd, FaCalendarAlt, FaClock, FaHospital, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "https://ashaali-hospital-2.onrender.com";

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const doctorIdFromURL = searchParams.get("doctorId");
  const departmentFromURL = searchParams.get("department");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(departmentFromURL || "");
  const [selectedDoctor, setSelectedDoctor] = useState(doctorIdFromURL || "");
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/api/doctors/departments/list`)
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!doctorIdFromURL && selectedDepartment) {
      axios.get(`${BASE_URL}/api/doctors?department=${selectedDepartment}`)
        .then(res => setDoctors(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedDoctor) {
      axios.get(`${BASE_URL}/api/doctors/${selectedDoctor}`)
        .then(res => setDoctorDetails(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedDoctor]);

  useEffect(() => {
    if (doctorDetails?.opdTime) {
      const opdHours = parseInt(doctorDetails.opdTime);
      const minutesPerSlot = opdHours === 1 ? 5 : opdHours >= 2 ? 10 : 15;
      const startHour = 10;
      const slotList = [];
      let current = new Date();
      current.setHours(startHour, 0, 0, 0);
      for (let i = 0; i < (60 * opdHours) / minutesPerSlot; i++) {
        const h = current.getHours().toString().padStart(2, "0");
        const m = current.getMinutes().toString().padStart(2, "0");
        slotList.push(`${h}:${m}`);
        current.setMinutes(current.getMinutes() + minutesPerSlot);
      }
      setSlots(slotList);
    }
  }, [doctorDetails]);

  const isDateDisabled = (date) => {
    if (!doctorDetails?.availableSlots?.length) return true;
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return !doctorDetails.availableSlots.some(slot => slot.day === dayName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      setSubmitMessage("Please select valid date & time");
      return;
    }
    setSubmitting(true);
    setSubmitMessage("Submitting...");
    try {
      await axios.post(`${BASE_URL}/api/appointments/book`, {
        ...formData,
        doctorId: selectedDoctor,
        department: selectedDepartment,
        date: selectedDate,
        time: selectedSlot
      });
      setSubmitMessage("Appointment booked successfully!");
      setFormData({ patientName: "", email: "", phone: "" });
      setSelectedDate(null);
      setSelectedSlot("");
      setSelectedDoctor("");
      setSelectedDepartment("");
    } catch (err) {
      console.error(err);
      setSubmitMessage("Failed to book appointment.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Book Your Appointment</h1>
          <p className="text-lg text-gray-600">Schedule your visit with our expert doctors</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Form */}
          <div className="lg:w-1/2 p-8 md:p-10 bg-gradient-to-br from-teal-500 to-teal-600">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Appointment Details</h2>
              <div className="w-20 h-1 bg-white rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-teal-600" />
                </div>
                <input 
                  type="text" 
                  placeholder="Patient Name" 
                  required
                  className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-800 placeholder-gray-500 transition"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-teal-600" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-800 placeholder-gray-500 transition"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-teal-600" />
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  required
                  className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-800 placeholder-gray-500 transition"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              
              {/* Department & Doctor */}
              {doctorIdFromURL ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaHospital className="text-teal-600" />
                    </div>
                    <input 
                      type="text" 
                      value={selectedDepartment} 
                      disabled 
                      className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg text-gray-800" 
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserMd className="text-teal-600" />
                    </div>
                    <input 
                      type="text" 
                      value={doctorDetails?.name || ""} 
                      disabled 
                      className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg text-gray-800" 
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaHospital className="text-teal-600" />
                    </div>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-800 appearance-none transition"
                      required
                    >
                      <option value="" className="text-gray-500">Select Department</option>
                      {departments.map((dep, i) => (
                        <option key={i} value={dep}>{dep}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserMd className="text-teal-600" />
                    </div>
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-800 appearance-none transition"
                      required
                      disabled={!selectedDepartment}
                    >
                      <option value="" className="text-gray-500">Select Doctor</option>
                      {doctors
                        .filter(doc => doc.department === selectedDepartment)
                        .map(doc => (
                          <option key={doc._id} value={doc._id}>{doc.name}</option>
                        ))
                      }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
              
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-teal-600" />
                  </div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    filterDate={date => !isDateDisabled(date)}
                    placeholderText="Select Date"
                    className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-800 placeholder-gray-500 transition"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="text-teal-600" />
                  </div>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-800 appearance-none transition"
                    required
                  >
                    <option value="">Select Time</option>
                    {slots.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={submitting} 
                className="w-full bg-white text-teal-600 hover:bg-gray-100 py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Confirm Appointment"}
              </button>
              
              {submitMessage && (
                <div className={`text-center mt-4 font-medium py-2 px-4 rounded-lg ${submitMessage.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
          
          {/* Right Doctor Info */}
          {doctorDetails ? (
            <div className="lg:w-1/2 p-8 md:p-10 bg-gray-50 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Doctor Information</h2>
                <div className="w-20 h-1 bg-teal-500 rounded-full mx-auto"></div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src={doctorDetails.photo || "https://via.placeholder.com/150"} 
                    alt="Doctor" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-teal-100 shadow-md mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-800">{doctorDetails.name}</h3>
                  <p className="text-teal-600 font-medium mt-1">{doctorDetails.department}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-teal-100 p-2 rounded-lg mr-3">
                      <FaUserMd className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Specialization</h4>
                      <p className="text-gray-600">{doctorDetails.specialization || "General Practitioner"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal-100 p-2 rounded-lg mr-3">
                      <FaClock className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">OPD Timing</h4>
                      <p className="text-gray-600">{doctorDetails.opdTime} hours daily</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-teal-100 p-2 rounded-lg mr-3">
                      <FaCalendarAlt className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Available Days</h4>
                      <p className="text-gray-600">
                        {doctorDetails.availableSlots?.map(slot => slot.day).join(", ") || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
                
                {doctorDetails.bio && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                    <p className="text-gray-600">{doctorDetails.bio}</p>
                  </div>
                )}
              </div>
              
              <div className="text-center text-gray-600 text-sm">
                <p>For emergencies, please call our helpline immediately.</p>
              </div>
            </div>
          ) : (
            <div className="lg:w-1/2 p-8 md:p-10 bg-gray-50 flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUserMd className="text-teal-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Select a Doctor</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Please select a department and doctor from the form to view their details and book an appointment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;