 import { Appointment } from "../models/appointment.models.js";
import { Doctor } from "../models/doctors.models.js";
import nodemailer from "nodemailer";

// ✅ Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { patientName, email, phone, date, doctorId, time } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // ✅ Check if slot already booked
    const existing = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      time,
    });

    if (existing) {
      return res.status(400).json({ error: "This slot is already booked!" });
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
        pass: process.env.ADMIN_EMAIL_PASSWORD,
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

// ✅ Get booked slots for doctor + date
export const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ error: "Doctor ID and Date are required" });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).select("time");

    const bookedSlots = appointments.map((a) => a.time);

    res.json({ bookedSlots });
  } catch (err) {
    console.error("Get booked slots error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Approve Appointment
export const approveAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id).populate("doctor");
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "approved";
    await appointment.save();

    // Send email to patient
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: appointment.email,
      subject: "Appointment Confirmed",
      text: `Your appointment with Dr. ${appointment.doctor.name} (${appointment.doctor.department}) on ${appointment.date.toDateString()} at ${appointment.time} has been confirmed.`,
    });

    res.json({ success: true, message: "Appointment approved & email sent", appointment });
  } catch (err) {
    console.error("Approve appointment error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Reject Appointment
export const rejectAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id).populate("doctor");
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "rejected";
    await appointment.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: appointment.email,
      subject: "Appointment Rejected",
      text: `Your appointment with Dr. ${appointment.doctor.name} (${appointment.doctor.department}) on ${appointment.date.toDateString()} at ${appointment.time} has been rejected.`,
    });

    res.json({ success: true, message: "Appointment rejected & email sent", appointment });
  } catch (err) {
    console.error("Reject appointment error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    console.error("Delete appointment error:", err.message);
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
