 import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingForm = ({ doctor, onClose }) => {
  const [form, setForm] = useState({
    patientName: "",
    gender: "",
    email: "",
    phone: "",
    date: "",
    slot: ""
  });
  const [slots, setSlots] = useState([]);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctor?.availableSlots?.length > 0) {
      setSlots(doctor.availableSlots);
      setForm(prev => ({ ...prev, slot: doctor.availableSlots[0] }));
    }
  }, [doctor]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.slot || !form.date) {
      return alert("Please select date and slot");
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/appointments/book`,
        {
          ...form,
          doctorId: doctor._id,
        }
      );
      setConfirmation(res.data.appointment.appointmentId);
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.response?.data?.error || "Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  if (confirmation) {
    return (
      <div className="p-4 bg-green-100 rounded-md text-center">
        ✅ Appointment Confirmed! ID: <b>{confirmation}</b>
        <button
          onClick={onClose}
          className="block mt-3 bg-gray-200 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md space-y-3">
      <h3 className="text-lg font-bold">Book Appointment with {doctor.name}</h3>

      <input
        name="patientName"
        value={form.patientName}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <select
        name="slot"
        value={form.slot}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        {slots.length > 0 ? (
          slots.map((slot, idx) => (
            <option key={idx} value={slot}>
              {slot}
            </option>
          ))
        ) : (
          <option value="">No slots available</option>
        )}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="w-full bg-gray-300 text-black p-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default BookingForm;
