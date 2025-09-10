 import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    alt: { type: String, default: "Gallery Image" },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
