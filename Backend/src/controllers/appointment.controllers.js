 import Appointment from "../models/appointment.models.js";
import Doctor from "../models/doctors.models.js";
import nodemailer from "nodemailer";
import { format } from "date-fns";

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

    // Convert selected date
    const [year, month, day] = date.split("-").map(Number);
    const appointmentDate = new Date(year, month - 1, day, 0, 0, 0);

    // Check if slot already booked
    const existing = await Appointment.findOne({
      doctor: doctorId,
      date: appointmentDate,
      slot,
      status: { $in: ["pending", "approved", "confirmed"] },
    });

    if (existing)
      return res.status(400).json({ error: "This slot is already booked!" });

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

    // ✅ Mail to Admin
    try {
      await transporter.sendMail({
        from: `"Ashaali Hospital Website" <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "📩 New Appointment Booked - Ashaali Hospital",
        html: `
          <p>Dear Admin,</p>
          <p>A new appointment has been booked successfully with the following details:</p>
          <p><strong>Patient Name:</strong> ${patientName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Doctor:</strong> ${doctor.name} (${doctor.department})</p>
          <p><strong>Date:</strong> ${formatDateIST(appointmentDate)}</p>
          <p><strong>Time Slot:</strong> ${slot}</p>
          <br/>
          <p>Regards,<br/>Ashaali Hospital</p>
        `,
      });
    } catch (err) {
      console.error("❌ Admin mail error:", err.message);
    }

    // ✅ Mail to Patient
    try {
      await transporter.sendMail({
        from: `"Ashaali Hospital" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        replyTo: process.env.ADMIN_EMAIL,
        subject: "✅ Appointment Confirmed - Ashaali Hospital",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #18978d;">Ashaali Hospital</h2>
            <p>Dear <strong>${patientName}</strong>,</p>
            <p>
              We are pleased to inform you that your appointment at 
              <strong>Ashaali Hospital</strong> has been successfully booked.
            </p>
            <p><strong>Doctor:</strong> ${doctor.name}</p>
            <p><strong>Department:</strong> ${doctor.department}</p>
            <p><strong>Date:</strong> ${formatDateIST(appointmentDate)}</p>
            <p><strong>Time:</strong> ${slot}</p>
            <p>
              Kindly arrive <strong>15 minutes prior</strong> to your scheduled time.  
              Please carry your previous medical records (if any).
            </p>
            <br/>
            <p>Best Regards,</p>
            <p><strong>Ashaali Hospital</strong></p>
            <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
            <p style="font-size: 12px; color: #666;">
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error("❌ Patient mail error:", err.message);
    }

    res
      .status(201)
      .json({ success: true, message: "Appointment booked successfully!", appointment });
  } catch (err) {
    console.error("Appointment booking error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get available slots
export const getAvailableSlotsForDoctorDate = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    if (!doctorId || !date)
      return res.status(400).json({ error: "Doctor ID and Date are required" });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const dayName = new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
    });
    const doctorDailyAvailability = doctor.availableSlots.find(
      (slot) => slot.day === dayName
    );

    if (!doctorDailyAvailability) {
      return res.json({
        slots: [],
        message: "Doctor not available on this day.",
      });
    }

    const allPossibleSlots = generateTimeSlots(
      doctorDailyAvailability.startTime,
      doctorDailyAvailability.endTime,
      10
    );

    const [year, month, dayNum] = date.split("-").map(Number);
    const startOfDay = new Date(year, month - 1, dayNum, 0, 0, 0);
    const endOfDay = new Date(year, month - 1, dayNum, 23, 59, 59);

    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ["pending", "approved", "confirmed"] },
    }).select("slot");

    const bookedTimes = bookedAppointments.map((a) => a.slot);

    const now = new Date();
    const finalSlots = allPossibleSlots.map((slotTime) => {
      const [hours, minutes] = slotTime.split(":").map(Number);
      const slotDateTime = new Date(year, month - 1, dayNum, hours, minutes);
      return {
        time: slotTime,
        booked: bookedTimes.includes(slotTime),
        expired: slotDateTime < now,
      };
    });

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
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "approved";
    await appointment.save();

    // Mail to Patient
    try {
      await transporter.sendMail({
        from: `"Ashaali Hospital" <${process.env.ADMIN_EMAIL}>`,
        to: appointment.email,
        subject: "✅ Appointment Approved - Ashaali Hospital",
        html: `
          <p>Dear ${appointment.patientName},</p>
          <p>Your appointment with <strong>${appointment.doctor.name}</strong> (${appointment.doctor.department}) has been <strong>approved</strong>.</p>
          <p><strong>Date:</strong> ${formatDateIST(appointment.date)}</p>
          <p><strong>Time:</strong> ${appointment.slot}</p>
          <p>Please arrive 15 minutes early.</p>
          <p>Regards,<br/>Ashaali Hospital</p>
        `,
      });
    } catch (err) {
      console.error("❌ Patient mail (approve) error:", err.message);
    }

    // Mail to Admin
    try {
      await transporter.sendMail({
        from: `"Ashaali Hospital Website" <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "✅ Appointment Approved - Ashaali Hospital",
        html: `
          <p>Dear Admin,</p>
          <p>The following appointment has been <strong>approved</strong>:</p>
          <p><strong>Patient:</strong> ${appointment.patientName}</p>
          <p><strong>Doctor:</strong> ${appointment.doctor.name} (${appointment.doctor.department})</p>
          <p><strong>Date:</strong> ${formatDateIST(appointment.date)}</p>
          <p><strong>Time:</strong> ${appointment.slot}</p>
        `,
      });
    } catch (err) {
      console.error("❌ Admin mail (approve) error:", err.message);
    }

    res.json({ success: true, message: "Appointment approved", appointment });
  } catch (err) {
    console.error("Approve appointment error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// ✅ Reschedule Appointment
export const rescheduleAppointment = async (req, res) => {
  try {
    const { newDate, newSlot } = req.body;
    const appointment = await Appointment.findById(req.params.id).populate("doctor");

    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    // Save previous info
    appointment.rescheduleInfo = {
      previousDate: appointment.date,
      previousSlot: appointment.slot,
      rescheduledBy: "admin",
      rescheduledAt: new Date(),
    };

    const [year, month, day] = newDate.split("-").map(Number);
    const appointmentDate = new Date(year, month - 1, day, 0, 0, 0);

    appointment.date = appointmentDate;
    appointment.slot = newSlot;
    appointment.status = "rescheduled";

    await appointment.save();

    // Mail to Patient (with apology)
    try {
      await transporter.sendMail({
        from: `"Ashaali Hospital" <${process.env.ADMIN_EMAIL}>`,
        to: appointment.email,
        replyTo: process.env.ADMIN_EMAIL,
        subject: "🔄 Appointment Rescheduled - Ashaali Hospital",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #18978d;">Ashaali Hospital</h2>
            <p>Dear <strong>${appointment.patientName}</strong>,</p>
            <p>
              We sincerely apologize for the inconvenience caused.  
              Due to unavoidable reasons, your appointment has been <strong>rescheduled</strong>.
            </p>
            <p><strong>Doctor:</strong> ${appointment.doctor.name}</p>
            <p><strong>Department:</strong> ${appointment.doctor.department}</p>
            <p><strong>New Date:</strong> ${formatDateIST(appointment.date)}</p>
            <p><strong>New Time:</strong> ${appointment.slot}</p>
            <p>
              We regret any inconvenience this may have caused and assure you of our best care.  
              Kindly arrive at least <strong>15 minutes prior</strong> to your new appointment time.
            </p>
            <br/>
            <p>Thank you for your understanding.</p>
            <p>Best Regards,<br/><strong>Ashaali Hospital</strong></p>
          </div>
        `,
      });
    } catch (err) {
      console.error("❌ Patient mail (reschedule) error:", err.message);
    }

    // Mail to Admin
    try {
      await transporter.sendMail({
        from: `"Ashaali Hospital Website" <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "🔄 Appointment Rescheduled - Ashaali Hospital",
        html: `
          <p>Dear Admin,</p>
          <p>The following appointment has been <strong>rescheduled</strong>:</p>
          <p><strong>Patient:</strong> ${appointment.patientName}</p>
          <p><strong>Doctor:</strong> ${appointment.doctor.name} (${appointment.doctor.department})</p>
          <p><strong>New Date:</strong> ${formatDateIST(appointment.date)}</p>
          <p><strong>New Time:</strong> ${appointment.slot}</p>
        `,
      });
    } catch (err) {
      console.error("❌ Admin mail (reschedule) error:", err.message);
    }

    res.json({ success: true, message: "Appointment rescheduled", appointment });
  } catch (err) {
    console.error("Reschedule appointment error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// ✅ Delete Appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    console.error("Delete appointment error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get all appointments (admin)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor")
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    console.error("Get appointments error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
