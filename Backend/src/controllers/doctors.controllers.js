 import Doctor from "../models/doctors.models.js";

// CREATE
export const createDoctor = async (req, res) => {
  try {
    const { name, department, specialization, opdTime, bio } = req.body;
    let availableSlots = [];

    if (req.body.availableSlots) {
      availableSlots = JSON.parse(req.body.availableSlots);
    }

    const doctor = new Doctor({
      name,
      department,
      specialization,
      opdTime,
      bio,
      availableSlots,
      photo: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// UPDATE
export const updateDoctor = async (req, res) => {
  try {
    const { name, department, specialization, opdTime, bio } = req.body;
    let availableSlots = [];

    if (req.body.availableSlots) {
      availableSlots = JSON.parse(req.body.availableSlots);
    }

    const updateData = { name, department, specialization, opdTime, bio, availableSlots };
    if (req.file) updateData.photo = `/uploads/${req.file.filename}`;

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!doctor) return res.status(404).json({ message: "Not found" });

    res.json(doctor);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// GET all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Not found" });
    res.json(doctor);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Doctor deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
