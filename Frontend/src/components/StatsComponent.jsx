import React from 'react';

const StatsComponent = () => {
  const primaryColor = "#18978d";
  const secondaryColor = "#ed8022";

  const stats = [
    {
      number: "30+",
      title: "Years Of",
      subtitle: "Experience"
    },
    {
      number: "110,000+",
      title: "Surgeries",
      subtitle: "Performed"
    },
    {
      number: "150+",
      title: "Awards &",
      subtitle: "Recognitions"
    }
  ];

  return (
    <div 
      className="w-full py-6 lg:px-12 px-4 sm:px-6 md:px-8"
      style={{ backgroundColor: '#e8f4f8' }}
    >
      <div className=" mx-auto container">
        {/* Main Heading */}
        <h2 
          className=" text-medium md:text-2xl lg:text-3xl xl:text-5xl font-bold text-center mb-4 sm:mb-6 text-gray-800"
         >
          We Are The Best At What We Do
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 sm:px-10 py-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                {stat.number}
              </div>
              <div 
                className="text-xl sm:text-2xl font-medium leading-tight"
                style={{ color: '#4a5568' }}
              >
                <div>{stat.title}</div>
                <div>{stat.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;