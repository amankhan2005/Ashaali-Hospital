import { useEffect, useState } from "react";
import API from "../api/axios";

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    name: "",
    department: "",
    specialization: "",
    opdTime: 1,
    photo: null,
    bio: "",
    availableSlots: [{ day: "", start: "", end: "" }]
  });

  const fetchDoctors = async () => {
    const res = await API.get("/api/doctors");
    setDoctors(res.data);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.department) return alert("Name & Department required");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("department", form.department);
    formData.append("specialization", form.specialization);
    formData.append("opdTime", form.opdTime);
    formData.append("bio", form.bio);
    if (form.photo) formData.append("photo", form.photo);
    formData.append("availableSlots", JSON.stringify(form.availableSlots));

    try {
      if (form._id) {
        await API.patch(`/api/doctors/${form._id}`, formData);
      } else {
        await API.post("/api/doctors", formData);
      }
      setForm({
        _id: "", name: "", department: "", specialization: "", opdTime: 1, photo: null, bio: "",
        availableSlots: [{ day: "", start: "", end: "" }]
      });
      fetchDoctors();
    } catch (err) {
      console.error("Failed to save doctor:", err);
      alert("Failed to save doctor");
    }
  };

  const editDoctor = (doc) => setForm({ ...doc, photo: null });
  const deleteDoctor = async (id) => { if (!window.confirm("Delete this doctor?")) return; await API.delete(`/api/doctors/${id}`); fetchDoctors(); };
  const deleteAll = async () => { if (!window.confirm("Delete ALL doctors?")) return; await API.delete(`/api/doctors`); fetchDoctors(); };

  const handleSlotChange = (idx, field, value) => {
    const slots = [...form.availableSlots];
    slots[idx][field] = value;
    setForm({ ...form, availableSlots: slots });
  };
  const addSlot = () => setForm({ ...form, availableSlots: [...form.availableSlots, { day: "", start: "", end: "" }] });
  const removeSlot = (idx) => { const slots = [...form.availableSlots]; slots.splice(idx, 1); setForm({ ...form, availableSlots: slots }); };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Doctors Admin</h2>

      {/* Form */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 mb-2 w-full" />
        <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="border p-2 mb-2 w-full" />
        <input placeholder="Specialization" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} className="border p-2 mb-2 w-full" />
        <input type="number" placeholder="OPD Time" value={form.opdTime} onChange={e => setForm({ ...form, opdTime: e.target.value })} className="border p-2 mb-2 w-full" />
        <textarea placeholder="Bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="border p-2 mb-2 w-full" />
        <input type="file" accept="image/*" onChange={e => setForm({ ...form, photo: e.target.files[0] })} className="mb-2" />

        <div>
          <h4>Available Slots</h4>
          {form.availableSlots.map((slot, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input placeholder="Day" value={slot.day} onChange={e => handleSlotChange(idx, "day", e.target.value)} className="border p-1 w-24" />
              <input placeholder="Start" value={slot.start} onChange={e => handleSlotChange(idx, "start", e.target.value)} className="border p-1 w-20" />
              <input placeholder="End" value={slot.end} onChange={e => handleSlotChange(idx, "end", e.target.value)} className="border p-1 w-20" />
              <button type="button" onClick={() => removeSlot(idx)} className="bg-red-500 text-white px-2 rounded">X</button>
            </div>
          ))}
          <button type="button" onClick={addSlot} className="bg-blue-500 text-white px-2 rounded">Add Slot</button>
        </div>

        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Save Doctor</button>
        <button onClick={deleteAll} className="bg-red-700 text-white px-4 py-2 rounded mt-2 ml-2">Delete All</button>
      </div>

      {/* Table */}
      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Department</th>
            <th>OPD</th>
            <th>Slots</th> {/* Added Slots */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d._id}>
              <td className="border p-1">
                <img src={d.photo || "https://via.placeholder.com/50"} className="w-12 h-12 object-cover rounded-full" />
              </td>
              <td className="border p-1">{d.name}</td>
              <td className="border p-1">{d.department}</td>
              <td className="border p-1">{d.opdTime}</td>
              <td className="border p-1">
                {d.availableSlots.map((s, i) => (
                  <div key={i}>{s.day}: {s.start} - {s.end}</div>
                ))}
              </td>
              <td className="border p-1">
                <button onClick={() => editDoctor(d)} className="bg-yellow-500 text-white px-2 rounded mr-1">Edit</button>
                <button onClick={() => deleteDoctor(d._id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsAdmin;
