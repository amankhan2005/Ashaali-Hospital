 import express from "express";
import { upload } from "../middleware/multer.js";
import {
  addDoctor,
  updateDoctor,
  getDoctors,
  deleteDoctor,
  getDepartments,
  getDoctorById
} from "../controllers/doctors.controllers.js";

const router = express.Router();

// -------------------------
// Public routes
// -------------------------

// ✅ Get all doctors (with filters like ?department=Cardiology&available=true)
router.get("/", getDoctors);

// ✅ Get unique department list
router.get("/departments/list", getDepartments);

// ✅ Get single doctor by ID
router.get("/:id", getDoctorById);

// -------------------------
// Admin routes
// -------------------------

// ✅ Add new doctor (with photo + JSON fields like availableSlots)
router.post("/add", upload.single("photo"), addDoctor);

// ✅ Update existing doctor (with optional new photo + JSON fields)
router.patch("/update/:id", upload.single("photo"), updateDoctor);

// ✅ Delete doctor
router.delete("/delete/:id", deleteDoctor);

export default router;
