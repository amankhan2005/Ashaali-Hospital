//  import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema({
//   patientName: { type: String, required: true },
//   email: { type: String },
//   phone: { type: String },
//   date: { type: Date, required: true },
//   slot: { type: String, required: true },
//   doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
//   department: { type: String, required: true },
//   status: { type: String, default: "pending" }, // pending / approved / rejected
// }, { timestamps: true });

// const Appointment = mongoose.model("Appointment", appointmentSchema);
// export default Appointment;


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

    // status ab basic rakho
    status: {
      type: String,
      enum: ["pending", "confirmed", "rescheduled", "cancelled"],
      default: "pending",
    },

    // reschedule ke liye naya object
    rescheduleInfo: {
      previousDate: { type: Date },
      previousSlot: { type: String },
      rescheduledBy: { type: String }, // admin/doctor
      rescheduledAt: { type: Date },
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
