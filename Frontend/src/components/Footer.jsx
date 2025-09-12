 import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiClock, FiMapPin, FiChevronRight } from 'react-icons/fi';
import logo from '../assets/cclogo.png';
import { TbDeviceLandlinePhone } from 'react-icons/tb';

const Footer = () => {
  const facilities = [
    "ICU/NICU", "Emergency", "Ventilator", "Ambulance", "XRay", "Pathology", "Physiotherapy"
  ];

  const specialties = [
    "Orthopaedics", "Ophthalmology", "Pediatrics", "Neurology", "General Medicine", "ENT", "Gastrology",
    "General Surgery", "Obstetrics & Gynaecology", "Urology", "Nephrology", "Dental", "Hematology"
  ];

  return (
    <footer className="bg-gray-900 text-white py-10 px-2">
      <div className="container lg:px-12 px-4 sm:px-6 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Hospital Info Section */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-white">Ashaali Hospital</h2>
            <div className="space-y-3 text-gray-300 text-sm">

              {/* Phone */}
              <div className="flex items-center gap-2">
                <FiPhone />
                <a href="tel:+917897934949" className="hover:underline">
                  +91-7897934949
                </a>
              </div>
              <div className="flex items-center gap-2">
                <TbDeviceLandlinePhone />
                <a href="tel:+917897934949" className="hover:underline">
                  0522-3503390, 3503566
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <FiMail />
                <a href="mailto:ashaalihospital@gmail.com" className="hover:underline">
                  ashaalihospital@gmail.com
                </a>
              </div>

              {/* Timing */}
              <div className="flex items-center gap-2">
                <FiClock />
                <p><span className='font-bold'>Opening Hours:</span> 9AM:-4PM </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2">
                <FiMapPin className="mt-1" />
                <a
                  href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggCEEUYOzIGCAAQRRg5MgcIARAAGIAEMgYIAhBFGDsyBwgDEAAYgAQyBwgEEC4YgAQyDwgFEC4YChivARjHARiABDIHCAYQABiABDIGCAcQRRg90gEINTI0NGowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KcMBp_kDVZk5Mb_pkHQJM-K7&daddr=PH-7,+Amrapali+Yojna,+E2,+IIM+ROAD,+near+JOGGERS+PARK,+Dubagga,+Lucknow,+Uttar+Pradesh+226003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  E2/PH-7, Amrapali Yojana <br /> IIM ROAD Joggers Park Chauraha, <br />
                  Lucknow, Uttar Pradesh 226003
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Ashaali", path: "/about/ashaali-hospitals" },
                { name: "Our Doctors", path: "/about/team" },
                { name: "Gallery", path: "/gallery" },
                { name: "Patients Story", path: "/patients-story" },
                { name: "Blogs", path: "/blogs" },
                { name: "Contact Us", path: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-1 hover:text-white transition font-medium"
                  >
                    <FiChevronRight className="text-xs" /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Admin Login Button */}
            <div className="mt-4">
              <a
                href="http://localhost:5173/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#18978d] hover:bg-[#0f6e63] text-white font-semibold rounded-full transition"
              >
                Admin Login
              </a>
            </div>
          </div>

          {/* Facilities Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Facilities</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {facilities.map((item, idx) => (
                <li key={idx}>
                  <Link to={`/facility/${item.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-1 hover:text-white transition">
                    <FiChevronRight className="text-xs" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Specialties</h3>

            <div className="grid grid-cols-2 gap-x-4 text-gray-300 text-sm">
              {/* Left Column */}
              <ul className="space-y-2">
                {specialties.slice(0, Math.ceil(specialties.length / 2)).map((item, idx) => (
                  <li key={idx}>
                    <Link to={`/department/${item.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-1 hover:text-white transition">
                      <FiChevronRight className="text-xs" /> {item}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Right Column */}
              <ul className="space-y-2">
                {specialties.slice(Math.ceil(specialties.length / 2)).map((item, idx) => (
                  <li key={idx + Math.ceil(specialties.length / 2)}>
                    <Link to={`/department/${item.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-1 hover:text-white transition">
                      <FiChevronRight className="text-xs" /> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-center flex-wrap gap-2">
          <p className="text-sm text-white text-center sm:text-left">
            Copyright © 2025 <span className="font-semibold">Ashaali Hospital</span> || All Rights Reserved ||
          </p>
          <a
            href="https://www.codecrafter.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-base text-gray-400 hover:text-main"
          >
            <span className="ml-1 text-white">Developed By:</span>
            <img
              src={logo}
              alt="Code Crafter Web Solutions"
              className="w-24 sm:w-32 max-w-full h-auto object-contain ml-2"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
