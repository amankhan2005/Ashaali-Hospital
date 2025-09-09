import React from 'react';
import { Users, TrendingUp, DollarSign, Search, Clock } from 'lucide-react';

const WhyChooseAshaali = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-[#18978d]" />,
      title: "Acclaimed IVF Experts",
      description: "Our team consists of highly qualified and experienced fertility specialists with proven track records in reproductive medicine."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#18978d]" />,
      title: "High Success Rate",
      description: "We maintain industry-leading success rates through advanced techniques, personalized treatment plans, and cutting-edge technology."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-[#18978d]" />,
      title: "Affordable Treatment",
      description: "Quality fertility care shouldn't be out of reach. We offer competitive pricing and flexible payment options for all our services."
    },
   
  ];

  return (
    <div className="py-10 bg-gray-100 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-[#18978d]">Ashaali Hospital</span>?
          </h2>
          <div className="w-24 h-1 bg-[#18978d] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-justify  lg:text-center">
            Experience world-class fertility care with our comprehensive approach that combines medical expertise, 
            advanced technology, and compassionate support to help you achieve your dream of parenthood.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-[#18978d] group-hover:text-white transition-all duration-300">
                  {React.cloneElement(feature.icon, {
                    className: "w-12 h-12 text-white group-hover:text-white transition-colors duration-300"
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#18978d] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>



      </div>
    </div>
  );
};

export default WhyChooseAshaali;