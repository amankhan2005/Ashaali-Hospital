import React from 'react';
import { Calendar, Heart, Users, Percent, Award, Building2 } from 'lucide-react';

const HomeFeatures = () => {
  return (
    <div style={{ backgroundColor: '#e8f4f8' }}>
      {/* Main Hero Section */}


      {/* Services Grid */}
      <section className="py-1" >
        <div className="container mx-auto ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                icon: <Calendar className="w-12 h-12" style={{ color: '#18978d' }} />,
                title: 'Book an Appointment',
                desc: 'Consult with Our Experts, Hassle-Free',
              },
              {
                icon: <Heart className="w-12 h-12" style={{ color: '#18978d' }} />,
                title: 'Health Check Packages',
                desc: 'Preventive Care That Prioritizes You',
              },
              {
                icon: <Users className="w-12 h-12" style={{ color: '#18978d' }} />,
                title: 'Our Doctors',
                desc: 'Expertise That Heals',
              },
              {
                icon: <Percent className="w-12 h-12" style={{ color: '#18978d' }} />,
                title: 'Exciting Offers',
                desc: 'Quality Healthcare, Smart Savings',
              },
              {
                icon: <Award className="w-12 h-12" style={{ color: '#18978d' }} />,
                title: 'Our Accolades',
                desc: 'Recognized for Excellence in Care',
              },
              {
                icon: <Building2 className="w-12 h-12" style={{ color: '#18978d' }} />,
                title: 'Our Facilities',
                desc: 'State-of-the-Art Infrastructure',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg px-4 py-4 text-center shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-700 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFeatures;
