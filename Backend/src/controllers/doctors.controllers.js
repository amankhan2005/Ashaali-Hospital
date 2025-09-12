 import { Doctor } from "../models/doctors.models.js";
import cloudinary from "../config/cloudinary.js";

// Add doctor
export const addDoctor = async (req, res) => {
  try {
    const data = { ...req.body };

    // Parse JSON fields if sent as strings
    ["education", "certifications", "specialties", "achievements", "availableSlots"].forEach(key => {
      if (data[key]) {
        try { data[key] = JSON.parse(data[key]); } 
        catch (err) { data[key] = []; }
      } else data[key] = [];
    });

    // Upload photo to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "doctors"
      });
      data.photo = result.secure_url;
    }

    const doctor = new Doctor(data);
    await doctor.save();
    res.status(201).json({ success: true, message: "Doctor added", data: doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

// Get doctor by ID
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

// Update doctor
export const updateDoctor = async (req, res) => {
  try {
    const data = { ...req.body };
    ["education", "certifications", "specialties", "achievements", "availableSlots"].forEach(key => {
      if (data[key]) {
        try { data[key] = JSON.parse(data[key]); } 
        catch (err) { data[key] = []; }
      }
    });

    // Upload new photo to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "doctors"
      });
      data.photo = result.secure_url;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    res.json({ success: true, message: "Doctor updated", data: doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Optional: delete photo from Cloudinary
    if (doctor.photo) {
      const public_id = doctor.photo.split("/").pop().split(".")[0]; // crude way to get public_id
      await cloudinary.uploader.destroy(`doctors/${public_id}`).catch(()=>{});
    }

    res.json({ success: true, message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
