 // src/pages/DoctorsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/doctors";

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    specialty: "",
    availableSlots: [],
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch doctors & departments
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(API_URL);
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_URL}/departments/list`);
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  // Handle slot change
  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...form.availableSlots];
    updatedSlots[index][field] = value;
    setForm({ ...form, availableSlots: updatedSlots });
  };

  const addSlot = () => {
    setForm({
      ...form,
      availableSlots: [...form.availableSlots, { day: "", startTime: "", endTime: "" }],
    });
  };

  const removeSlot = (index) => {
    const updatedSlots = [...form.availableSlots];
    updatedSlots.splice(index, 1);
    setForm({ ...form, availableSlots: updatedSlots });
  };

  // Submit form (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("department", form.department);
      formData.append("specialty", form.specialty);
      formData.append("availableSlots", JSON.stringify(form.availableSlots));
      if (form.photo) formData.append("photo", form.photo);

      if (editingId) {
        // Update doctor
        await axios.put(`${API_URL}/update/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        // Add doctor
        await axios.post(`${API_URL}/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ name: "", department: "", specialty: "", availableSlots: [], photo: null });
      fetchDoctors();
    } catch (err) {
      console.error("Error saving doctor:", err);
      alert("Error saving doctor");
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
      photo: null, // keep null until user uploads new one
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this doctor?")) return;
    
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor:", err);
      alert("Error deleting doctor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctors Admin Panel</h1>
          <p className="text-gray-600">Manage doctors, their specialties, and availability</p>
        </div>

        {/* Doctor Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editingId ? "Edit Doctor" : "Add New Doctor"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter doctor's full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  placeholder="Enter specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Slots */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Available Slots</h3>
                <button
                  type="button"
                  onClick={addSlot}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Slot
                </button>
              </div>

              {form.availableSlots.length > 0 ? (
                <div className="space-y-4">
                  {form.availableSlots.map((slot, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-gray-50 p-4 rounded-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                        <input
                          type="text"
                          placeholder="e.g., Monday"
                          value={slot.day}
                          onChange={(e) => handleSlotChange(index, "day", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => handleSlotChange(index, "startTime", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => handleSlotChange(index, "endTime", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex justify-end sm:justify-center">
                        <button
                          type="button"
                          onClick={() => removeSlot(index)}
                          className="mt-6 sm:mt-0 inline-flex items-center p-2 border border-transparent rounded-full text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No availability slots added yet. Click "Add Slot" to add one.</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  editingId ? "Update Doctor" : "Add Doctor"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Doctors List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Doctors List</h2>
            <p className="mt-1 text-sm text-gray-600">A list of all doctors in the system</p>
          </div>
          
          {doctors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Photo
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doc) => (
                    <tr key={doc._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doc.specialty}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {doc.availableSlots && doc.availableSlots.length > 0 ? (
                            <div className="space-y-1">
                              {doc.availableSlots.map((s, idx) => (
                                <div key={idx} className="flex items-center">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {s.day}
                                  </span>
                                  <span className="ml-2 text-xs text-gray-500">
                                    {s.startTime} - {s.endTime}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">No availability set</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doc.photo ? (
                          <img 
                            src={doc.photo} 
                            alt={`${doc.name}'s profile`} 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No photo</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(doc)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <svg className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new doctor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsAdmin;