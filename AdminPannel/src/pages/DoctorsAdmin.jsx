 import { useState, useEffect } from "react";
import API from "../api/axios";

const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

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
    available: true
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    const res = await API.get("/api/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in doctorForm) {
        if (key === "photo" && doctorForm.photo) {
          formData.append("photo", doctorForm.photo);
        } else if (["education","certifications","specialties","achievements","availableSlots"].includes(key)) {
          formData.append(key, JSON.stringify(doctorForm[key]));
        } else {
          formData.append(key, doctorForm[key]);
        }
      }

      if (editId) {
        await API.patch(`/api/doctors/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/api/doctors/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setDoctorForm({
        name: "", title:"", department:"", specialty:"", qualification:"", experience:"",
        phone:"", email:"", location:"", opdTime:"", bio:"", education:[],
        certifications:[], specialties:[], achievements:[], availableSlots:[], photo:null, available:true
      });
      setEditId(null);
      fetchDoctors();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = (doctor) => {
    // Convert availableSlots.time string to start/end for form
    const slots = doctor.availableSlots.map(slot => {
      const [start, end] = slot.time.split("-");
      return { day: slot.day, start, end };
    });

    setDoctorForm({
      ...doctor,
      photo: null,
      availableSlots: slots
    });
    setEditId(doctor._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    await API.delete(`/api/doctors/delete/${id}`);
    fetchDoctors();
  };

  // Toggle availability on card
  const toggleAvailability = async (doctor) => {
    await API.patch(`/api/doctors/update/${doctor._id}`, { available: !doctor.available });
    fetchDoctors();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Manage Doctors</h2>

      {/* Doctor Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <div className="flex gap-4">
          <input className="border p-2 rounded w-full" placeholder="Name" value={doctorForm.name} onChange={e => setDoctorForm({...doctorForm, name:e.target.value})} />
          <input className="border p-2 rounded w-full" placeholder="Title" value={doctorForm.title} onChange={e => setDoctorForm({...doctorForm, title:e.target.value})} />
        </div>
        <div className="flex gap-4">
          <input className="border p-2 rounded w-full" placeholder="Department" value={doctorForm.department} onChange={e => setDoctorForm({...doctorForm, department:e.target.value})} />
          <input className="border p-2 rounded w-full" placeholder="Specialty" value={doctorForm.specialty} onChange={e => setDoctorForm({...doctorForm, specialty:e.target.value})} />
        </div>
        <input className="border p-2 rounded w-full" placeholder="Qualification" value={doctorForm.qualification} onChange={e => setDoctorForm({...doctorForm, qualification:e.target.value})} />
        <input className="border p-2 rounded w-full" placeholder="Experience" value={doctorForm.experience} onChange={e => setDoctorForm({...doctorForm, experience:e.target.value})} />
        <input className="border p-2 rounded w-full" placeholder="Phone" value={doctorForm.phone} onChange={e => setDoctorForm({...doctorForm, phone:e.target.value})} />
        <input className="border p-2 rounded w-full" placeholder="Email" value={doctorForm.email} onChange={e => setDoctorForm({...doctorForm, email:e.target.value})} />
        <input className="border p-2 rounded w-full" placeholder="Location" value={doctorForm.location} onChange={e => setDoctorForm({...doctorForm, location:e.target.value})} />
        <input className="border p-2 rounded w-full" placeholder="OPD Time" value={doctorForm.opdTime} onChange={e => setDoctorForm({...doctorForm, opdTime:e.target.value})} />
        <textarea className="border p-2 rounded w-full" placeholder="Bio" value={doctorForm.bio} onChange={e => setDoctorForm({...doctorForm, bio:e.target.value})}></textarea>

        {/* Photo */}
        <input type="file" onChange={e=>setDoctorForm({...doctorForm, photo:e.target.files[0]})} />

        {/* Availability toggle */}
        <div className="flex gap-2 items-center">
          <span>Available:</span>
          <button type="button" className={`px-4 py-1 rounded ${doctorForm.available ? "bg-green-500" : "bg-red-500"} text-white`} onClick={()=>setDoctorForm({...doctorForm, available:!doctorForm.available})}>
            {doctorForm.available ? "Available" : "Not Available"}
          </button>
        </div>

        {/* Available Slots */}
        <div>
          <h4 className="font-semibold mb-2">Available Slots:</h4>
          {doctorForm.availableSlots.map((slot, index)=>(
            <div key={index} className="flex gap-2 mb-2 items-center">
              <select className="border p-2 rounded" value={slot.day} onChange={e=>{
                const newSlots = [...doctorForm.availableSlots];
                newSlots[index].day = e.target.value;
                setDoctorForm({...doctorForm, availableSlots:newSlots});
              }}>
                <option value="">Select day</option>
                {daysOfWeek.map(d=><option key={d} value={d}>{d}</option>)}
              </select>
              <input type="time" value={slot.start||"09:00"} onChange={e=>{
                const newSlots = [...doctorForm.availableSlots];
                newSlots[index].start = e.target.value;
                setDoctorForm({...doctorForm, availableSlots:newSlots});
              }} className="border p-2 rounded"/>
              <input type="time" value={slot.end||"18:00"} onChange={e=>{
                const newSlots = [...doctorForm.availableSlots];
                newSlots[index].end = e.target.value;
                setDoctorForm({...doctorForm, availableSlots:newSlots});
              }} className="border p-2 rounded"/>
              <button type="button" onClick={()=> {
                const newSlots = doctorForm.availableSlots.filter((_,i)=>i!==index);
                setDoctorForm({...doctorForm, availableSlots:newSlots});
              }} className="bg-red-500 text-white px-2 rounded">X</button>
            </div>
          ))}
          <button type="button" onClick={()=>setDoctorForm({...doctorForm, availableSlots:[...doctorForm.availableSlots,{day:"",start:"09:00",end:"18:00"}]})} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Add Slot</button>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">{loading ? "Saving..." : (editId ? "Update Doctor" : "Add Doctor")}</button>
      </form>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map(d=>(
          <div key={d._id} className="bg-white p-4 rounded shadow relative">
            <img src={d.photo} alt={d.name} className="w-full h-40 object-cover rounded mb-2"/>
            <h3 className="font-bold text-lg">{d.name}</h3>
            <p>Dept: {d.department}</p>
            <p>Specialty: {d.specialty}</p>
            <p>OPD: {d.opdTime}</p>
            
            {/* Availability toggle */}
            <button className={`absolute top-2 right-2 px-3 py-1 rounded text-white ${d.available?"bg-green-500":"bg-red-500"}`} onClick={()=>toggleAvailability(d)}>
              {d.available ? "Available" : "Not Available"}
            </button>

            {/* Slots display */}
            {d.availableSlots && d.availableSlots.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold">Slots:</h4>
                {d.availableSlots.map((s,i)=>(
                  <p key={i}>{s.day}: {s.time}</p>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-2">
              <button className="text-blue-600" onClick={()=>handleEdit(d)}>Edit</button>
              <button className="text-red-600" onClick={()=>handleDelete(d._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsAdmin;
