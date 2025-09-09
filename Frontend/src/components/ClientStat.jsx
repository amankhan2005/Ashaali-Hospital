import React, { useEffect } from "react";
import { FaMicroscope, FaVial, FaRegHospital } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
// import AOS from "aos";
// import "aos/dist/aos.css";


const stats = [
  {
    id: 1,
    title: "Happy Patients",
    count: "10000",
    icon: <FaRegHospital className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
  {
    id: 2,
    title: "Years Experience",
    count: "30",
    icon: <MdAccessTime className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
  {
    id: 3,
    title: "Total Cases Solved",
    count: "10000",
    icon: <FaMicroscope className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
  {
    id: 4,
    title: "Deliveries",
    count: "7000",
    icon: <FaVial className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
    {
    id: 4,
    title: "Deliveries",
    count: "7000",
    icon: <FaVial className="text-[#fff] h-12 w-12 sm:h-16 sm:w-16" />,
  },
];


const ClinicStats = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

  return (
    <section className="py-8" style={{ background: `linear-gradient(to right, ${hexToRgba('#18978d', 0.8)}, ${hexToRgba('#ed8022', 0.9)})` }}>
      <div className="container mx-auto lg:px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div className="p-4">
            <div className="text-white lg:text-5xl text-4xl font-bold mb-2">10000+</div>
            <div className="text-white font-semibold">HAPPY PATIENTS</div>
          </div>
          <div className="p-4">
            <div className="text-white lg:text-5xl text-4xl font-bold mb-2">30+</div>
            <div className="text-white font-semibold">YEARS EXPERIENCE</div>
          </div>
          <div className="p-4">
            <div className="text-white lg:text-5xl text-4xl font-bold mb-2">10000+</div>
            <div className="text-white font-semibold">TOTAL CASES SOLVED</div>
          </div>
                    <div className="p-4">
            <div className="text-white lg:text-5xl text-4xl font-bold mb-2">5000+</div>
            <div className="text-white font-semibold">SUCCESSFUL SURGERIES</div>
          </div>
          <div className="p-4">
            <div className="text-white lg:text-5xl text-4xl font-bold mb-2">7000+</div>
            <div className="text-white font-semibold">Deliveries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to convert hex to rgba for gradient backgrounds
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default ClinicStats;
