//  import { Routes, Route, Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import DoctorsAdmin from "./DoctorsAdmin";
// import AppointmentsAdmin from "./AppointmentsAdmin";
// import BlogsAdmin from "./BlogsAdmin";
// import GalleryAdmin from "./GalleryAdmin";
// import InquiriesAdmin from "./InquiriesAdmin";
// import { FaUserMd, FaCalendarAlt, FaBlog, FaImages, FaEnvelope, FaArrowRight } from "react-icons/fa";

// const Dashboard = () => {
//   return (
//     <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar />

//         {/* Page Content */}
//         <div className="flex-1 overflow-y-auto p-8">
//           <Routes>
//             {/* Default Dashboard Overview */}
//             <Route
//               path="dashboard"
//               element={
//                 <div>
//                   {/* Header Section */}
//                   <div className="mb-12">
//                     <div className="flex items-center mb-4">
//                       <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mr-4"></div>
//                       <h1 className="text-4xl font-bold text-white">
//                         Welcome, Administrator
//                       </h1>
//                     </div>
//                     <p className="text-lg text-slate-300 max-w-3xl ml-16">
//                       Here's a comprehensive overview of your healthcare management system. Monitor and manage all aspects of your medical practice from this centralized dashboard.
//                     </p>
//                   </div>

//                   {/* Stats Overview */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//                     <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
//                       <h3 className="text-slate-400 text-sm font-medium mb-1">Total Doctors</h3>
//                       <p className="text-3xl font-bold text-white">24</p>
//                       <div className="mt-2 h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
//                     </div>
//                     <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
//                       <h3 className="text-slate-400 text-sm font-medium mb-1">Today's Appointments</h3>
//                       <p className="text-3xl font-bold text-white">18</p>
//                       <div className="mt-2 h-1 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
//                     </div>
//                     <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
//                       <h3 className="text-slate-400 text-sm font-medium mb-1">Pending Inquiries</h3>
//                       <p className="text-3xl font-bold text-white">7</p>
//                       <div className="mt-2 h-1 w-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
//                     </div>
//                     <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
//                       <h3 className="text-slate-400 text-sm font-medium mb-1">Blog Articles</h3>
//                       <p className="text-3xl font-bold text-white">32</p>
//                       <div className="mt-2 h-1 w-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
//                     </div>
//                   </div>

//                   {/* Cards Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {/* Doctors */}
//                     <Link
//                       to="/admin/doctors"
//                       className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
//                     >
//                       <div className="flex items-start space-x-4">
//                         <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl border border-blue-500/30 group-hover:border-blue-500/50 transition-colors duration-300">
//                           <FaUserMd className="text-blue-400 text-xl" />
//                         </div>
//                         <div>
//                           <h2 className="text-xl font-semibold text-white mb-1">
//                             Doctors
//                           </h2>
//                           <p className="text-slate-400">
//                             Manage and update doctor profiles and schedules.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-4 text-blue-400 font-medium text-sm flex items-center">
//                         Manage Doctors
//                         <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </Link>

//                     {/* Appointments */}
//                     <Link
//                       to="/admin/appointments"
//                       className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
//                     >
//                       <div className="flex items-start space-x-4">
//                         <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-xl border border-green-500/30 group-hover:border-green-500/50 transition-colors duration-300">
//                           <FaCalendarAlt className="text-green-400 text-xl" />
//                         </div>
//                         <div>
//                           <h2 className="text-xl font-semibold text-white mb-1">
//                             Appointments
//                           </h2>
//                           <p className="text-slate-400">
//                             View, approve, or reject patient bookings.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-4 text-green-400 font-medium text-sm flex items-center">
//                         Manage Appointments
//                         <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </Link>

//                     {/* Blogs */}
//                     <Link
//                       to="/admin/blogs"
//                       className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
//                     >
//                       <div className="flex items-start space-x-4">
//                         <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-3 rounded-xl border border-purple-500/30 group-hover:border-purple-500/50 transition-colors duration-300">
//                           <FaBlog className="text-purple-400 text-xl" />
//                         </div>
//                         <div>
//                           <h2 className="text-xl font-semibold text-white mb-1">
//                             Health Blogs
//                           </h2>
//                           <p className="text-slate-400">
//                             Create and manage educational health content.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-4 text-purple-400 font-medium text-sm flex items-center">
//                         Manage Blogs
//                         <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </Link>

//                     {/* Gallery */}
//                     <Link
//                       to="/admin/gallery"
//                       className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-pink-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
//                     >
//                       <div className="flex items-start space-x-4">
//                         <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-3 rounded-xl border border-pink-500/30 group-hover:border-pink-500/50 transition-colors duration-300">
//                           <FaImages className="text-pink-400 text-xl" />
//                         </div>
//                         <div>
//                           <h2 className="text-xl font-semibold text-white mb-1">
//                             Gallery
//                           </h2>
//                           <p className="text-slate-400">
//                             Upload and organize facility and team images.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-4 text-pink-400 font-medium text-sm flex items-center">
//                         Manage Gallery
//                         <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </Link>

//                     {/* Inquiries */}
//                     <Link
//                       to="/admin/inquiries"
//                       className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 block shadow-lg hover:shadow-xl"
//                     >
//                       <div className="flex items-start space-x-4">
//                         <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-3 rounded-xl border border-yellow-500/30 group-hover:border-yellow-500/50 transition-colors duration-300">
//                           <FaEnvelope className="text-yellow-400 text-xl" />
//                         </div>
//                         <div>
//                           <h2 className="text-xl font-semibold text-white mb-1">
//                             Patient Inquiries
//                           </h2>
//                           <p className="text-slate-400">
//                             Check and respond to patient questions.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-4 text-yellow-400 font-medium text-sm flex items-center">
//                         Manage Inquiries
//                         <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </Link>
//                   </div>
//                 </div>
//               }
//             />

//             {/* Other Routes */}
//             <Route path="doctors" element={<DoctorsAdmin />} />
//             <Route path="appointments" element={<AppointmentsAdmin />} />
//             <Route path="blogs" element={<BlogsAdmin />} />
//             <Route path="gallery" element={<GalleryAdmin />} />
//             <Route path="inquiries" element={<InquiriesAdmin />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

  import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DoctorsAdmin from "./DoctorsAdmin";
import AppointmentsAdmin from "./AppointmentsAdmin";
import BlogsAdmin from "./BlogsAdmin";
import GalleryAdmin from "./GalleryAdmin";
import InquiriesAdmin from "./InquiriesAdmin";
import { 
  FaUserMd, 
  FaCalendarAlt, 
  FaBlog, 
  FaImages, 
  FaEnvelope, 
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaChartLine,
  FaHospital,
  FaUserInjured,
  FaClipboardList,
  FaStar,
  FaTrophy,
  FaMedal,
  FaAward
} from "react-icons/fa";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Stats data for slider
  const stats = [
    {
      title: "Total Doctors",
      value: "24",
      icon: <FaUserMd className="text-3xl" />,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/10",
      description: "Specialists across all departments"
    },
    {
      title: "Today's Appointments",
      value: "18",
      icon: <FaCalendarAlt className="text-3xl" />,
      color: "from-emerald-500 to-teal-400",
      bgColor: "bg-emerald-500/10",
      description: "Scheduled for today"
    },
    {
      title: "Pending Inquiries",
      value: "7",
      icon: <FaEnvelope className="text-3xl" />,
      color: "from-purple-500 to-indigo-400",
      bgColor: "bg-purple-500/10",
      description: "Awaiting response"
    },
    {
      title: "Blog Articles",
      value: "32",
      icon: <FaBlog className="text-3xl" />,
      color: "from-pink-500 to-rose-400",
      bgColor: "bg-pink-500/10",
      description: "Health articles published"
    }
  ];

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stats.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stats.length]);

  // Navigation cards
  const navCards = [
    {
      title: "Doctors",
      description: "Manage and update doctor profiles and schedules.",
      icon: <FaUserMd className="text-xl" />,
      color: "blue",
      link: "/admin/doctors",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/30",
      hoverColor: "hover:border-blue-500/50",
      textColor: "text-blue-500",
      iconBg: "bg-blue-500/20"
    },
    {
      title: "Appointments",
      description: "View, approve, or reject patient bookings.",
      icon: <FaCalendarAlt className="text-xl" />,
      color: "emerald",
      link: "/admin/appointments",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/30",
      hoverColor: "hover:border-emerald-500/50",
      textColor: "text-emerald-500",
      iconBg: "bg-emerald-500/20"
    },
    {
      title: "Health Blogs",
      description: "Create and manage educational health content.",
      icon: <FaBlog className="text-xl" />,
      color: "purple",
      link: "/admin/blogs",
      bgGradient: "from-purple-500/10 to-indigo-500/10",
      borderColor: "border-purple-500/30",
      hoverColor: "hover:border-purple-500/50",
      textColor: "text-purple-500",
      iconBg: "bg-purple-500/20"
    },
    {
      title: "Gallery",
      description: "Upload and organize facility and team images.",
      icon: <FaImages className="text-xl" />,
      color: "pink",
      link: "/admin/gallery",
      bgGradient: "from-pink-500/10 to-rose-500/10",
      borderColor: "border-pink-500/30",
      hoverColor: "hover:border-pink-500/50",
      textColor: "text-pink-500",
      iconBg: "bg-pink-500/20"
    },
    {
      title: "Patient Inquiries",
      description: "Check and respond to patient questions.",
      icon: <FaEnvelope className="text-xl" />,
      color: "amber",
      link: "/admin/inquiries",
      bgGradient: "from-amber-500/10 to-yellow-500/10",
      borderColor: "border-amber-500/30",
      hoverColor: "hover:border-amber-500/50",
      textColor: "text-amber-500",
      iconBg: "bg-amber-500/20"
    }
  ];

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Responsive adjustments
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            {/* Default Dashboard Overview */}
            <Route
              path="dashboard"
              element={
                <div className="max-w-7xl mx-auto">
                  {/* Header Section */}
                  <div className="mb-6 sm:mb-8 md:mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-4 shadow-lg"></div>
                        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                          Welcome, Administrator
                        </h1>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl ml-0 sm:ml-16">
                      Here's a comprehensive overview of your healthcare management system. Monitor and manage all aspects of your medical practice from this centralized dashboard.
                    </p>
                  </div>

                  {/* Stats Overview - Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-12">
                    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg transform transition-transform hover:scale-105">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-lg bg-blue-500/20 mr-3">
                          <FaUserMd className="text-blue-500 text-xl" />
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-800">24</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg transform transition-transform hover:scale-105">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-lg bg-emerald-500/20 mr-3">
                          <FaCalendarAlt className="text-emerald-500 text-xl" />
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Today's Appointments</h3>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-800">18</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg transform transition-transform hover:scale-105">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-lg bg-purple-500/20 mr-3">
                          <FaEnvelope className="text-purple-500 text-xl" />
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Pending Inquiries</h3>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-800">7</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg transform transition-transform hover:scale-105">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-lg bg-pink-500/20 mr-3">
                          <FaBlog className="text-pink-500 text-xl" />
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Blog Articles</h3>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-800">32</p>
                      <div className="mt-2 h-1 w-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-sm"></div>
                    </div>
                  </div>

                  {/* Stats Slider */}
                  <div className="mb-6 sm:mb-8 md:mb-16">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                       
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200 shadow-xl h-40 sm:h-48 md:h-64">
                      <div 
                        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {stats.map((stat, index) => (
                          <div 
                            key={index} 
                            className="w-full flex-shrink-0 flex flex-col justify-center items-center p-4 sm:p-8 cursor-pointer"
                            onClick={() => openModal(stat)}
                          >
                            <div className={`p-4 sm:p-6 rounded-full bg-gradient-to-br ${stat.color} mb-3 sm:mb-6 shadow-lg`}>
                              {stat.icon}
                            </div>
                            <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">{stat.title}</h3>
                            <p className="text-2xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2 sm:mb-4">{stat.value}</p>
                            <p className="text-gray-600 text-center text-xs sm:text-base">{stat.description}</p>
                            <div className={`mt-2 sm:mt-4 h-1 w-12 sm:w-16 bg-gradient-to-r rounded-full shadow-sm ${stat.color}`}></div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center space-x-1 sm:space-x-2">
                        {stats.map((_, i) => (
                          <button 
                            key={i} 
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${i === currentSlide ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-gray-300'}`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>

                

                  {/* Navigation Cards */}
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-4 sm:mb-6">Management Panel</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {navCards.map((card, index) => (
                        <Link
                          key={index}
                          to={card.link}
                          className={`group bg-white bg-opacity-80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border ${card.borderColor} ${card.hoverColor} transition-all duration-300 block shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`bg-gradient-to-br ${card.bgGradient} p-3 rounded-xl border ${card.borderColor} group-hover:border-${card.color}-500/50 transition-colors duration-300 shadow-sm`}>
                              <div className={card.textColor}>
                                {card.icon}
                              </div>
                            </div>
                            <div>
                              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                                {card.title}
                              </h2>
                              <p className="text-gray-600 text-sm">
                                {card.description}
                              </p>
                            </div>
                          </div>
                          <div className={`mt-3 sm:mt-4 ${card.textColor} font-medium text-sm flex items-center`}>
                            Manage {card.title}
                            <FaArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl border border-gray-200 w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">{modalContent.title}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex flex-col items-center mb-4 sm:mb-6">
                <div className={`p-4 sm:p-6 rounded-full bg-gradient-to-br ${modalContent.color} mb-3 sm:mb-4 shadow-lg`}>
                  {modalContent.icon}
                </div>
                <p className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2">{modalContent.value}</p>
                <p className="text-gray-600 text-center text-sm sm:text-base">{modalContent.description}</p>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={closeModal}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;