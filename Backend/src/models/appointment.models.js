 import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    //  age: { type: Number, required: true },   // ✅ add
    // gender: { type: String, enum: ["Male", "Female", "Other"], required: true }, // ✅ add

    email: { type: String },
    phone: { type: String },

    date: { type: Date, required: true },   // Appointment / Admission Date
    slot: { type: String, required: true }, // Time Slot

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    department: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "rescheduled", "cancelled"],
      default: "confirmed",
    },

    isRescheduled: { type: Boolean, default: false },

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
