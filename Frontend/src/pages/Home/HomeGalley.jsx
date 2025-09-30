 import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const HomeGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const primaryColor = "#18978d";

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      setGallery(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setSelectedImage(null); setSelectedImageIndex(0); };
  const goToPrevious = () => { const prev = selectedImageIndex > 0 ? selectedImageIndex - 1 : gallery.length - 1; setSelectedImageIndex(prev); setSelectedImage(gallery[prev]); };
  const goToNext = () => { const next = selectedImageIndex < gallery.length - 1 ? selectedImageIndex + 1 : 0; setSelectedImageIndex(next); setSelectedImage(gallery[next]); };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    centerPadding: '20px',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: '15px' } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '10px' } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: '5px' } }
    ],
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  return (
    <div className='w-full py-8 md:py-10 lg:py-12 bg-gray-100
     ' style={{ backgroundColor: '#e8f4f8' }}
     >
      <div className="container mx-auto lg:px-12 px-4 sm:px-6 md:px-8">

        {/* Heading */}
        <div className="text-center mb-4 md:mb-6 px-4 max-w-5xl mx-auto">
          <div className="mb-3 md:mb-4">
            <span
              className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
              style={{ color: primaryColor, borderColor: primaryColor, backgroundColor: `${primaryColor}10` }}
            >
              Explore Our Gallery
            </span>
          </div>
          <h1 className="text-medium md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            A Glimpse Into Ashaali Hospital’s World-Class Facilities and Care
          </h1>
        </div>

        {/* Carousel */}
        <div className="gallery-carousel">
          <Slider {...settings}>
            {gallery.map((image, index) => (
              <div key={image._id} className="px-1">
                <div
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => openModal(image, index)}
                >
                  <img
                    src={image.image || '/doctor.png'}
                    alt={image.alt || 'Gallery Image'}
                    className="w-full h-48 md:h-60 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </div>

              
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black rounded-full p-2 transition-all duration-200 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black rounded-full p-2 transition-all duration-200 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <img
                src={selectedImage?.image || '/doctor.png'}
                alt={selectedImage?.alt || 'Gallery Image'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {gallery.length}
              </div>
            </div>
          </div>
        )}

        {/* <style jsx global>{`
          .gallery-carousel .slick-dots { bottom: -40px; }
          .gallery-carousel .slick-dots li button:before { font-size: 12px; color: #18978d; opacity: 0.5; }
          .gallery-carousel .slick-dots li.slick-active button:before { color: #18978d; opacity: 1; }
          .gallery-carousel .slick-prev, .gallery-carousel .slick-next {
            z-index: 10; width: 40px; height: 40px;
          }
          .gallery-carousel .slick-prev { left: 10px; }
          .gallery-carousel .slick-next { right: 10px; }
          .gallery-carousel .slick-prev:before, .gallery-carousel .slick-next:before {
            font-size: 24px; color: #fff; opacity: 0.5;
          }
        `}</style> */}
        
      </div>
    </div>
  );
};

// Custom arrows for slider
const CustomArrow = ({ onClick, direction }) => (
  <div
    className={`absolute top-1/2 transform -translate-y-1/2 z-20 cursor-pointer ${
      direction === "next" ? "right-2" : "left-2"
    }`}
    onClick={onClick}
    style={{
      backgroundColor: "rgba(255,255,255,0.5)",
      borderRadius: "50%",
      width: 35,
      height: 35,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
    }}
  >
    {direction === "next" ? ">" : "<"}
  </div>
);

export default HomeGallery;
