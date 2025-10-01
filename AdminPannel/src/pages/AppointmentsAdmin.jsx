 import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaFilter, FaChevronDown, FaSearch, FaCheckCircle, FaDownload, FaTimes } from "react-icons/fa";
import axios from "axios";
import jsPDF from "jspdf";


const AdminAppointments = () => {
  const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [rescheduling, setRescheduling] = useState(false);

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");
  const [progress, setProgress] = useState(100);

  // Filters
  const [filterName, setFilterName] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterLast24, setFilterLast24] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    last24: 0,
    rescheduled: 0,
  });

  // Helper to load image as base64 from public folder
const loadImageAsBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
};


  // Fetch appointments and calcu
  // late stats
  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/api/appointments");
      setAppointments(data);
      calculateStats(data);
    } catch (err) {
      setError("Failed to fetch appointments");
      console.error(err);
    }
  };

  const calculateStats = (data) => {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    setStats({
      total: data.length,
      last24: data.filter((a) => new Date(a.date) >= last24h).length,
      rescheduled: data.filter((a) => a.status === "rescheduled").length,

     });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Progress bar for success modal
  useEffect(() => {
    let interval;
    if (showSuccessModal) {
      setProgress(100);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setShowSuccessModal(false);
            return 0;
          }
          return prev - 2;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [showSuccessModal]);

  // Reschedule handler
  const handleReschedule = async () => {
    if (!selectedAppointment || !newDate || !newSlot) return;
    setRescheduling(true);
    try {
      await API.put(`/api/appointments/${selectedAppointment._id}/reschedule`, {
        newDate,
        newSlot,
      });

      // Update local state
     const updatedAppointments = appointments.map((a) =>
  a._id === selectedAppointment._id
    ? {
        ...a,
       date: newDate,
slot: newSlot,
status: "rescheduled",
rescheduleInfo: {
  ...(a.rescheduleInfo || {}),
  isRescheduled: true,
},
      }
    : a
);

      setAppointments(updatedAppointments);
      calculateStats(updatedAppointments);

      setShowRescheduleModal(false);
      setNewDate("");
      setNewSlot("");
      setSelectedAppointment(null);
      setRescheduling(false);

      // Show success modal
      setShowSuccessModal(true);
    } catch (err) {
      setError("Failed to reschedule appointment");
      console.error(err);
      setRescheduling(false);
    }
  };

  // Download patient details
//   const downloadPatientDetails = () => {
//     if (!selectedAppointment) return;
    
//     const content = `PATIENT DETAILS\n\n` +
//       `Name: ${selectedAppointment.patientName}\n` +
//       `Email: ${selectedAppointment.email || 'N/A'}\n` +
//       `Phone: ${selectedAppointment.phone || 'N/A'}\n` +
//       `Doctor: ${selectedAppointment.doctor?.name || 'N/A'}\n` +
//       `Department: ${selectedAppointment.department}\n` +
//       `Appointment Date: ${new Date(selectedAppointment.date).toLocaleDateString()}\n` +
//       `Time Slot: ${selectedAppointment.slot}\n` +
// `Status: ${selectedAppointment.rescheduleInfo?.isRescheduled ? 'Rescheduled' : 'Confirmed'}`
    
//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `patient-details-${selectedAppointment.patientName.replace(/\s+/g, '-').toLowerCase()}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

 const downloadPatientDetails = async () => {
  if (!selectedAppointment) return;

  const doc = new jsPDF("p", "mm", "a4");

  try {
    const headerBase64 = await loadImageAsBase64("/header.png");
    const footerBase64 = await loadImageAsBase64("/footer.png");

    // 🔹 Header Image
    doc.addImage(headerBase64, "PNG", 0, 0, 210, 35);

    let y = 50; // top margin for details
    let leftX = 14;
    let rightX = 120;

    // ✅ Professional Font
    doc.setFont("times", "normal");
    doc.setFontSize(12);

    // ===== Row 1 =====
    doc.text(`Patient Name: ${selectedAppointment.patientName}`, leftX, y);
    doc.text(`Date: ${new Date(selectedAppointment.date).toLocaleDateString()}`, rightX, y);
    y += 7;

    // ===== Row 2 =====
    doc.text(`Phone: ${selectedAppointment.phone || "N/A"}`, leftX, y);
    doc.text(`Email: ${selectedAppointment.email || "N/A"}`, rightX, y);
    y += 7;

    // ===== Row 3 =====
    // doc.text(
    //   `Age/Gender: ${selectedAppointment.age || "N/A"} / ${selectedAppointment.gender || "N/A"}`,
    //   leftX,
    //   y
    // );
    doc.text(`Doctor: ${selectedAppointment.doctor?.name || "N/A"}`, rightX, y);
    y += 7;

    // ===== Row 4 =====
    doc.text(`Department: ${selectedAppointment.department}`, leftX, y);
    doc.text(`Slot: ${selectedAppointment.slot}`, rightX, y);
    y += 7;

    // ===== Row 5 =====
    doc.text(
      `Status: ${selectedAppointment.rescheduleInfo?.isRescheduled ? "Rescheduled" : "Confirmed"}`,
      leftX,
      y
    );
    doc.text(
      `Appointment Date: ${new Date(selectedAppointment.date).toLocaleDateString()}`,
      rightX,
      y
    );

    // 🔹 Footer Image
    doc.addImage(footerBase64, "PNG", 0, 270, 210, 25);

    // Save PDF
    doc.save(
      `patient-details-${selectedAppointment.patientName.replace(/\s+/g, "-").toLowerCase()}.pdf`
    );
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};






  // Filtered appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchName = a.patientName.toLowerCase().includes(filterName.toLowerCase());
    const matchDept = filterDept ? a.department === filterDept : true;
    const matchLast24 = filterLast24
      ? new Date(a.date) >= new Date(Date.now() - 24 * 60 * 60 * 1000)
      : true;
    return matchName && matchDept && matchLast24;
  });

  // Unique departments
  const departments = [...new Set(appointments.map((a) => a.department))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Appointment Management</h1>
          <p className="text-gray-600 text-lg">Manage and reschedule patient appointments with ease</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-teal-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Appointments</h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-full shadow-md">
                <FaCalendarAlt className="text-teal-600 text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-gray-400 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Last 24 Hours</h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.last24}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-full shadow-md">
                <FaCalendarAlt className="text-gray-600 text-2xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-orange-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Rescheduled</h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.rescheduled}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-full shadow-md">
                <FaCalendarAlt className="text-orange-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <FaFilter className="text-teal-600" />
              <span>Filters:</span>
            </div>
            
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by patient name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
              />
            </div>
            
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
            >
              <option value="">All Departments</option>
              {departments.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
            
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filterLast24}
                  onChange={(e) => setFilterLast24(e.target.checked)}
                  className="sr-only"
                />
                <div className={`block w-14 h-7 rounded-full ${filterLast24 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${filterLast24 ? 'transform translate-x-7' : ''}`}></div>
              </div>
              <span>Last 24 Hours</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-xl shadow">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Time Slot</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600 cursor-pointer flex items-center"
                      onClick={() => {
                        setSelectedAppointment(app);
                        setShowPatientModal(true);
                      }}
                    >
                      <div className="bg-teal-100 p-3 rounded-full mr-4 shadow-md">
                        <FaUser className="text-teal-600" />
                      </div>
                      <div>
                        <div className="font-medium">{app.patientName}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          View details <FaChevronDown className="ml-1 text-xs" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="font-medium">{new Date(app.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="bg-gray-100 rounded-xl px-3 py-1 inline-block shadow-sm">{app.slot}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="font-medium">{app.doctor?.name || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="bg-gray-100 rounded-xl px-3 py-1 inline-block shadow-sm">{app.department}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
    app.status === "rescheduled"
      ? "bg-orange-100 text-orange-800"
      : app.status === "confirmed"
      ? "bg-teal-100 text-teal-800"
      : app.status === "pending"
      ? "bg-gray-100 text-gray-800"
      : "bg-red-100 text-red-800"
  }`}
>
  {app.status === "pending" ? "Confirmed" : app.status.charAt(0).toUpperCase() + app.status.slice(1)}

 </span>

                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedAppointment(app);
                          setShowRescheduleModal(true);
                        }}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg shadow transition-all duration-300 transform hover:scale-105 ${
                           app.rescheduleInfo?.isRescheduled
  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
  : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"

                         }`}
                      >
                        <FaCalendarAlt className="mr-2" />
                        {rescheduling && selectedAppointment?._id === app._id ? "Processing..." : "Reschedule"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Details Modal */}
        {showPatientModal && selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center z-[11000] backdrop-blur-lg">
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-500 scale-95 animate-scaleIn border border-white border-opacity-30">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaUser className="mr-3" /> Patient Details
                </h2>
                <button 
                  onClick={() => setShowPatientModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-800">{selectedAppointment.patientName}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-800">{selectedAppointment.email || "N/A"}</span>
                  </div>
                 

                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Phone</span>
                    <span className="font-medium text-gray-800">{selectedAppointment.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Doctor</span>
                    <span className="font-medium text-gray-800">{selectedAppointment.doctor?.name || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Department</span>
                    <span className="font-medium text-gray-800">{selectedAppointment.department}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Appointment Date</span>
                    <span className="font-medium text-gray-800">
                      {new Date(selectedAppointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Time Slot</span>
                    <span className="font-medium text-gray-800">{selectedAppointment.slot}</span>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                {/* <button
  onClick={downloadPatientDetails}
  className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-300 flex items-center shadow-md"
>
  <FaDownload className="mr-2" /> Download Details
</button> */}

                  <button
                    onClick={() => setShowPatientModal(false)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center z-[11000] backdrop-blur-lg">
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-500 scale-95 animate-scaleIn border border-white border-opacity-30">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Reschedule Appointment</h2>
                  <p className="text-teal-100 mt-1">For {selectedAppointment.patientName}</p>
                </div>
                <button 
                  onClick={() => setShowRescheduleModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Time Slot</label>
                    <input
                      type="text"
                      placeholder="e.g., 11:00 AM - 11:30 AM"
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setShowRescheduleModal(false)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReschedule}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-medium shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
                  >
                    {rescheduling ? "Rescheduling..." : "Confirm Reschedule"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[11000] backdrop-blur-lg">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-700 animate-scaleIn border border-white border-opacity-30">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white bg-opacity-20 p-5 rounded-full mb-5 animate-pulse">
                  <FaCheckCircle className="text-gray-800 text-5xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800  mb-3">Appointment Rescheduled!</h3>
                <p className="text-teal-100 mb-6">The appointment has been successfully updated with the new details.</p>
                {/* <div className="bg-white bg-opacity-20 rounded-xl p-5 w-full backdrop-blur-sm mb-6">
                  <div className="flex justify-between text-gray-800  mb-3">
                    <span>Patient:</span>
                    <span className="font-medium">{selectedAppointment?.patientName}</span>
                  </div>
                  <div className="flex justify-between text-gray-800 e mb-3">
                    <span>New Date:</span>
                    <span className="font-medium">{newDate}</span>
                  </div>
                  <div className="flex justify-between text-gray-800 ">
                    <span>New Time:</span>
                    <span className="font-medium">{newSlot}</span>
                  </div>
                </div> */}
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-teal-100 text-sm">Closing automatically in {Math.ceil(progress/20)} seconds</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;