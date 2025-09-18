 import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUserMd, 
  FaCalendarAlt, 
  FaBlog, 
  FaImages, 
  FaQuestionCircle 
} from "react-icons/fa";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Doctors", path: "/admin/doctors", icon: <FaUserMd /> },
    { name: "Appointments", path: "/admin/appointments", icon: <FaCalendarAlt /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FaBlog /> },
    { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
    { name: "Inquiries", path: "/admin/inquiries", icon: <FaQuestionCircle /> },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white w-64 min-h-screen shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center mb-1">
          <div className="bg-teal-500 rounded-lg p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl">Admin</h2>
        </div>
        <p className="text-slate-400 text-sm">Healthcare Management</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive 
                    ? "flex items-center p-3 bg-teal-600 text-white rounded-lg transition-all duration-300" 
                    : "flex items-center p-3 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all duration-300"
                }
              >
                <span className="text-lg mr-3 text-teal-400">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2025 Admin Panel
      </div>
    </div>
  );
};

export default Sidebar;