 import Appointment from "../models/appointment.models.js";
import Doctor from "../models/doctors.models.js";
import nodemailer from "nodemailer";
import { format } from "date-fns"; // For pretty formatting

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

// Helper to generate time slots (10 min gap)
const generateTimeSlots = (startTime, endTime, intervalMinutes = 10) => {
  const slots = [];
  let current = new Date(`2000-01-01T${startTime}:00`);
  const end = new Date(`2000-01-01T${endTime}:00`);

  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5)); // "HH:MM"
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }
  return slots;
};

// Helper to format date in IST
const formatDateIST = (date) => format(date, "dd MMM yyyy");

// ✅ Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { patientName, email, phone, date, doctorId, slot } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Convert selected date to IST to avoid day mismatch
    const [year, month, day] = date.split("-").map(Number);
    const appointmentDate = new Date(Date.UTC(year, month - 1, day));
    appointmentDate.setHours(5, 30, 0, 0); // IST offset

    // Check if slot already booked
    const existing = await Appointment.findOne({
      doctor: doctorId,
      date: appointmentDate,
      slot,
      status: { $in: ["pending", "approved"] },
    });

    if (existing) return res.status(400).json({ error: "This slot is already booked!" });

    const appointment = new Appointment({
      patientName,
      email,
      phone,
      date: appointmentDate,
      department: doctor.department,
      doctor: doctor._id,
      slot,
      status: "pending",
    });

    await appointment.save();

    // Email to admin
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Appointment Request",
      html: `<p>New appointment requested:</p>
             <p><strong>Patient:</strong> ${patientName}</p>
             <p><strong>Doctor:</strong> ${doctor.name}</p>
             <p><strong>Date:</strong> ${formatDateIST(appointmentDate)}</p>
             <p><strong>Time Slot:</strong> ${slot}</p>`,
    });

    res.status(201).json({ success: true, message: "Appointment requested!", appointment });
  } catch (err) {
    console.error("Appointment booking error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get available slots for a doctor on a specific date
export const getAvailableSlotsForDoctorDate = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    if (!doctorId || !date) return res.status(400).json({ error: "Doctor ID and Date are required" });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
console.log(date)
    const dayName = new Date(date).toLocaleDateString("en-IN", { weekday: "long" });
    const doctorDailyAvailability = doctor.availableSlots.find(slot => slot.day === dayName);

    if (!doctorDailyAvailability) {
      return res.json({ slots: [], message: "Doctor not available on this day." });
    }

    const allPossibleSlots = generateTimeSlots(
      doctorDailyAvailability.startTime,
      doctorDailyAvailability.endTime,
      10
    );

    // Set IST start & end of day
    const [year, month, day] = date.split("-").map(Number);
    const startOfDay = new Date(Date.UTC(year, month - 1, day));
    startOfDay.setHours(5, 30, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(29, 59, 59, 999); // IST end of day

    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ["pending", "approved"] },
    }).select("slot");

    const bookedTimes = bookedAppointments.map(a => a.slot);

    const finalSlots = allPossibleSlots.map(slotTime => ({
      time: slotTime,
      booked: bookedTimes.includes(slotTime),
    }));

    res.json({ slots: finalSlots });
  } catch (err) {
    console.error("Get available slots error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Approve Appointment
export const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("doctor");
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "approved";
    await appointment.save();

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: appointment.email,
      subject: "Appointment Confirmed",
      html: `<p>Dear ${appointment.patientName},</p>
             <p>Your appointment with Dr. ${appointment.doctor.name} (${appointment.doctor.department}) is approved.</p>
             <p><strong>Date:</strong> ${formatDateIST(appointment.date)}</p>
             <p><strong>Time:</strong> ${appointment.slot}</p>
             <p>Please arrive 15 minutes early.</p>`,
    });

    res.json({ success: true, message: "Appointment approved", appointment });
  } catch (err) {
    console.error("Approve appointment error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Reject Appointment
export const rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("doctor");
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "rejected";
    await appointment.save();

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: appointment.email,
      subject: "Appointment Rejected",
      html: `<p>Dear ${appointment.patientName},</p>
             <p>Your appointment with Dr. ${appointment.doctor.name} on ${formatDateIST(appointment.date)} at ${appointment.slot} has been rejected.</p>`,
    });

    res.json({ success: true, message: "Appointment rejected", appointment });
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
    const appointments = await Appointment.find().populate("doctor").sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    console.error("Get appointments error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
