 import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

import AppointmentsAdmin from "./AppointmentsAdmin";
import BlogsAdmin from "./BlogsAdmin";
import GalleryAdmin from "./GalleryAdmin";
import InquiriesAdmin from "./InquiriesAdmin";
import DoctorsAdmin from "./DoctorsAdmin";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="bg-gradient-to-b from-blue-700 to-blue-500 text-white shadow-lg" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar className="shadow-md bg-white" />

        {/* Dashboard Content */}
        <div className="p-6 flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Welcome to Admin Dashboard
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Manage Doctors, Appointments, Blogs, Gallery, and Inquiries all in one place.
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {["Doctors", "Appointments", "Blogs", "Gallery", "Inquiries"].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer flex flex-col items-center justify-center"
                      >
                        <h3 className="text-xl font-semibold text-gray-800">{item}</h3>
                        <p className="text-gray-500 mt-2 text-sm">Quick access to {item} section</p>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
            <Route path="/doctors" element={<DoctorsAdmin />} />
            <Route path="/appointments" element={<AppointmentsAdmin />} />
            <Route path="/blogs" element={<BlogsAdmin />} />
            <Route path="/gallery" element={<GalleryAdmin />} />
            <Route path="/inquiries" element={<InquiriesAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
