//  import express from 'express';
// import {
//   addDoctor,
//   getDoctors,
//   getDoctorById,
//   updateDoctor,
//   deleteDoctor,
//   getDepartments
// } from '../controllers/doctors.controllers.js';

// const router = express.Router();

// // Important: specific routes go first
// router.get('/departments/list', getDepartments); // list of departments
// router.get('/', getDoctors);                     // list of doctors (with optional ?department=)
// router.get('/:id', getDoctorById);              // get doctor by ID
// router.post('/', addDoctor);
// router.put('/:id', updateDoctor);
// router.delete('/:id', deleteDoctor);

// export default router;


 import express from "express";
import {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDepartments,
} from "../controllers/doctors.controllers.js";
import upload from "../middleware/upload.js"; // ✅ photo upload middleware

const router = express.Router();

// Specific routes first
router.get("/departments/list", getDepartments); // list of departments
router.get("/", getDoctors);                     // list of doctors (with optional ?department=)
router.get("/:id", getDoctorById);               // get doctor by ID

// ✅ Add doctor (with photo upload)
router.post("/add", upload.single("photo"), addDoctor);

// ✅ Update doctor
router.put("/update/:id", upload.single("photo"), updateDoctor);

// ✅ Delete doctor
router.delete("/delete/:id", deleteDoctor);

export default router;
