 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const DoctorCarouselBackend = () => {
  const [doctors, setDoctors] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "https://ashaali-hospital-2.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, [BASE_URL]);

  const settings = {
    dots: true,
    infinite: doctors.length > 4, // infinite tabhi jab 4+ doctors ho
    speed: 500,
    slidesToShow: Math.min(4, doctors.length || 1),
    slidesToScroll: 1,
    autoplay: doctors.length > 4,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const primaryColor = "#18978d";

  return (
    <div className="bg-gray-100 py-10 lg:px-12 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-6">
          <div className="mb-3">
            <span
              className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
              style={{
                color: primaryColor,
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              Trusted Professionals Committed to Your Care and Recovery
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Meet Our Team of Expert Doctors
          </h1>
        </div>

        {/* Carousel */}
        <div className="pb-4 carousel-container">
          <Slider {...settings}>
            {doctors.map((doctor, i) => (
              <div key={doctor._id || i} className="px-2">
                <div
                  className="bg-white rounded-xl shadow-sm border border-gray-100 px-2 py-6 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Image with dotted bg */}
                  <div className="relative mb-2">
                    <div
                      className="w-60 h-60 rounded-full flex items-center justify-center relative"
                      style={{ backgroundColor: "#e8f4f3" }}
                    >
                      <div className="absolute inset-0 rounded-full">
                        <svg width="160" height="160" className="rounded-full">
                          <defs>
                            <pattern
                              id={`smallDots-${i}`}
                              x="0"
                              y="0"
                              width="8"
                              height="8"
                              patternUnits="userSpaceOnUse"
                            >
                              <circle cx="4" cy="4" r="0.8" fill="#4db6ac" opacity="0.4" />
                            </pattern>
                          </defs>
                          <rect width="160" height="160" fill={`url(#smallDots-${i})`} rx="80" />
                        </svg>
                      </div>
                      <div className="w-50 h-50 rounded-full overflow-hidden border-3 border-white shadow-lg relative z-10">
                        <img
                          src={doctor.photo || "/doctor.png"}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Book Appointment */}
                  <button
                    onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                    className="text-white text-xs font-bold px-4 py-2.5 rounded-md mb-1 tracking-wider uppercase transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: primaryColor, minWidth: "140px" }}
                  >
                    Book Appointment
                  </button>

                  {/* Details */}
                  <div className="text-center">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-normal uppercase tracking-wide">
                      {doctor.degree || doctor.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Slick custom CSS */}
        <style jsx>{`
          .carousel-container .slick-slide {
            padding: 0 2px !important;
          }
          .carousel-container .slick-track {
            display: flex !important;
          }
          .carousel-container .slick-dots {
            bottom: 10px !important;
          }
          .carousel-container .slick-dots li button:before {
            color: #18978d !important;
            font-size: 8px !important;
          }
          .carousel-container .slick-dots li.slick-active button:before {
            color: #18978d !important;
          }
          .carousel-container .slick-prev,
          .carousel-container .slick-next {
            z-index: 1;
            width: 40px;
            height: 40px;
          }
          .carousel-container .slick-prev:before,
          .carousel-container .slick-next:before {
            color: #18978d !important;
            font-size: 20px !important;
          }
          .carousel-container .slick-prev {
            left: 10px;
          }
          .carousel-container .slick-next {
            right: 10px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default DoctorCarouselBackend;
