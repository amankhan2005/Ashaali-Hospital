 import express from "express";
import {
  createDoctor,
  updateDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor
} from "../controllers/doctors.controllers.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", upload.single("photo"), createDoctor);
router.patch("/:id", upload.single("photo"), updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
