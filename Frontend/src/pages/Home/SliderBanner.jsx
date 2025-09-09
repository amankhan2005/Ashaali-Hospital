import React, { useState } from 'react';

const SlidingBanner = () => {
  const [isPaused, setIsPaused] = useState(false);

  const keywords = [

    "No Unnecessary Tests",
    "Lucknow Only AAGL Accredited Centre",
    "Patient First Approach",
    "Latest Tech at Lowest Cost",
    "NABH Accredited"
  ];

  // Duplicate keywords for seamless infinite scroll
  const duplicatedKeywords = [...keywords, ...keywords];

  return (
    <div 
      className=" bg-[#18978d] overflow-hidden relative py-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      
      <div 
        className={`flex whitespace-nowrap ${isPaused ? 'animate-none' : 'animate-slide'}`}
        style={{
          animation: isPaused ? 'none' : 'slide 30s linear infinite'
        }}
      >
        {duplicatedKeywords.map((keyword, index) => (
          <div
            key={index}
            className="inline-flex items-center  text-white px-6 py-1 mx-4 rounded-full font-semibold text-sm md:text-base lg:text-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 cursor-pointer transform hover:scale-105 relative group"
          >
            {/* Checkmark icon */}
            {/* <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              ✓
            </div> */}
            <span className="ml-2">{keyword}</span>
          </div>
        ))}
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SlidingBanner;