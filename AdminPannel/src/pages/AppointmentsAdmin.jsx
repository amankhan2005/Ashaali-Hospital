//  import { useEffect, useState } from "react";
// import API from "../api/axios";
// import {
//   FaCheck,
//   FaSync,
//   FaSearch,
//   FaUserMd,
//   FaCalendarAlt,
//   FaClock,
// } from "react-icons/fa";

// const AppointmentsAdmin = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredAppointments, setFilteredAppointments] = useState([]);

//   // 🔹 Fetch appointments
//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/api/appointments");
//       setAppointments(res.data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch appointments. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   useEffect(() => {
//     const filtered = appointments.filter(
//       (app) =>
//         app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.department.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredAppointments(filtered);
//   }, [appointments, searchTerm]);

//   // 🔹 Approve appointment
//   const handleApprove = async (id) => {
//     try {
//       await API.put(`/api/appointments/${id}/approve`); // ✅ correct route
//       fetchAppointments();
//     } catch (err) {
//       setError("Failed to approve appointment. Please try again.");
//       console.error(err);
//     }
//   };

//   // 🔹 Reject appointment
//   const handleReject = async (id) => {
//     try {
//       await API.put(`/api/appointments/${id}/reject`); // ✅ correct route
//       fetchAppointments();
//     } catch (err) {
//       setError("Failed to reject appointment. Please try again.");
//       console.error(err);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//             Appointment Management
//           </h1>
//           <p className="text-gray-600">
//             Manage and approve/reject patient appointments
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-blue-100 p-3 rounded-lg mr-4">
//               <FaCalendarAlt className="text-blue-600 text-xl" />
//             </div>
//             <div>
//               <p className="text-gray-500">Total Appointments</p>
//               <p className="text-2xl font-bold">{appointments.length}</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-yellow-100 p-3 rounded-lg mr-4">
//               <FaClock className="text-yellow-600 text-xl" />
//             </div>
//             <div>
//               <p className="text-gray-500">Pending</p>
//               <p className="text-2xl font-bold">
//                 {appointments.filter((app) => app.status === "pending").length}
//               </p>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-green-100 p-3 rounded-lg mr-4">
//               <FaCheck className="text-green-600 text-xl" />
//             </div>
//             <div>
//               <p className="text-gray-500">Approved</p>
//               <p className="text-2xl font-bold">
//                 {
//                   appointments.filter((app) => app.status === "approved")
//                     .length
//                 }
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="relative w-full md:w-1/3">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search appointments..."
//               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={fetchAppointments}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
//           >
//             <FaSync /> Refresh Data
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         )}

//         {/* Appointments Table */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Patient
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Doctor
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Department
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date & Time
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-8 text-center">
//                       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//                       <p className="mt-4 text-gray-600">
//                         Loading appointments...
//                       </p>
//                     </td>
//                   </tr>
//                 ) : filteredAppointments.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
//                       No appointments found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAppointments.map((app) => (
//                     <tr
//                       key={app._id}
//                       className="hover:bg-gray-50 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
//                             <span className="text-blue-800 font-medium">
//                               {app.patientName.charAt(0)}
//                             </span>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {app.patientName}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{app.email}</div>
//                         <div className="text-sm text-gray-500">{app.phone}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <FaUserMd className="text-gray-400 mr-2" />
//                           <div className="text-sm text-gray-900">
//                             {app.doctor?.name || "N/A"}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {app.department}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {new Date(app.date).toLocaleDateString()}
//                         </div>
//                         <div className="text-sm text-gray-500 flex items-center">
//                           <FaClock className="mr-1 text-gray-400" /> {app.time}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                             app.status
//                           )}`}
//                         >
//                           {app.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
//                         {app.status === "pending" && (
//                           <>
//                             <button
//                               onClick={() => handleApprove(app._id)}
//                               className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition duration-300"
//                             >
//                               <FaCheck className="mr-1" /> Approve
//                             </button>
//                             <button
//                               onClick={() => handleReject(app._id)}
//                               className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-md transition duration-300"
//                             >
//                               Reject
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentsAdmin;

// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import {
//   FaCheck,
//   FaSync,
//   FaSearch,
//   FaUserMd,
//   FaCalendarAlt,
//   FaClock,
//   FaEnvelope,
//   FaPhone,
//   FaHospital,
//   FaUser,
//   FaTimes,
//   FaQuestion
// } from "react-icons/fa";

// const AppointmentsAdmin = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredAppointments, setFilteredAppointments] = useState([]);

//   // 🔹 Fetch appointments
//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/api/appointments");
//       setAppointments(res.data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch appointments. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   useEffect(() => {
//     const filtered = appointments.filter(
//       (app) =>
//         app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.department.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredAppointments(filtered);
//   }, [appointments, searchTerm]);

//   // 🔹 Approve appointment
//   const handleApprove = async (id) => {
//     try {
//       await API.put(`/api/appointments/${id}/approve`);
//       fetchAppointments();
//     } catch (err) {
//       setError("Failed to approve appointment. Please try again.");
//       console.error(err);
//     }
//   };

//   // 🔹 Reject appointment
//   const handleReject = async (id) => {
//     try {
//       await API.put(`/api/appointments/${id}/reject`);
//       fetchAppointments();
//     } catch (err) {
//       setError("Failed to reject appointment. Please try again.");
//       console.error(err);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
//       case "pending":
//         return "bg-gradient-to-r from-yellow-500 to-amber-600 text-white";
//       case "rejected":
//         return "bg-gradient-to-r from-red-500 to-rose-600 text-white";
//       default:
//         return "bg-gradient-to-r from-gray-500 to-slate-600 text-white";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "approved":
//         return <FaCheck className="mr-1" />;
//       case "pending":
//         return <FaClock className="mr-1" />;
//       case "rejected":
//         return <FaTimes className="mr-1" />;
//       default:
//         return <FaQuestion className="mr-1" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-4 shadow-xl">
//             <FaCalendarAlt className="text-white text-3xl" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Appointment Management
//           </h1>
//           <p className="text-lg text-teal-200 max-w-2xl mx-auto">
//             Manage and approve/reject patient appointments
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-teal-500/20">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl mr-4 shadow-lg">
//                 <FaCalendarAlt className="text-white text-2xl" />
//               </div>
//               <div>
//                 <p className="text-teal-200">Total Appointments</p>
//                 <p className="text-3xl font-bold text-white">{appointments.length}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-teal-500/20">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-4 rounded-xl mr-4 shadow-lg">
//                 <FaClock className="text-white text-2xl" />
//               </div>
//               <div>
//                 <p className="text-teal-200">Pending</p>
//                 <p className="text-3xl font-bold text-white">
//                   {appointments.filter((app) => app.status === "pending").length}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-teal-500/20">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl mr-4 shadow-lg">
//                 <FaCheck className="text-white text-2xl" />
//               </div>
//               <div>
//                 <p className="text-teal-200">Approved</p>
//                 <p className="text-3xl font-bold text-white">
//                   {appointments.filter((app) => app.status === "approved").length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-teal-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="relative w-full md:w-1/3">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaSearch className="text-teal-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search appointments..."
//               className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={fetchAppointments}
//             className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
//           >
//             <FaSync /> Refresh Data
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-gradient-to-r from-red-900/40 to-rose-900/40 backdrop-blur-sm border-l-4 border-red-500 p-4 mb-6 rounded-xl shadow-xl">
//             <p className="text-sm text-red-200">{error}</p>
//           </div>
//         )}

