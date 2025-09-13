 import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  department: { type: String, required: true },
  specialty: { type: String },
  qualification: { type: String },
  experience: { type: String },
  photo: { type: String },
  availableDays: [{ type: String }], // ["Monday","Tuesday"]
  availableSlots: [{ type: String }], // ["09:00","09:10", ...]
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor; // ✅ default export
