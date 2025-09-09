import React, { useEffect } from 'react';
import { CalendarDays, User, ArrowRight } from 'lucide-react';
import BreadcrumbComponent from '../../components/Breadcums';
// Note: This component expects react-router-dom to be available in your project
// import { Link, useNavigate } from 'react-router-dom';

import img1 from '../../assets/blog/blog1.jpeg'
import img2 from '../../assets/blog/blog2.jpeg'
import img3 from '../../assets/blog/blog3.jpeg'
import img4 from '../../assets/blog/blog4.jpeg'
import img5 from '../../assets/blog/blog5.jpeg'
import img6 from '../../assets/blog/blog6.jpeg'

import blogbread from '../../assets/service-breas/blogbead.jpg'
import { useNavigate } from 'react-router-dom';
import ServiceBreadcums from '../service/ServiceBrad';

const BlogPage = () => {
    // Medical and hospital-related blog data
    const blogPosts = [
        {
            id: 1,
            title: "Understanding Cardiovascular Health and Heart Disease Prevention",
            excerpt: "Cardiovascular diseases are the leading cause of death globally. Learn about coronary artery disease, arrhythmias, heart failure, and preventive cardiology measures including lifestyle modifications and medical interventions.",
            image: img1,
            author: "Dr. Sarah Johnson",
            date: "April 15, 2025",
            category: "Cardiology",
            slug: "understanding-cardiovascular-health-and-heart-disease-prevention"
        },
        {
            id: 2,
            title: "Advanced Oncology Treatments and Cancer Care Management",
            excerpt: "Explore comprehensive cancer treatment modalities including chemotherapy, radiotherapy, immunotherapy, and surgical oncology. Our multidisciplinary approach ensures personalized care for various malignancies and tumor types.",
       image: img2,
            author: "Dr. Michael Chen",
            date: "April 12, 2025",
            category: "Oncology",
            slug: "advanced-oncology-treatments-and-cancer-care-management"
        },
        {
            id: 3,
            title: "Emergency Medicine and Critical Care Protocols",
            excerpt: "Our emergency department handles trauma cases, acute medical conditions, and life-threatening emergencies. Learn about triage protocols, CPR procedures, and intensive care unit management for critical patients.",
              image: img3,
            author: "Dr. Emily Rodriguez",
            date: "April 10, 2025",
            category: "Emergency Medicine",
            slug: "emergency-medicine-and-critical-care-protocols"
        },
        {
            id: 4,
            title: "Orthopedic Surgery and Musculoskeletal Disorders Treatment",
            excerpt: "Comprehensive orthopedic care including joint replacement surgery, arthroscopy, fracture repair, and sports medicine. Treatment for conditions like osteoarthritis, osteoporosis, and musculoskeletal injuries.",
            image: img4,
            author: "Dr. Robert Thompson",
            date: "April 8, 2025",
            category: "Orthopedics",
            slug: "orthopedic-surgery-and-musculoskeletal-disorders-treatment"
        },
        {
            id: 5,
            title: "Neurological Disorders and Brain Health Management",
            excerpt: "Our neurology department treats conditions like stroke, epilepsy, Parkinson's disease, multiple sclerosis, and Alzheimer's disease. Advanced diagnostic tools including MRI, CT scans, and EEG for accurate diagnosis.",
            image: img5,
            author: "Dr. Lisa Parker",
            date: "April 5, 2025",
            category: "Neurology",
            slug: "neurological-disorders-and-brain-health-management"
        },
        {
            id: 6,
            title: "Pediatric Medicine and Child Healthcare Services",
            excerpt: "Specialized pediatric care for infants, children, and adolescents. Treatment for pediatric conditions including vaccinations, growth disorders, pediatric surgery, and developmental assessments.",
            image: img6,
            author: "Dr. Amanda Wilson",
            date: "April 3, 2025",
            category: "Pediatrics",
            slug: "pediatric-medicine-and-child-healthcare-services"
        },

    ];

    const navigate=useNavigate()

    const slugify = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, '');

    const handleReadMore = (post) => {
        // Use the predefined slug if available, otherwise generate one
        const slug = post.slug || slugify(post.title);
        
        console.log("Would navigate to slug:", slug);
        console.log("Full URL would be:", `/blogs/${slug}`);

        navigate(`/blogs/${slug}`); // Navigate to the blog detail page
        
        // In your actual app, uncomment the line below:
        // navigate(`/blogs/${slug}`);
    };

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: ' Blogs' },
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            {/* <BreadcrumbComponent headText='Our Medical Blogs' items={breadcrumbItems} /> */}
             <ServiceBreadcums items={breadcrumbItems} headText={"Blogs"} image={blogbread}/>
            
            {/* Blog Content */}
            <div className="container mx-auto xl:px-10 lg:px-6 px-2 py-12">


                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} className="px-2 h-full ">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                                {/* Image Container with Fixed Height */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                  
                                </div>

                                {/* Content Container with Fixed Height */}
                                <div className="lg:p-5 p-3 flex flex-col h-60">
                                    {/* Title with Fixed Height */}
                                    <h2 className="text-lg font-bold text-[#18978d] mb-2 line-clamp-2 ">
                                        {post.title}
                                    </h2>

                        

                                    {/* Excerpt with Fixed Height and Line Clamp */}
                                    <p className="text-sm text-gray-900 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    {/* Read More Button */}
                                    <button
                                        onClick={() => handleReadMore(post)}
                                        className="mt-auto text-[#18978d] font-medium flex items-center text-sm hover:underline transition-colors duration-200"
                                    >
                                        Read More
                                        <ArrowRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </div>
    );
}

export default BlogPage