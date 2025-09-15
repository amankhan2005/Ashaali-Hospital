 // Example appointment routes file
import express from 'express';
import {
  bookAppointment,
  getAvailableSlotsForDoctorDate,
  approveAppointment,
  rejectAppointment,
  deleteAppointment,
  getAppointments
} from '../controllers/appointment.controllers.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.get('/available-slots', getAvailableSlotsForDoctorDate); // Endpoint for fetching slots
router.get('/', getAppointments); // For admin to view all appointments
router.put('/:id/approve', approveAppointment);
router.put('/:id/reject', rejectAppointment);
router.delete('/:id', deleteAppointment);

export default router;