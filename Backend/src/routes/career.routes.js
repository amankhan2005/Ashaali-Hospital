 import express from "express";
import upload from "../middleware/upload.js";
import {
  getPositions,
  addPosition,
  deletePosition,
  saveApplication,
  getApplications,
} from "../controllers/career.controllers.js";

const router = express.Router();

// ===== JOBS =====
router.get("/positions", getPositions);          // Get all job positions
router.post("/positions", addPosition);          // Add a new job
router.delete("/positions/:id", deletePosition); // Delete job by ID

// ===== APPLICATIONS =====
router.get("/applications", getApplications); // Admin panel - get all applications
router.post("/save", upload.single("resume"), saveApplication); // User apply

export default router;
