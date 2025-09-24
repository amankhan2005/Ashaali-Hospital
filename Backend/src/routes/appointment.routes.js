 
import express from "express";
import {
  bookAppointment,
  getAvailableSlotsForDoctorDate,
  approveAppointment,
  rescheduleAppointment,   // ✅ new import
  deleteAppointment,
  getAppointments,
} from "../controllers/appointment.controllers.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/available-slots", getAvailableSlotsForDoctorDate); // Endpoint for fetching slots
router.get("/", getAppointments); // For admin to view all appointments
router.put("/:id/approve", approveAppointment);
router.put("/:id/reschedule", rescheduleAppointment); // ✅ new route
router.delete("/:id", deleteAppointment);

export default router;
