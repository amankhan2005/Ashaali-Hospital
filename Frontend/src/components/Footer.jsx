 import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiClock, FiMapPin, FiChevronRight } from 'react-icons/fi';
import { TbDeviceLandlinePhone } from 'react-icons/tb';

const Footer = () => {
  const facilities = [
    'ICU','Emergency','Ventilator','Ambulance','XRay','Pathology','Physiotherapy',
  ];

  const specialties = [
    'Orthopaedics','Ophthalmology','Pediatrics','Neurology','General Medicine','ENT','Gastrology',
    'General Surgery','Obstetrics & Gynaecology','Urology','Nephrology','Dental','Hematology',
  ];

  const leftSpecialties  = specialties.slice(0, Math.ceil(specialties.length / 2));
  const rightSpecialties = specialties.slice(Math.ceil(specialties.length / 2));

  return (
    <footer className="bg-gray-900 text-white py-10 px-3">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* ===== Top Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20">

          {/* 1) Hospital Info */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Ashaali Hospital</h2>

            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <FiPhone />
                <a href="tel:+918303212210" className="hover:underline">+91-83032 12210</a>
                <a href="tel:+917897934949" className="hover:underline">+91-78979 34949</a>
              </div>

              <div className="flex items-center gap-2">
                <TbDeviceLandlinePhone />
                <div className="space-x-1">
                  <a href="tel:05223503390" className="hover:underline">0522-3503390</a>
                  <span>,</span>
                  <a href="tel:05223503566" className="hover:underline">0522-3503566</a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FiMail />
                <a href="mailto:ashaalihospital@gmail.com" className="hover:underline">
                  ashaalihospital@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <FiClock />
                <p><span className="font-bold">Opening Hours:</span> 9AM - 4PM</p>
              </div>

              <div className="flex items-start gap-2">
                <FiMapPin className="mt-1" />
                <a
                  href="https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KcMBp_kDVZk5Mb_pkHQJM-K7&daddr=PH-7,+Amrapali+Yojna,+E2,+IIM+ROAD,+near+JOGGERS+PARK,+Dubagga,+Lucknow,+Uttar+Pradesh+226003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  E2/PH-7, Amrapali Yojana <br />
                  IIM ROAD Joggers Park Chauraha, <br />
                  Lucknow, Uttar Pradesh 226003
                </a>
              </div>
            </div>
          </div>

          {/* 2) Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Quick Links</h3>

            <ul className="mt-4 space-y-2 text-gray-300 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Ashaali Hospital', path: '/about/ashaali-hospitals' },
                { name: 'Our Doctors', path: '/about/team' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Patients Story', path: '/patients-story' },
                { name: 'Blogs', path: '/blogs' },
                { name: 'Careers', path: '/careers' },
                { name: 'Contact Us', path: '/contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 hover:text-white transition font-medium"
                  >
                    <FiChevronRight className="text-xs w-4 shrink-0" />
                    <span className="leading-tight">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

           <div className="mt-5">
              <a
                href="https://ashaali-adminpage.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#18978d] hover:bg-[#0f6e63] text-white font-semibold rounded-full transition"
              >
                Admin Login
              </a>
            </div>
          </div>

          {/* 3) Specialties */}
          <div className="flex flex-col lg:pr-4">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Specialties</h3>

            {/* single col on phones, two cols from sm+ */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-gray-300 text-sm">
              <ul className="space-y-2">
                {leftSpecialties.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/department/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="min-w-0 flex items-start sm:items-center gap-2 hover:text-white transition whitespace-normal sm:whitespace-nowrap"
                    >
                      <FiChevronRight className="text-xs w-4 flex-none self-start sm:self-center" />
                      <span className="leading-tight flex-1">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="space-y-2">
                {rightSpecialties.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/department/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="min-w-0 flex items-start sm:items-center gap-2 hover:text-white transition whitespace-normal sm:whitespace-nowrap"
                    >
                      <FiChevronRight className="text-xs w-4 flex-none self-start sm:self-center" />
                      <span className="leading-tight flex-1">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4) Facilities */}
          <div className="flex flex-col lg:pl-14 mt-8 lg:mt-0">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Facilities</h3>

            <ul className="mt-4 space-y-2 text-gray-300 text-sm">
              {facilities.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={`/facility/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="min-w-0 flex items-start sm:items-center gap-2 hover:text-white transition whitespace-normal sm:whitespace-nowrap"
                  >
                    <FiChevronRight className="text-xs w-4 flex-none self-start sm:self-center" />
                    <span className="leading-tight flex-1">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <p className="text-sm">
            Copyright © 2025 <span className="font-semibold">Ashaali Hospital</span> || All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
