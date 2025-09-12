 import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { FaHospital, FaUserMd, FaCalendarAlt, FaProcedures, FaFileMedical, FaUser, FaHeartbeat } from "react-icons/fa";

// Optional: you can pass custom labels for routes as a prop 'labels'
const Breadcrumb = ({ labels = {} }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  // Map routes to appropriate icons
  const getIcon = (path) => {
    const iconMap = {
      "doctors": <FaUserMd className="mr-1" />,
      "departments": <FaHospital className="mr-1" />,
      "book-appointment": <FaCalendarAlt className="mr-1" />,
      "services": <FaProcedures className="mr-1" />,
      "patients": <FaFileMedical className="mr-1" />,
      "profile": <FaUser className="mr-1" />,
      "health-checkup": <FaHeartbeat className="mr-1" />,
    };
    
    return iconMap[path] || null;
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 md:px-8 shadow-sm" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto flex items-center">
        <ol className="flex items-center space-x-1 md:space-x-3 text-sm">
          <li>
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200"
              >
                <Home className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Home</span>
              </Link>
            </div>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label = labels[to] || value.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            const icon = getIcon(value);
            
            return (
              <li key={to}>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                  {isLast ? (
                    <span className="text-gray-700 font-medium flex items-center">
                      {icon}
                      {label}
                    </span>
                  ) : (
                    <Link 
                      to={to} 
                      className="text-gray-500 hover:text-blue-600 flex items-center transition-colors duration-200"
                    >
                      {icon}
                      {label}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;