 import React, { useEffect, useState } from "react";
import {
  Heart,
  Users,
  Award,
  Eye,
  Target,
  Calendar,
  Clock,
  UserCheck,
  Building,
} from "lucide-react";
import AboutSection from "../../components/AboutSection";
import SpecialistSection from "../../components/SpecialtiesSection";
import HospitalJourney from "./HospitalJournery";
import FAQ from "./Faq";
import BreadCrumb from "../../components/Breadcrumb"; // updated import

const AshaaliHospitalAbout = () => {
  const [activeTab] = useState("overview");

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "About Us" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <BreadCrumb items={breadcrumbItems} title=" Ashaali Hospital" />

      <AboutSection />

      {/* Core Values */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-teal-50 to-orange-50 p-6 sm:p-8 rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            Our Core Values
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Compassion</h4>
              <p className="text-gray-700 text-sm sm:text-base leading-snug">
                We treat every patient with empathy, kindness, and respect.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Excellence</h4>
              <p className="text-gray-700 text-sm sm:text-base leading-snug">
                We strive for the highest standards in everything we do.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Integrity</h4>
              <p className="text-gray-700 text-sm sm:text-base leading-snug">
                We maintain the highest ethical standards in all our
                interactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {activeTab && (
          <div className="space-y-8 sm:space-y-12 bg-gray-100 py-6 sm:py-8">
            <div className="text-center mb-6 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Vision & Mission
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Vision */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border-t-4 border-teal-600">
                <div className="text-center mb-4 sm:mb-6">
                  <Eye className="w-12 h-12 sm:w-16 sm:h-16 text-teal-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                  To be the leading healthcare provider in the region, recognized
                  for our commitment to clinical excellence, innovative
                  treatments, and compassionate care...
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border-t-4 border-orange-500">
                <div className="text-center mb-4 sm:mb-6">
                  <Target className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                  To provide comprehensive, patient-centered healthcare services
                  with the highest standards...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Other sections */}
      <HospitalJourney />
      <SpecialistSection />
      <FAQ />
    </div>
  );
};

export default AshaaliHospitalAbout;
