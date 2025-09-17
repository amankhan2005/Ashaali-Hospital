 import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

const YouTubeChannelShowcase = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const [activeVideo, setActiveVideo] = useState(null); // store selected video

    // Sample influencer data - replace with your actual data
    const influencers = [
        { id: 1, videoId: "TXeGd52gkb8", name: "My Vintage Craft" },
        { id: 2, videoId: "uInMp6Lx__U", name: "My Vintage Craft" },
        { id: 3, videoId: "TXeGd52gkb8", name: "My Vintage Craft" },
        { id: 4, videoId: "uInMp6Lx__U", name: "My Vintage Craft" },
        { id: 5, videoId: "TXeGd52gkb8", name: "My Vintage Craft" },
    ];

    const primaryColor = "#18978d";

    // Get slides per view based on screen size
    const getSlidesPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 1; 
            if (window.innerWidth < 1024) return 2; 
            return 3; 
        }
        return 1;
    };

    // Update slides per view on window resize
    useEffect(() => {
        const handleResize = () => {
            const newSlidesPerView = getSlidesPerView();
            setSlidesPerView(newSlidesPerView);
            setCurrentSlide(0);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxSlide = Math.max(0, influencers.length - slidesPerView);

    const nextSlide = () => {
        setCurrentSlide((prev) => prev >= maxSlide ? 0 : prev + 1);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => prev <= 0 ? maxSlide : prev - 1);
    };

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [maxSlide]);

    const totalSlides = maxSlide + 1;

    return (
        <div className="py-8 sm:py-12 lg:py-16 overflow-x-hidden">
            <div className="container mx-auto lg:px-12 px-4 sm:px-6 md:px-8">
                <div className="text-center mb-6 md:mb-8 px-4 max-w-5xl mx-auto">
                    <div className="mb-3 md:mb-4">
                        <span
                            className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
                            style={{
                                color: primaryColor,
                                borderColor: primaryColor,
                                backgroundColor: `${primaryColor}10`
                            }}
                        >
                            Watch Our Story in Motion
                        </span>
                    </div>
                    <h1 className="text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold">
                        Real Stories, Real Care — Discover Ashaali Through Videos
                    </h1>
                </div>

                {/* Video Carousel */}
                <div className="relative">
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
                            }}
                        >
                            {influencers.map((influencer, index) => (
                                <div 
                                    key={`${influencer.videoId}-${index}`} 
                                    className="flex-shrink-0 px-2"
                                    style={{ width: `${100 / slidesPerView}%` }}
                                >
                                    <div className="relative group">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${influencer.videoId}?autoplay=1&mute=1&loop=1&playlist=${influencer.videoId}&controls=0`}
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            title={influencer.name}
                                            className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-xl"
                                        />
                                        
                                        {/* Play Button Overlay */}
                                        <div 
                                            onClick={() => setActiveVideo(influencer.videoId)}
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                        >
                                            <div 
                                                className="w-16 h-16 rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-transform"
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                <Play className="w-8 h-8 ml-1" />
                                            </div>
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
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-10"
                                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} // white 50%
                            >
                                <ChevronLeft className="w-6 h-6 text-black" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-10"
                                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} // white 50%
                            >
                                <ChevronRight className="w-6 h-6 text-black" />
                            </button>
                        </>
                    )}

                    {/* Dots */}
                    {totalSlides > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        currentSlide === index ? 'bg-opacity-100' : 'bg-opacity-30'
                                    }`}
                                    style={{ backgroundColor: primaryColor }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {activeVideo && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[11000]"
                >
                    <div className="relative w-[90%] max-w-4xl">
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="YouTube Video"
                            className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] rounded-xl shadow-xl"
                        />
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
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
