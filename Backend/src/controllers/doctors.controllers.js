 import { Doctor } from "../models/doctors.models.js";

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const { department, available } = req.query;
    let query = {};
    if (department) query.department = department;
    if (available !== undefined) query.available = available === "true";
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get unique departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Doctor.distinct("department");
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add doctor
export const addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ success: true, message: "Doctor added", data: doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
