 import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Hospital Title */}
      <div className="bg-white rounded-xl shadow p-6 text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Ashaali Hospital
        </h1>
        <p className="text-gray-600 mt-2">
          Best Orthopedic Surgeon, Eye Care, Obstetrician and Gynecologist, Neuro-Spine Brain Hospital in Lucknow
        </p>
      </div>

      {/* Admin Navigation */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Admin Panel – Manage Sections
        </h2>
        <ul className="space-y-3 text-gray-700 text-lg">
          <li>
            <Link to="/admin/doctors" className="hover:underline">
              ➤ Manage Doctors
            </Link>
          </li>
          <li>
            <Link to="/admin/appointments" className="hover:underline">
              ➤ Manage Appointments
            </Link>
          </li>
          <li>
            <Link to="/admin/blogs" className="hover:underline">
              ➤ Manage Blogs
            </Link>
          </li>
          <li>
            <Link to="/admin/gallery" className="hover:underline">
              ➤ Manage Gallery
            </Link>
          </li>
          <li>
            <Link to="/admin/inquiries" className="hover:underline">
              ➤ Manage Inquiries
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
