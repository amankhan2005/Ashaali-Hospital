 import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL; // ✅ Backend API URL

const HomeBlogSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [blogPosts, setBlogPosts] = useState([]);

  const primaryColor = "#18978d";

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Slides per view based on screen size
  const getSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
      setCurrentSlide(0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + '...';
  };

  const handleReadMore = (slug) => {
    window.location.href = `/blogs/${slug}`;
  };

  const maxSlide = Math.max(0, blogPosts.length - slidesPerView);
  const nextSlide = () => setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  const prevSlide = () => setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [maxSlide]);

  const totalSlides = maxSlide + 1;

  if (!blogPosts.length) return null;

  return (
    <section className='bg-gray-100'>
      <div className="lg:px-12 px-0 sm:px-6 md:px-8 py-10 sm:py-12 md:py-14 lg:py-16 bg-gray-100 container mx-auto">
        <div className="text-center mb-10 md:mb-12 max-w-5xl mx-auto">
          <div className="mb-3 md:mb-4">
            <span
              className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
              style={{
                color: primaryColor,
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10`
              }}
            >
              📝 Health Insights & Updates
            </span>
          </div>
          <h1 className="text-medium md:text-2xl lg:text-2xl xl:text-4xl px-3 font-bold">
            Expert Advice, Wellness Tips, and the Latest from Ashaali Hospital
          </h1>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)` }}
            >
              {blogPosts.map((post) => (
                <div
                  key={post._id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="group">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight flex items-start">
                          {post.title}
                        </h3>
                        <div className="flex-grow mb-2">
                          <p className="text-gray-600 text-sm leading-relaxed min-h-[4.5rem]">
                            {truncateText(post.excerpt, 120)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleReadMore(post.slug)}
                          className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 mt-auto"
                          style={{
                            backgroundColor: primaryColor,
                            boxShadow: `0 4px 15px ${primaryColor}40`
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Arrow Buttons inside screen with 50% white opacity */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3 transition-transform hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3 transition-transform hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </>
          )}

          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8' : 'w-3 hover:opacity-75'}`}
                  style={{ backgroundColor: index === currentSlide ? primaryColor : '#CBD5E1' }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSlider;
