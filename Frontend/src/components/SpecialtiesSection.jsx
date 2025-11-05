 import React from 'react';
import img from '../assets/department/cardiology.webp';
import img1 from '../assets/department/body-parts.webp';
import img2 from '../assets/department/pediatrics.webp';
import img3 from '../assets/department/neurology.webp';
import img4 from '../assets/department/first-aid-kit.webp';
import img5 from '../assets/department/ent.webp';
import img6 from '../assets/department/ortopedic.webp';
import img7 from '../assets/department/surgical.webp';
import img8 from '../assets/department/obstetrics.webp';
import img9 from '../assets/department/urology.webp';
import img10 from '../assets/department/nephrology.webp';
import img11 from '../assets/department/dental-implant.webp';
import img12 from '../assets/department/hematology.webp';
import img13 from '../assets/department/pulmonology.webp';
import img14 from '../assets/department/skin.webp';
import img15 from '../assets/department/human-brain.webp';
import img16 from '../assets/department/oncology.webp';
import img17 from '../assets/department/icu.webp';
import img18 from '../assets/department/neurosurgery.webp';
import img19 from '../assets/department/gastroenterology.webp';
import img20 from '../assets/department/endocrinology.webp';
import { Link } from 'react-router-dom';

const SpecialistSection = () => {
  const primaryColor = '#18978d';
  const secondaryColor = '#ed8022';

  const specialists = [
    { name: 'Orthopaedics', image: img6 },
    { name: 'Ophthalmology', image: img1 },
    { name: 'Pediatrics', image: img2 },
    { name: 'Neurology', image: img3 },
    { name: 'General Medicine', image: img4 },
    { name: 'ENT', image: img5 },
    { name: 'Cardiology', image: img },
    { name: 'General Surgery', image: img7 },
    { name: 'obstetrics-gynaecology', image: img8 },
    { name: 'urology-and-andrology', image: img9 },
    { name: 'nephrology', image: img10 },
    { name: 'dental', image: img11 },
    { name: 'hematology', image: img12 },
    { name: 'pulmonology', image: img13 },
    { name: 'dermatology', image: img14 },
    { name: 'neurosurgery', image: img18 }, // img add
    { name: 'gastrology', image: img19 }, //Gastroenterology
    { name: 'endocrinology', image: img20 }, //add
    { name: 'psychiatry', image: img15 },
    { name: 'oncology', image: img16 },
    { name: 'icu-and-critical-care', image: img17 },
  ];

  return (
    <div className="bg-gray-50 py-6 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12 px-4">
          <div className="mb-3 md:mb-4">
            <span
              className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
              style={{
                color: primaryColor,
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              Meet Our Expert Doctors Across Specialties
            </span>
          </div>

          <h1 className="text-xl md:text-3xl lg:text-3xl xl:text-5xl font-bold">
            Every Specialty, One Place
          </h1>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {specialists.map((specialist, index) => (
            <Link
              key={index}
              to={`/department/${specialist.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="h-full"
            >
              <div
                className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-opacity-0 transform hover:-translate-y-1 sm:hover:-translate-y-2 h-full flex flex-col justify-between overflow-hidden"
                style={{
                  '--hover-shadow': `0 20px 40px rgba(24, 151, 141, 0.15)`,
                  minHeight: '180px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 20px 40px rgba(24, 151, 141, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Image Container */}
                <div className="flex justify-center mb-1 sm:mb-3">
                  <div
                    className="w-20 h-20 sm:w-20 md:w-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      border: `2px solid ${primaryColor}30`,
                    }}
                  >
                    <img
                      src={specialist.image}
                      alt={specialist.name}
                      className="w-12 h-12 sm:w-12 md:w-14 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Specialist Name */}
                <div className="flex-grow flex items-center justify-center">
                  <h3
                    className="text-xl capitalize sm:text-sm md:text-sm md:font-semibold leading-tight transition-colors duration-300 group-hover:font-bold "
                    style={{
                      color: '#374151',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = secondaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#374151';
                    }}
                  >
                    {specialist.name}
                  </h3>
                </div>

                {/* Hover Effect Indicator */}
                {/* <div
                  className="w-0 h-0.5 mx-auto mt-2 transition-all duration-300 group-hover:w-8"
                  style={{ backgroundColor: secondaryColor }}
                ></div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialistSection;
