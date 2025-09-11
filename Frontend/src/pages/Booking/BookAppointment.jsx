 import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
  <div className="w-full max-w-6xl rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">

    {/* Left Form */}
    <div className="lg:w-1/2 p-10 space-y-6 bg-orange-400/90 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center lg:text-left">Book Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" placeholder="Patient Name" required
          className="w-full bg-white/70 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#18978d] focus:border-transparent text-gray-800 placeholder-gray-500"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
        />
        <input type="email" placeholder="Email" required
          className="w-full bg-white/70 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#18978d] focus:border-transparent text-gray-800 placeholder-gray-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input type="tel" placeholder="Phone" required
          className="w-full bg-white/70 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#18978d] focus:border-transparent text-gray-800 placeholder-gray-500"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        {/* Department & Doctor */}
        {doctorIdFromURL ? (
          <>
            <input type="text" value={selectedDepartment} disabled className="w-full bg-white/70 border border-gray-300 px-4 py-3 rounded-xl text-gray-800"/>
            <input type="text" value={doctorDetails?.name || ""} disabled className="w-full bg-white/70 border border-gray-300 px-4 py-3 rounded-xl text-gray-800"/>
          </>
        ) : (
          <>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-white/70 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#18978d] focus:border-transparent text-gray-800"
              required
            >
              <option value="" className="text-gray-500">Select Department</option>
              {departments.map((dep, i) => (
                <option key={i} value={dep}>{dep}</option>
              ))}
            </select>

            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full bg-white/70 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#18978d] focus:border-transparent text-gray-800"
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
          </>
        )}

        {/* Date & Time inline */}
        <div className="flex gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            filterDate={date => !isDateDisabled(date)}
            placeholderText="Select available date"
            className="flex-1 bg-white/70 border border-gray-300 px-4 py-3 rounded-xl cursor-pointer focus:ring-2 focus:ring-[#18978d] focus:border-transparent text-gray-800 placeholder-gray-500"
          />

          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="flex-1 bg-white/70 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#18978d] focus:border-transparent text-gray-800"
            required
          >
            <option value="">Select Time</option>
            {slots.map((slot, i) => (
              <option key={i} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={submitting} 
          className="w-full bg-[#18978d] hover:bg-[#147a71] text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Confirm Appointment"}
        </button>

        {submitMessage && (
          <div className="text-center mt-3 font-medium text-gray-800">{submitMessage}</div>
        )}
      </form>
    </div>

    {/* Right Doctor Info */}
    {doctorDetails && (
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-10   backdrop-blur-md border-l border-gray-200">
        <img src={doctorDetails.photo || "https://via.placeholder.com/150"} alt="Doctor" className="w-40 h-40 rounded-full object-cover shadow-lg mb-6 border border-gray-300"/>
        <h3 className="text-2xl font-bold text-gray-800">{doctorDetails.name}</h3>
        <p className="text-gray-800 mt-2">{doctorDetails.department}</p>
        <p className="text-gray-700 mt-2 text-center">{doctorDetails.bio || "Experienced professional in their field."}</p>
      </div>
    )}
  </div>
</div>

  );
};

export default BookAppointment;
