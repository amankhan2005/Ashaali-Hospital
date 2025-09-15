 import express from 'express';
import {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDepartments
} from '../controllers/doctors.controllers.js';

const router = express.Router();

// Important: specific routes go first
router.get('/departments/list', getDepartments); // list of departments
router.get('/', getDoctors);                     // list of doctors (with optional ?department=)
router.get('/:id', getDoctorById);              // get doctor by ID
router.post('/', addDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
