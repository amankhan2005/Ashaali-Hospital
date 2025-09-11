 import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  department: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
