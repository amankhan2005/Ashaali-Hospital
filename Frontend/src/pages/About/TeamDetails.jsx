import React, { useState } from 'react'
import BreadCrumbsComponent from '../../components/Breadcums'

const TeamDetails = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Dr. Sarah Johnson' },
  ];

  const doctorData = {
    name: "Dr. Sarah Johnson",
    title: "Senior Cardiologist & Heart Specialist",
    specialization: "Interventional Cardiology",
    qualification: "MD, FACC, FSCAI",
    experience: "15+ Years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
    bio: "Dr. Sarah Johnson is a renowned cardiologist with over 15 years of experience in interventional cardiology. She specializes in complex cardiac procedures and has performed over 3,000 successful interventions. Her dedication to patient care and innovative treatment approaches has made her one of the most respected cardiologists in the region.",
    phone: "+1 (555) 123-4567",
    email: "dr.sarah@hospital.com",
    location: "Heart Center, Floor 3, Room 301"
  };

  const education = [
    {
      degree: "Doctor of Medicine (MD)",
      institution: "Harvard Medical School",
      year: "2008",
      location: "Boston, MA"
    },
    {
      degree: "Residency in Internal Medicine",
      institution: "Johns Hopkins Hospital",
      year: "2008-2011",
      location: "Baltimore, MD"
    },
    {
      degree: "Fellowship in Cardiology",
      institution: "Mayo Clinic",
      year: "2011-2014",
      location: "Rochester, MN"
    },
    {
      degree: "Fellowship in Interventional Cardiology",
      institution: "Cleveland Clinic",
      year: "2014-2015",
      location: "Cleveland, OH"
    }
  ];

  const certifications = [
    "American Board of Internal Medicine - Internal Medicine",
    "American Board of Internal Medicine - Cardiovascular Disease",
    "American Board of Internal Medicine - Interventional Cardiology",
    "Fellow of the American College of Cardiology (FACC)",
    "Fellow of the Society for Cardiovascular Angiography and Interventions (FSCAI)",
    "Advanced Cardiac Life Support (ACLS)",
    "Basic Life Support (BLS)"
  ];

  const specialties = [
    {
      name: "Coronary Angioplasty",
      description: "Minimally invasive procedure to open blocked arteries"
    },
    {
      name: "Cardiac Catheterization",
      description: "Diagnostic procedure to examine heart function"
    },
    {
      name: "Stent Placement",
      description: "Insertion of small mesh tubes to keep arteries open"
    },
    {
      name: "Heart Disease Prevention",
      description: "Comprehensive preventive cardiology programs"
    },
    {
      name: "Acute Coronary Syndrome",
      description: "Emergency treatment of heart attacks"
    },
    {
      name: "Structural Heart Disease",
      description: "Treatment of valve disorders and congenital defects"
    }
  ];

  const achievements = [
    "Performed over 3,000 successful cardiac interventions",
    "Published 25+ research papers in peer-reviewed journals",
    "Recipient of Excellence in Patient Care Award 2023",
    "Speaker at 15+ international cardiology conferences",
    "Lead researcher in 5 clinical trials",
    "Mentor to 20+ cardiology fellows"
  ];

  const availableSlots = [
    { day: "Monday", time: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 3:00 PM" },
    { day: "Thursday", time: "9:00 AM - 5:00 PM" },
    { day: "Friday", time: "9:00 AM - 4:00 PM" },
    { day: "Saturday", time: "9:00 AM - 1:00 PM" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'education', label: 'Education' },
    { id: 'specialties', label: 'Specialties' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'schedule', label: 'Schedule' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumbsComponent items={breadcrumbItems} headText={"Doctor Details"} />
      
      {/* Doctor Profile Header */}
      <div className="bg-gradient-to-r from-[#18978d] to-[#ed8022] py-16 px-4">
        <div className=" container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Doctor Image */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <img
                  src={doctorData.image}
                  alt={doctorData.name}
                  className="w-80 h-80 rounded-2xl object-cover border-8 border-white/20 shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#18978d] to-[#ed8022] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-white mb-4 ">
                {doctorData.name}
              </h1>
              <p className="text-2xl text-white/90 mb-4 font-semibold">
                {doctorData.title}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-lg font-medium">
                  {doctorData.qualification}
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-lg font-medium">
                  {doctorData.experience} Experience
                </span>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-3xl">
                {doctorData.bio}
              </p>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  {doctorData.phone}
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  {doctorData.email}
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  {doctorData.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
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
      </div>

      {/* Tab Content */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">About Dr. {doctorData.name.split(' ')[1]}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {doctorData.bio}
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Dr. Johnson's approach to patient care combines cutting-edge medical technology with compassionate, 
                    personalized treatment. She believes in educating her patients about their conditions and involving 
                    them in treatment decisions to achieve the best possible outcomes.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#18978d] mb-2">Years of Experience</h4>
                      <p className="text-gray-600">{doctorData.experience}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#18978d] mb-2">Primary Specialization</h4>
                      <p className="text-gray-600">{doctorData.specialization}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#18978d] mb-2">Procedures Performed</h4>
                      <p className="text-gray-600">3,000+ Cardiac Interventions</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#18978d] mb-2">Research Papers</h4>
                      <p className="text-gray-600">25+ Published Articles</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#18978d] to-[#ed8022] rounded-2xl shadow-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Book Appointment</h3>
                  <p className="mb-6 text-white/90">
                    Schedule a consultation with Dr. Johnson for expert cardiac care.
                  </p>
                  <button className="w-full bg-white text-[#18978d] py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                    Schedule Now
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contact</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">For cardiac emergencies</p>
                      <p className="text-2xl font-bold text-[#ed8022]">911</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Direct line</p>
                      <p className="text-lg font-semibold text-[#18978d]">{doctorData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education & Training</h2>
              <div className="space-y-6">
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
              </div>

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

          {/* Specialties Tab */}
          {activeTab === 'specialties' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Areas of Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialties.map((specialty, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#18978d] to-[#ed8022] rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{specialty.name}</h3>
                    <p className="text-gray-600">{specialty.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#18978d] to-[#ed8022] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg text-gray-800">{achievement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Availability Schedule</h2>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-6">
                  <h3 className="text-2xl font-bold text-white text-center">Weekly Schedule</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {availableSlots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#18978d] rounded-full mr-4"></div>
                          <span className="font-semibold text-gray-900 text-lg">{slot.day}</span>
                        </div>
                        <span className="text-[#ed8022] font-medium">{slot.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-yellow-800">Please Note:</span>
                    </div>
                    <p className="text-yellow-700">
                      Sunday is reserved for emergency cases only. Please call ahead to confirm availability 
                      as schedules may change due to surgical procedures or emergencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  )
}

export default TeamDetails