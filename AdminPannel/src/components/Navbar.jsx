 import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <nav className="bg-gradient-to-b from-teal-700 to-teal-800 shadow-lg px-6 sm:px-8 py-4 flex justify-between items-center w-full border-b-2 border-teal-800">
      
      {/* Hospital Branding */}
      <div className="flex items-center space-x-4">
        {/* Hospital Icon */}
        <div className="bg-white p-2 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Title and Tagline */}
        <div>
          <h1 className="font-bold text-white text-xl sm:text-2xl md:text-3xl tracking-wide">
            Ashali Hospital
          </h1>
          <p className="text-teal-100 text-sm hidden md:block">
            Admin Management System
          </p>
        </div>
      </div>

      {/* Logout Button with Icon */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 px-5 py-2.5 rounded-lg text-sm sm:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
        </svg>
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;