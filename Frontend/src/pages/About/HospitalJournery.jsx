import React from 'react';

const HospitalJourney = () => {
  const milestones = [
    {
      year: 1995,
      title: "Ashaali Medical Centre",
      subtitle: "The first medical centre in Lucknow for General Medicine & Emergency Care",
      position: "right"
    },
    {
      year: 2001,
      title: "Ashaali Laboratory & Diagnostic Centre",
      subtitle: "Advanced diagnostic services for better healthcare",
      position: "left"
    },
    {
      year: 2005,
      title: "Ashaali Super Speciality Hospital",
      subtitle: "Gomti Nagar, Lucknow",
      position: "right"
    },
    {
      year: 2007,
      title: "Ashaali Hospital",
      subtitle: "Alambagh, Lucknow", 
      position: "left"
    },
    {
      year: 2010,
      title: "Ashaali Multi-Speciality Expansion",
      subtitle: "Aliganj & Indira Nagar, Lucknow",
      position: "right"
    },
    {
      year: 2014,
      title: "Ashaali Super Speciality Hospital",
      subtitle: "Mahanagar, Lucknow",
      position: "left"
    },
    {
      year: 2016,
      title: "Ashaali Super Speciality Hospital",
      subtitle: "Chinhat, Lucknow",
      position: "right"
    },
    {
      year: 2019,
      title: "Ashaali Super Speciality Hospital",
      subtitle: "Rajajipuram, Lucknow",
      position: "left"
    },
    {
      year: 2022,
      title: "Ashaali Super Speciality Hospital",
      subtitle: "Kanpur Road, Lucknow",
      position: "right"
    },
    {
      year: 2024,
      title: "Maternity & Child Care Centre",
      subtitle: "Hazratganj & Aishbagh, Lucknow",
      position: "left"
    }
  ];

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-12 ">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">        
        {/* Enhanced Header */}
        <div className="text-center mb-20">

          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Our Journey So Far
          </h1>

        </div>

        {/* Enhanced Timeline Container */}
        <div className="relative">
          {/* Animated Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full z-0 shadow-sm"
               style={{backgroundColor: '#18978d', boxShadow: '0 0 20px rgba(24, 151, 141, 0.3)'}}>
          </div>

          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-8 w-1 h-full rounded-full z-0 shadow-sm"
               style={{backgroundColor: '#18978d', boxShadow: '0 0 10px rgba(24, 151, 141, 0.3)'}}>
          </div>

          {/* Enhanced Timeline Items */}
          <div className="relative z-10 space-y-12 lg:space-y-20">
            {milestones.map((milestone, index) => (
              <div key={index} className="group">
                
                {/* Mobile Layout - Enhanced */}
                <div className="lg:hidden flex items-start">
                  <div className="flex-shrink-0 relative mr-8">
                    <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center z-20 relative border-4 group-hover:scale-110 transition-all duration-300" 
                         style={{borderColor: '#18978d'}}>
                      <span className="text-sm font-bold text-gray-800">{milestone.year}</span>
                    </div>
                    <div className="absolute -top-3 -right-2 w-6 h-6 flex items-center justify-center">
                      <span className="text-xl font-bold animate-pulse" style={{color: '#18978d'}}>+</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm" 
                         style={{borderLeftColor: '#18978d', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                      <h3 className="font-bold text-gray-800 text-base leading-tight mb-3">
                        {milestone.title}
                      </h3>
                      {milestone.subtitle && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {milestone.subtitle}
                        </p>
                      )}
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: '#18978d'}}></div>
                        Healthcare Excellence
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Enhanced */}
                <div className="hidden lg:flex items-center">
                  {milestone.position === 'right' ? (
                    <>
                      <div className="w-5/12 pr-8">
                        <div className="text-right group-hover:translate-x-4 transition-transform duration-500">
                          <div className="inline-block">
                            <span className="text-5xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
                              {milestone.year}
                            </span>
                            <span className="text-3xl font-bold ml-2 animate-pulse" style={{color: '#18978d'}}>+</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-2/12 flex justify-center">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-white shadow-2xl z-20 relative border-4 group-hover:scale-125 transition-all duration-300" 
                               style={{borderColor: '#18978d', boxShadow: '0 0 30px rgba(24, 151, 141, 0.4)'}}>
                          </div>
                          <div className="absolute inset-0 rounded-full animate-ping" 
                               style={{backgroundColor: '#18978d', opacity: 0.2}}>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-5/12 pl-8">
                        <div className="relative group-hover:-translate-x-4 transition-transform duration-500">
                          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 group-hover:shadow-2xl transition-all duration-500 backdrop-blur-sm" 
                               style={{borderLeftColor: '#18978d', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                            <h3 className="font-bold text-gray-800 text-lg leading-tight mb-4">
                              {milestone.title}
                            </h3>
                            {milestone.subtitle && (
                              <p className="text-gray-600 text-base leading-relaxed mb-4">
                                {milestone.subtitle}
                              </p>
                            )}
                            <div className="flex items-center text-sm text-gray-500">
                              <div className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: '#18978d'}}></div>
                              Healthcare Excellence Since {milestone.year}
                            </div>
                          </div>

                          <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                            <svg width="80" height="60" className="overflow-visible group-hover:scale-110 transition-transform duration-300">
                              <defs>
                                <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#18978d" />
                                  <stop offset="100%" stopColor="#16a085" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M 0,30 Q 40,10 80,30"
                                stroke={`url(#gradient-${index})`}
                                strokeWidth="3"
                                fill="none"
                                className="drop-shadow-lg"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-5/12 pr-8">
                        <div className="relative text-right group-hover:translate-x-4 transition-transform duration-500">
                          <div className="bg-white rounded-2xl shadow-xl p-8 border-r-4 group-hover:shadow-2xl transition-all duration-500 backdrop-blur-sm" 
                               style={{borderRightColor: '#18978d', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                            <h3 className="font-bold text-gray-800 text-lg leading-tight mb-4">
                              {milestone.title}
                            </h3>
                            {milestone.subtitle && (
                              <p className="text-gray-600 text-base leading-relaxed mb-4">
                                {milestone.subtitle}
                              </p>
                            )}
                            <div className="flex items-center justify-end text-sm text-gray-500">
                              <span>Healthcare Excellence Since {milestone.year}</span>
                              <div className="w-3 h-3 rounded-full ml-3" style={{backgroundColor: '#18978d'}}></div>
                            </div>
                          </div>

                          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                            <svg width="80" height="60" className="overflow-visible group-hover:scale-110 transition-transform duration-300">
                              <defs>
                                <linearGradient id={`gradient-left-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#16a085" />
                                  <stop offset="100%" stopColor="#18978d" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M 80,30 Q 40,10 0,30"
                                stroke={`url(#gradient-left-${index})`}
                                strokeWidth="3"
                                fill="none"
                                className="drop-shadow-lg"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-2/12 flex justify-center">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-white shadow-2xl z-20 relative border-4 group-hover:scale-125 transition-all duration-300" 
                               style={{borderColor: '#18978d', boxShadow: '0 0 30px rgba(24, 151, 141, 0.4)'}}>
                          </div>
                          <div className="absolute inset-0 rounded-full animate-ping" 
                               style={{backgroundColor: '#18978d', opacity: 0.2}}>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-5/12 pl-8">
                        <div className="group-hover:-translate-x-4 transition-transform duration-500">
                          <div className="inline-block">
                            <span className="text-5xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
                              {milestone.year}
                            </span>
                            <span className="text-3xl font-bold ml-2 animate-pulse" style={{color: '#18978d'}}>+</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default HospitalJourney;