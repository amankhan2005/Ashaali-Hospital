 import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  department: { type: String, required: true },
  specialty: { type: String },
  qualification: { type: String },
  experience: { type: String },
  photo: { type: String },
  availableSlots: [
    {
      day: { type: String },        // "Monday", "Tuesday", etc.
      startTime: { type: String },  // "09:00"
      endTime: { type: String },    // "17:00"
    }
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
