 import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  specialty: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String },
  experience: { type: String },
  photo: { type: String },
  bio: { type: String },
  phone: { type: String },
  email: { type: String },
  location: { type: String },
  opdTime: { type: String, required: true },
  available: { type: Boolean, default: true },
  education: [{ degree: String, institution: String, location: String, year: String }],
  certifications: [String],
  specialties: [{ name: String, description: String }],
  achievements: [String],
  availableSlots: [{ day: String, time: String }]
});

export const Doctor = mongoose.model("Doctor", DoctorSchema);
