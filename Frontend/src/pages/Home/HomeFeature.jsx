import React from 'react';
import { Calendar, Heart, Users, Percent, Award, Building2 } from 'lucide-react';
import { Link } from "react-router-dom";


const HomeFeatures = () => {
  return (
    <div style={{ backgroundColor: '#e8f4f8' }}>
      {/* Main Hero Section */}


      {/* Services Grid */}
     
      <section className="py-1">
  <div className="container mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        {
          icon: <Calendar className="w-12 h-12" style={{ color: "#18978d" }} />,
          title: "Book an Appointment",
          desc: "Consult with Our Experts, Hassle-Free",
          link: "/book-appointment",
        },
        {
          icon: <Heart className="w-12 h-12" style={{ color: "#18978d" }} />,
          title: "Health Check Packages",
          desc: "Preventive Care That Prioritizes You",
          link: "/contact",
        },
        {
          icon: <Users className="w-12 h-12" style={{ color: "#18978d" }} />,
          title: "Our Doctors",
          desc: "Expertise That Heals",
          link: "/about/team",
        },
        {
          icon: <Percent className="w-12 h-12" style={{ color: "#18978d" }} />,
          title: "Exciting Offers",
          desc: "Quality Healthcare, Smart Savings",
          link: "/contact",
        },
        {
          icon: <Award className="w-12 h-12" style={{ color: "#18978d" }} />,
          title: "Our Accolades",
          desc: "Recognized for Excellence in Care",
          link: "/contact",
        },
        {
          icon: <Building2 className="w-12 h-12" style={{ color: "#18978d" }} />,
          title: "Our Facilities",
          desc: "State-of-the-Art Infrastructure",
          link: "/facility/icu",
        },
      ].map((item, index) => (
        <Link
  to={item.link}
  key={index}
  className="bg-white rounded-lg px-4 py-4 text-center shadow-sm 
             hover:shadow-lg hover:scale-105 hover:border hover:border-[#18978d] 
             transition-all duration-300 ease-in-out 
             h-full flex flex-col justify-between cursor-pointer"
>
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
      {item.icon}
    </div>
    <h3 className="font-semibold text-sm text-gray-700 mb-1">
      {item.title}
    </h3>
    <p className="text-sm text-gray-500">{item.desc}</p>
  </div>
</Link>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default HomeFeatures;
