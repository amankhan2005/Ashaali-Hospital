 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/doctors/${doctorId}`)
      .then(res => res.json())
      .then(data => setDoctor(data))
      .catch(err => console.error(err));
  }, [doctorId]);

  if (!doctor)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Doctor Photo */}
        <img
          src={doctor.photo || "/doctor.png"}
          alt={doctor.name}
          className="w-80 h-80 object-cover rounded-lg border-2 border-gray-200 shadow-lg"
        />

        <div className="flex-1">
          {/* Basic Info */}
          <h1 className="text-3xl font-bold">{doctor.name}</h1>
          <p className="text-gray-600">{doctor.title}</p>
          <p className="text-gray-600">{doctor.specialty}</p>
          <p className="text-gray-600">{doctor.department}</p>
          <p className="font-semibold mt-2 text-lg">
            OPD: {doctor.opdTime}
          </p>
          <p className={`font-semibold mt-2 ${doctor.available ? "text-green-600" : "text-red-600"}`}>
            {doctor.available ? "Available" : "Not Available"}
          </p>
          <p className="mt-4">{doctor.bio}</p>

          {/* Contact Info */}
          <h3 className="text-xl mt-6 font-bold">Contact</h3>
          <p>Phone: {doctor.phone}</p>
          <p>Email: {doctor.email}</p>
          <p>Location: {doctor.location}</p>

          {/* Qualification & Experience */}
          <h3 className="text-xl mt-6 font-bold">Qualification & Experience</h3>
          <p>{doctor.qualification}</p>
          <p>{doctor.experience}</p>

          {/* Education */}
          {doctor.education?.length > 0 && (
            <>
              <h3 className="text-xl mt-6 font-bold">Education</h3>
              <ul className="list-disc ml-6">
                {doctor.education.map((edu, idx) => (
                  <li key={idx}>
                    {edu.degree} - {edu.institution}, {edu.location} ({edu.year})
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Certifications */}
          {doctor.certifications?.length > 0 && (
            <>
              <h3 className="text-xl mt-6 font-bold">Certifications</h3>
              <ul className="list-disc ml-6">
                {doctor.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </>
          )}

          {/* Specialties */}
          {doctor.specialties?.length > 0 && (
            <>
              <h3 className="text-xl mt-6 font-bold">Specialties</h3>
              <ul className="list-disc ml-6">
                {doctor.specialties.map((spec, idx) => (
                  <li key={idx}>
                    <strong>{spec.name}</strong>: {spec.description}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Achievements */}
          {doctor.achievements?.length > 0 && (
            <>
              <h3 className="text-xl mt-6 font-bold">Achievements</h3>
              <ul className="list-disc ml-6">
                {doctor.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </>
          )}

          {/* Available Slots */}
          {doctor.availableSlots?.length > 0 && (
            <>
              <h3 className="text-xl mt-6 font-bold">Available Slots</h3>
              <ul className="list-disc ml-6">
                {doctor.availableSlots.map((slot, idx) => (
                  <li key={idx}>{slot.day}: {slot.time}</li>
                ))}
              </ul>
            </>
          )}

          {/* Book Appointment Button */}
          <button
            onClick={() => navigate(`/book-appointment/${doctor._id}`)}
            className="mt-6 bg-[#18978d] text-white px-6 py-3 rounded hover:bg-[#147a71] transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
