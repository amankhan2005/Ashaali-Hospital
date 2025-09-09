import React, { useState, useEffect } from 'react';
import { Calendar, User, MessageCircle, Heart, Share2, BookOpen, TrendingUp, Award, Users, Globe, Lightbulb, Target, ChevronLeft, ChevronRight } from 'lucide-react';

const HomeBlogSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);

    // Sample blog data with placeholder images
    const blogPosts = [
        {
            id: 1,
            title: "Understanding Cardiovascular Health and Heart Disease Prevention",
            excerpt: "Cardiovascular diseases are the leading cause of death globally. Learn about coronary artery disease, arrhythmias, heart failure, and preventive cardiology measures including lifestyle modifications and medical interventions.",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            author: "Dr. Sarah Johnson",
            date: "April 15, 2025",
            category: "Cardiology",
            slug: "understanding-cardiovascular-health-and-heart-disease-prevention"
        },
        {
            id: 2,
            title: "Advanced Oncology Treatments and Cancer Care Management",
            excerpt: "Explore comprehensive cancer treatment modalities including chemotherapy, radiotherapy, immunotherapy, and surgical oncology. Our multidisciplinary approach ensures personalized care for various malignancies and tumor types.",
            image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            author: "Dr. Michael Chen",
            date: "April 12, 2025",
            category: "Oncology",
            slug: "advanced-oncology-treatments-and-cancer-care-management"
        },
        {
            id: 3,
            title: "Emergency Medicine and Critical Care Protocols",
            excerpt: "Our emergency department handles trauma cases, acute medical conditions, and life-threatening emergencies. Learn about triage protocols, CPR procedures, and intensive care unit management for critical patients.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            author: "Dr. Emily Rodriguez",
            date: "April 10, 2025",
            category: "Emergency Medicine",
            slug: "emergency-medicine-and-critical-care-protocols"
        },
        {
            id: 4,
            title: "Orthopedic Surgery and Musculoskeletal Disorders Treatment",
            excerpt: "Comprehensive orthopedic care including joint replacement surgery, arthroscopy, fracture repair, and sports medicine. Treatment for conditions like osteoarthritis, osteoporosis, and musculoskeletal injuries.",
            image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            author: "Dr. Robert Thompson",
            date: "April 8, 2025",
            category: "Orthopedics",
            slug: "orthopedic-surgery-and-musculoskeletal-disorders-treatment"
        },
        {
            id: 5,
            title: "Neurological Disorders and Brain Health Management",
            excerpt: "Our neurology department treats conditions like stroke, epilepsy, Parkinson's disease, multiple sclerosis, and Alzheimer's disease. Advanced diagnostic tools including MRI, CT scans, and EEG for accurate diagnosis.",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            author: "Dr. Lisa Parker",
            date: "April 5, 2025",
            category: "Neurology",
            slug: "neurological-disorders-and-brain-health-management"
        },
        {
            id: 6,
            title: "Pediatric Medicine and Child Healthcare Services",
            excerpt: "Specialized pediatric care for infants, children, and adolescents. Treatment for pediatric conditions including vaccinations, growth disorders, pediatric surgery, and developmental assessments.",
            image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            author: "Dr. Amanda Wilson",
            date: "April 3, 2025",
            category: "Pediatrics",
            slug: "pediatric-medicine-and-child-healthcare-services"
        },
    ];

    const primaryColor = "#18978d";
    const secondaryColor = "#ed8022";

    // Get slides per view based on screen size
    const getSlidesPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 1; // mobile: 1 blog
            if (window.innerWidth < 1024) return 2; // tablet: 2 blogs
            return 3; // desktop: 3 blogs
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

    // Function to truncate text to a specific character limit
    const truncateText = (text, maxLength = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    const handleReadMore = (title) => {
        // Navigate to blog post (you can implement your navigation logic here)
        console.log(`Navigate to: /blogs/${title.toLowerCase().replace(/\s+/g, '-')}`);
    };

    const maxSlide = Math.max(0, blogPosts.length - slidesPerView);

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
        }, 4000);
        return () => clearInterval(interval);
    }, [maxSlide]);

    const totalSlides = maxSlide + 1;

    return (
        <section className='bg-gray-100'>
            <div className="lg:px-12 px-0 sm:px-6 md:px-8 py-10 sm:py-12 md:py-14 lg:py-16 bg-gray-100 container mx-auto">
                <div className="text-center mb-10 md:mb-12 max-w-5xl mx-auto">
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
                            📝 Health Insights & Updates
                        </span>
                    </div>

                    {/* Main SEO heading */}
                    <h1 className="text-lg md:text-2xl lg:text-2xl xl:text-4xl font-bold">
                        Expert Advice, Wellness Tips, and the Latest from Ashaali Hospital
                    </h1>
                </div>

                {/* Blog Carousel */}
                <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
                            }}
                        >
                            {blogPosts.map((post, index) => (
                                <div 
                                    key={post.id} 
                                    className="flex-shrink-0 px-3"
                                    style={{ 
                                        width: `${100 / slidesPerView}%`,
                                    }}
                                >
                                    <div className="group">
                                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                                            {/* Image Section */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                {/* Title */}
                                                <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight flex items-start">
                                                    {post.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <div className="flex-grow mb-2">
                                                    <p className="text-gray-600 text-sm leading-relaxed min-h-[4.5rem]">
                                                        {truncateText(post.excerpt, 120)}
                                                    </p>
                                                </div>

                                                {/* Read More Button */}
                                                <button
                                                    onClick={() => handleReadMore(post.title)}
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

                    {/* Navigation Buttons */}
                    {totalSlides > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                                style={{ color: primaryColor }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                                style={{ color: primaryColor }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {totalSlides > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? 'w-8'
                                            : 'w-3 hover:opacity-75'
                                    }`}
                                    style={{
                                        backgroundColor: index === currentSlide ? primaryColor : '#CBD5E1'
                                    }}
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