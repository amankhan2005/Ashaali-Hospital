import React, { useEffect, useState } from 'react';
import { Heart, Users, Award, Eye, Target, Phone, Mail, MapPin, Calendar, Clock, Stethoscope, UserCheck, Building, Star } from 'lucide-react';
import BreadCrumbsComponent from '../../components/Breadcums';
import aboutimage from '../../assets/about.webp'
import AboutHospitalComponent from './AboutHospitalComponent';
import CoreValues from './CoreValue';
import AboutSection from '../../components/AboutSection';
import StatsComponent from '../../components/StatsComponent';
import SpecialistSection from '../../components/SpecialtiesSection';
import HospitalJourney from './HospitalJournery';
import HospitalDoctorsCTA from '../Home/HomeCta';
import FAQ from './Faq';

const AshaaliHospitalAbout = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const services = [
    { name: 'Emergency Care', icon: '🚑', description: '24/7 emergency medical services' },
    { name: 'Cardiology', icon: '❤️', description: 'Comprehensive heart care' },
    { name: 'Orthopedics', icon: '🦴', description: 'Bone and joint specialists' },
    { name: 'Pediatrics', icon: '👶', description: 'Child healthcare services' },
    { name: 'Surgery', icon: '⚕️', description: 'Advanced surgical procedures' },
    { name: 'Radiology', icon: '📊', description: 'Medical imaging services' }
  ];

  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: Calendar },
    { number: '50+', label: 'Expert Doctors', icon: UserCheck },
    { number: '200+', label: 'Beds Available', icon: Building },
    { number: '24/7', label: 'Emergency Care', icon: Clock }
  ];

  const doctors = [
    { name: 'Dr. Rajesh Kumar', specialty: 'Chief Cardiologist', experience: '20+ years', image: '👨‍⚕️' },
    { name: 'Dr. Priya Sharma', specialty: 'Head of Pediatrics', experience: '15+ years', image: '👩‍⚕️' },
    { name: 'Dr. Amit Patel', specialty: 'Orthopedic Surgeon', experience: '18+ years', image: '👨‍⚕️' },
    { name: 'Dr. Sunita Gupta', specialty: 'Emergency Medicine', experience: '12+ years', image: '👩‍⚕️' }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us' },

  ];

      // Scroll to top on component mount
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="min-h-screen bg-gray-100">
        <BreadCrumbsComponent items={breadcrumbItems} headText={"About Ashaali Hospitals"} />
      {/* <BreadCrumbsComponent  items={breadcrumbItems} headText={"About Ashaali Hospitals"}/> */}
      {/* <div className='mx-auto flex items-center justify-center rounded-2xl'>
        <img src={aboutimage} alt="hospital-image" />
      </div> */}


      <AboutSection />
      {/* <AboutHospitalComponent/> */}
      {/* <StatsComponent/> */}



      {/* <CoreValues/> */}

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        <div className="bg-gradient-to-r from-teal-50 to-orange-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Compassion</h4>
              <p className="text-gray-700">We treat every patient with empathy, kindness, and respect.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-700">We strive for the highest standards in everything we do.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Integrity</h4>
              <p className="text-gray-700">We maintain the highest ethical standards in all our interactions.</p>
            </div>
          </div>
        </div>



      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">



        {/* Vision & Mission Section */}
        {activeTab && (
          <div className="space-y-12  bg-gray-100 py-6">
            <div className="text-center  mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Vision & Mission
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border-t-4 border-teal-600">
                <div className="text-center mb-6">
                  <Eye className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700 text-lg text-justify">
                  To be the leading healthcare provider in the region, recognized for our commitment to
                  clinical excellence, innovative treatments, and compassionate care. We envision a future
                  where every individual has access to world-class healthcare services that promote healing,
                  wellness, and a better quality of life
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border-t-4 border-orange-500">
                <div className="text-center mb-6">
                  <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700 text-lg text-justify">
                  To provide comprehensive, patient-centered healthcare services with the highest standards
                  of medical excellence. We are dedicated to improving the health and well-being of our
                  community through innovative treatments, preventive care, and continuous medical education,
                  all delivered with compassion and integrity
                </p>
              </div>
            </div>

            {/* Core Values */}

          </div>
        )}



        {/* TOur Core Valueseam Section */}
        {/* {activeTab && (
          <div className="space-y-12  bg-gray-100 py-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Expert Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our dedicated team of healthcare professionals brings years of experience and expertise to provide you with the best possible care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-6xl mb-4">{doctor.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-teal-600 font-medium mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.experience}</p>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}




        {/* Facilities Section */}
        {activeTab === 'facilities' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                World-Class Facilities
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our modern infrastructure and advanced medical equipment ensure the highest quality of care
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Infrastructure & Equipment</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Advanced ICU Units</h4>
                      <p className="text-gray-700">State-of-the-art intensive care units with 24/7 monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Modern Operation Theaters</h4>
                      <p className="text-gray-700">Fully equipped surgical suites with latest technology</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Digital Imaging Center</h4>
                      <p className="text-gray-700">Advanced radiology and diagnostic imaging services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Emergency Department</h4>
                      <p className="text-gray-700">Round-the-clock emergency care and trauma services</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-100 to-orange-100 p-8 rounded-2xl">
                <Stethoscope className="w-16 h-16 text-teal-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Patient-Centered Care</h3>
                <p className="text-gray-700 mb-6">
                  Our facilities are designed with patient comfort and healing in mind. From spacious private rooms
                  to peaceful healing gardens, every aspect of our environment promotes recovery and well-being.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Private patient rooms with modern amenities</li>
                  <li>✓ Family waiting areas and consultation rooms</li>
                  <li>✓ Pharmacy and laboratory services on-site</li>
                  <li>✓ Ample parking and easy accessibility</li>
                </ul>
              </div>
            </div>
          </div>
        )}


      </div>

      <HospitalJourney />

      {/* <HospitalDoctorsCTA /> */}
      <SpecialistSection />

      <FAQ/>




    </div>
  );
};

export default AshaaliHospitalAbout;