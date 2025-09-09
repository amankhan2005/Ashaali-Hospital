import React, { useEffect } from 'react';
import BreadCrumbs from '../../components/Breadcums';
import { Link } from 'react-router-dom';

import finddoctor from '../../assets/service-breas/Doctors.jpg'
import ServiceBreadcums from '../service/ServiceBrad';

const Team = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. B Ramesh",
      title: "Founder & Medical Director of Ashalli Group of Hospitals",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      description: "Dr. B Ramesh is an internationally acclaimed gynaecologist, having a significant presence both academically and clinically all over the World with extensive experience as faculty at national & International Conference & Workshop. He has performed more than 100,000 major Gynae laparoscopic Surgeries which are rare feat for any surgeon to achieve today anywhere worldwide. Dr. B. Ramesh is also the first gynaecologist to perform 3D laparoscopic surgeries in India.",
      isMain: true
    },
    {
      id: 2,
      name: "Dr. Priya SP Patil",
      title: "Consultant Gynaec & Fertility Specialist",
      image: "https://images.unsplash.com/photo-1594824475480-8acf1ca3b8e9?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Darshana Reddy",
      title: "Consultant - Internal Medicine & Diabetologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dr. Harish Puranik",
      title: "HOD & Consultant - Orthopedics",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Dr Mahendra M",
      title: "Consultant- Neurosurgeon",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
    },
        {
      id: 2,
      name: "Dr. Priya SP Patil",
      title: "Consultant Gynaec & Fertility Specialist",
      image: "https://images.unsplash.com/photo-1594824475480-8acf1ca3b8e9?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Darshana Reddy",
      title: "Consultant - Internal Medicine & Diabetologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dr. Harish Puranik",
      title: "HOD & Consultant - Orthopedics",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Dr Mahendra M",
      title: "Consultant- Neurosurgeon",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
    }
  ];

  const mainDoctor = doctors.find(doctor => doctor.isMain);
  const otherDoctors = doctors.filter(doctor => !doctor.isMain);

  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Team" },
  ];

      // Scroll to top on component mount
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    

  return (
    <section>

        <ServiceBreadcums items={breadcrumbItems} headText={"Our Best Team"} image={finddoctor} />
           <div className="w-full bg-gray-50 py-8 md:py-12 px-4">
     
      <div className=" mx-auto ">

        {/* Main Doctor Profile */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100  py-6    ">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 container px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Doctor Image */}
            <div className="flex flex-col items-center lg:items-start flex-shrink-0">
              <div className="w-64 md:w-72 lg:w-80 h-48 md:h-56 lg:h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm">
                <img 
                  src={mainDoctor?.image} 
                  alt={mainDoctor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <button className="text-[#18978d] font-semibold hover:text-[#147a71] transition-colors duration-200 text-sm md:text-base underline decoration-2 underline-offset-4">
                  VIEW FULL PROFILE
                </button>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-center lg:text-left pb-4">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#18978d] mb-3">
                {mainDoctor?.name}
              </h3>
              <p className="text-gray-600 font-medium mb-4 md:mb-6 text-base md:text-lg">
                {mainDoctor?.title}
              </p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-base  text-justify">
                {mainDoctor?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Other Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 mt-6">
          {otherDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              {/* Doctor Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Doctor Info */}
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight">
                {doctor.name}
              </h4>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed min-h-[3rem] md:min-h-[3.5rem]">
                {doctor.title}
              </p>
              
              {/* View Profile Link */}
              <Link to={`/about/team/${doctor.name}`} className="text-[#18978d] font-semibold hover:text-[#147a71] transition-colors duration-200 text-sm md:text-base underline decoration-2 underline-offset-4 cursor-pointer">
                VIEW FULL PROFILE
              </Link>
            </div>
          ))}
        </div>




      </div>
    </div>
    </section>

  );
};

export default Team;