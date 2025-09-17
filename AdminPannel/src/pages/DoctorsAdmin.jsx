 // src/pages/DoctorsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/doctors";

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
      const res = await axios.get(API_URL);
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors data. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true);
      setError(null);
      try {
        await fetchDoctors();
      } catch (err) {
        setError("Failed to load data. Please refresh the page.");
      } finally {
        setIsDataLoading(false);
      }
    };
    fetchData();
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
        await axios.put(`${API_URL}/update/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/add`, formData, {
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
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor:", err);
      setError("Error deleting doctor. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Doctors Admin Panel
          </h1>
          <p className="text-gray-600">
            Manage doctors, their specialties, and availability
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Doctor Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editingId ? "Edit Doctor" : "Add New Doctor"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter doctor's full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  placeholder="Enter department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <input
                  type="text"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  required
                  placeholder="Enter specialty"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Slots */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Available Slots
                </h3>
                <button
                  type="button"
                  onClick={addSlot}
                  className="px-3 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                >
                  + Add Slot
                </button>
              </div>

              {form.availableSlots.length > 0 ? (
                <div className="space-y-4">
                  {form.availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-md"
                    >
                      <input
                        type="text"
                        placeholder="Day (e.g. Monday)"
                        value={slot.day}
                        onChange={(e) =>
                          handleSlotChange(index, "day", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          handleSlotChange(index, "startTime", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) =>
                          handleSlotChange(index, "endTime", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-md text-gray-500">
                  No slots added yet. Click "Add Slot".
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-md"
              >
                {isLoading
                  ? "Saving..."
                  : editingId
                  ? "Update Doctor"
                  : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>

        {/* Doctors List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            All Doctors
          </h2>

          {isDataLoading ? (
            <p className="text-gray-500">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="text-gray-500">No doctors found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  {doctor.photo && (
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-bold text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {doctor.department} • {doctor.specialty}
                  </p>
                  <div className="mt-2 text-sm text-gray-700">
                    {doctor.availableSlots?.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {doctor.availableSlots.map((slot, idx) => (
                          <li key={idx}>
                            {slot.day}: {slot.startTime} - {slot.endTime}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No slots</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="flex-1 px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doctor._id)}
                      className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
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
