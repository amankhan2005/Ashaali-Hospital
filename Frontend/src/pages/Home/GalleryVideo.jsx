 import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * YouTubeChannelShowcase
 * - Renders lightweight thumbnails in carousel (no iframe until user opens modal)
 * - Debounced resize handler
 * - Single iframe only in modal (on-demand)
 * - Accessible controls (aria-labels)
 */

const YouTubeChannelShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [activeVideo, setActiveVideo] = useState(null); // videoId opened in modal

  // Replace these with your real influencer data
  const influencers = [
    { id: 1, videoId: 'TXeGd52gkb8', name: 'My Vintage Craft' },
    { id: 2, videoId: 'uInMp6Lx__U', name: 'My Vintage Craft' },
    { id: 3, videoId: 'TXeGd52gkb8', name: 'My Vintage Craft' },
    { id: 4, videoId: 'uInMp6Lx__U', name: 'My Vintage Craft' },
    { id: 5, videoId: 'TXeGd52gkb8', name: 'My Vintage Craft' },
  ];

  const primaryColor = '#18978d';
  const transitionDuration = 400; // ms

  // get slides per view based on width
  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  // debounced resize handler
  useEffect(() => {
    let t = null;
    const onResize = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        const spv = getSlidesPerView();
        setSlidesPerView(spv);
        // ensure currentSlide is within new bounds
        setCurrentSlide((prev) => Math.min(prev, Math.max(0, influencers.length - spv)));
      }, 120); // small debounce
    };
    // initial set
    setSlidesPerView(getSlidesPerView());
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (t) clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [influencers.length]);

  const maxSlide = Math.max(0, influencers.length - slidesPerView);
  const totalSlides = maxSlide + 1;

  // slide navigation
  const nextSlide = () => setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));

  // auto-slide (uses ref to avoid reset on every render)
  const autoRef = useRef(null);
  useEffect(() => {
    // clear any previous
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [maxSlide]);

  // compute translate percent
  const translatePercent = (currentSlide * (100 / slidesPerView));

  // helper to build thumbnail url
  const getThumb = (videoId) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="py-8 sm:py-12 lg:py-12 overflow-x-hidden">
      <div className="container mx-auto lg:px-12 px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 md:mb-8 px-4 max-w-5xl mx-auto">
          <div className="mb-3 md:mb-4">
            <span
              className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
              style={{
                color: primaryColor,
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              Watch Our Story in Motion
            </span>
          </div>
          <h1 className="text-medium md:text-2xl lg:text-3xl xl:text-5xl font-bold">
            Real Stories, Real Care — Discover Ashaali Through Videos
          </h1>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transition: `transform ${transitionDuration}ms ease`,
                transform: `translateX(-${translatePercent}%)`,
              }}
            >
              {influencers.map((influencer, index) => (
                <div
                  key={`${influencer.videoId}-${index}`}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="relative group rounded-xl overflow-hidden">
                    {/* Thumbnail instead of iframe (lightweight) */}
                    <img
                      src={getThumb(influencer.videoId)}
                      alt={`${influencer.name} video thumbnail`}
                      width="100%"
                      height="auto"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] object-cover rounded-xl"
                      style={{ backgroundColor: '#000' }}
                    />

                    {/* Overlay Play (opens modal) */}
                    <button
                      onClick={() => setActiveVideo(influencer.videoId)}
                      aria-label={`Play video: ${influencer.name}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition"
                      type="button"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-transform"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                    </button>

                    {/* caption */}
                    <div className="absolute left-4 bottom-4 bg-white/90 px-3 py-1 rounded-md text-sm font-medium">
                      {influencer.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous videos"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
                style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                type="button"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next videos"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
                style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                type="button"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </>
          )}

          {/* Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors ${currentSlide === idx ? 'bg-opacity-100' : 'bg-opacity-30'}`}
                  style={{ backgroundColor: primaryColor }}
                  type="button"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal with single iframe (renders on demand) */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[11000]">
          <div className="relative w-[90%] max-w-4xl">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] rounded-xl shadow-xl"
            />
            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeChannelShowcase;
