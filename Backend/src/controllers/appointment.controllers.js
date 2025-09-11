 import { Appointment } from "../models/appointment.models.js";
import { Doctor } from "../models/doctors.models.js"; 
import { generateSlots } from "../utils/slotGenerator.js";
import nodemailer from "nodemailer";

// ✅ Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { patientName, email, phone, date, doctorId, time } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Generate available slots
    const opdHours = parseInt(doctor.opdTime);
    const availableSlots = generateSlots(opdHours);

    if (!availableSlots.includes(time)) {
      return res.status(400).json({ error: "Selected time slot is invalid" });
    }

    const appointment = new Appointment({
      patientName,
      email,
      phone,
      date: new Date(date),
      department: doctor.department,
      doctor: doctor._id,
      time,
      status: "pending",
    });

    await appointment.save();

    // ✅ Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.ADMIN_EMAIL, 
        pass: process.env.ADMIN_EMAIL_PASSWORD, // ✅ corrected
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Appointment Request",
      text: `New appointment requested:
Patient: ${patientName}
Doctor: ${doctor.name}
Date: ${date}
Time: ${time}`,
    });

    res.status(201).json({ success: true, message: "Appointment requested!", appointment });
  } catch (err) {
    console.error("Appointment booking error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Approve Appointment (optional admin feature)
export const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).populate("doctor");

    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    // ✅ Email confirmation to patient
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.ADMIN_EMAIL, 
        pass: process.env.ADMIN_EMAIL_PASSWORD, // ✅ corrected
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: appointment.email,
      subject: "Appointment Confirmed",
      text: `Your appointment with Dr. ${appointment.doctor.name} (${appointment.doctor.department}) on ${appointment.date} at ${appointment.time} has been confirmed.`,
    });

    res.json({ success: true, message: "Appointment approved & email sent", appointment });
  } catch (err) {
    console.error("Approve appointment error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all appointments (admin)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor");
    res.json(appointments);
  } catch (err) {
    console.error("Get appointments error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
