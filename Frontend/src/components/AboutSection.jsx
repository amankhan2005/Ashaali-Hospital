import React from 'react';
import HomeFeatures from '../pages/Home/HomeFeature';

const AboutSection = () => {

  const primaryColor = "#18978d";
  const secondaryColor = "#ed8022";
  return (


    <div className=" py-6 sm:py-12 md:py-14 lg:py-10   lg:px-12 px-4 sm:px-6 md:px-8  " style={{ backgroundColor: '#e8f4f8' }}>
      <div className=" mx-auto container">

        <div >
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
              About Ashaali Hospital
            </span>
          </div>

          {/* Main SEO heading */}
          <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-3xl font-bold mb-2 leading-tight">

            <span style={{ color: primaryColor }}> Your Trusted Destination </span>
            <span className="text-gray-800"> For </span>
            <span style={{ color: primaryColor }}>Comprehensive Medical Care</span>
          </h1>

        </div>

        {/* Content Section */}
   <div>
      <div className="">
        <p className="text-gray-700 leading-6 mb-2 text-lg" style={{textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto'}}>
          Ashaali Hospital is a premier Super Specialty Hospital, committed to delivering comprehensive, compassionate, and world-class medical care—all under one roof. Backed by a team of highly experienced doctors and surgeons, cutting-edge technology, and state-of-the-art infrastructure, we strive to meet every healthcare need with precision and personalized attention.
        </p>
                 
        <p className="text-gray-700 leading-6 mb-4 text-lg text-justify" style={{textAlignLast: 'left'}}>
          Our hospital offers an extensive range of specialties, including <strong>Orthopedics</strong>, <strong>Ophthalmology</strong>, <strong>Pediatrics</strong>, <strong>Neurology</strong>, <strong>General Medicine</strong>, <strong>ENT</strong>, <strong>Gastroenterology</strong>, <strong>General Surgery</strong>, <strong>Urology</strong>, <strong>Nephrology</strong>, <strong>Dental Care</strong>, <strong>Hematology</strong>, <strong>Pulmonology</strong>, <strong>Dermatology</strong>, <strong>Psychiatry</strong>, <strong>Cardiology</strong>, <strong>Oncology</strong>, <strong>ICU & Critical Care</strong>, <strong>Rheumatology</strong>, and <strong>Endocrinology</strong>.
        </p>
                 
        <p className="text-gray-700 leading-6 mb-2 text-lg" style={{textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto'}}>
          At Ashaali Hospital, we embrace a patient-centric approach, placing your health, well-being, and recovery at the heart of everything we do. From routine check-ups to the most complex treatments, we are dedicated to delivering holistic and high-quality care tailored to each individual. Our mission is to emerge as a trusted center of excellence, known for clinical expertise, compassionate service, and exceptional outcomes. Whatever your health journey, Ashaali Hospital is here to walk with you—every step of the way.
        </p>
      </div>
    </div>


             <HomeFeatures/>
      </div>
        
    </div>
  );
};

export default AboutSection;