//  // src/pages/DoctorsAdmin.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3000/api/doctors";

// const DoctorsAdmin = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     department: "",
//     specialty: "",
//     availableSlots: [],
//     photo: null,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDataLoading, setIsDataLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch doctors
//   const fetchDoctors = async () => {
//     try {
//       setIsDataLoading(true);
//       const res = await axios.get(API_URL);
//       setDoctors(res.data);
//     } catch (err) {
//       console.error("Error fetching doctors:", err);
//       setError("Failed to load doctors data. Please try again.");
//     } finally {
//       setIsDataLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   // Validate slots
//   const validateSlots = (slots) => {
//     for (const slot of slots) {
//       if (!slot.day || !slot.startTime || !slot.endTime) {
//         return "Please fill in all slot details (day, start time, end time).";
//       }
//       if (slot.startTime >= slot.endTime) {
//         return "End time must be after start time.";
//       }
//     }
//     return null;
//   };

//   // Form handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setForm({ ...form, photo: e.target.files[0] });
//   };

//   const handleSlotChange = (index, field, value) => {
//     const updatedSlots = [...form.availableSlots];
//     updatedSlots[index][field] = value;
//     setForm({ ...form, availableSlots: updatedSlots });
//   };

//   const addSlot = () => {
//     setForm({
//       ...form,
//       availableSlots: [
//         ...form.availableSlots,
//         { day: "", startTime: "", endTime: "" },
//       ],
//     });
//   };

//   const removeSlot = (index) => {
//     const updatedSlots = [...form.availableSlots];
//     updatedSlots.splice(index, 1);
//     setForm({ ...form, availableSlots: updatedSlots });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const slotError = validateSlots(form.availableSlots);
//     if (slotError) {
//       setError(slotError);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("department", form.department);
//       formData.append("specialty", form.specialty);
//       formData.append("availableSlots", JSON.stringify(form.availableSlots));
//       if (form.photo) formData.append("photo", form.photo);

//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         setEditingId(null);
//       } else {
//         await axios.post(API_URL, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setForm({
//         name: "",
//         department: "",
//         specialty: "",
//         availableSlots: [],
//         photo: null,
//       });
//       fetchDoctors();
//     } catch (err) {
//       console.error("Error saving doctor:", err);
//       setError("Error saving doctor. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Edit doctor
//   const handleEdit = (doctor) => {
//     setEditingId(doctor._id);
//     setForm({
//       name: doctor.name,
//       department: doctor.department,
//       specialty: doctor.specialty,
//       availableSlots: doctor.availableSlots || [],
//       photo: null,
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Delete doctor
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this doctor?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchDoctors();
//     } catch (err) {
//       console.error("Error deleting doctor:", err);
//       setError("Error deleting doctor. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Doctors Admin Panel
//           </h1>
//           <p className="text-gray-600">
//             Manage doctors, their specialties, and availability
//           </p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Doctor Form */}
//         <div className="bg-white shadow rounded-lg p-6 mb-10">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             {editingId ? "Edit Doctor" : "Add New Doctor"}
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Doctor Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter doctor's full name"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Department
//                 </label>
//                 <input
//                   type="text"
//                   name="department"
//                   value={form.department}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter department"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Specialty
//                 </label>
//                 <input
//                   type="text"
//                   name="specialty"
//                   value={form.specialty}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter specialty"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Doctor Photo
//                 </label>
//                 <input
//                   type="file"
//                   name="photo"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>

//             {/* Slots */}
//             <div className="mt-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium text-gray-800">
//                   Available Slots
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={addSlot}
//                   className="px-3 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   + Add Slot
//                 </button>
//               </div>

