 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaCalendarAlt, FaSearch, FaFilter, FaStar, FaBriefcase, FaHospital } from "react-icons/fa";

const Team = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(true);
  const BASE_URL =
    import.meta.env.VITE_API_URL || "https://ashaali-hospital-2.onrender.com";
  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/doctors/departments/list`)
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Departments fetch error:", err);
        setLoading(false);
      });
  }, [BASE_URL]);

  // Fetch doctors based on filters
  useEffect(() => {
    setLoading(true);
    let url = `${BASE_URL}/api/doctors?`;
    if (department) url += `department=${department}&`;
    if (availability) url += `available=${availability}&`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Doctors fetch error:", err);
        setLoading(false);
      });
  }, [department, availability, BASE_URL]);

  const mainDoctor = doctors[0];
  const otherDoctors = doctors.slice(1);

  const handleBookClick = (doctor) => {
    if (!doctor.available) {
      alert(`Sorry Dr. ${doctor.name} is not available`);
      return;
    }
    navigate(
      `/book-appointment?doctorId=${doctor._id}&department=${doctor.department}`
    );
  };

  // Default image with initials fallback
  const getDoctorImage = (doctor) => {
    if (doctor.photo) return doctor.photo;
    const initials = doctor.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=18978d&color=fff&size=200&format=svg`;
  };

  // Render star ratings
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-2 text-gray-600 text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Meet Our <span className="text-[#18978d]">Expert Doctors</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-lg">
            Highly qualified specialists with years of experience, dedicated to providing you with the best healthcare.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center text-gray-700 font-medium">
              <FaFilter className="mr-2 text-[#18978d]" />
              <span>Filter Doctors:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-6 py-3 pl-12 bg-white shadow-sm text-gray-700 font-medium
                          focus:outline-none focus:ring-2 focus:ring-[#18978d] focus:border-transparent
                          hover:shadow-md transition duration-200 ease-in-out cursor-pointer"
                >
                  <option value="">All Departments</option>
                  {departments.map((dep, i) => (
                    <option key={i} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
                <FaHospital className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#18978d]" />
              </div>
              
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-6 py-3 pl-12 bg-white shadow-sm text-gray-700 font-medium
                          focus:outline-none focus:ring-2 focus:ring-[#18978d] focus:border-transparent
                          hover:shadow-md transition duration-200 ease-in-out cursor-pointer"
                >
                  <option value="">All Availability</option>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
                <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#18978d]" />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#18978d]"></div>
          </div>
        ) : (
          <>
            {/* Main Doctor */}
            {mainDoctor && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16 transform transition-all duration-500 hover:shadow-2xl">
                <div className="flex flex-col lg:flex-row">
                  {/* Doctor Image */}
                  <div className="lg:w-2/5 bg-gradient-to-br from-[#18978d] to-teal-600 p-8 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-xl">
                        <img
                          src={getDoctorImage(mainDoctor)}
                          alt={mainDoctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className={`absolute bottom-6 right-6 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                          mainDoctor.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        <span className="text-white text-xs font-bold">
                          {mainDoctor.available ? "✓" : "✕"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Doctor Details */}
                  <div className="lg:w-3/5 p-8 md:p-12">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <span className="bg-[#18978d]/10 text-[#18978d] text-sm font-semibold px-3 py-1 rounded-full">
                            {mainDoctor.department}
                          </span>
                          <span
                            className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${
                              mainDoctor.available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {mainDoctor.available ? "Available Now" : "Not Available"}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mt-3 mb-2">
                          Dr. {mainDoctor.name}
                        </h3>
                        <p className="text-xl text-[#18978d] font-medium mb-4">
                          {mainDoctor.specialty}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-gray-600 mb-6">{mainDoctor.bio}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <div className="bg-blue-50 p-3 rounded-lg mr-4">
                              <FaBriefcase className="text-blue-600 text-xl" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Experience</p>
                              <p className="font-semibold">{mainDoctor.experience || "10+ Years"}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="bg-purple-50 p-3 rounded-lg mr-4">
                              <FaUserMd className="text-purple-600 text-xl" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Patients</p>
                              <p className="font-semibold">{mainDoctor.patients || "1000+"}</p>
                            </div>
                          </div>
                        </div>
                        
                        {mainDoctor.rating && (
                          <div className="mb-6">
                            {renderRating(mainDoctor.rating)}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-auto">
                        <button
                          onClick={() => handleBookClick(mainDoctor)}
                          disabled={!mainDoctor.available}
                          className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                            mainDoctor.available
                              ? "bg-[#18978d] text-white hover:bg-[#147a71] hover:shadow-xl"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {mainDoctor.available ? "Book Appointment Now" : "Currently Unavailable"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Doctors */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="bg-[#18978d] w-1 h-8 mr-3"></span>
                Our Specialist Team
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {otherDoctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-r from-[#18978d]/20 to-teal-600/20 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <img
                            src={getDoctorImage(doctor)}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div
                        className={`absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${
                          doctor.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        <span className="text-white text-xs font-bold">
                          {doctor.available ? "✓" : "✕"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          Dr. {doctor.name}
                        </h4>
                        <p className="text-[#18978d] font-medium mb-1">
                          {doctor.specialty}
                        </p>
                        <p className="text-gray-600 text-sm">{doctor.department}</p>
                      </div>
                      
                      <div className="flex justify-center mb-5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            doctor.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mr-1 ${
                              doctor.available ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                          {doctor.available ? "Available Today" : "Unavailable"}
                        </span>
                      </div>
                      
                      {doctor.rating && (
                        <div className="flex justify-center mb-4">
                          {renderRating(doctor.rating)}
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleBookClick(doctor)}
                        disabled={!doctor.available}
                        className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                          doctor.available
                            ? "bg-[#18978d] text-white hover:bg-[#147a71] hover:shadow-md"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {doctor.available ? "Book Appointment" : "Unavailable"}
                      </button>
                    </div>
                  </div>
                ))}
                
                {doctors.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
                      <FaSearch className="w-12 h-12 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      No Doctors Found
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      No doctors match your selected filters. Try adjusting your criteria to see more results.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Team;