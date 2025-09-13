 import mongoose from "mongoose";

const availableSlotSchema = new mongoose.Schema({
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true }
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  specialization: { type: String },
  opdTime: { type: Number, default: 1 },
  availableSlots: [availableSlotSchema],
  photo: { type: String },
  bio: { type: String }
});

export default mongoose.model("Doctor", doctorSchema);
