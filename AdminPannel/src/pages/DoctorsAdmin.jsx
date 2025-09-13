 import { useState, useEffect } from "react";
import API from "../api/axios";
import Slider from "../components/Sidebar"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    title: "",
    department: "",
    specialty: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    location: "",
    opdTime: "",
    bio: "",
    education: [],
    certifications: [],
    specialties: [],
    achievements: [],
    availableSlots: [],
    photo: null,
    available: true,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("basic"); // For form organization

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      showNotification("Failed to fetch doctors", "error");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Handle form submission (Add + Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!doctorForm.name || !doctorForm.department || !doctorForm.email) {
      showNotification("Please fill in required fields (Name, Department, Email)", "error");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in doctorForm) {
        if (key === "photo") {
          if (doctorForm.photo) {
            formData.append("photo", doctorForm.photo);
          }
        } else if (key === "availableSlots") {
          // Convert {day,start,end} -> {day,time}
          const formattedSlots = doctorForm.availableSlots.map(s => ({
            day: s.day,
            time: `${s.start}-${s.end}`,
          }));
          formData.append("availableSlots", JSON.stringify(formattedSlots));
        } else if (["education", "certifications", "specialties", "achievements"].includes(key)) {
          formData.append(key, JSON.stringify(doctorForm[key]));
        } else {
          formData.append(key, doctorForm[key]);
        }
      }

      if (editId) {
        await API.patch(`/api/doctors/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("Doctor updated successfully!");
      } else {
        await API.post("/api/doctors/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("Doctor added successfully!");
      }

      // Reset form
      setDoctorForm({
        name: "", title: "", department: "", specialty: "", qualification: "", experience: "",
        phone: "", email: "", location: "", opdTime: "", bio: "", education: [],
        certifications: [], specialties: [], achievements: [], availableSlots: [], photo: null, available: true
      });
      setEditId(null);
      fetchDoctors();
    } catch (err) {
      showNotification("Operation failed. Please try again.", "error");
      console.log(err);
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (doctor) => {
    const slots = doctor.availableSlots?.map(slot => {
      if (slot.time) {
        const [start, end] = slot.time.split("-");
        return { day: slot.day, start, end };
      }
      return { day: slot.day, start: "09:00", end: "18:00" };
    }) || [];
    
    setDoctorForm({
      name: doctor.name || "",
      title: doctor.title || "",
      department: doctor.department || "",
      specialty: doctor.specialty || "",
      qualification: doctor.qualification || "",
      experience: doctor.experience || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      location: doctor.location || "",
      opdTime: doctor.opdTime || "",
      bio: doctor.bio || "",
      education: doctor.education || [],
      certifications: doctor.certifications || [],
      specialties: doctor.specialties || [],
      achievements: doctor.achievements || [],
      availableSlots: slots,
      photo: null, // nayi photo select ho to hi bhejna
      available: doctor.available ?? true,
    });
    setEditId(doctor._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    
    try {
      await API.delete(`/api/doctors/delete/${id}`);
      showNotification("Doctor deleted successfully!");
      fetchDoctors();
    } catch (err) {
      showNotification("Failed to delete doctor", "error");
      console.log(err);
    }
  };

  // Toggle availability on card
  const toggleAvailability = async (doctor) => {
    try {
      await API.patch(`/api/doctors/update/${doctor._id}`, { available: !doctor.available });
      showNotification(`Doctor marked as ${!doctor.available ? 'available' : 'unavailable'}`);
      fetchDoctors();
    } catch (err) {
      showNotification("Failed to update availability", "error");
      console.log(err);
    }
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle array field inputs (education, certifications, etc.)
  const handleArrayFieldChange = (field, value, index) => {
    const newArray = [...doctorForm[field]];
    if (index !== undefined) {
      newArray[index] = value;
    } else {
      newArray.push(value);
    }
    setDoctorForm({...doctorForm, [field]: newArray});
  };

  const removeArrayFieldItem = (field, index) => {
    const newArray = [...doctorForm[field]];
    newArray.splice(index, 1);
    setDoctorForm({...doctorForm, [field]: newArray});
  };

  return (
 
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
     
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
          notification.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Manage Doctors</h1>
          <p className="text-gray-600">Add, edit, and manage doctor profiles and availability</p>
        </div>

        {/* Doctor Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {editId ? "Edit Doctor" : "Add New Doctor"}
            </h2>
          </div>

          {/* Form Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "basic"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Information
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "details"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details & Schedule
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "additional"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("additional")}
              >
                Additional Info
              </button>
            </nav>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Doctor's full name"
                      value={doctorForm.name}
                      onChange={e => setDoctorForm({...doctorForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Senior Consultant"
                      value={doctorForm.title}
                      onChange={e => setDoctorForm({...doctorForm, title: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Cardiology"
                      value={doctorForm.department}
                      onChange={e => setDoctorForm({...doctorForm, department: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialty
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Interventional Cardiology"
                      value={doctorForm.specialty}
                      onChange={e => setDoctorForm({...doctorForm, specialty: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qualification
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. MBBS, MD"
                      value={doctorForm.qualification}
                      onChange={e => setDoctorForm({...doctorForm, qualification: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. 10 years"
                      value={doctorForm.experience}
                      onChange={e => setDoctorForm({...doctorForm, experience: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contact number"
                      value={doctorForm.phone}
                      onChange={e => setDoctorForm({...doctorForm, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email address"
                      value={doctorForm.email}
                      onChange={e => setDoctorForm({...doctorForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Clinic/Hospital location"
                      value={doctorForm.location}
                      onChange={e => setDoctorForm({...doctorForm, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OPD Time
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Mon-Fri: 9AM-5PM"
                      value={doctorForm.opdTime}
                      onChange={e => setDoctorForm({...doctorForm, opdTime: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Professional biography"
                    rows={3}
                    value={doctorForm.bio}
                    onChange={e => setDoctorForm({...doctorForm, bio: e.target.value})}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-xs text-gray-500">Upload photo</p>
                      </div>
                      <input type="file" className="hidden" onChange={e => setDoctorForm({...doctorForm, photo: e.target.files[0]})} />
                    </label>
                    {doctorForm.photo && (
                      <div className="text-sm text-gray-600">
                        {doctorForm.photo.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={doctorForm.available}
                        onChange={() => setDoctorForm({...doctorForm, available: !doctorForm.available})}
                      />
                      <div className={`block w-14 h-7 rounded-full ${doctorForm.available ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${doctorForm.available ? 'transform translate-x-7' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium">
                      Available for appointments
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Details & Schedule Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Available Slots</h3>
                  <div className="space-y-4">
                    {doctorForm.availableSlots.map((slot, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={slot.day}
                            onChange={e => {
                              const newSlots = [...doctorForm.availableSlots];
                              newSlots[index].day = e.target.value;
                              setDoctorForm({...doctorForm, availableSlots: newSlots});
                            }}
                          >
                            <option value="">Select day</option>
                            {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                          <input
                            type="time"
                            value={slot.start || "09:00"}
                            onChange={e => {
                              const newSlots = [...doctorForm.availableSlots];
                              newSlots[index].start = e.target.value;
                              setDoctorForm({...doctorForm, availableSlots: newSlots});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                          <input
                            type="time"
                            value={slot.end || "18:00"}
                            onChange={e => {
                              const newSlots = [...doctorForm.availableSlots];
                              newSlots[index].end = e.target.value;
                              setDoctorForm({...doctorForm, availableSlots: newSlots});
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              const newSlots = doctorForm.availableSlots.filter((_, i) => i !== index);
                              setDoctorForm({...doctorForm, availableSlots: newSlots});
                            }}
                            className="mt-6 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setDoctorForm({...doctorForm, availableSlots: [...doctorForm.availableSlots, {day: "", start: "09:00", end: "18:00"}]})}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Slot
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    {doctorForm.education.map((edu, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. MBBS from XYZ University"
                          value={edu}
                          onChange={e => handleArrayFieldChange("education", e.target.value, index)}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayFieldItem("education", index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayFieldChange("education", "")}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Education
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications</h3>
                  <div className="space-y-4">
                    {doctorForm.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Board Certified in Cardiology"
                          value={cert}
                          onChange={e => handleArrayFieldChange("certifications", e.target.value, index)}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayFieldItem("certifications", index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayFieldChange("certifications", "")}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Certification
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info Tab */}
            {activeTab === "additional" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Specialties</h3>
                  <div className="space-y-4">
                    {doctorForm.specialties.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Heart Surgery"
                          value={spec}
                          onChange={e => handleArrayFieldChange("specialties", e.target.value, index)}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayFieldItem("specialties", index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayFieldChange("specialties", "")}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Specialty
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
                  <div className="space-y-4">
                    {doctorForm.achievements.map((ach, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g. Best Doctor Award 2020"
                          value={ach}
                          onChange={e => handleArrayFieldChange("achievements", e.target.value, index)}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayFieldItem("achievements", index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayFieldChange("achievements", "")}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Achievement
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-8 flex justify-between">
              <div>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setDoctorForm({
                        name: "", title: "", department: "", specialty: "", qualification: "", experience: "",
                        phone: "", email: "", location: "", opdTime: "", bio: "", education: [],
                        certifications: [], specialties: [], achievements: [], availableSlots: [], photo: null, available: true
                      });
                      setEditId(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition-colors flex items-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : editId ? (
                  "Update Doctor"
                ) : (
                  "Add Doctor"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Doctors List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Doctors Directory</h2>
              <p className="text-gray-600">Manage all doctors in your hospital</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doctors..."
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm ? "No doctors match your search. Try a different term." : "Get started by adding a new doctor."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredDoctors.map(d => (
                <div key={d._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={d.photo || "https://via.placeholder.com/400x200?text=Doctor+Photo"} 
                      alt={d.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleAvailability(d)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          d.available 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        } transition-colors`}
                      >
                        {d.available ? "Available" : "Not Available"}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{d.name}</h3>
                        <p className="text-sm text-gray-600">{d.title}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <span>{d.department}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        <span>{d.specialty}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{d.opdTime}</span>
                      </div>
                    </div>
                    
                    {d.availableSlots && d.availableSlots.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Available Slots</h4>
                        <div className="flex flex-wrap gap-1">
                          {d.availableSlots.slice(0, 3).map((s, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {s.day}: {s.time}
                            </span>
                          ))}
                          {d.availableSlots.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{d.availableSlots.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={() => handleEdit(d)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="mr-1.5 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(d._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete
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