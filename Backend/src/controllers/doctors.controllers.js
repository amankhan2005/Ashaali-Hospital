//  import Doctor from "../models/doctors.models.js";
// import cloudinary from "../config/cloudinary.js"; // Your Cloudinary config

// // Helper: only parse if it's a string
// const parseJsonField = (data, field) => {
//   if (data[field] && typeof data[field] === "string") {
//     try {
//       data[field] = JSON.parse(data[field]);
//     } catch (err) {
//       console.warn(`Could not parse JSON for field ${field}:`, data[field], err);
//       data[field] = [];
//     }
//   } else if (!data[field]) {
//     data[field] = [];
//   }
// };

// // Add doctor
// export const addDoctor = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     // Ensure availableSlots is an array of objects
//     parseJsonField(data, "availableSlots");

//     // Upload photo to Cloudinary if present
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "doctors",
//       });
//       data.photo = result.secure_url;
//     }

//     // Remove _id if present to avoid duplicate key error
//     delete data._id;

//     const doctor = new Doctor(data);
//     await doctor.save();
//     res.status(201).json({ success: true, message: "Doctor added", data: doctor });
//   } catch (err) {
//     console.error("Error adding doctor:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all doctors (optionally filtered by department)
// export const getDoctors = async (req, res) => {
//   try {
//     const { department } = req.query;
//     let query = {};
//     if (department) query.department = department;
//     const doctors = await Doctor.find(query);
//     res.json(doctors);
//   } catch (err) {
//     console.error("Error fetching doctors:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get doctor by ID
// export const getDoctorById = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });
//     res.json(doctor);
//   } catch (err) {
//     console.error("Error fetching doctor by ID:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get unique departments
// export const getDepartments = async (req, res) => {
//   try {
//     const departments = await Doctor.distinct("department");
//     res.json(departments);
//   } catch (err) {
//     console.error("Error fetching departments:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update doctor
// // export const updateDoctor = async (req, res) => {
// //   try {
// //     const data = { ...req.body };
// //     parseJsonField(data, "availableSlots");

// //     if (req.file) {
// //       const result = await cloudinary.uploader.upload(req.file.path, {
// //         folder: "doctors",
// //       });
// //       data.photo = result.secure_url;
// //     }

// //     const doctor = await Doctor.findByIdAndUpdate(req.params.id, data, { new: true });
// //     if (!doctor) return res.status(404).json({ error: "Doctor not found" });

// //     res.json({ success: true, message: "Doctor updated", data: doctor });
// //   } catch (err) {
// //     console.error("Error updating doctor:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// export const updateDoctor = async (req, res) => {
//   try {
//     const data = { ...req.body };
//     console.log("Update request:", req.params.id, data); // ✅ debug log
//     parseJsonField(data, "availableSlots");

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "doctors",
//       });
//       data.photo = result.secure_url;
//     }

//     const doctor = await Doctor.findByIdAndUpdate(req.params.id, data, { new: true });
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });

//     res.json({ success: true, message: "Doctor updated", data: doctor });
//   } catch (err) {
//     console.error("Error updating doctor:", err);
//     res.status(500).json({ error: err.message });
//   }
// };


// // Delete doctor
// export const deleteDoctor = async (req, res) => {
//   try {
//     const doctor = await Doctor.findByIdAndDelete(req.params.id);
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });

//     // Delete photo from Cloudinary (optional)
//     if (doctor.photo) {
//       const public_id = doctor.photo.split("/").pop().split(".")[0];
//       await cloudinary.uploader.destroy(`doctors/${public_id}`).catch(() => {});
//     }

//     res.json({ success: true, message: "Doctor deleted" });
//   } catch (err) {
//     console.error("Error deleting doctor:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

import Doctor from "../models/doctors.models.js";
import cloudinary from "../config/cloudinary.js";

// Helper to parse JSON fields
const parseJsonField = (data, field) => {
  if (data[field] && typeof data[field] === "string") {
    try { data[field] = JSON.parse(data[field]); }
    catch { data[field] = []; }
  } else if (!data[field]) { data[field] = []; }
};

// Add doctor
export const addDoctor = async (req,res) => {
  try {
    const data = {...req.body};
    parseJsonField(data,"availableSlots");

    if (req.file){
      const result = await cloudinary.uploader.upload(req.file.path,{ folder:"doctors" });
      data.photo = result.secure_url;
      data.cloudinary_id = result.public_id; // optional for deletion
    }

    const doctor = new Doctor(data);
    await doctor.save();
    res.status(201).json({ success:true, message:"Doctor added", data:doctor });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

// Get all doctors (filter by department)
export const getDoctors = async (req,res) => {
  try {
    const { department } = req.query;
    let query = {};
    if (department) query.department = department;
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

// Get doctor by ID
export const getDoctorById = async (req,res) => {
  try{
    const doctor = await Doctor.findById(req.params.id);
    if(!doctor) return res.status(404).json({ message:"Doctor not found" });
    res.json(doctor);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

// Get unique departments
export const getDepartments = async (req,res) => {
  try{
    const departments = await Doctor.distinct("department");
    res.json(departments);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

// Update doctor
export const updateDoctor = async (req,res) => {
  try{
    const data = {...req.body};
    parseJsonField(data,"availableSlots");

    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path,{ folder:"doctors" });
      data.photo = result.secure_url;
      data.cloudinary_id = result.public_id;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id,data,{ new:true, runValidators:true });
    if(!doctor) return res.status(404).json({ error:"Doctor not found" });
    res.json({ success:true, message:"Doctor updated", data:doctor });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

// Delete doctor
export const deleteDoctor = async (req,res) => {
  try{
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if(!doctor) return res.status(404).json({ error:"Doctor not found" });

    // Delete photo from Cloudinary
    if(doctor.cloudinary_id){
      await cloudinary.uploader.destroy(doctor.cloudinary_id).catch(()=>{});
    }

    res.json({ success:true, message:"Doctor deleted" });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};
