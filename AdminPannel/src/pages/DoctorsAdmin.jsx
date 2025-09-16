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

  // Fetch doctors & departments
  const fetchDoctors = async () => {
    const res = await axios.get(API_URL);
    setDoctors(res.data);
  };

  const fetchDepartments = async () => {
    const res = await axios.get(`${API_URL}/departments/list`);
    setDepartments(res.data);
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
  };

  // Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this doctor?")) return;
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchDoctors();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctors Admin</h2>

      {/* Doctor Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={form.specialty}
          onChange={handleChange}
          required
        />
        <input type="file" name="photo" onChange={handleFileChange} />

        {/* Slots */}
        <h4>Available Slots</h4>
        {form.availableSlots.map((slot, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Day"
              value={slot.day}
              onChange={(e) => handleSlotChange(index, "day", e.target.value)}
            />
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) => handleSlotChange(index, "startTime", e.target.value)}
            />
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) => handleSlotChange(index, "endTime", e.target.value)}
            />
            <button type="button" onClick={() => removeSlot(index)}>
              ❌
            </button>
          </div>
        ))}
        <button type="button" onClick={addSlot}>
          ➕ Add Slot
        </button>

        <br />
        <button type="submit">{editingId ? "Update Doctor" : "Add Doctor"}</button>
      </form>

      {/* Doctors List */}
      <h3>Doctors List</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Specialty</th>
            <th>Slots</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.name}</td>
              <td>{doc.department}</td>
              <td>{doc.specialty}</td>
              <td>
                {doc.availableSlots.map((s) => (
                  <div key={s._id}>
                    {s.day} ({s.startTime} - {s.endTime})
                  </div>
                ))}
              </td>
              <td>
                {doc.photo && <img src={doc.photo} alt="doctor" width="80" />}
              </td>
              <td>
                <button onClick={() => handleEdit(doc)}>✏️ Edit</button>
                <button onClick={() => handleDelete(doc._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsAdmin;
