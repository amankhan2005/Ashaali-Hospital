 import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbsComponent from '../../components/Breadcums';

const TeamDetails = () => {
  const { doctorId } = useParams();
  const [doctorData, setDoctorData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetch(`${BASE_URL}/api/doctors/${doctorId}`)
      .then(res => res.json())
      .then(data => setDoctorData(data))
      .catch(err => console.error(err));
  }, [doctorId]);

  if (!doctorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading doctor details...</p>
      </div>
    );
  }

  const {
    name,
    title,
    specialization,
    qualification,
    experience,
    image,
    bio,
    phone,
    email,
    location,
    education = [],
    certifications = [],
    specialties = [],
    achievements = [],
    availableSlots = [],
  } = doctorData;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: name },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'education', label: 'Education' },
    { id: 'specialties', label: 'Specialties' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'schedule', label: 'Schedule' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumbsComponent items={breadcrumbItems} headText={"Doctor Details"} />

      {/* Doctor Header */}
      <div className="bg-gradient-to-r from-[#18978d] to-[#ed8022] py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center lg:col-span-1">
            <img
              src={image || "/doctor.png"}
              alt={name}
              className="w-80 h-80 rounded-2xl object-cover border-8 border-white/20 shadow-2xl"
            />
          </div>

          <div className="lg:col-span-2 text-center lg:text-left text-white">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">{name}</h1>
            <p className="text-2xl mb-4 font-semibold">{title}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
              <span className="bg-white/20 px-4 py-2 rounded-full text-lg font-medium">{qualification}</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-lg font-medium">{experience} Experience</span>
            </div>
            <p className="text-lg leading-relaxed mb-8 max-w-3xl">{bio}</p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center lg:justify-start">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                {phone}
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                {email}
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                {location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold text-lg whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-[#18978d] border-b-3 border-[#18978d]'
                  : 'text-gray-600 hover:text-[#ed8022]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {name}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{bio}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#18978d] to-[#ed8022] rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Book Appointment</h3>
                <button className="w-full bg-white text-[#18978d] py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education & Training</h2>
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#18978d] to-[#ed8022] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {edu.year.split('-')[0]}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-[#18978d] font-semibold text-lg mb-1">{edu.institution}</p>
                    <p className="text-gray-600">{edu.location}</p>
                    <p className="text-[#ed8022] font-medium mt-2">{edu.year}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Board Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-[#18978d] rounded-full mr-3"></div>
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specialties' && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialty.name}</h3>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {achievements.map((ach, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg text-gray-800">{ach}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {availableSlots.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="font-semibold text-gray-900 text-lg">{slot.day}</span>
                <span className="text-[#ed8022] font-medium">{slot.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
