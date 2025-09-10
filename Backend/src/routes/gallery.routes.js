 import express from "express";
import multer from "multer";
import {
  getGallery,
  getGalleryById,
  uploadImage,
  updateImage,
  deleteImage
} from "../controllers/gallery.controllers.js";

const router = express.Router();

// ✅ Multer memory storage (no local files)
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get("/", getGallery);
router.get("/:id", getGalleryById);

// Admin routes
router.post("/add", upload.single("image"), uploadImage);
router.patch("/update/:id", upload.single("image"), updateImage);
router.delete("/delete/:id", deleteImage);

export default router;
