//  import { useState, useEffect } from "react";
// import API from "../api/axios";
// import { FaUser, FaEnvelope, FaPhone, FaTrash, FaSearch, FaTimes, FaRegClock, FaChartLine, FaComments, FaCheckCircle } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const InquiriesAdmin = () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredInquiries, setFilteredInquiries] = useState([]);

//   const fetchInquiries = async () => {
//     const res = await API.get("/api/contact/getall");
//     setInquiries(res.data);
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   useEffect(() => {
//     const filtered = inquiries.filter(inquiry => 
//       inquiry.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredInquiries(filtered);
//   }, [inquiries, searchTerm]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;
//     await API.delete(`/api/contact/delete/${id}`);
//     fetchInquiries();
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     pauseOnHover: true,
//     arrows: true,
//   };

//   // Slider content
//   const sliderContent = [
//     {
//       title: "Total Inquiries",
//       value: inquiries.length,
//       icon: <FaComments className="text-4xl" />,
//       color: "from-blue-500 to-blue-700",
//       description: "All patient contact requests"
//     },
//     {
//       title: "Pending Responses",
//       value: inquiries.filter(i => !i.responded).length,
//       icon: <FaEnvelope className="text-4xl" />,
//       color: "from-purple-500 to-purple-700",
//       description: "Awaiting your attention"
//     },
//     {
//       title: "This Week",
//       value: inquiries.filter(i => {
//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//         return new Date(i.createdAt) > oneWeekAgo;
//       }).length,
//       icon: <FaChartLine className="text-4xl" />,
//       color: "from-green-500 to-green-700",
//       description: "New inquiries this week"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Patient Inquiries</h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Manage and respond to patient inquiries and contact requests
//           </p>
//         </div>

//         {/* Stats Slider */}
//         <div className="mb-10">
//           <Slider {...sliderSettings}>
//             {sliderContent.map((slide, index) => (
//               <div key={index} className="px-2">
//                 <div className={`bg-gradient-to-r ${slide.color} rounded-xl shadow-lg p-8 text-white`}>
//                   <div className="flex flex-col md:flex-row items-center justify-between">
//                     <div className="flex items-center mb-6 md:mb-0">
//                       <div className="bg-white bg-opacity-20 p-4 rounded-full mr-6">
//                         {slide.icon}
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-bold">{slide.title}</h3>
//                         <p className="text-blue-100">{slide.description}</p>
//                       </div>
//                     </div>
//                     <div className="text-5xl font-bold">{slide.value}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-blue-100 p-3 rounded-lg mr-4">
//               <FaUser className="text-blue-600 text-xl" />
//             </div>
//             <div>
//               <p className="text-gray-500">Total Inquiries</p>
//               <p className="text-2xl font-bold">{inquiries.length}</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-purple-100 p-3 rounded-lg mr-4">
//               <FaEnvelope className="text-purple-600 text-xl" />
//             </div>
//             <div>
//               <p className="text-gray-500">This Week</p>
//               <p className="text-2xl font-bold">
//                 {inquiries.filter(i => {
//                   const oneWeekAgo = new Date();
//                   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//                   return new Date(i.createdAt) > oneWeekAgo;
//                 }).length}
//               </p>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-green-100 p-3 rounded-lg mr-4">
//               <FaCheckCircle className="text-green-600 text-xl" />
//             </div>
//             <div>
//               <p className="text-gray-500">Pending Response</p>
//               <p className="text-2xl font-bold">
//                 {inquiries.filter(i => !i.responded).length}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search inquiries by name, email or message..."
//               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button 
//                 onClick={() => setSearchTerm("")}
//                 className="absolute inset-y-0 right-0 flex items-center pr-3"
//               >
//                 <FaTimes className="text-gray-400 hover:text-gray-600" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Inquiries Grid */}
//         {filteredInquiries.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-12 text-center">
//             <div className="text-gray-400 mb-4">
//               <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-medium text-gray-900 mb-2">No inquiries found</h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               {searchTerm ? "Try adjusting your search terms" : "There are no patient inquiries at this time"}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {filteredInquiries.map((inquiry) => (
//               <div 
//                 key={inquiry._id} 
//                 className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center">
//                       <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                         <FaUser className="text-blue-600" />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-lg text-gray-800">{inquiry.patientName}</h3>
//                         <div className="flex items-center text-sm text-gray-500 mt-1">
//                           <FaRegClock className="mr-1" />
//                           <span>{formatDate(inquiry.createdAt)}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(inquiry._id)}
//                       className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-2"
//                       aria-label="Delete inquiry"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center text-gray-600">
//                       <FaEnvelope className="mr-3 text-gray-400" />
//                       <span>{inquiry.email}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <FaPhone className="mr-3 text-gray-400" />
//                       <span>{inquiry.mobileNo}</span>
//                     </div>
//                   </div>
                  
//                   <div className="border-t border-gray-100 pt-4">
//                     <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
//                     <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
//                       {inquiry.message}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-50 px-6 py-3 flex justify-end">
//                   <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
//                     Mark as Responded
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InquiriesAdmin;


//  import { useState, useEffect } from "react";
// import API from "../api/axios";
// import { 
//   FaUser, 
//   FaEnvelope, 
//   FaPhone, 
//   FaTrash, 
//   FaSearch, 
//   FaTimes, 
//   FaChartLine, 
//   FaComments, 
//   FaCheckCircle,
//   FaReply,
//   FaUserAlt,
//   FaCalendarAlt
// } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const InquiriesAdmin = () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredInquiries, setFilteredInquiries] = useState([]);

//   const fetchInquiries = async () => {
//     const res = await API.get("/api/contact/getall");
//     setInquiries(res.data);
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   useEffect(() => {
//     const filtered = inquiries.filter(inquiry => 
//       inquiry.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredInquiries(filtered);
//   }, [inquiries, searchTerm]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;
//     await API.delete(`/api/contact/delete/${id}`);
//     fetchInquiries();
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     pauseOnHover: true,
//     arrows: true,
//   };

//   // Slider content
//   const sliderContent = [
//     {
//       title: "Total Inquiries",
//       value: inquiries.length,
//       icon: <FaComments className="text-4xl" />,
//       color: "from-teal-500 to-cyan-600",
//       description: "All patient contact requests"
//     },
//     {
//       title: "Pending Responses",
//       value: inquiries.filter(i => !i.responded).length,
//       icon: <FaEnvelope className="text-4xl" />,
//       color: "from-purple-500 to-indigo-600",
//       description: "Awaiting your attention"
//     },
//     {
//       title: "This Week",
//       value: inquiries.filter(i => {
//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//         return new Date(i.createdAt) > oneWeekAgo;
//       }).length,
//       icon: <FaChartLine className="text-4xl" />,
//       color: "from-green-500 to-emerald-600",
//       description: "New inquiries this week"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-4 shadow-xl">
//             <FaComments className="text-white text-3xl" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Patient Inquiries</h1>
//           <p className="text-lg text-teal-200 max-w-2xl mx-auto">
//             Manage and respond to patient inquiries and contact requests
//           </p>
//         </div>

//         {/* Stats Slider */}
//         <div className="mb-10 overflow-hidden min-h-[150px]">
//           <Slider {...sliderSettings}>
//             {sliderContent.map((slide, index) => (
//               <div key={index} className="px-2">
//                 <div className={`bg-gradient-to-r ${slide.color} rounded-2xl shadow-xl p-6 text-white backdrop-blur-sm`}>
//                   <div className="flex flex-col md:flex-row items-center justify-between">
//                     <div className="flex items-center mb-4 md:mb-0 min-w-0">
//                       <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4 shadow-lg flex-shrink-0">
//                         {slide.icon}
//                       </div>
//                       <div className="text-left min-w-0">
//                         <h3 className="text-xl md:text-2xl font-bold truncate">{slide.title}</h3>
//                         <p className="text-white/80 text-sm md:text-base truncate">{slide.description}</p>
//                       </div>
//                     </div>
//                     <div className="text-3xl md:text-5xl font-bold bg-white/20 px-4 py-2 rounded-xl shadow-lg min-w-[60px] text-center">
//                       {slide.value}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
//           <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 border border-teal-500/20 flex items-center min-w-0">
//             <div className="bg-gradient-to-r from-blue-600 to-cyan-700 p-3 md:p-4 rounded-xl mr-3 md:mr-4 shadow-lg flex-shrink-0">
//               <FaUserAlt className="text-white text-xl" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-teal-200 text-sm md:text-base">Total Inquiries</p>
//               <p className="text-2xl md:text-3xl font-bold text-white truncate">{inquiries.length}</p>
//             </div>
//           </div>
//           <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 border border-teal-500/20 flex items-center min-w-0">
//             <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-3 md:p-4 rounded-xl mr-3 md:mr-4 shadow-lg flex-shrink-0">
//               <FaEnvelope className="text-white text-xl" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-teal-200 text-sm md:text-base">This Week</p>
//               <p className="text-2xl md:text-3xl font-bold text-white truncate">
//                 {inquiries.filter(i => {
//                   const oneWeekAgo = new Date();
//                   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//                   return new Date(i.createdAt) > oneWeekAgo;
//                 }).length}
//               </p>
//             </div>
//           </div>
//           <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 border border-teal-500/20 flex items-center min-w-0">
//             <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-3 md:p-4 rounded-xl mr-3 md:mr-4 shadow-lg flex-shrink-0">
//               <FaCheckCircle className="text-white text-xl" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-teal-200 text-sm md:text-base">Pending Response</p>
//               <p className="text-2xl md:text-3xl font-bold text-white truncate">
//                 {inquiries.filter(i => !i.responded).length}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 mb-8 border border-teal-500/20">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaSearch className="text-teal-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search inquiries by name, email or message..."
//               className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button 
//                 onClick={() => setSearchTerm("")}
//                 className="absolute inset-y-0 right-0 flex items-center pr-3"
//               >
//                 <FaTimes className="text-slate-400 hover:text-white" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Inquiries Grid */}
//         {filteredInquiries.length === 0 ? (
//           <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center border-2 border-dashed border-teal-500/20">
//             <div className="text-teal-400 mb-4">
//               <svg className="mx-auto h-12 w-12 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-medium text-white mb-2">No inquiries found</h3>
//             <p className="text-slate-400 max-w-md mx-auto">
//               {searchTerm ? "Try adjusting your search terms" : "There are no patient inquiries at this time"}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//             {filteredInquiries.map((inquiry) => (
//               <div 
//                 key={inquiry._id} 
//                 className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-teal-500/20 flex flex-col"
//               >
//                 <div className="p-4 md:p-6 flex-grow overflow-hidden">
//                   <div className="flex justify-between items-start mb-4 min-w-0">
//                     <div className="flex items-center min-w-0">
//                       <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 rounded-xl mr-3 shadow-lg flex-shrink-0">
//                         <FaUserAlt className="text-white" />
//                       </div>
//                       <div className="min-w-0">
//                         <h3 className="font-bold text-lg md:text-xl text-white truncate">{inquiry.patientName}</h3>
//                         <div className="flex items-center text-sm text-teal-200 mt-1">
//                           <FaCalendarAlt className="mr-1 flex-shrink-0" />
//                           <span className="truncate">{formatDate(inquiry.createdAt)}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(inquiry._id)}
//                       className="text-slate-400 hover:text-red-400 transition-colors duration-300 p-2 flex-shrink-0"
//                       aria-label="Delete inquiry"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center text-slate-300">
//                       <FaEnvelope className="mr-3 text-teal-400 flex-shrink-0" />
//                       <span className="truncate break-words">{inquiry.email}</span>
//                     </div>
//                     <div className="flex items-center text-slate-300">
//                       <FaPhone className="mr-3 text-teal-400 flex-shrink-0" />
//                       <span className="truncate break-words">{inquiry.mobileNo}</span>
//                     </div>
//                   </div>
                  
//                   <div className="border-t border-slate-700 pt-4">
//                     <h4 className="text-sm font-medium text-teal-200 mb-2">Message</h4>
//                     <p className="text-slate-300 bg-slate-700/50 p-4 rounded-xl border border-slate-600 
//                                    break-words whitespace-pre-wrap overflow-y-auto max-h-32">
//                       {inquiry.message}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="bg-slate-800/50 px-4 md:px-6 py-3 flex justify-end border-t border-slate-700">
//                   <button className="flex items-center text-sm font-medium text-teal-300 hover:text-teal-100 transition-colors duration-300">
//                     <FaReply className="mr-1 flex-shrink-0" />
//                     <span>Mark as Responded</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InquiriesAdmin;


import { useState, useEffect } from "react";
import API from "../api/axios";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaTrash, 
  FaSearch, 
  FaTimes, 
  FaChartLine, 
  FaComments, 
  FaCheckCircle,
  FaReply,
  FaUserAlt,
  FaCalendarAlt
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";


const InquiriesAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInquiries, setFilteredInquiries] = useState([]);

  const fetchInquiries = async () => {
    const res = await API.get("/api/contact/getall");
    setInquiries(res.data);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    const filtered = inquiries.filter(inquiry => 
      inquiry.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInquiries(filtered);
  }, [inquiries, searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;
    await API.delete(`/api/contact/delete/${id}`);
    fetchInquiries();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
  };

  // Slider content
  const sliderContent = [
    {
      title: "Total Inquiries",
      value: inquiries.length,
      icon: <FaComments className="text-4xl" />,
      color: "from-teal-500 to-cyan-600",
      description: "All patient contact requests"
    },
    {
      title: "Pending Responses",
      value: inquiries.filter(i => !i.responded).length,
      icon: <FaEnvelope className="text-4xl" />,
      color: "from-purple-500 to-indigo-600",
      description: "Awaiting your attention"
    },
    {
      title: "This Week",
      value: inquiries.filter(i => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(i.createdAt) > oneWeekAgo;
      }).length,
      icon: <FaChartLine className="text-4xl" />,
      color: "from-green-500 to-emerald-600",
      description: "New inquiries this week"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-4 shadow-xl">
            <FaComments className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Patient Inquiries</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and respond to patient inquiries and contact requests
          </p>
        </div>

        {/* Stats Slider */}
        <div className="mb-10 overflow-hidden min-h-[150px]">
          <Slider {...sliderSettings}>
            {sliderContent.map((slide, index) => (
              <div key={index} className="px-2">
                <div className={`bg-gradient-to-r ${slide.color} rounded-2xl shadow-lg p-6 text-white backdrop-blur-sm bg-opacity-90`}>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0 min-w-0">
                      <div className="bg-white bg-opacity-30 p-3 rounded-full mr-4 shadow-lg flex-shrink-0">
                        {slide.icon}
                      </div>
                      <div className="text-left min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold truncate">{slide.title}</h3>
                        <p className="text-white/90 text-sm md:text-base truncate">{slide.description}</p>
                      </div>
                    </div>
                    <div className="text-3xl md:text-5xl font-bold bg-white/30 px-4 py-2 rounded-xl shadow-lg min-w-[60px] text-center">
                      {slide.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200 flex items-center min-w-0 transform transition-transform hover:scale-105">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 md:p-4 rounded-xl mr-3 md:mr-4 shadow-md flex-shrink-0">
              <FaUserAlt className="text-white text-xl" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm md:text-base">Total Inquiries</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 truncate">{inquiries.length}</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200 flex items-center min-w-0 transform transition-transform hover:scale-105">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 md:p-4 rounded-xl mr-3 md:mr-4 shadow-md flex-shrink-0">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm md:text-base">This Week</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 truncate">
                {inquiries.filter(i => {
                  const oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  return new Date(i.createdAt) > oneWeekAgo;
                }).length}
              </p>
            </div>
          </div>
          <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200 flex items-center min-w-0 transform transition-transform hover:scale-105">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 md:p-4 rounded-xl mr-3 md:mr-4 shadow-md flex-shrink-0">
              <FaCheckCircle className="text-white text-xl" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm md:text-base">Pending Response</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 truncate">
                {inquiries.filter(i => !i.responded).length}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-teal-500" />
            </div>
            <input
              type="text"
              placeholder="Search inquiries by name, email or message..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Inquiries Grid */}
        {filteredInquiries.length === 0 ? (
          <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-lg p-8 md:p-12 text-center border-2 border-dashed border-gray-300">
            <div className="text-teal-500 mb-4">
              <svg className="mx-auto h-12 w-12 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No inquiries found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search terms" : "There are no patient inquiries at this time"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {filteredInquiries.map((inquiry) => (
              <div 
                key={inquiry._id} 
                className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 flex flex-col transform hover:-translate-y-1"
              >
                <div className="p-4 md:p-6 flex-grow overflow-hidden">
                  <div className="flex justify-between items-start mb-4 min-w-0">
                    <div className="flex items-center min-w-0">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 rounded-xl mr-3 shadow-md flex-shrink-0">
                        <FaUserAlt className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-lg md:text-xl text-gray-800 truncate">{inquiry.patientName}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <FaCalendarAlt className="mr-1 flex-shrink-0 text-teal-500" />
                          <span className="truncate">{formatDate(inquiry.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(inquiry._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-2 flex-shrink-0"
                      aria-label="Delete inquiry"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-700">
                      <FaEnvelope className="mr-3 text-teal-500 flex-shrink-0" />
                      <span className="truncate break-words">{inquiry.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaPhone className="mr-3 text-teal-500 flex-shrink-0" />
                      <span className="truncate break-words">{inquiry.mobileNo}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200 
                                   break-words whitespace-pre-wrap overflow-y-auto max-h-32">
                      {inquiry.message}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 bg-opacity-70 px-4 md:px-6 py-3 flex justify-end border-t border-gray-200">
                  <button className="flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors duration-300">
                    <FaReply className="mr-1 flex-shrink-0" />
                    <span>Mark as Responded</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
          {/* Footer */}
                        <div className="container flex justify-center fixed bottom-0 left-0 text-white ">
                          <Footer />
                        </div>
    </div>
  );
};

export default InquiriesAdmin;