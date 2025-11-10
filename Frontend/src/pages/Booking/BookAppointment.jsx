 import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AppointmentBooking = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patient, setPatient] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const docId = searchParams.get("doctorId");
    const dep = searchParams.get("department");
    const docName = searchParams.get("doctorName");

    if (dep) setSelectedDepartment(dep);
    if (docId && doctors.length > 0) {
      handleDoctorSelect(docId);
    }
  }, [searchParams, doctors]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/doctors/departments/list`)
      .then((res) => setDepartments(res.data))
      .catch(() => toast.error("Failed to load departments"));
  }, []);
  useEffect(() => {            
  const dep = searchParams.get("department");
  if (dep && departments.length > 0) {
    const match = departments.find(
      (d) => d.toLowerCase() === dep.toLowerCase()
    );
    if (match) {
      setSelectedDepartment(match);
    }
  }
}, [searchParams, departments]); 

  useEffect(() => {
    if (!selectedDepartment) return setDoctors([]);
    axios
      .get(`${API_URL}/api/doctors?department=${selectedDepartment}`)
      .then((res) => setDoctors(res.data))
      .catch(() => toast.error("Failed to load doctors"));
  }, [selectedDepartment]);

  const handleDoctorSelect = (id) => {
    const doctor = doctors.find((d) => d._id === id);
    if (!doctor) return;
    if (typeof doctor.availableSlots === "string") {
      try {
        doctor.availableSlots = JSON.parse(doctor.availableSlots);
      } catch {
        doctor.availableSlots = [];
      }
    }
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedSlot("");
    setAvailableSlots([]);
  };

  useEffect(() => {            //ye h service  ppagek 
  const dep = searchParams.get("department");
  if (dep && departments.length > 0) {
    const match = departments.find(
      (d) => d.toLowerCase() === dep.toLowerCase()
    );
    if (match) {
      setSelectedDepartment(match);
    }
  }
}, [searchParams, departments]); 


  const filterDate = (date) => {
    if (!selectedDoctor) return false;
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    return selectedDoctor.availableSlots.some((slot) => slot.day === day);
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedSlot("");
    setAvailableSlots([]);
    if (!selectedDoctor) return;
    setLoadingSlots(true);
    try {
      const options = { timeZone: "Asia/Kolkata" };
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const res = await axios.get(
        `${API_URL}/api/appointments/available-slots`,
        {
          params: { doctorId: selectedDoctor._id, date: formattedDate },
        }
      );
      setAvailableSlots(Array.isArray(res.data.slots) ? res.data.slots : []);
    } catch (err) {
      toast.error("Failed to load slots");
      console.error(err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const validateField = (field, value) => {
    let message = "";
    if (field === "name") {
      if (value.trim().length < 2)
        message = "Name must have at least 2 letters";
      else if (!/^[A-Za-z\s]+$/.test(value))
        message = "Name can only contain letters and spaces";
    }
    if (field === "email") {
      if (!/(?:@gmail\.com|@yahoo\.com|@icloud\.com)$/i.test(value))
        message = "Email must be @gmail, @yahoo, or @icloud";
    }
    if (field === "phone") {
      if (!/^[6-9]\d{9}$/.test(value))
        message = "Phone must be 10 digits starting with 6-9";
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validateInput = () => {
    return (
      !errors.name &&
      !errors.email &&
      !errors.phone &&
      patient.name &&
      patient.email &&
      patient.phone &&
      selectedSlot &&
      selectedDoctor &&
      selectedDate
    );
  };

  const handleBooking = async () => {
    try {
      const payload = {
        doctorId: selectedDoctor._id,
        patientName: patient.name,
        email: patient.email,
        phone: patient.phone,
        date: `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
        slot: selectedSlot,
      };
      const res = await axios.post(`${API_URL}/api/appointments/book`, payload);

      setBookingDetails({
        doctorName: selectedDoctor.name,
        department: selectedDepartment,
        date: selectedDate,
        slot: selectedSlot,
        patientName: patient.name,
      });

      toast.success(res.data.message || "Appointment booked successfully!");
      setBookingSuccess(true);

      setSelectedDepartment("");
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedSlot("");
      setAvailableSlots([]);
      setPatient({ name: "", email: "", phone: "" });
      setErrors({ name: "", email: "", phone: "" });

      setTimeout(() => setBookingSuccess(false), 10000);
    } catch (err) {
      console.error(err);
      throw err; // Re-throw to be caught by BookingButton
    }
  };

  const resetBooking = () => {
    setBookingSuccess(false);
    setBookingDetails(null);
  };

  // BookingButton Component
  const BookingButton = ({ handleBooking, validateInput }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
      try {
        setLoading(true);
        await handleBookingInternal();
      } catch (error) {
        console.error("Booking failed:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleBookingInternal = async () => {
      if (!validateInput()) {
        return toast.error("Please fix the errors before booking!");
      }
      try {
        await handleBooking();
      } catch (error) {
        toast.error(error.response?.data?.error || "Booking failed");
        throw error;
      }
    };

    return (
      <button
        onClick={handleClick}
        disabled={!validateInput() || loading}
        className={`w-full py-3 px-4 sm:py-4 sm:px-6 rounded-xl text-white font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] ${
          validateInput() && !loading
            ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-500 mb-3 sm:mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-3">
            Book Your Appointment
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Schedule your visit with our expert healthcare professionals in just
            a few simple steps
          </p>
        </div>

        {/* Success Message */}
        {bookingSuccess && bookingDetails && (
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-green-100 mb-4 sm:mb-0 sm:mr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 sm:h-8 sm:w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="text-center sm:text-left w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                    Appointment Confirmed!
                  </h3>
                  <p className="text-green-700 mb-3 sm:mb-4 text-sm sm:text-base">
                    Your appointment has been successfully booked. A
                    confirmation email has been sent to your registered email
                    address.
                  </p>

                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-green-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Patient
                        </p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {bookingDetails.patientName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Doctor
                        </p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {bookingDetails.doctorName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Department
                        </p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {bookingDetails.department}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Date & Time
                        </p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {bookingDetails.date.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at {bookingDetails.slot}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center sm:justify-start gap-2 sm:gap-3">
                    <button
                      onClick={resetBooking}
                      className="px-4 py-2 sm:px-5 sm:py-2 bg-white border border-green-300 text-green-700 rounded-lg font-medium text-sm hover:bg-green-50 transition-colors duration-200"
                    >
                      Book Another Appointment
                    </button>
                    <button className="px-4 py-2 sm:px-5 sm:py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors duration-200">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Card */}
        {!bookingSuccess && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8">
              {/* Progress Indicator */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-xs sm:text-sm font-medium">
                    <div
                      className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm ${
                        selectedDepartment
                          ? "bg-teal-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      1
                    </div>
                    <span
                      className={`ml-1 sm:ml-2 ${
                        selectedDepartment ? "text-teal-600" : "text-gray-500"
                      }`}
                    >
                      Department
                    </span>
                  </div>
                  <div className="flex-1 h-1 mx-2 sm:mx-4 bg-gray-200 rounded">
                    <div
                      className={`h-full rounded ${
                        selectedDepartment
                          ? "bg-teal-500 w-full"
                          : "bg-gray-200 w-0"
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm font-medium">
                    <div
                      className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm ${
                        selectedDoctor
                          ? "bg-teal-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      2
                    </div>
                    <span
                      className={`ml-1 sm:ml-2 ${
                        selectedDoctor ? "text-teal-600" : "text-gray-500"
                      }`}
                    >
                      Doctor
                    </span>
                  </div>
                  <div className="flex-1 h-1 mx-2 sm:mx-4 bg-gray-200 rounded">
                    <div
                      className={`h-full rounded ${
                        selectedDoctor
                          ? "bg-teal-500 w-full"
                          : "bg-gray-200 w-0"
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm font-medium">
                    <div
                      className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm ${
                        selectedSlot
                          ? "bg-teal-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      3
                    </div>
                    <span
                      className={`ml-1 sm:ml-2 ${
                        selectedSlot ? "text-teal-600" : "text-gray-500"
                      }`}
                    >
                      Details
                    </span>
                  </div>
                </div>
              </div>

              {/* Department Selection */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                  Select Department
                </label>
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 appearance-none bg-white text-gray-700 text-sm sm:text-base"
                  >
                    <option value="">-- Select Department --</option>
                    {departments.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Doctor Selection */}
              {selectedDepartment && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                    Select Doctor
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDoctor?._id || ""}
                      onChange={(e) => handleDoctorSelect(e.target.value)}
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 appearance-none bg-white text-gray-700 text-sm sm:text-base"
                    >
                      <option value="">-- Select Doctor --</option>
                      {doctors.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name} ({d.specialty})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Date Selection */}
              {selectedDoctor && (
                <div className="mb-4 sm:mb-6">
                  <label className="flex text-base items-center justify-center sm:text-lg font-medium text-gray-800 mb-2">
                    Select Date
                  </label>
                  <div className="flex justify-center items-center w-full">
                    <div className="relative w-full max-w-sm">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        filterDate={filterDate}
                        minDate={new Date()}
                        placeholderText="Select available date"
                        className="w-full p-2 px-22 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-sm sm:text-base"
                        dateFormat="PPP"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                    Available Time Slots
                  </label>
                  {loadingSlots ? (
                    <div className="flex justify-center items-center py-6 sm:py-8">
                      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-teal-500"></div>
                      <span className="ml-3 text-gray-600 text-sm sm:text-base">
                        Loading available slots...
                      </span>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-red-400 mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-red-600 font-medium text-sm sm:text-base">
                        No slots available
                      </p>
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        Please try another date
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {availableSlots.map((slotObj, i) => {
                        const displayTime = new Date(
                          `2000-01-01T${slotObj.time}:00`
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "Asia/Kolkata",
                        });

                        const isBooked = slotObj.booked;

                        // Check if slot is in the past
                        const now = new Date();
                        const selectedDay = new Date(selectedDate);
                        const slotDateTime = new Date(
                          `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, "0")}-${String(selectedDay.getDate()).padStart(2, "0")}T${slotObj.time}:00`
                        );
                        const isPast = slotDateTime < now;

                        return (
                          <button
                            key={i}
                            disabled={isBooked || isPast}
                            onClick={() => setSelectedSlot(slotObj.time)}
                            className={`py-2 px-3 sm:py-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105
                              ${
                                selectedSlot === slotObj.time && !isBooked && !isPast
                                  ? "bg-teal-500 text-white shadow-md"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }
                              ${
                                isBooked || isPast
                                  ? "bg-red-100 text-red-500 line-through cursor-not-allowed opacity-70"
                                  : ""
                              }`}
                          >
                            {displayTime}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Patient Details */}
              {selectedSlot && (
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-2xl p-4 sm:p-6 md:p-8 mt-4 sm:mt-6 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-5">
                    Your Information
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={patient.name}
                          onChange={(e) => {
                            setPatient({ ...patient, name: e.target.value });
                            validateField("name", e.target.value);
                          }}
                          className={`w-full p-3 sm:p-4 border rounded-xl focus:ring-2 transition duration-200 text-sm sm:text-base ${
                            errors.name
                              ? "border-red-400 ring-red-200"
                              : "border-gray-300 ring-teal-200"
                          }`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={patient.email}
                          onChange={(e) => {
                            setPatient({ ...patient, email: e.target.value });
                            validateField("email", e.target.value);
                          }}
                          className={`w-full p-3 sm:p-4 border rounded-xl focus:ring-2 transition duration-200 text-sm sm:text-base ${
                            errors.email
                              ? "border-red-400 ring-red-200"
                              : "border-gray-300 ring-teal-200"
                          }`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        WhatsApp Number*
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Your WhatsApp Number"
                          value={patient.phone}
                          onChange={(e) => {
                            setPatient({ ...patient, phone: e.target.value });
                            validateField("phone", e.target.value);
                          }}
                          className={`w-full p-3 sm:p-4 border rounded-xl focus:ring-2 transition duration-200 text-sm sm:text-base ${
                            errors.phone
                              ? "border-red-400 ring-red-200"
                              : "border-gray-300 ring-teal-200"
                          }`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <BookingButton 
                      handleBooking={handleBooking} 
                      validateInput={validateInput} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                  Need help? Call us at{" "}
                  <span className="font-medium text-teal-600">
                    <a href="tel:918303212210" className="hover:underline">
                      +91-83032 12210
                    </a>
                    <span className="mx-2">|</span>{" "}
                    <a href="tel:05223503390" className="hover:underline">
                      0522-3503390
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;