//               {form.availableSlots.length > 0 ? (
//                 <div className="space-y-4">
//                   {form.availableSlots.map((slot, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-md"
//                     >
//                       <input
//                         type="text"
//                         placeholder="Day (e.g. Monday)"
//                         value={slot.day}
//                         onChange={(e) =>
//                           handleSlotChange(index, "day", e.target.value)
//                         }
//                         className="px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                       <input
//                         type="time"
//                         value={slot.startTime}
//                         onChange={(e) =>
//                           handleSlotChange(index, "startTime", e.target.value)
//                         }
//                         className="px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                       <input
//                         type="time"
//                         value={slot.endTime}
//                         onChange={(e) =>
//                           handleSlotChange(index, "endTime", e.target.value)
//                         }
//                         className="px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeSlot(index)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-6 bg-gray-50 rounded-md text-gray-500">
//                   No slots added yet. Click "Add Slot".
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-md"
//               >
//                 {isLoading
//                   ? "Saving..."
//                   : editingId
//                   ? "Update Doctor"
//                   : "Add Doctor"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Doctors List */}
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             All Doctors
//           </h2>

//           {isDataLoading ? (
//             <p className="text-gray-500">Loading doctors...</p>
//           ) : doctors.length === 0 ? (
//             <p className="text-gray-500">No doctors found.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {doctors.map((doctor) => (
//                 <div
//                   key={doctor._id}
//                   className="border rounded-lg p-4 shadow-sm bg-gray-50"
//                 >
//                   {doctor.photo && (
//                     <img
//                       src={doctor.photo}
//                       alt={doctor.name}
//                       className="w-full h-40 object-cover rounded mb-3"
//                     />
//                   )}
//                   <h3 className="text-lg font-bold text-gray-900">
//                     {doctor.name}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {doctor.department} • {doctor.specialty}
//                   </p>
//                   <div className="mt-2 text-sm text-gray-700">
//                     {doctor.availableSlots?.length > 0 ? (
//                       <ul className="list-disc list-inside space-y-1">
//                         {doctor.availableSlots.map((slot, idx) => (
//                           <li key={idx}>
//                             {slot.day}: {slot.startTime} - {slot.endTime}
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <span className="text-gray-400">No slots</span>
//                     )}
//                   </div>
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={() => handleEdit(doctor)}
//                       className="flex-1 px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(doctor._id)}
//                       className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorsAdmin;


// src/pages/DoctorsAdmin.jsx
 // src/pages/DoctorsAdmin.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaUserMd, FaEdit, FaTrash, FaPlus, FaTimes, FaClock, FaHospital, FaStethoscope, FaImage, FaCalendarCheck, FaUserTie } from "react-icons/fa";

// const API_URL = "https://ashaali-hospital-2.onrender.com/api/doctors";

// const DoctorsAdmin = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     department: "",
//     specialty: "",
//     availableSlots: [],
//     photo: null,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDataLoading, setIsDataLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch doctors
//   const fetchDoctors = async () => {
//     try {
//       setIsDataLoading(true);
//       const res = await axios.get(API_URL);
//       setDoctors(res.data);
//     } catch (err) {
//       console.error("Error fetching doctors:", err);
//       setError("Failed to load doctors data. Please try again.");
//     } finally {
//       setIsDataLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   // Validate slots
//   const validateSlots = (slots) => {
//     for (const slot of slots) {
//       if (!slot.day || !slot.startTime || !slot.endTime) {
//         return "Please fill in all slot details (day, start time, end time).";
//       }
//       if (slot.startTime >= slot.endTime) {
//         return "End time must be after start time.";
//       }
//     }
//     return null;
//   };

//   // Form handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setForm({ ...form, photo: e.target.files[0] });
//   };

//   const handleSlotChange = (index, field, value) => {
//     const updatedSlots = [...form.availableSlots];
//     updatedSlots[index][field] = value;
//     setForm({ ...form, availableSlots: updatedSlots });
//   };

//   const addSlot = () => {
//     setForm({
//       ...form,
//       availableSlots: [
//         ...form.availableSlots,
//         { day: "", startTime: "", endTime: "" },
//       ],
//     });
//   };

//   const removeSlot = (index) => {
//     const updatedSlots = [...form.availableSlots];
//     updatedSlots.splice(index, 1);
//     setForm({ ...form, availableSlots: updatedSlots });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const slotError = validateSlots(form.availableSlots);
//     if (slotError) {
//       setError(slotError);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("department", form.department);
//       formData.append("specialty", form.specialty);
//       formData.append("availableSlots", JSON.stringify(form.availableSlots));
//       if (form.photo) formData.append("photo", form.photo);

