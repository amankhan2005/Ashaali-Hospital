//  import React from "react";
// import { NavLink } from "react-router-dom";
// import { 
//   FaTachometerAlt, 
//   FaUserMd, 
//   FaCalendarAlt, 
//   FaBlog, 
//   FaImages, 
//   FaQuestionCircle 
// } from "react-icons/fa";

// const Sidebar = () => {
//   const links = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
//     { name: "Doctors", path: "/admin/doctors", icon: <FaUserMd /> },
//     { name: "Appointments", path: "/admin/appointments", icon: <FaCalendarAlt /> },
//     { name: "Blogs", path: "/admin/blogs", icon: <FaBlog /> },
//     { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
//     { name: "Inquiries", path: "/admin/inquiries", icon: <FaQuestionCircle /> },
//   ];

//   return (
//     <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white w-64 min-h-screen shadow-xl flex flex-col">
//       {/* Header */}
//       <div className="p-6 border-b border-slate-700">
//         <div className="flex items-center mb-1">
//           <div className="bg-teal-500 rounded-lg p-2 mr-3">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//             </svg>
//           </div>
//           <h2 className="font-bold text-2xl">Admin</h2>
//         </div>
//         <p className="text-slate-400 text-sm">Healthcare Management</p>
//       </div>
      
//       {/* Navigation */}
//       <nav className="flex-1 mt-6 px-4">
//         <ul className="space-y-1">
//           {links.map((link) => (
//             <li key={link.name}>
//               <NavLink
//                 to={link.path}
//                 className={({ isActive }) =>
//                   isActive 
//                     ? "flex items-center p-3 bg-teal-600 text-white rounded-lg transition-all duration-300" 
//                     : "flex items-center p-3 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all duration-300"
//                 }
//               >
//                 <span className="text-lg mr-3 text-teal-400">{link.icon}</span>
//                 <span className="font-medium">{link.name}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
      
//       {/* Footer */}
//       <div className="p-4 text-center text-slate-500 text-sm border-t border-slate-800">
//         © 2025 Admin Panel
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

 import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUserMd, 
  FaCalendarAlt, 
  FaBlog, 
  FaImages, 
  FaQuestionCircle,
  FaTimes,
  FaBars
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Doctors", path: "/admin/doctors", icon: <FaUserMd /> },
    { name: "Appointments", path: "/admin/appointments", icon: <FaCalendarAlt /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FaBlog /> },
    { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
    { name: "Inquiries", path: "/admin/inquiries", icon: <FaQuestionCircle /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-white   backdrop-blur-sm bg-opacity-80 border border-gray-200"
        onClick={toggleSidebar}
      >
        <FaBars className="text-teal-500 text-medium" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`bg-white bg-opacity-80 backdrop-blur-xl w-64 min-h-screen shadow-lg flex flex-col fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-xl p-3 mr-3 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="font-bold text-2xl text-gray-800">Admin Panel</h2>
          </div>
          
          {/* Close Button for Mobile */}
          <button 
            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
            onClick={toggleSidebar}
          >
            <FaTimes className="text-medium" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 overflow-y-auto">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center p-2 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-xl transition-all duration-300 shadow-md" 
                      : "flex items-center p-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500 rounded-xl transition-all duration-300"
                  }
                >
                  <span className={`text-lg mr-3 ${({ isActive }) => isActive ? 'text-white' : 'text-teal-500'}`}>
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-100 bg-white bg-opacity-70 backdrop-blur-sm">
          © 2025 Admin Panel
        </div>
      </div>
    </>
  );
};

export default Sidebar;