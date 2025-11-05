import React from "react";
import { Link } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiMapPin,
  FiChevronRight,
} from "react-icons/fi";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import logo from "../assets/code.png";

const Footer = () => {
  const facilities = [
    "ICU",
    "Emergency",
    "Ventilator",
    "Ambulance",
    "XRay",
    "Pathology",
    "Physiotherapy",
  ];
  const specialties = [
    "Orthopaedics",
    "Ophthalmology",
    "Pediatrics",
    "Neurology",
    "General Medicine",
    "ENT",
    "Gastrology",
    "General Surgery",
    "Obstetrics & Gynaecology",
    "Urology",
    "Nephrology",
    "Dental",
    "Hematology",
  ];
  const leftSpecialties = specialties.slice(
    0,
    Math.ceil(specialties.length / 2)
  );
  const rightSpecialties = specialties.slice(Math.ceil(specialties.length / 2));

  return (
    <footer className="bg-gray-900 text-white py-6 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Ashaali Hospital</h2>

            <div className="space-y-3 text-gray-300 text-sm">
              {/* Phone Numbers */}
              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex flex-wrap items-center gap-x-3">
                  <a href="tel:+918303212210" className="hover:underline">
                    +91-83032 12210
                  </a>
                  <a href="tel:+917897934949" className="hover:underline">
                    +91-78979 34949
                  </a>
                </div>
              </div>

              {/* Landline */}
              <div className="flex items-center gap-3">
                <TbDeviceLandlinePhone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex flex-wrap items-center gap-x-2">
                  <a href="tel:05223503390" className="hover:underline">
                    0522-3503390
                  </a>
                  <span>,</span>
                  <a href="tel:05223503566" className="hover:underline">
                    0522-3503566
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a
                  href="mailto:ashaalihospital@gmail.com"
                  className="hover:underline break-all"
                >
                  ashaalihospital@gmail.com
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <FiClock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <p>
                  <span className="font-bold">Opening Hours:</span> 9AM - 4PM
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-[2px]" />
                <a
                  href="https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KcMBp_kDVZk5Mb_pkHQJM-K7&daddr=PH-7,+Amrapali+Yojna,+E2,+IIM+ROAD,+near+JOGGERS+PARK,+Dubagga,+Lucknow,+Uttar+Pradesh+226003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline leading-relaxed"
                >
                  E2/PH-7, Amrapali Yojana, IIM ROAD, near Joggers Park
                  Chauraha, Lucknow, Uttar Pradesh 226003
                </a>
              </div>

              {/* Admin Login Button with gap below contact section */}
              <div className="pt-3 md:ml-6 mt-4">
                <a
                  href="https://ashaali-adminpage.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center px-6 py-2.5 w-full sm:w-auto font-semibold rounded-full bg-[#18978d] text-white transition-all duration-300 hover:bg-[#0f6e63] hover:scale-[1.03] hover:shadow-md"
                  aria-label="Go to Admin Login Page at Ashaali Hospital"
                >
                  Admin Login
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="mt-3  text-gray-300 text-sm">
              {[
                { name: "Home", path: "/" },
                {
                  name: "About Ashaali Hospital",
                  path: "/about/ashaali-hospitals",
                },
                { name: "Our Doctors", path: "/about/team" },
                { name: "Gallery", path: "/gallery" },
                { name: "Patients Story", path: "/patients-story" },
                { name: "Blogs", path: "/blogs" },
                { name: "Careers", path: "/careers" },
                { name: "Contact Us", path: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 hover:text-white transition font-normal py-1"
                  >
                    <FiChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <span className="leading-tight">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Desktop / Laptop View (md and up) */}
          <div className="hidden md:flex flex-col sm:col-span-2 lg:col-span-1 lg:pr-8 xl:pr-12">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Specialties
            </h3>

            <div className="mt-3 grid grid-cols-2 md:gap-x-16 text-gray-300 text-sm">
              {leftSpecialties.map((leftItem, idx) => (
                <React.Fragment key={idx}>
                  {/* Left column item */}
                  <div className="flex items-center gap-2 py-1">
                    <FiChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <Link
                      to={`/department/${leftItem
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="whitespace-nowrap hover:text-white transition"
                    >
                      {leftItem}
                    </Link>
                  </div>

                  {/* Right column item */}
                  {rightSpecialties[idx] ? (
                    <div className="flex items-center gap-2 py-1">
                      <FiChevronRight className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-teal-500 transition" />
                      <a
                        href="#"
                        className="whitespace-nowrap hover:text-white transition group"
                      >
                        {rightSpecialties[idx]}
                      </a>
                    </div>
                  ) : (
                    <div />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ✅ Mobile View (sm only) */}
          <div className="flex md:hidden flex-col sm:col-span-2 lg:col-span-1 lg:pr-8 xl:pr-12">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Specialties
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-x-4 sm:gap-x-8 text-gray-300 text-sm">
              {leftSpecialties.map((leftItem, idx) => (
                <React.Fragment key={idx}>
                  {/* Left column item */}
                  <div className="flex items-center gap-1.5 py-1">
                    <FiChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <Link
                      to={`/department/${leftItem
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="hover:text-white transition break-words"
                    >
                      {leftItem}
                    </Link>
                  </div>

                  {/* Right column item */}
                  {rightSpecialties[idx] ? (
                    <div className="flex items-center gap-1.5 py-1">
                      <FiChevronRight className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-teal-500 transition" />
                      <a
                        href="#"
                        className="hover:text-white transition group break-words"
                      >
                        {rightSpecialties[idx]}
                      </a>
                    </div>
                  ) : (
                    <div />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:ml-10 sm:col-span-2 lg:col-span-1 lg:pl-8 xl:pl-12">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
              Facilities
            </h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  text-gray-300 text-sm">
              {facilities.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/facility/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2 hover:text-white transition py-1"
                  >
                    <FiChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <span className="leading-tight">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* ----------------------- Bottom Bar ----------------------- */}
        <div>
          <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-center text-gray-400 text-sm">
            <div className="mb-3 md:mb-0">
              © 2025 Ashaali Hospital. All rights reserved.
            </div>
            <div className="flex items-center">
              <span className="mr-2">Designed & Developed by</span>
              <a
                href="https://codecrafter.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-gray-800 group"
              >
                <img src={logo} alt="Code crafter Logo" className="h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
