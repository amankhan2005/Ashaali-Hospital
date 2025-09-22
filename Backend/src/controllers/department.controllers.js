 import Department from "../models/department.model.js";

// Get all departments
export const getDepartments = async (req,res) => {
  try {
    const departments = await Department.find().sort({ createdAt:-1 });
    res.json(departments);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Add department
export const addDepartment = async (req,res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Name is required" });
    const exists = await Department.findOne({ name });
    if (exists) return res.status(400).json({ message: "Department already exists" });

    const department = new Department({ name });
    await department.save();
    res.status(201).json({ success:true, data:department });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Update department
export const updateDepartment = async (req,res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Name is required" });

    const updated = await Department.findByIdAndUpdate(id, { name }, { new:true, runValidators:true });
    if (!updated) return res.status(404).json({ message:"Department not found" });
    res.json({ success:true, data:updated });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete department
export const deleteDepartment = async (req,res) => {
  try {
    const { id } = req.params;
    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message:"Department not found" });
    res.json({ success:true, message:"Department deleted successfully" });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
