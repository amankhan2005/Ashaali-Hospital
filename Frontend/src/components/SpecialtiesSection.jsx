 import React from 'react';
import img from '../assets/department/cardiology.png';
import img1 from '../assets/department/body-parts.png';
import img2 from '../assets/department/pediatrics.png';
import img3 from '../assets/department/neurology.png';
import img4 from '../assets/department/first-aid-kit.png';
import img5 from '../assets/department/ent.png';
import img6 from '../assets/department/ortopedic.png';
import img7 from '../assets/department/surgical.png';
import img8 from '../assets/department/obstetrics.png';
import img9 from '../assets/department/urology.png';
import img10 from '../assets/department/nephrology.png';
import img11 from '../assets/department/dental-implant.png';
import img12 from '../assets/department/hematology.png';
import img13 from '../assets/department/pulmonology.png';
import img14 from '../assets/department/skin.png';
import img15 from '../assets/department/human-brain.png';
import img16 from '../assets/department/oncology.png';
import img17 from '../assets/department/icu.png';
import img18 from '../assets/department/neurosurgery.png';
import img19 from '../assets/department/gastroenterology.png';
import img20 from '../assets/department/endocrinology.png';
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
    { name: 'Obs. & Gynaecology', image: img8 },
    { name: 'Urology & Andrology', image: img9 },
    { name: 'Nephrology', image: img10 },
    { name: 'Dental', image: img11 },
    { name: 'Hematology', image: img12 },
    { name: 'Pulmonology', image: img13 },
    { name: 'Dermatology', image: img14 },
    { name: ' Neurosurgery', image: img18 }, // img add
     { name: ' Gastroenterology', image: img19 }, //Gastroenterology
      { name: '  Endocrinology', image: img20 }, //add
    { name: 'Psychiatry', image: img15 },
    { name: 'Oncology', image: img16 },
    { name: 'ICU and Critical Care', image: img17 },
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
      to={`/department/${specialist.name
        .toLowerCase()
        .replace(/\s+/g, '-')}`}
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
        <div className="flex justify-center mb-2 sm:mb-3">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${primaryColor}15`,
              border: `2px solid ${primaryColor}30`,
            }}
          >
            <img
              src={specialist.image}
              alt={specialist.name}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Specialist Name */}
        <div className="flex-grow flex items-center justify-center">
          <h3
            className="text-xs sm:text-sm md:text-base font-semibold leading-tight transition-colors duration-300 group-hover:font-bold line-clamp-2 px-1"
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
        <div
          className="w-0 h-0.5 mx-auto mt-2 transition-all duration-300 group-hover:w-8"
          style={{ backgroundColor: secondaryColor }}
        ></div>
      </div>
    </Link>
  ))}
</div>
      </div>
    </div>
  );
};

export default SpecialistSection;