//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         setEditingId(null);
//       } else {
//         await axios.post(API_URL, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setForm({
//         name: "",
//         department: "",
//         specialty: "",
//         availableSlots: [],
//         photo: null,
//       });
//       fetchDoctors();
//     } catch (err) {
//       console.error("Error saving doctor:", err);
//       setError("Error saving doctor. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Edit doctor
//   const handleEdit = (doctor) => {
//     setEditingId(doctor._id);
//     setForm({
//       name: doctor.name,
//       department: doctor.department,
//       specialty: doctor.specialty,
//       availableSlots: doctor.availableSlots || [],
//       photo: null,
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Delete doctor
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this doctor?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchDoctors();
//     } catch (err) {
//       console.error("Error deleting doctor:", err);
//       setError("Error deleting doctor. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 via-cyan-600 to-teal-700 rounded-full mb-4 shadow-2xl">
//             <FaUserMd className="text-white text-3xl" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
//             Doctors Management
//           </h1>
//           <p className="text-lg md:text-xl text-teal-200 max-w-2xl mx-auto">
//             Manage doctors, their specialties, and availability schedules
//           </p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-6 bg-gradient-to-r from-red-900/40 to-rose-900/40 backdrop-blur-sm border-l-4 border-red-500 p-4 text-red-200 rounded-xl shadow-xl">
//             <div className="flex items-center">
//               <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               {error}
//             </div>
//           </div>
//         )}

//         {/* Doctor Form */}
//         <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 mb-10 border border-teal-500/20">
//           <div className="flex items-center mb-6">
//             <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-4"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-white">
//               {editingId ? "Edit Doctor" : "Add New Doctor"}
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-teal-200 mb-1">
//                   Doctor Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaUserMd className="text-teal-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter doctor's full name"
//                     className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-teal-200 mb-1">
//                   Department
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaHospital className="text-teal-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="department"
//                     value={form.department}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter department"
//                     className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-teal-200 mb-1">
//                   Specialty
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaStethoscope className="text-teal-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="specialty"
//                     value={form.specialty}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter specialty"
//                     className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-teal-200 mb-1">
//                   Doctor Photo
//                 </label>
//                 <div className="flex items-center justify-center w-full">
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-slate-700/50 hover:bg-slate-700/70 transition">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <FaImage className="w-8 h-8 mb-2 text-teal-400" />
//                       <p className="text-sm text-slate-400">
//                         <span className="font-semibold text-teal-300">Click to upload</span> or drag and drop
//                       </p>
//                     </div>
//                     <input
//                       type="file"
//                       name="photo"
//                       onChange={handleFileChange}
//                       accept="image/*"
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Slots */}
//             <div className="mt-6">
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
//                 <h3 className="text-lg font-medium text-white flex items-center mb-2 sm:mb-0">
//                   <FaClock className="text-teal-400 mr-2" />
//                   Available Slots
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={addSlot}
//                   className="px-4 py-2 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition flex items-center justify-center shadow-lg"
//                 >
//                   <FaPlus className="mr-1" /> Add Slot
//                 </button>
//               </div>

//               {form.availableSlots.length > 0 ? (
//                 <div className="space-y-4">
//                   {form.availableSlots.map((slot, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gradient-to-r from-slate-700/30 to-slate-800/30 p-4 rounded-xl border border-teal-500/20 backdrop-blur-sm"
//                     >
//                       <input
//                         type="text"
//                         placeholder="Day (e.g. Monday)"
//                         value={slot.day}
//                         onChange={(e) =>
//                           handleSlotChange(index, "day", e.target.value)
//                         }
//                         className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                       />
//                       <input
//                         type="time"
//                         value={slot.startTime}
//                         onChange={(e) =>
//                           handleSlotChange(index, "startTime", e.target.value)
//                         }
//                         className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white"
//                       />
//                       <input
//                         type="time"
//                         value={slot.endTime}
//                         onChange={(e) =>
//                           handleSlotChange(index, "endTime", e.target.value)
//                         }
//                         className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeSlot(index)}
//                         className="flex items-center justify-center px-4 py-2 bg-red-900/30 text-red-300 rounded-xl hover:bg-red-900/50 transition"
//                       >
//                         <FaTimes />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl border-2 border-dashed border-teal-500/20 text-slate-400 backdrop-blur-sm">
//                   No slots added yet. Click "Add Slot".
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition flex items-center shadow-lg"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Saving...
//                   </>
//                 ) : editingId ? (
//                   "Update Doctor"
//                 ) : (
//                   "Add Doctor"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Doctors List */}
//         <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-teal-500/20">
//           <div className="flex items-center mb-6">
//             <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-4"></div>
//             <h2 className="text-2xl md:text-3xl font-bold text-white">
//               All Doctors
//             </h2>
//           </div>

