 import React, { useEffect, useState } from 'react';
import { Heart, Users, Award, Eye, Target, Calendar, Clock, Stethoscope, UserCheck, Building, Star } from 'lucide-react';
import aboutimage from '../../assets/about.webp';
import AboutHospitalComponent from './AboutHospitalComponent';
import CoreValues from './CoreValue';
import AboutSection from '../../components/AboutSection';
import StatsComponent from '../../components/StatsComponent';
import SpecialistSection from '../../components/SpecialtiesSection';
import HospitalJourney from './HospitalJournery';
import HospitalDoctorsCTA from '../Home/HomeCta';
import FAQ from './Faq';
import BreadCrumb from '../../components/Breadcrumb'; // updated import

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
    { label: 'Home', link: '/' },
    { label: 'About Us' },
  ];

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Updated Breadcrumb Component */}
      <BreadCrumb items={breadcrumbItems} title=" Ashaali Hospitals" />

      <AboutSection />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Core Values */}
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

      {/* Vision & Mission */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {activeTab && (
          <div className="space-y-12 bg-gray-100 py-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision & Mission</h2>
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
                  clinical excellence, innovative treatments, and compassionate care...
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border-t-4 border-orange-500">
                <div className="text-center mb-6">
                  <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700 text-lg text-justify">
                  To provide comprehensive, patient-centered healthcare services with the highest standards...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <HospitalJourney />
      <SpecialistSection />
      <FAQ />
    </div>
  );
};

export default AshaaliHospitalAbout;
