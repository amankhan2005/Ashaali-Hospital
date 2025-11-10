 import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUserMd, 
  FaCalendarAlt, 
  FaBlog, 
  FaImages, 
  FaQuestionCircle,
  FaTimes,
  FaBars,
  FaHospital,
  FaHeartbeat,
  FaUserNurse,
  FaProcedures
} from "react-icons/fa";
import Logo from "../assets/logo.png1.png"; // Import your logo

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const sidebarRef = useRef(null);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
        { name: "Departments", path: "/departments", icon: <FaHospital /> },  

    { name: "Doctors", path: "/doctors", icon: <FaUserMd /> },
     { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
    { name: "Blogs", path: "/blogs", icon: <FaBlog /> },
    { name: "Gallery", path: "/gallery", icon: <FaImages /> },
    { name: "Inquiries", path: "/inquiries", icon: <FaQuestionCircle /> },
    { name: "Jobs", path: "/jobs", icon: <FaUserNurse /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-white text-teal-600  hover:scale-110 transition-transform"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0  z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-teal-700 min-h-screen  flex flex-col fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isExpanded ? 'w-64' : 'w-20'}`}
        role="navigation"
        aria-label="Admin navigation"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header */}
        <div className={`p-4  flex justify-between items-center ${isExpanded ? '' : 'justify-center'}`}>
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 shadow-lg flex items-center justify-center w-16 h-16 hover:scale-105 transition-transform">
              <img src={Logo} alt="Ashali Hospital Logo" className="w-12 h-12 object-contain" />
            </div>
            {isExpanded && (
              <div className="ml-3">
                <h2 className="font-bold text-xl text-white tracking-wide">Ashaali Hospital</h2>
                <p className="text-teal-200 text-xs">Admin Portal</p>
              </div>
            )}
          </div>

          {/* Close Button for Mobile */}
          <button
            className="lg:hidden text-white hover:text-gray-200 transition-colors"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 px-2 overflow-y-auto">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `flex items-center px-5 py-3 rounded-lg justify-start bg-white text-teal-700 shadow-md transform scale-[1.02] transition-all duration-200 font-medium`
                      : `flex items-center px-5 py-3 rounded-lg justify-start text-white hover:bg-teal-600 hover:text-white  transition-all duration-200`
                  }
                  title={isExpanded ? '' : link.name}
                >
                  <span
                    className={`text-xl ${isExpanded ? 'mr-3' : ''} transition-transform duration-200 hover:scale-110`}
                  >
                    {link.icon}
                  </span>
                  {isExpanded && <span className="font-medium">{link.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {isExpanded && (
          <div className="p-3 text-center text-teal-200 text-xs border-t border-teal-600 mt-auto">
            <p>© 2025 Ashaali Hospital</p>
            <p className="mt-1">Admin Management System</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;