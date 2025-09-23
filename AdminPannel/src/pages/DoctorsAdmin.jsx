 import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { 
  FaUserMd, FaEdit, FaTrash, FaPlus, FaTimes, FaClock, FaHospital, 
  FaStethoscope, FaImage, FaCalendarCheck, FaSearch, FaFilter, FaChartBar,
  FaUsers, FaBuilding, FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaChevronDown, FaChevronUp, FaIdCard, FaTimesCircle, FaCheck
} from "react-icons/fa";

const API_URL = `${import.meta.env.VITE_API_URL}/api/doctors`;
const DEPARTMENTS_API_URL = `${import.meta.env.VITE_API_URL}/api/departments`;

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [showDepartmentStats, setShowDepartmentStats] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  
  // Create a ref for the doctor form section
  const doctorFormRef = useRef(null);

  // Days of the week for dropdown
  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

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

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(DEPARTMENTS_API_URL);
      setAllDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to load departments data. Please try again.");
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  // Calculate statistics
  const totalDoctors = doctors.length;
  const departments = [...new Set(doctors.map(doctor => doctor.department))];
  const totalDepartments = departments.length;
  const departmentStats = departments.map(dept => ({
    name: dept,
    count: doctors.filter(doc => doc.department === dept).length
  }));

  // Filter doctors based on search and department
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "All" || doctor.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

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
    
    // Scroll to the doctor form
    setTimeout(() => {
      if (doctorFormRef.current) {
        doctorFormRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  // Delete doctor
  const confirmDelete = (doctor) => {
    setDoctorToDelete(doctor);
    setShowDeleteAlert(true);
  };

  const handleDelete = async () => {
    if (!doctorToDelete) return;
    try {
      await axios.delete(`${API_URL}/${doctorToDelete._id}`);
      fetchDoctors();
      setShowDeleteAlert(false);
      setDoctorToDelete(null);
    } catch (err) {
      console.error("Error deleting doctor:", err);
      setError("Error deleting doctor. Please try again.");
      setShowDeleteAlert(false);
      setDoctorToDelete(null);
    }
  };

  // Open doctor details modal
  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-4 shadow-lg">
            <FaUserMd className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-700 mb-2">
            Doctors Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage doctors, their specialties, and availability schedules
          </p>
        </div>

        {/* Modern Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Doctors Card */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white transform transition-transform hover:scale-105">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-teal-100 text-lg font-medium">Total Doctors</p>
                <p className="text-4xl font-bold mt-2">{totalDoctors}</p>
              </div>
              <div className="bg-teal-400/30 p-4 rounded-full">
                <FaUsers className="text-3xl" />
              </div>
            </div>
            <div className="mt-4 h-2 w-full bg-teal-400/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${Math.min(100, totalDoctors * 10)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Total Departments Card */}
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white transform transition-transform hover:scale-105">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-100 text-lg font-medium">Departments</p>
                <p className="text-4xl font-bold mt-2">{totalDepartments}</p>
              </div>
              <div className="bg-cyan-400/30 p-4 rounded-full">
                <FaBuilding className="text-3xl" />
              </div>
            </div>
            <div className="mt-4 h-2 w-full bg-cyan-400/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${Math.min(100, totalDepartments * 20)}%` }}
              ></div>
            </div>
          </div>

          {/* Average Doctors per Department Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform transition-transform hover:scale-105">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-lg font-medium">Avg. per Dept</p>
                <p className="text-4xl font-bold mt-2">
                  {totalDepartments ? Math.round(totalDoctors / totalDepartments) : 0}
                </p>
              </div>
              <div className="bg-green-400/30 p-4 rounded-full">
                <FaChartBar className="text-3xl" />
              </div>
            </div>
            <div className="mt-4 h-2 w-full bg-green-400/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${Math.min(100, (totalDoctors / totalDepartments || 0) * 20)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded-lg shadow-sm flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTimesCircle />
            </button>
          </div>
        )}

        {/* Doctor Form */}
        <div ref={doctorFormRef} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 md:p-8 mb-10 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? "Edit Doctor" : "Add New Doctor"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHospital className="text-teal-500" />
                  </div>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 shadow-sm"
                  >
                    <option value="">-- Select Department --</option>
                    {allDepartments.map((dept) => (
                      <option key={dept._id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Photo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition shadow-sm">
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
                  className="px-4 py-2 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition flex items-center justify-center shadow-md"
                >
                  <FaPlus className="mr-1" /> Add Slot
                </button>
              </div>

              {form.availableSlots.length > 0 ? (
                <div className="space-y-4">
                  {form.availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
                    >
                      <div className="relative">
                        <select
                          value={slot.day}
                          onChange={(e) =>
                            handleSlotChange(index, "day", e.target.value)
                          }
                          className="w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 appearance-none shadow-sm"
                        >
                          <option value="">Select Day</option>
                          {daysOfWeek.map((day) => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <FaChevronDown className="text-gray-400" />
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaClock className="text-teal-500" />
                        </div>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) =>
                            handleSlotChange(index, "startTime", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 shadow-sm"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaClock className="text-teal-500" />
                        </div>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) =>
                            handleSlotChange(index, "endTime", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 shadow-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
                  No slots added yet. Click "Add Slot".
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition flex items-center shadow-lg"
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
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 md:p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                All Doctors
              </h2>
              <span className="ml-4 bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                {filteredDoctors.length} found
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 w-full shadow-sm"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 w-full shadow-sm"
                >
                  <option value="All">All Departments</option>
                  {allDepartments.map((dept) => (
                    <option key={dept._id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isDataLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <FaUserMd className="mx-auto text-4xl text-teal-500 mb-3" />
              <p className="text-lg text-gray-700">No doctors found.</p>
              <p className="text-gray-500 mt-1">Add your first doctor using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full cursor-pointer"
                  onClick={() => openDoctorModal(doctor)}
                >
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full mr-4 shadow-md flex-shrink-0">
                        {doctor.photo ? (
                          <img 
                            src={doctor.photo} 
                            alt={doctor.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <FaUserMd className="text-white text-xl" />
                        )}
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
                      <span className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs px-3 py-1.5 rounded-full font-medium">
                        {doctor.specialty}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <FaIdCard className="text-teal-500 mr-2" />
                      <span>ID: {doctor._id.substring(0, 8)}...</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendarCheck className="text-teal-500 mr-2" />
                      <span>
                        {doctor.availableSlots?.length || 0} slots available
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(doctor);
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition flex items-center justify-center shadow-sm"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(doctor);
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition flex items-center justify-center shadow-sm"
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

      {/* Doctor Details Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-[11000]">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Doctor Details</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <FaTimesCircle className="text-xl" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-shrink-0">
                  {selectedDoctor.photo ? (
                    <img 
                      src={selectedDoctor.photo} 
                      alt={selectedDoctor.name} 
                      className="w-32 h-32 rounded-xl object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                      <FaUserMd className="text-teal-500 text-4xl" />
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedDoctor.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <FaHospital className="text-teal-500 mr-2" />
                      <span><span className="font-medium">Department:</span> {selectedDoctor.department}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaStethoscope className="text-teal-500 mr-2" />
                      <span><span className="font-medium">Specialty:</span> {selectedDoctor.specialty}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaIdCard className="text-teal-500 mr-2" />
                      <span><span className="font-medium">ID:</span> {selectedDoctor._id}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <FaCalendarCheck className="text-teal-500 mr-2" />
                  Available Slots
                </h4>
                {selectedDoctor.availableSlots?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDoctor.availableSlots.map((slot, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="font-medium text-teal-700 flex items-center">
                          <FaClock className="mr-2" />
                          {slot.day}
                        </div>
                        <div className="text-gray-700 mt-1 flex items-center">
                          <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-md text-sm">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
                    No slots available
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    closeModal();
                    handleEdit(selectedDoctor);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition flex items-center shadow-md"
                >
                  <FaEdit className="mr-2" /> Edit Doctor
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-[11000]">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
                <FaTrash className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Doctor</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {doctorToDelete?.name}? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteAlert(false);
                    setDoctorToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition flex items-center"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsAdmin;