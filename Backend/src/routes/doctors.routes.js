 import express from "express";
import {
  getDoctors,
  getDepartments,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorById
} from "../controllers/doctors.controllers.js";

const router = express.Router();

// Public routes
router.get("/", getDoctors); // list with optional filters
router.get("/departments/list", getDepartments); // get unique departments
router.get("/:id", getDoctorById); // get single doctor

// Admin routes
router.post("/add", addDoctor);
router.patch("/update/:id", updateDoctor);
router.delete("/delete/:id", deleteDoctor);

export default router;
