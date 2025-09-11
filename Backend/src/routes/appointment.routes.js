 import express from "express";
import { bookAppointment, approveAppointment, getAppointments } from "../controllers/appointment.controllers.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.patch("/approve/:id", approveAppointment);
router.get("/", getAppointments);

export default router;
