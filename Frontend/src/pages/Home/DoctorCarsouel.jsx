import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Calendar } from "lucide-react";
import useDoctors from "../../hooks/useDoctors.js"; // ✅ useDoctors hook import

const DoctorCarouselBackend = () => {
  const { doctors, loading } = useDoctors(); // no filter = all doctors
  const primaryColor = "#18978d";

  const settings = {
    dots: true,
    infinite: doctors.length > 4,
    speed: 500,
    slidesToShow: Math.min(4, doctors.length || 1),
    slidesToScroll: 1,
    autoplay: doctors.length > 4,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#18978d]"></div>
      </div>
    );
  }

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
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-2 py-6 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-md">
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
                              <circle
                                cx="4"
                                cy="4"
                                r="0.8"
                                fill="#4db6ac"
                                opacity="0.4"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="160"
                            height="160"
                            fill={`url(#smallDots-${i})`}
                            rx="80"
                          />
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

                  {/* Details */}
                  <div className="text-center">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-normal uppercase tracking-wide">
                      {doctor.department}
                    </p>
                  </div>

                  {/* Book Appointment */}
                  <Link
                    to={`/book-appointment?doctorId=${doctor._id}&department=${
                      doctor.department
                    }&doctorName=${encodeURIComponent(doctor.name)}`}
                    className="bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-teal-800 transition-all duration-300 flex items-center justify-center gap-2 mx-auto mt-1"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DoctorCarouselBackend;
