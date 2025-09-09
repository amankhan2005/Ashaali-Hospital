import React, { useEffect } from 'react';
import { Phone, MapPin, Calendar, Award, Briefcase, User, Stethoscope } from 'lucide-react';
import BreadCrumbs from '../../components/Breadcums';

export default function DoctorProfile() {
      const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Dr. Sarah Johnson' },
  ];

      // Scroll to top on component mount
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="min-h-screen bg-gray-50">
              <BreadCrumbs items={breadcrumbItems} headText={"Doctor Details"} />


      {/* Main Content */}
      <main className="container  mx-auto px-2 sm:px-6 lg:px-8 py-8">
        {/* Doctor Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23f3f4f6'/%3E%3Ctext x='150' y='200' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EDoctor Photo%3C/text%3E%3C/svg%3E"
                alt="Dr. Priya S P Patil"
                className="w-64 h-80 object-cover rounded-lg"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-[#18978d] mb-2">Dr. Priya S P Patil</h1>
              <p className="text-gray-600 mb-6">Consultant- Obstetrician & Gynecologist</p>

              <div className="space-y-6">
                {/* Speciality */}
                <div>
                  <div className="flex items-center mb-2">
                    <Stethoscope className="w-5 h-5 text-[#18978d] mr-2" />
                    <h3 className="text-lg font-semibold text-[#18978d]">Speciality</h3>
                  </div>
                  <p className="text-gray-700">Obstetrician & Gynecologist, Laparoscopic Surgeon, Infertility Specialist.</p>
                </div>

                {/* Qualification */}
                <div>
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 text-[#18978d] mr-2" />
                    <h3 className="text-lg font-semibold text-[#18978d]">Qualification</h3>
                  </div>
                  <p className="text-gray-700">M.B.B.S, M.S OBG, ( FMIS )</p>
                </div>

                {/* Experience */}
                <div>
                  <div className="flex items-center mb-2">
                    <Briefcase className="w-5 h-5 text-[#18978d] mr-2" />
                    <h3 className="text-lg font-semibold text-[#18978d]">Experience</h3>
                  </div>
                  <p className="text-gray-700">8 Years</p>
                </div>

                {/* Book Appointment Button */}
                <button className="bg-[#18978d] text-white px-8 py-3 rounded-lg hover:bg-[#147a6b] transition duration-200">
                  Book An Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fields of Expertise */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-8">
          <h2 className="text-2xl font-bold text-[#18978d] mb-6">Fields Of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <User className="w-5 h-5 text-[#18978d] mr-3" />
              <span className="text-gray-700">Gynaecological Laparoscopic & Minimally Invasive Surgery</span>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-[#18978d] mr-3" />
              <span className="text-gray-700">Lap Hysterectomy</span>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-[#18978d] mr-3" />
              <span className="text-gray-700">Infertility Treatments</span>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-[#18978d] mr-3" />
              <span className="text-gray-700">Cystectomy</span>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-8">
          <h2 className="text-2xl font-bold text-[#18978d] mb-4">About Dr Priya Patil</h2>
          <p className="text-gray-700 leading-relaxed">
            Dr Priya Patil, a gold medalist Obstetrician & Gynecologist, is one of our leading young upcoming Gynaec surgeons with expertise in handling Laparoscopic and Minimal invasive surgeries. Dr Priya is also an expert in normal delivery and water birth delivery and encourages the natural birthing process over C-section (Caesarean) and has proven excellent results to all her patients
          </p>
        </div>

        {/* Educational Qualifications */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-8">
          <h2 className="text-2xl font-bold text-[#18978d] mb-4">Educational Qualifications</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Fellowship in Minimal invasive gynecological surgery</li>
            <li>• M.S OBG from KMC, Manipal – Gold Medalist</li>
            <li>• M.B.B.S from BGS Global institute of medical sciences, Bangalore</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="bg-[#18978d] text-white rounded-lg p-6">
          <div className="flex items-center justify-center">
            <Phone className="w-5 h-5 mr-2" />
            <p className="text-lg">
              For Appointments with Dr. Priya Patil, you can call us on +91 9738622542
            </p>
          </div>
        </div>
      </main>


    </div>
  );
}