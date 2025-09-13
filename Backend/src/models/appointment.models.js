 import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  department: { type: String, required: true },
  patientName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  date: { type: Date, required: true },
  slot: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Appointment", appointmentSchema);