//         {/* Appointments Table */}
//         <div className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-teal-500/20">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-700">
//               <thead className="bg-slate-800/50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
//                     Patient
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
//                     Doctor
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
//                     Department
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
//                     Date & Time
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-teal-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-slate-800/30 divide-y divide-slate-700">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
//                       <p className="mt-4 text-slate-300">Loading appointments...</p>
//                     </td>
//                   </tr>
//                 ) : filteredAppointments.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
//                       No appointments found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAppointments.map((app) => (
//                     <tr
//                       key={app._id}
//                       className="hover:bg-slate-700/30 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow">
//                             <span className="text-white font-bold">
//                               {app.patientName.charAt(0)}
//                             </span>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-white">
//                               {app.patientName}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-white flex items-center">
//                           <FaEnvelope className="text-teal-400 mr-2" />
//                           {app.email}
//                         </div>
//                         <div className="text-sm text-slate-300 flex items-center mt-1">
//                           <FaPhone className="text-teal-400 mr-2" />
//                           {app.phone}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg mr-3">
//                             <FaUserMd className="text-white" />
//                           </div>
//                           <div className="text-sm text-white">
//                             {app.doctor?.name || "N/A"}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg mr-3">
//                             <FaHospital className="text-white" />
//                           </div>
//                           <div className="text-sm text-white">
//                             {app.department}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-white">
//                           {new Date(app.date).toLocaleDateString()}
//                         </div>
//                         <div className="text-sm text-slate-300 flex items-center">
//                           <FaClock className="text-teal-400 mr-1" /> {app.time}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                             app.status
//                           )}`}
//                         >
//                           {getStatusIcon(app.status)}
//                           {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
//                         {app.status === "pending" && (
//                           <>
//                             <button
//                               onClick={() => handleApprove(app._id)}
//                               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition duration-300 shadow"
//                             >
//                               <FaCheck className="mr-1" /> Approve
//                             </button>
//                             <button
//                               onClick={() => handleReject(app._id)}
//                               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm font-medium rounded-lg transition duration-300 shadow"
//                             >
//                               Reject
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentsAdmin;

import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  FaCheck,
  FaSync,
  FaSearch,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaHospital,
  FaUser,
  FaTimes,
  FaQuestion
} from "react-icons/fa";

const AppointmentsAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // 🔹 Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/appointments");
      setAppointments(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter(
      (app) =>
        app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [appointments, searchTerm]);

  // 🔹 Approve appointment
  const handleApprove = async (id) => {
    try {
      await API.put(`/api/appointments/${id}/approve`);
      fetchAppointments();
    } catch (err) {
      setError("Failed to approve appointment. Please try again.");
      console.error(err);
    }
  };

  // 🔹 Reject appointment
  const handleReject = async (id) => {
    try {
      await API.put(`/api/appointments/${id}/reject`);
      fetchAppointments();
    } catch (err) {
      setError("Failed to reject appointment. Please try again.");
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
      case "pending":
        return "bg-gradient-to-r from-yellow-500 to-amber-600 text-white";
      case "rejected":
        return "bg-gradient-to-r from-red-500 to-rose-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-600 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheck className="mr-1" />;
      case "pending":
        return <FaClock className="mr-1" />;
      case "rejected":
        return <FaTimes className="mr-1" />;
      default:
        return <FaQuestion className="mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-4 shadow-xl">
            <FaCalendarAlt className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Appointment Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and approve/reject patient appointments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl mr-4 shadow-md">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <div>
                <p className="text-gray-500">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-800">{appointments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-4 rounded-xl mr-4 shadow-md">
                <FaClock className="text-white text-2xl" />
              </div>
              <div>
                <p className="text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-gray-800">
                  {appointments.filter((app) => app.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl mr-4 shadow-md">
                <FaCheck className="text-white text-2xl" />
              </div>
              <div>
                <p className="text-gray-500">Approved</p>
                <p className="text-3xl font-bold text-gray-800">
                  {appointments.filter((app) => app.status === "approved").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-teal-500" />
            </div>
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchAppointments}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
          >
            <FaSync /> Refresh Data
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                      <p className="mt-4 text-gray-500">Loading appointments...</p>
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow">
                            <span className="text-white font-bold">
                              {app.patientName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-800">
                              {app.patientName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800 flex items-center">
                          <FaEnvelope className="text-teal-500 mr-2" />
                          {app.email}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <FaPhone className="text-teal-500 mr-2" />
                          {app.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg mr-3">
                            <FaUserMd className="text-white" />
                          </div>
                          <div className="text-sm text-gray-800">
                            {app.doctor?.name || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg mr-3">
                            <FaHospital className="text-white" />
                          </div>
                          <div className="text-sm text-gray-800">
                            {app.department}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">
                          {new Date(app.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <FaClock className="text-teal-500 mr-1" /> {app.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusIcon(app.status)}
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(app._id)}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition duration-300 shadow"
                            >
                              <FaCheck className="mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(app._id)}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm font-medium rounded-lg transition duration-300 shadow"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsAdmin;