import React, { useState, useEffect } from 'react';
import { Play, Users, Award, Zap, Heart, MessageCircle, Share2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const YouTubeChannelShowcase = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);

    // Sample influencer data - replace with your actual data
    const influencers = [
        {
            id: 1,
            name: "My Vintage Craft",
            handle: "@myvintagecraft",
            timeAgo: "2 days ago",
            videoId: "TXeGd52gkb8",
            videoUrl: "https://youtube.com/shorts/TXeGd52gkb8?si=19eWfLmcHNQpq8AT",
            channelUrl: "https://www.youtube.com/@AshaaliHospital",
            views: "125K",
            likes: "8.5K",
            comments: "234"
        },
        {
            id: 2,
            name: "My Vintage Craft",
            handle: "@myvintagecraft",
            timeAgo: "2 days ago",
            videoId: "uInMp6Lx__U",
            videoUrl: "https://youtube.com/shorts/uInMp6Lx__U?si=EXycwIWUaKowa0UE",
            channelUrl: "https://www.youtube.com/@AshaaliHospital",
            views: "125K",
            likes: "8.5K",
            comments: "234"
        },
        {
            id: 3,
            name: "My Vintage Craft",
            handle: "@myvintagecraft",
            timeAgo: "2 days ago",
            videoId: "TXeGd52gkb8",
            videoUrl: "https://youtube.com/shorts/TXeGd52gkb8?si=19eWfLmcHNQpq8AT",
            channelUrl: "https://www.youtube.com/@AshaaliHospital",
            views: "125K",
            likes: "8.5K",
            comments: "234"
        },
        {
            id: 4,
            name: "My Vintage Craft",
            handle: "@myvintagecraft",
            timeAgo: "2 days ago",
            videoId: "uInMp6Lx__U",
            videoUrl: "https://youtube.com/shorts/uInMp6Lx__U?si=EXycwIWUaKowa0UE",
            channelUrl: "https://www.youtube.com/@AshaaliHospital",
            views: "125K",
            likes: "8.5K",
            comments: "234"
        },
        {
            id: 5,
            name: "My Vintage Craft",
            handle: "@myvintagecraft",
            timeAgo: "2 days ago",
            videoId: "TXeGd52gkb8",
            videoUrl: "https://youtube.com/shorts/TXeGd52gkb8?si=19eWfLmcHNQpq8AT",
            channelUrl: "https://www.youtube.com/@AshaaliHospital",
            views: "125K",
            likes: "8.5K",
            comments: "234"
        },
    ];

    const primaryColor = "#18978d";
    const secondaryColor = "#ed8022";

    // Get slides per view based on screen size
    const getSlidesPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 1; // mobile: 1 video
            if (window.innerWidth < 1024) return 2; // tablet: 2 videos
            return 3; // desktop: 3 videos
        }
        return 1;
    };

    // Update slides per view on window resize
    useEffect(() => {
        const handleResize = () => {
            const newSlidesPerView = getSlidesPerView();
            setSlidesPerView(newSlidesPerView);
            // Reset to first slide when changing layout
            setCurrentSlide(0);
        };
        
        // Set initial value
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

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [maxSlide]);

    const totalSlides = maxSlide + 1;

    return (
        <div className="py-8 sm:py-12 lg:py-16 overflow-x-hidden">
            {/* Hero Section */}
            <div className="container mx-auto lg:px-12 px-4 sm:px-6 md:px-8">
                <div className="text-center mb-6 md:mb-8 px-4 max-w-5xl mx-auto">
                    {/* Small colored heading at top */}
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

                    {/* Main SEO heading */}
                    <h1 className="text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold">
                        Real Stories, Real Care — Discover Ashaali Through Videos
                    </h1>
                </div>

                {/* Video Carousel Section */}
                <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
                            }}
                        >
                            {influencers.map((influencer, index) => (
                                <div 
                                    key={`${influencer.videoId}-${index}`} 
                                    className="flex-shrink-0 px-2"
                                    style={{ 
                                        width: `${100 / slidesPerView}%`,
                                    }}
                                >
                                    <div className="relative group">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${influencer.videoId}?autoplay=1&mute=1&loop=1&playlist=${influencer.videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            title={influencer.name}
                                            className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-xl"
                                        />
                                        
                                        {/* Overlay with video info */}
                                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                                            <div className="flex items-center justify-between text-white">
                                                <div className="flex items-center space-x-2">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm">{influencer.views}</span>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-1">
                                                        <Heart className="w-4 h-4" />
                                                        <span className="text-sm">{influencer.likes}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <MessageCircle className="w-4 h-4" />
                                                        <span className="text-sm">{influencer.comments}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* Play button overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div 
                                                className="w-16 h-16 rounded-full flex items-center justify-center text-white cursor-pointer transform hover:scale-110 transition-transform"
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

                    {/* Navigation Buttons */}
                    {totalSlides > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-10"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-10"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Slide Indicators */}
                    {totalSlides > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        currentSlide === index
                                            ? 'bg-opacity-100'
                                            : 'bg-opacity-30'
                                    }`}
                                    style={{ backgroundColor: primaryColor }}
                                />
                            ))}
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default YouTubeChannelShowcase;
