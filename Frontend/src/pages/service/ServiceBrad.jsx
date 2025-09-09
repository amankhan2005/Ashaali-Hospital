import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
// Fix the import path - check if this is correct
import defaultImage from '../../assets/service-breas/icu.jpg' // Fixed typo in folder name
import { FaChevronRight } from 'react-icons/fa';

const ServiceBreadcums = ({ items, headText, image: propImage }) => {
  // Use prop image or fallback to imported image
  const backgroundImage = propImage || defaultImage;
  
  // Debug log to check if image is loaded
  console.log('Background image URL:', backgroundImage);
  
  return (
    <div
      className="relative flex flex-col items-center justify-center py-16 lg:py-24 bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        minHeight: '300px' // Ensure minimum height
      }}
    >
      {/* Light overlay for better image visibility */}
      {/* <div className="absolute inset-0 bg-gray-200  bg-opacity-80 z-10"></div> */}

      

<div className="absolute bottom-6 left-8 text-white max-w-3xl">
  <h1 className="lg:text-4xl text-2xl md:text-3xl font-bold tracking-tight">
    {headText}
  </h1>

  {/* Breadcrumb Navigation */}
  {items && (
    <ul className="mt-4 flex items-center text-sm lg:text-base text-gray-200">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <Link
            to={item.link}
            className="hover:text-white transition-colors duration-300"
          >
            {item.label}
          </Link>
          {/* Only show arrow if it's not the last item */}
          {index < items.length - 1 && (
            <FaChevronRight className="mx-3 text-xs text-gray-400" />
          )}
        </li>
      ))}
    </ul>
  )}
</div>


    </div>
  );
};

export default ServiceBreadcums;