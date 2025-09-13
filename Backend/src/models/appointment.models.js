 import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["Male","Female","Other"], required: true },
  department: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["pending","approved","cancelled"], default: "pending" }
},{timestamps:true});

export default mongoose.model("Appointment", appointmentSchema);
