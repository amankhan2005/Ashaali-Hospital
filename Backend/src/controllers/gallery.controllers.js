 import Gallery from "../models/gallery.models.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Get all images
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get single image by ID
export const getGalleryById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Helper for Cloudinary memory upload
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ashaali_hospital_gallery", // ✅ safe folder name
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 1200, height: 800, crop: "limit" }],
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(fileBuffer);
  });
};

// ✅ Upload new image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await streamUpload(req.file.buffer);

    const newImage = new Gallery({
      image: result.secure_url,
      alt: req.body.alt || "Gallery Image",
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error("Cloudinary Upload Failed:", err);
    res.status(500).json({ message: "Cloudinary Upload Failed", error: err.message });
  }
};

// ✅ Update existing image
export const updateImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      image.image = result.secure_url;
    }

    if (req.body.alt) image.alt = req.body.alt;

    await image.save();
    res.json(image);
  } catch (err) {
    console.error("Update Failed:", err);
    res.status(500).json({ message: "Update Failed", error: err.message });
  }
};

// ✅ Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete Failed", error: err.message });
  }
};
