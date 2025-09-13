 import express from "express";
import { getAppointments, bookAppointment, updateAppointment, deleteAppointment } from "../controllers/appointment.controllers.js";
const router = express.Router();
router.get("/",getAppointments);
router.post("/book",bookAppointment);
router.patch("/:id",updateAppointment);
router.delete("/:id",deleteAppointment);
export default router;
