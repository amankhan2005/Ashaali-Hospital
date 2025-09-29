 import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    date: { type: Date, required: true },
    slot: { type: String, required: true },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    department: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "rescheduled", "cancelled"],
      default: "pending",
    },

    isRescheduled: { type: Boolean, default: false }, // ✅ सही जगह

    rescheduleInfo: {
      previousDate: { type: Date },
      previousSlot: { type: String },
      rescheduledBy: { type: String },
      rescheduledAt: { type: Date },
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
