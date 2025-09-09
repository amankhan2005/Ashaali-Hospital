import React from 'react';

const AboutHospitalComponent = () => {
  const stats = [
    { number: "8+", label: "Hospitals" },
    { number: "1,024+", label: "Beds" },
    { number: "1,970+", label: "Clinicians" },
    { number: "2,758+", label: "Supporting Staff" }
  ];

  return (
    <div className="w-full bg-white py-8 px-4 sm:py-12 sm:px-6 lg:py-12 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Securing Top-Tier Healthcare Solutions
            </h2>
            
            <div className="space-y-2 text-gray-600">
              <p className="text-sm sm:text-base leading-relaxed">
                Over the years, Ashaali has expanded its footprint, establishing a network of 11 hospitals across Pune, Nashik, 
                Ahilya Nagar, and Karad. With a strong commitment to accessible and quality healthcare, the hospital network has positively 
                impacted the lives of over 7.5 million patients, both in Lucknow and internationally.
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed">
                At Ashaali, a patient-centric approach is at the core of our care philosophy. We ensure that every individual 
                receives personalized attention, while also supporting their family's emotional and psychological well-being throughout the 
                healing journey.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-0 rounded-xl px-4 py-4 bg-[#f1fafd]">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#18978d] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
             <img src={"https://www.altiushospital.com/wp-content/uploads/2023/10/Altius_Hosp.webp"} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHospitalComponent;