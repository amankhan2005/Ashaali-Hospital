 import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DoctorsAdmin from "./DoctorsAdmin";
import AppointmentsAdmin from "./AppointmentsAdmin";
import BlogsAdmin from "./BlogsAdmin";
import GalleryAdmin from "./GalleryAdmin";
import InquiriesAdmin from "./InquiriesAdmin";
import { FaUserMd, FaCalendarAlt, FaBlog, FaImages, FaEnvelope, FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Routes>
            {/* Default Dashboard Overview */}
            <Route
              path="dashboard"
              element={
                <div>
                  {/* Header Section */}
                  <div className="mb-12">
                    <div className="flex items-center mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mr-4"></div>
                      <h1 className="text-4xl font-bold text-white">
                        Welcome, Administrator
                      </h1>
                    </div>
                    <p className="text-lg text-slate-300 max-w-3xl ml-16">
                      Here's a comprehensive overview of your healthcare management system. Monitor and manage all aspects of your medical practice from this centralized dashboard.
                    </p>
                  </div>

                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                      <h3 className="text-slate-400 text-sm font-medium mb-1">Total Doctors</h3>
                      <p className="text-3xl font-bold text-white">24</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                      <h3 className="text-slate-400 text-sm font-medium mb-1">Today's Appointments</h3>
                      <p className="text-3xl font-bold text-white">18</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                      <h3 className="text-slate-400 text-sm font-medium mb-1">Pending Inquiries</h3>
                      <p className="text-3xl font-bold text-white">7</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
                      <h3 className="text-slate-400 text-sm font-medium mb-1">Blog Articles</h3>
                      <p className="text-3xl font-bold text-white">32</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Doctors */}
                    <Link
                      to="/admin/doctors"
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl border border-blue-500/30 group-hover:border-blue-500/50 transition-colors duration-300">
                          <FaUserMd className="text-blue-400 text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-1">
                            Doctors
                          </h2>
                          <p className="text-slate-400">
                            Manage and update doctor profiles and schedules.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-blue-400 font-medium text-sm flex items-center">
                        Manage Doctors
                        <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>

                    {/* Appointments */}
                    <Link
                      to="/admin/appointments"
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-xl border border-green-500/30 group-hover:border-green-500/50 transition-colors duration-300">
                          <FaCalendarAlt className="text-green-400 text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-1">
                            Appointments
                          </h2>
                          <p className="text-slate-400">
                            View, approve, or reject patient bookings.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-green-400 font-medium text-sm flex items-center">
                        Manage Appointments
                        <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>

                    {/* Blogs */}
                    <Link
                      to="/admin/blogs"
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-3 rounded-xl border border-purple-500/30 group-hover:border-purple-500/50 transition-colors duration-300">
                          <FaBlog className="text-purple-400 text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-1">
                            Health Blogs
                          </h2>
                          <p className="text-slate-400">
                            Create and manage educational health content.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-purple-400 font-medium text-sm flex items-center">
                        Manage Blogs
                        <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>

                    {/* Gallery */}
                    <Link
                      to="/admin/gallery"
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-pink-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-3 rounded-xl border border-pink-500/30 group-hover:border-pink-500/50 transition-colors duration-300">
                          <FaImages className="text-pink-400 text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-1">
                            Gallery
                          </h2>
                          <p className="text-slate-400">
                            Upload and organize facility and team images.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-pink-400 font-medium text-sm flex items-center">
                        Manage Gallery
                        <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>

                    {/* Inquiries */}
                    <Link
                      to="/admin/inquiries"
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-3 rounded-xl border border-yellow-500/30 group-hover:border-yellow-500/50 transition-colors duration-300">
                          <FaEnvelope className="text-yellow-400 text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-1">
                            Patient Inquiries
                          </h2>
                          <p className="text-slate-400">
                            Check and respond to patient questions.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-yellow-400 font-medium text-sm flex items-center">
                        Manage Inquiries
                        <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              }
            />

            {/* Other Routes */}
            <Route path="doctors" element={<DoctorsAdmin />} />
            <Route path="appointments" element={<AppointmentsAdmin />} />
            <Route path="blogs" element={<BlogsAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="inquiries" element={<InquiriesAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;