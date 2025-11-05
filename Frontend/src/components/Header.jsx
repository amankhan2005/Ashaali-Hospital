import React, { useEffect, useState } from "react";
import {
  Search,
  User,
  Phone,
  MessageSquare,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import {
  FaProcedures,
  FaAmbulance,
  FaXRay,
  FaBed,
  FaClinicMedical,
  FaStethoscope,
  FaTooth,
  FaWheelchair,
  FaHospitalAlt,
  FaEye,
  FaChild,
  FaBrain,
  FaHeartbeat,
  FaUserMd,
  FaSyringe,
  FaMicroscope,
  FaTeeth,
  FaLungs,
  FaAllergies,
  FaNotesMedical,
  FaPhoneAlt,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaYoutube,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { MdPsychology } from "react-icons/md";

const SahyadriHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
  const [isFacilityOpen, setIsFacility] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const specialties = [
    // Column 1
    [
      { name: "Orthopaedics", icon: <FaHospitalAlt /> },
      { name: "Ophthalmology", icon: <FaEye /> },
      { name: "Pediatrics", icon: <FaChild /> },
      { name: "Neurology", icon: <FaBrain /> },
      { name: "General Medicine", icon: <FaHeartbeat /> },
      { name: "ENT", icon: <FaUserMd /> },
      { name: "Gastrology", icon: <FaSyringe /> },
    ],
    // Column 2
    [
      { name: "General Surgery", icon: <FaMicroscope /> },
      { name: "obstetrics-gynaecology", icon: <FaHeartbeat /> },
      { name: "Urology", icon: <FaUserMd /> },
      { name: "Nephrology", icon: <FaTeeth /> },
      { name: "Dental", icon: <FaTeeth /> },
      { name: "Hematology", icon: <FaSyringe /> },
      { name: "Pulmonology", icon: <FaLungs /> },
    ],
    // Column 3
    [
      { name: "Dermatology", icon: <FaAllergies /> },
      { name: "Psychiatry", icon: <MdPsychology /> },
      { name: "Cardiology", icon: <FaHeartbeat /> },
      { name: "Oncology", icon: <FaNotesMedical /> },
      { name: "ICU and Critical Care", icon: <FaHospitalAlt /> },
      { name: "Endocrinology", icon: <FaUserMd /> },
      { name: "Neurosurgery", icon: <FaBrain /> },
    ],
  ];

  const facilities = [
    // Column 1
    [
      { name: "ICU", icon: <FaProcedures /> },
      { name: "NICU", icon: <FaHeartbeat /> },
      { name: "Emergency", icon: <FaAmbulance /> },
      { name: "Ventilator", icon: <FaStethoscope /> },
      { name: "Ambulance", icon: <FaAmbulance /> },
      { name: "XRay", icon: <FaXRay /> },
      { name: "Pathology", icon: <FaClinicMedical /> },
    ],
    // Column 2
    [
      { name: "General Ward", icon: <FaBed /> },
      { name: "Private", icon: <FaUserMd /> },
      { name: "Semi Private", icon: <FaUserMd /> },
      { name: "Deluxe", icon: <FaBed /> },
      { name: "Physiotherapy", icon: <FaWheelchair /> },
      { name: "Canteen", icon: <FaTooth /> },
    ],
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsSpecialtiesOpen(false);
      setIsFacility(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="w-full fixed top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100  py-[0.3rem] text-sm">
        <div className="container mx-auto ">
          {/* Top Layout */}
          <div className="flex flex-col space-y-2 md:hidden">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-xs">Emergency/Appointment</span>
              <a
                href="tel:+91830321220"
                className="text-red-600 font-semibold hover:underline"
              >
                +91-83032 12210{" "}
              </a>
              <a
                href="tel:05223503390 "
                className="hidden md:block text-red-600 font-semibold hover:underline"
              >
                05223503390
              </a>
            </div>

            <div className="hidden   items-center justify-center gap-3">
              {" "}
              /* hide in mobile */
              {/* Call */}
              {/* <a
                href="tel:+917897934949"
                className="   w-8 h-8 bg-red-500 rounded-full items-center justify-center"
              >
                <FaPhoneAlt className="text-white text-sm" />
              </a> */}
              {/* WhatsApp */}
              <a
                href="https://wa.me/918303212210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
              >
                <FaWhatsapp className="text-white text-sm" />
              </a>
              {/* Mail */}
              <a
                href="mailto:ashaalihospital@gmail.com"
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <FaEnvelope className="text-white text-sm" />
              </a>
              {/* YouTube */}
              <a
                href="www.youtube.com/@AshaaliHospital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
              >
                <FaYoutube className="text-white text-sm" />
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/ashaali-hospital/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center"
              >
                <FaLinkedin className="text-white text-sm" />
              </a>
              {/* X insta */}
              <a
                href="https://www.instagram.com/ashaalihospital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center"
              >
                <FaInstagram className="text-white text-sm" />
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61555497311285"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <FaFacebookF className="text-white text-sm" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {/* <button className="px-4 py-1.5 border border-[#18978d] text-[#18978d] rounded-md hover:bg-red-50 transition-colors text-xs">
                Home Care
              </button> */}
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                  to="/book-appointment"
                  className="px-20 py-1.5 bg-[#18978d] text-white text-center rounded-xl transition-colors text-xs w-fit mx-auto"
                  aria-label="Go to Book Appointment Page at Ashaali Hospital"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden md:flex items-center justify-between px-10">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="hidden lg:inline">
                For Emergency Ambulance/Appointment
              </span>
              <span className="lg:hidden">Emergency</span>
              <a
                href="tel:+91830321220"
                className="text-red-600 font-semibold hover:underline"
              >
                +91-83032 12210
              </a>
              <a
                href="tel:05223503390 "
                className="text-red-600 font-semibold hover:underline "
              >
                0522-3503390
              </a>
            </div>

            <div className="flex items-center gap-4">
             <Link
  to="/careers"
  className="inline-block bg-teal-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300"
  aria-label="Go to Careers Page at Ashaali Hospital"
>
  Careers
</Link>


              {/* Emergency Contacts */}
              <div className="hidden md:flex gap-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/918303212210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <FaWhatsapp className="text-white text-sm" />
                </a>

                {/* Mail */}
                <a
                  href="mailto:ashaalihospital@gmail.com"
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <FaEnvelope className="text-white text-sm" />
                </a>

                {/* YouTube */}
                <a
                  href="www.youtube.com/@AshaaliHospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
                >
                  <FaYoutube className="text-white text-sm" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/ashaali-hospital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center"
                >
                  <FaLinkedin className="text-white text-sm" />
                </a>

                {/* Insta */}
                <a
                  href="https://www.instagram.com/ashaalihospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center"
                >
                  <FaInstagram className="text-white text-sm" />
                </a>

                {/* Facebook */}
                <a
                  href=" https://www.facebook.com/profile.php?id=61555497311285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <FaFacebookF className="text-white text-sm" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link className="px-4 py-1.5 bg-[#18978d] lg:block xl:hidden text-white rounded-md transition-colors text-sm" aria-label="Go to Book Appointment Page at Ashaali Hospital">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto  ">
          <div className="flex items-center justify-between lg:px-10 md:pr-0 pr-6">
            {/* Logo */}
            <Link to={"/"} className="w-fit">
              <div className="w-[14rem] md:w-[16rem] lg:w-[14rem] xl:w-[18rem]">
                <img
                  src={logo}
                  alt="Ashaali Hospital"
                  width="720"
                  height="180"
                  decoding="async"
                  fetchpriority="high"
                  loading="eager"
                  className="w-full h-auto p-2 object-contain"
                  style={{ display: "block" }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[15px] font-medium text-gray-700">
              {/* Home */}
              <Link
                to="/"
                className="hover:text-teal-600 transition-colors cursor-pointer"
              >
                Home
              </Link>

              {/* About */}
              <div
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-1 hover:text-teal-600 cursor-pointer transition-colors">
                  <span>About</span>
                  <ChevronDown className="w-4 h-4" />
                </div>

                {isOpen && (
                  <div className="absolute left-0 mt-0 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                    <ul className="py-2 text-[15px] text-gray-700 font-medium">
                      <li className="px-4 py-2 hover:text-teal-600 transition-colors">
                        <Link to="/about/ashaali-hospitals">
                          About Ashaali Hospital
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:text-teal-600 transition-colors">
                        <Link to="/about/team">Find A Doctor</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Specialties */}
              <div
                className="relative flex items-center gap-1 hover:text-teal-600 cursor-pointer transition-colors"
                onMouseEnter={() => setIsSpecialtiesOpen(true)}
                onMouseLeave={() => setIsSpecialtiesOpen(false)}
              >
                <span>Specialties</span>
                <ChevronDown className="w-4 h-4" />

                {isSpecialtiesOpen && (
                  <div className="absolute top-full left-0 mt-0 bg-white shadow-2xl rounded-lg px-4 py-2 z-50 w-screen max-w-2xl border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {specialties.map((column, columnIndex) => (
                        <div key={columnIndex} className="space-y-1">
                          {column.map((specialty, index) => (
                            <Link
                              key={index}
                              to={`/department/${specialty.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="flex items-center gap-2 text-[15px] text-gray-700 hover:text-teal-600 transition-colors py-1"
                            >
                              <span className="text-teal-600 text-base">
                                {specialty.icon}
                              </span>
                              <span>{specialty.name}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Facility */}
              <div
                className="relative flex items-center gap-1 hover:text-teal-600 cursor-pointer transition-colors"
                onMouseEnter={() => setIsFacility(true)}
                onMouseLeave={() => setIsFacility(false)}
              >
                <span>Facility</span>
                <ChevronDown className="w-4 h-4" />

                {isFacilityOpen && (
                  <div className="absolute top-full left-0 mt-0 bg-white shadow-2xl border border-gray-100 rounded-lg px-3 py-2 z-50 w-screen max-w-[22rem]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {facilities.map((column, columnIndex) => (
                        <div key={columnIndex} className="space-y-1">
                          {column.map((facility, index) => (
                            <Link
                              key={index}
                              to={`/facility/${facility.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="flex items-center gap-2 text-[15px] text-gray-700 hover:text-teal-600 transition-colors py-1"
                            >
                              <span className="text-teal-600 text-base">
                                {facility.icon}
                              </span>
                              <span>{facility.name}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Links */}
              <Link
                to="/gallery"
                className="hover:text-teal-600 cursor-pointer transition-colors"
              >
                Gallery
              </Link>

              <Link
                to="/blogs"
                className="hover:text-teal-600 cursor-pointer transition-colors"
              >
                Blogs
              </Link>

              <Link
                to="/contact"
                className="hover:text-teal-600 cursor-pointer transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            <Link
              to="/book-appointment"
              className=" hidden md:block px-4 py-1.5 bg-[#18978d] text-white rounded-md transition-colors text-sm"
              aria-label="Go to Book Appointment Page at Ashaali Hospital"
            >
              Book Appointment
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden lg:p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctor here"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t bg-white">
              <nav className="py-4 space-y-2">
                {/* Home */}
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="block text-gray-700 hover:text-teal-600 cursor-pointer py-2 px-4 hover:bg-gray-50"
                >
                  Home
                </Link>

                {/* About Section */}
                <div>
                  <div
                    className="flex items-center justify-between text-gray-700 hover:text-teal-600 cursor-pointer py-2 px-4 hover:bg-gray-50"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span>About</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  {isOpen && (
                    <div className="pl-6">
                      <Link
                        to="/about/ashaali-hospitals"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="block  border-b border-gray-200 mb-2 text-[15px] py-1 text-gray-600 "
                      >
                        About Ashaali Hospital
                      </Link>
                      <Link
                        to="/about/team"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="block border-b border-gray-200 mb-2 text-[15px] py-1 text-gray-600"
                      >
                        Find A Doctor
                      </Link>
                    </div>
                  )}
                </div>

                {/* Specialties Section */}
                <div>
                  <div
                    className="flex items-center justify-between text-gray-700 hover:text-teal-600 cursor-pointer py-2 px-4 hover:bg-gray-50"
                    onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
                  >
                    <span>Specialties</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  {isSpecialtiesOpen && (
                    <div className="pl-6 space-y-1">
                      {specialties.flat().map((specialty, index) => (
                        <Link
                          key={index}
                          to={`/department/${specialty.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          className="block border-b border-gray-200 mb-2 text-[15px] text-gray-600 hover:text-teal-600"
                        >
                          {specialty.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Facility Section */}
                <div>
                  <div
                    className="flex items-center justify-between text-gray-700 hover:text-teal-600 cursor-pointer py-2 px-4 hover:bg-gray-50"
                    onClick={() => setIsFacility(!isFacilityOpen)}
                  >
                    <span>Facility</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  {isFacilityOpen && (
                    <div className="pl-6 space-y-1">
                      {facilities.flat().map((facility, index) => (
                        <Link
                          key={index}
                          to={`/facility/${facility.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          className="block border-b border-gray-200 mb-2 text-[15px]  text-sm text-gray-600 hover:text-teal-600"
                        >
                          {facility.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Other Static Links */}
                <Link
                  to="/gallery"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="block text-gray-700 hover:text-teal-600 cursor-pointer py-2 px-4 hover:bg-gray-50"
                >
                  Gallery
                </Link>
                <Link
                  to="/blogs"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="block text-gray-700 hover:text-teal-600 cursor-pointer py-2 px-4 hover:bg-gray-50"
                >
                  Blogs
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="block text-gray-700 hover:text-teal-600 cursor-pointer py-2 px-4 hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SahyadriHeader;
