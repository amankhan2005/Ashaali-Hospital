 import express from "express";
import Appointment from "../models/appointment.models.js";
import Doctor from "../models/doctors.models.js";

const router = express.Router();

// Get doctor details & booked slots
router.get("/doctor/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Get booked appointments for future 20 days
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 20);

    const booked = await Appointment.find({
      doctor: doctor._id,
      date: { $gte: today, $lte: futureDate },
    });

    res.json({ doctor, booked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new appointment
router.post("/", async (req, res) => {
  try {
    const { doctorId, department, patientName, email, phone, date, slot } = req.body;

    // Check if slot is already booked
    const existing = await Appointment.findOne({
      doctor: doctorId,
      date,
      slot,
    });
    if (existing) return res.status(400).json({ message: "Slot already booked" });

    const appointment = new Appointment({
      doctor: doctorId,
      department,
      patientName,
      email,
      phone,
      date,
      slot,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
