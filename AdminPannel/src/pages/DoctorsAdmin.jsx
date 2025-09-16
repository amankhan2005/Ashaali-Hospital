 import React, { useState, useEffect } from "react";
import API from "../services/api";

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    specialty: "",
    qualification: "",
    experience: "",
    photo: null,
    availableSlots: [],
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle slot change
  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...formData.availableSlots];
    updatedSlots[index][field] = value;
    setFormData({ ...formData, availableSlots: updatedSlots });
  };

  // ✅ Add slot
  const addSlot = () => {
    setFormData({
      ...formData,
      availableSlots: [
        ...formData.availableSlots,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  // ✅ Remove slot
  const removeSlot = (index) => {
    const updatedSlots = [...formData.availableSlots];
    updatedSlots.splice(index, 1);
    setFormData({ ...formData, availableSlots: updatedSlots });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (let key in formData) {
        if (key === "availableSlots") {
          data.append(key, JSON.stringify(formData.availableSlots));
        } else {
          data.append(key, formData[key]);
        }
      }

      if (editId) {
        await API.patch(`/api/doctors/update/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await API.post("/api/doctors/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({
        name: "",
        department: "",
        specialty: "",
        qualification: "",
        experience: "",
        photo: null,
        availableSlots: [],
      });
      fetchDoctors();
    } catch (err) {
      console.error("Error saving doctor:", err);
    }
  };

  // ✅ Edit doctor
  const handleEdit = (doctor) => {
    setEditId(doctor._id);
    setFormData({
      ...doctor,
      photo: null, // avoid re-upload on edit
    });
  };

  // ✅ Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await API.delete(`/api/doctors/delete/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Doctors Admin</h2>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={formData.specialty}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          className="border p-2 rounded w-full"
          accept="image/*"
        />

        {/* ✅ Slots */}
        <div className="space-y-2">
          <h3 className="font-semibold">Available Slots</h3>
          {formData.availableSlots.map((slot, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Day"
                value={slot.day}
                onChange={(e) =>
                  handleSlotChange(index, "day", e.target.value)
                }
                className="border p-2 rounded w-1/3"
              />
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) =>
                  handleSlotChange(index, "startTime", e.target.value)
                }
                className="border p-2 rounded w-1/3"
              />
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) =>
                  handleSlotChange(index, "endTime", e.target.value)
                }
                className="border p-2 rounded w-1/3"
              />
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSlot}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            + Add Slot
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      {/* ✅ Doctor List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">All Doctors</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Specialty</th>
                <th className="border p-2">Qualification</th>
                <th className="border p-2">Experience</th>
                <th className="border p-2">Slots</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc._id}>
                  <td className="border p-2">{doc.name}</td>
                  <td className="border p-2">{doc.department}</td>
                  <td className="border p-2">{doc.specialty}</td>
                  <td className="border p-2">{doc.qualification}</td>
                  <td className="border p-2">{doc.experience}</td>
                  <td className="border p-2">
                    {doc.availableSlots.map((s, i) => (
                      <div key={i}>
                        {s.day}: {s.startTime} - {s.endTime}
                      </div>
                    ))}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(doc)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorsAdmin;