//           {isDataLoading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//             </div>
//           ) : doctors.length === 0 ? (
//             <div className="text-center py-12 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl border-2 border-dashed border-teal-500/20">
//               <FaUserMd className="mx-auto text-4xl text-teal-400 mb-3" />
//               <p className="text-lg text-slate-300">No doctors found.</p>
//               <p className="text-slate-400 mt-1">Add your first doctor using the form above.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {doctors.map((doctor) => (
//                 <div
//                   key={doctor._id}
//                   className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl shadow-xl overflow-hidden border border-teal-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm group"
//                 >
//                   <div className="p-5">
//                     <div className="flex items-center mb-4">
//                       <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 rounded-full mr-4 shadow-lg">
//                         <FaUserMd className="text-white text-xl" />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-white">
//                           {doctor.name}
//                         </h3>
//                         <p className="text-sm text-teal-200">
//                           {doctor.department}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="mb-4">
//                       <span className="inline-block bg-gradient-to-r from-teal-900/50 to-cyan-900/50 text-teal-300 text-xs px-3 py-1.5 rounded-full font-medium border border-teal-500/30">
//                         {doctor.specialty}
//                       </span>
//                     </div>

//                     {doctor.photo && (
//                       <div className="mb-4 overflow-hidden rounded-xl">
//                         <img
//                           src={doctor.photo}
//                           alt={doctor.name}
//                           className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     )}

//                     <div className="mb-4">
//                       <h4 className="text-sm font-medium text-teal-200 mb-2 flex items-center">
//                         <FaCalendarCheck className="text-teal-400 mr-1" /> Available Slots:
//                       </h4>
//                       {doctor.availableSlots?.length > 0 ? (
//                         <ul className="space-y-1">
//                           {doctor.availableSlots.map((slot, idx) => (
//                             <li key={idx} className="text-sm text-slate-300 bg-slate-700/30 px-3 py-1.5 rounded-lg border border-slate-600/50">
//                               <span className="font-medium text-teal-300">{slot.day}:</span> {slot.startTime} - {slot.endTime}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <span className="text-slate-500 text-sm italic">No slots available</span>
//                       )}
//                     </div>
                    
//                     <div className="flex gap-2 mt-4">
//                       <button
//                         onClick={() => handleEdit(doctor)}
//                         className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 text-white rounded-xl font-medium hover:from-yellow-700 hover:to-amber-800 transition flex items-center justify-center shadow-lg"
//                       >
//                         <FaEdit className="mr-1" /> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(doctor._id)}
//                         className="flex-1 px-4 py-2 bg-gradient-to-r from-red-700 to-rose-800 text-white rounded-xl font-medium hover:from-red-800 hover:to-rose-900 transition flex items-center justify-center shadow-lg"
//                       >
//                         <FaTrash className="mr-1" /> Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorsAdmin;

// src/pages/DoctorsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserMd, FaEdit, FaTrash, FaPlus, FaTimes, FaClock, FaHospital, FaStethoscope, FaImage, FaCalendarCheck } from "react-icons/fa";

