 import React, { useState } from 'react';
import { Search, User, Phone, MessageSquare, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import {
  FaProcedures, FaAmbulance, FaXRay, FaBed, FaClinicMedical, FaStethoscope,
  FaTooth, FaWheelchair, FaHospitalAlt, FaEye, FaChild, FaBrain,
  FaHeartbeat, FaUserMd, FaSyringe, FaMicroscope, FaTeeth, FaLungs,
  FaAllergies, FaNotesMedical
} from 'react-icons/fa';
import { MdPsychology } from 'react-icons/md';

const SahyadriHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
  const [isFacilityOpen, setIsFacility] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const specialties = [ /* your specialties array */ ];
  const facilities = [ /* your facilities array */ ];

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-100  py-[0.3rem] text-sm">
        <div className="container mx-auto ">
          {/* Mobile Layout */}
          <div className="flex flex-col space-y-2 md:hidden">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-xs">Emergency/Appointment</span>
              <a href="tel:+917897934949" className="text-red-600 font-semibold hover:underline">
                +91 7897934949
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Phone className="text-white w-3 h-3" />
              </div>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="text-white w-3 h-3" />
              </div>
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <User className="text-white w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {/* Book Appointment Mobile */}
              <Link 
                to="/book-appointment"
                className="px-4 py-1.5 bg-[#18978d] text-white rounded-md transition-colors text-xs w-full text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden md:flex items-center justify-between px-10">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="hidden lg:inline">For Emergency Ambulance/Appointment</span>
              <span className="lg:hidden">Emergency</span>
              <a href="tel:+917897934949" className="text-red-600 font-semibold hover:underline">
                +91 7897934949
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative xl:block hidden">
                <input
                  type="text"
                  placeholder="Search doctor here"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              {/* Emergency/Contacts */}
              <div className="flex items-center gap-2">
                <a href="mailto:ashaalihospital@gmail.com" className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center">
                  <User className="text-white w-4 h-4" />
                </a>
                <a href="https://wa.me/917897934949" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="text-white w-4 h-4" />
                </a>
                <a href="tel:+917897934949" className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center">
                  <Phone className="text-white w-4 h-4" />
                </a>
              </div>

              {/* Book Appointment Desktop */}
              <div className="flex gap-2">
                <Link 
                  to="/book-appointment"
                  className="px-4 py-1.5 bg-[#18978d] lg:block xl:hidden text-white rounded-md transition-colors text-sm"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between lg:px-10 px-6">
            <Link to={"/"} className=' w-fit'>
              <div className="lg:w-[20rem]">
                <img src={logo} alt="Ashaali-hospital" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 cursor-pointer font-medium">Home</Link>
              <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <div className="flex items-center gap-1 text-gray-700 hover:text-teal-600 cursor-pointer">
                  <span>About</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                {isOpen && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">
                        <Link to="/about/ashaali-hospitals">About Ashaali Hospital</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">
                        <Link to="/about/team">Find A Doctor</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <Link to="/gallery" className="text-gray-700 hover:text-teal-600 cursor-pointer">Gallery</Link>
              <Link to="/blogs" className="text-gray-700 hover:text-teal-600 cursor-pointer">Blogs</Link>
              <Link to="/contact" className="text-gray-700 hover:text-teal-600 cursor-pointer">Contact Us</Link>
            </nav>

            {/* Book Appointment Header */}
            <Link 
              to="/book-appointment" 
              className="px-4 hidden xl:block py-1.5 bg-[#18978d] text-white rounded-md transition-colors text-sm"
            >
              Book Appointment
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden lg:p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SahyadriHeader;
