 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [availability, setAvailability] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://ashaali-hospital-2.onrender.com";
  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    fetch(`${BASE_URL}/api/doctors/departments/list`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch(err => console.error("Departments fetch error:", err));
  }, [BASE_URL]);

  // Fetch doctors based on filters
  useEffect(() => {
    let url = `${BASE_URL}/api/doctors?`;
    if (department) url += `department=${department}&`;
    if (availability) url += `available=${availability}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(err => console.error("Doctors fetch error:", err));
  }, [department, availability, BASE_URL]);

  const mainDoctor = doctors[0];
  const otherDoctors = doctors.slice(1);

  const handleBookClick = (doctor) => {
    if (!doctor.available) {
      alert(`Sorry Dr. ${doctor.name} is not available`);
      return;
    }
    navigate(`/book-appointment?doctorId=${doctor._id}&department=${doctor.department}`);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Meet Our <span className="text-[#18978d]">Expert Doctors</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-lg">
            Highly qualified specialists with years of experience, ready to care for you.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-14">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-200 rounded-xl px-6 py-3 bg-white shadow-md text-gray-700 font-medium
                       focus:outline-none focus:ring-2 focus:ring-[#18978d] focus:border-transparent
                       hover:shadow-xl transition duration-200 ease-in-out cursor-pointer hover:bg-gray-50"
          >
            <option value="">All Departments</option>
            {departments.map((dep, i) => (
              <option key={i} value={dep}>{dep}</option>
            ))}
          </select>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="border border-gray-200 rounded-xl px-6 py-3 bg-white shadow-md text-gray-700 font-medium
                       focus:outline-none focus:ring-2 focus:ring-[#18978d] focus:border-transparent
                       hover:shadow-xl transition duration-200 ease-in-out cursor-pointer hover:bg-gray-50"
          >
            <option value="">All Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Main Doctor */}
        {mainDoctor && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 py-10 mb-14 hover:shadow-2xl transition">
            <div className="flex flex-col lg:flex-row gap-10 px-8 md:px-14 items-center">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-80 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={mainDoctor.photo || "/doctor.png"}
                    alt={mainDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-4xl font-bold text-gray-900 mb-3">{mainDoctor.name}</h3>
                <p className="text-gray-600 text-lg mb-3">{mainDoctor.specialty}</p>
                <p className="text-gray-500 mb-6">{mainDoctor.bio}</p>
                <span
                  className={`inline-block px-5 py-1 rounded-full text-sm font-medium mb-6 ${
                    mainDoctor.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {mainDoctor.available ? "Available" : "Not Available"}
                </span>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {/* Removed View Profile Button */}
                  <button
                    onClick={() => handleBookClick(mainDoctor)}
                    className="px-6 py-3 rounded-full bg-[#18978d] text-white font-medium shadow-md hover:bg-[#147a71] transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Doctors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center hover:shadow-xl transition"
            >
              <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                <img
                  src={doctor.photo || "/doctor.png"}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h4>
              <p className="text-gray-500 text-sm mb-4">{doctor.specialty}</p>

              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-5 ${
                  doctor.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {doctor.available ? "Available" : "Not Available"}
              </span>

              <div className="flex flex-col gap-3">
                {/* Removed View Profile Button */}
                <button
                  onClick={() => handleBookClick(doctor)}
                  className="px-5 py-2 rounded-full bg-[#18978d] text-white font-medium shadow-md hover:bg-[#147a71] transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}

          {doctors.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-12">
              No doctors found with selected filters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