const API_URL = "https://ashaali-hospital-2.onrender.com/api/doctors";

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    specialty: "",
    availableSlots: [],
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      setIsDataLoading(true);
      const res = await axios.get(API_URL);
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors data. Please try again.");
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Validate slots
  const validateSlots = (slots) => {
    for (const slot of slots) {
      if (!slot.day || !slot.startTime || !slot.endTime) {
        return "Please fill in all slot details (day, start time, end time).";
      }
      if (slot.startTime >= slot.endTime) {
        return "End time must be after start time.";
      }
    }
    return null;
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...form.availableSlots];
    updatedSlots[index][field] = value;
    setForm({ ...form, availableSlots: updatedSlots });
  };

  const addSlot = () => {
    setForm({
      ...form,
      availableSlots: [
        ...form.availableSlots,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  const removeSlot = (index) => {
    const updatedSlots = [...form.availableSlots];
    updatedSlots.splice(index, 1);
    setForm({ ...form, availableSlots: updatedSlots });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const slotError = validateSlots(form.availableSlots);
    if (slotError) {
      setError(slotError);
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("department", form.department);
      formData.append("specialty", form.specialty);
      formData.append("availableSlots", JSON.stringify(form.availableSlots));
      if (form.photo) formData.append("photo", form.photo);

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        name: "",
        department: "",
        specialty: "",
        availableSlots: [],
        photo: null,
      });
      fetchDoctors();
    } catch (err) {
      console.error("Error saving doctor:", err);
      setError("Error saving doctor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit doctor
  const handleEdit = (doctor) => {
    setEditingId(doctor._id);
    setForm({
      name: doctor.name,
      department: doctor.department,
      specialty: doctor.specialty,
      availableSlots: doctor.availableSlots || [],
      photo: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this doctor?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor:", err);
      setError("Error deleting doctor. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-teal-500 rounded-full mb-4 shadow-lg">
            <FaUserMd className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Doctors Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage doctors, their specialties, and availability schedules
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded-lg shadow-sm">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Doctor Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-6 mb-10 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="h-1 w-12 bg-teal-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? "Edit Doctor" : "Add New Doctor"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserMd className="text-teal-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter doctor's full name"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHospital className="text-teal-500" />
                  </div>
                  <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                    placeholder="Enter department"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaStethoscope className="text-teal-500" />
                  </div>
                  <input
                    type="text"
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    required
                    placeholder="Enter specialty"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Photo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-8 h-8 mb-2 text-teal-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Slots */}
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 flex items-center mb-2 sm:mb-0">
                  <FaClock className="text-teal-500 mr-2" />
                  Available Slots
                </h3>
                <button
                  type="button"
                  onClick={addSlot}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-teal-500 hover:bg-teal-600 transition flex items-center justify-center shadow-md"
                >
                  <FaPlus className="mr-1" /> Add Slot
                </button>
              </div>

              {form.availableSlots.length > 0 ? (
                <div className="space-y-4">
                  {form.availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <input
                        type="text"
                        placeholder="Day (e.g. Monday)"
                        value={slot.day}
                        onChange={(e) =>
                          handleSlotChange(index, "day", e.target.value)
                        }
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
                      />
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          handleSlotChange(index, "startTime", e.target.value)
                        }
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800"
                      />
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) =>
                          handleSlotChange(index, "endTime", e.target.value)
                        }
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800"
                      />
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
                  No slots added yet. Click "Add Slot".
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition flex items-center shadow-md"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : editingId ? (
                  "Update Doctor"
                ) : (
                  "Add Doctor"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Doctors List */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-4 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="h-1 w-12 bg-teal-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              All Doctors
            </h2>
          </div>

          {isDataLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12   border-teal-500"></div>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <FaUserMd className="mx-auto text-4xl text-teal-500 mb-3" />
              <p className="text-lg text-gray-700">No doctors found.</p>
              <p className="text-gray-500 mt-1">Add your first doctor using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="bg-teal-500 p-3 rounded-full mr-4 shadow-md">
                        <FaUserMd className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-teal-600">
                          {doctor.department}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-teal-100 text-teal-800 text-xs px-3 py-1.5 rounded-full font-medium">
                        {doctor.specialty}
                      </span>
                    </div>

                    {doctor.photo && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={doctor.photo}
                          alt={doctor.name}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaCalendarCheck className="text-teal-500 mr-1" /> Available Slots:
                      </h4>
                      {doctor.availableSlots?.length > 0 ? (
                        <ul className="space-y-1">
                          {doctor.availableSlots.map((slot, idx) => (
                            <li key={idx} className="text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
                              <span className="font-medium text-teal-700">{slot.day}:</span> {slot.startTime} - {slot.endTime}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500 text-sm italic">No slots available</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(doctor)}
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition flex items-center justify-center shadow-sm"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center shadow-sm"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsAdmin;