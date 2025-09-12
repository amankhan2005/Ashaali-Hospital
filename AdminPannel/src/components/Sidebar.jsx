import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Doctors", path: "/admin/doctors" },
    { name: "Appointments", path: "/admin/appointments" },
    { name: "Blogs", path: "/admin/blogs" },
    { name: "Gallery", path: "/admin/gallery" },
    { name: "Inquiries", path: "/admin/inquiries" },
  ];

  return (
    <div className="bg-gray-100 w-64 min-h-screen p-4">
      <h2 className="font-bold text-xl mb-6">Admin Menu</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "block p-2 bg-blue-600 text-white rounded" : "block p-2 hover:bg-blue-200 rounded"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
