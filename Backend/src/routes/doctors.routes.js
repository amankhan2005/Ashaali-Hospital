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

// Public routes
router.get("/", getDoctors);
router.get("/departments/list", getDepartments);
router.get("/:id", getDoctorById);

// Admin routes
router.post("/add", upload.single("photo"), addDoctor);
router.patch("/update/:id", upload.single("photo"), updateDoctor);
router.delete("/delete/:id", deleteDoctor);

export default router;
