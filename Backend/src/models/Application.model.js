 import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
    jobTitle: { type: String, required: true, trim: true },
    resume: {
      originalName: String,
      mimeType: String,
      size: Number,
      path: String,
      filename: String,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;
