 import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Team = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    fetch(`${BASE_URL}/api/doctors/departments/list`)
      .then(res => res.json())
      .then(data => setDepartments(data));
  }, [BASE_URL]);

  // Fetch doctors
  useEffect(() => {
    let url = `${BASE_URL}/api/doctors?`;
    if (department) url += `department=${department}&`;
    fetch(url)
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, [department, BASE_URL]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>

      <select
        value={department}
        onChange={e => setDepartment(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="">All Departments</option>
        {departments.map((dep, i) => (
          <option key={i} value={dep}>{dep}</option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map(doc => (
          <div key={doc._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative">
            <img src={doc.photo || "/doctor.png"} alt={doc.name} className="w-full h-40 object-cover rounded"/>
            <h2 className="text-xl font-bold mt-2">{doc.name}</h2>
            <p className="text-gray-600">{doc.specialty}</p>
            <p className={`font-semibold mt-2 ${doc.available ? "text-green-600" : "text-red-600"}`}>
              {doc.available ? "Available" : "Not Available"}
            </p>

            <div className="mt-4 flex gap-2">
              <Link 
                to={`/about/team/${doc._id}`} 
                className="text-blue-600 underline inline-block"
              >
                View Profile
              </Link>

              <button
                onClick={() => navigate(`/book-appointment/${doc._id}`)}
                className="bg-[#18978d] text-white px-3 py-1 rounded hover:bg-[#147a71] transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
