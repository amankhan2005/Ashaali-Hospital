import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const DoctorCarousel = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Abhimanyu Rao Kadapathri",
      department: "Oncology",
      degree: "MBBS, MD Oncology",
      experience: "7+ years experience",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Dr. Abhishek Gautam",
      department: "Gastroenterology & Hepatology",
      degree: "MBBS, DM Gastro",
      experience: "8+ years experience",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Dr. Abhishek Verma",
      department: "Pulmonology",
      degree: "MBBS, MD Pulmonology",
      experience: "7+ years experience",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Dr. Ajay Bahadur",
      department: "Cardiology",
      degree: "MBBS, DM Cardiology",
      experience: "35+ years experience",
      image: "https://images.unsplash.com/photo-1594824375852-3572c6a8b808?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Dr. Vikram Singh",
      department: "Pediatrics",
      degree: "MBBS, MD Pediatrics",
      experience: "14+ years experience",
      image: "https://images.unsplash.com/photo-1600804889194-e2803aee5ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "Dr. Anjali Gupta",
      department: "Gynecology",
      degree: "MBBS, MS Gynecology",
      experience: "16+ years experience",
      image: "https://images.unsplash.com/photo-1614790950153-aaf12670e6bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const primaryColor = "#18978d";
  const secondaryColor = "#ed8022";

  return (
    <div className="bg-gray-100 relative b py-10 lg:px-12 px-4 sm:px-6 md:px-8">


      <div className='container mx-auto'>


        <div className="text-center mb-4 md:mb-6 ">
          {/* Small colored heading at top */}
          <div className="mb-3 md:mb-4">
            <span
              className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
              style={{
                color: primaryColor,
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10` // Light background
              }}
            >
              Trusted Professionals Committed to Your Care and Recovery
            </span>
          </div>

          {/* Main SEO heading */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold  " >
            Meet Our Team of Expert Doctors
          </h1>


        </div>

        {/* Doctor Carousel */}
        <div className="pb-4 carousel-container">
          <Slider {...settings} className=''>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="px-2">
                <Link to={`about/team/${doctor?.name}`}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-2  py-6 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-md" >
                    {/* Circular background with doctor image */}
                    <div className="relative mb-2">
                      <div
                        className="w-60 h-60 rounded-full flex items-center justify-center relative"
                        style={{ backgroundColor: '#e8f4f3' }}
                      >
                        {/* Dot pattern background */}
                        <div className="absolute inset-0 rounded-full">
                          <svg width="160" height="160" className="rounded-full">
                            <defs>
                              <pattern id={`smallDots-${doctor.id}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                                <circle cx="4" cy="4" r="0.8" fill="#4db6ac" opacity="0.4" />
                              </pattern>
                            </defs>
                            <rect width="160" height="160" fill={`url(#smallDots-${doctor.id})`} rx="80" />
                          </svg>
                        </div>

                        {/* Doctor image */}
                        <div className="w-50 h-50 rounded-full overflow-hidden border-3 border-white shadow-lg relative z-10">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Book Appointment Button */}
                    <button
                      className="text-white text-xs font-bold px-4 py-2.5 rounded-md mb-1 tracking-wider uppercase transition-all duration-300 hover:opacity-90"
                      style={{
                        backgroundColor: '#18978d',
                        minWidth: '140px'
                      }}
                    >
                      BOOK APPOINTMENT
                    </button>

                    {/* Doctor Details */}
                    <div className="text-center">
                      <h3 className="text-base font-bold text-gray-900  leading-tight">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-400 font-normal uppercase tracking-wide">
                        {doctor.degree}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        <style jsx>{`
        .carousel-container .slick-slide {
          padding: 0 2px !important;
        }
        
        .carousel-container .slick-track {
          display: flex !important;
        }
        
        .carousel-container .slick-slide > div {
          // height: 100%;
        }
        
        .carousel-container .slick-dots {
          bottom: 10px !important;
        }
        
        .carousel-container .slick-dots li {
          margin: 0 3px;
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

export default DoctorCarousel;