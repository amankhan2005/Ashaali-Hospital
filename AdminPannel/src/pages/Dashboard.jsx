import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DoctorsAdmin from "./DoctorsAdmin";
import AppointmentsAdmin from "./AppointmentsAdmin";
import BlogsAdmin from "./BlogsAdmin";
import GalleryAdmin from "./GalleryAdmin";
import InquiriesAdmin from "./InquiriesAdmin";
import AdminDepartment from "./AdminDepartment";
import Footer from "../components/Footer";

import {
  FaUserMd,
  FaCalendarAlt,
  FaBlog,
  FaImages,
  FaEnvelope,
  FaArrowRight,
  FaTimes,
  FaChartLine,
  FaHospital,
  FaDownload,
  FaNewspaper,
  FaArrowUp,
  FaClock,
  FaPhone,
  FaUser,
  FaSpinner,
  FaExclamationTriangle,
  FaArrowDown,
  FaEquals,
  FaFileExcel,
  FaCalendarCheck,
  FaQuestionCircle,
  FaChartBar,
  FaImage,
  FaUsers,
  FaStethoscope,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDepartmentStats, setShowDepartmentStats] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    totalDoctors: 0,
    totalDepartments: 0,
    totalAppointments: 0,
    totalBlogs: 0,
    totalGallery: 0,
    totalInquiries: 0,
    recentAppointments: [],
    recentInquiries: [],
    monthlyInquiries: [],
    monthlyAppointments: [],
    departmentStats: [],
    inquiryGrowth: 0,
    appointmentGrowth: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
  });

  // Fetch all real data from APIs
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        doctorsRes,
        departmentsRes,
        appointmentsRes,
        blogsRes,
        galleryRes,
        inquiriesRes,
      ] = await Promise.all([
        API.get("/api/doctors"),
        API.get("/api/departments"),
        API.get("/api/appointments"),
        API.get("/api/blogs"),
        API.get("/api/gallery"),
        API.get("/api/contact/getall"),
      ]);

      const doctors = doctorsRes.data || [];
      const departments = departmentsRes.data || [];
      const appointments = appointmentsRes.data || [];
      const blogs = blogsRes.data || [];
      const gallery = galleryRes.data || [];
      const inquiries = inquiriesRes.data || [];

      // Process recent appointments (last 24 hours)
      const now = new Date();
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const recentAppointments = appointments
        .filter((app) => new Date(app.createdAt || app.date) >= last24Hours)
        .sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        )
        .slice(0, 6);

      // Process recent inquiries
      const recentInquiries = inquiries
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      // Generate monthly data for inquiries
      const monthlyInquiries = generateMonthlyInquiries(inquiries);
      const monthlyAppointments = generateMonthlyAppointments(appointments);

      // Calculate growth rates
      const inquiryGrowth = calculateGrowthRate(monthlyInquiries);
      const appointmentGrowth = calculateGrowthRate(monthlyAppointments);

      // Calculate appointment status counts
      const pendingAppointments = appointments.filter(
        (app) => app.status === "pending"
      ).length;
      const approvedAppointments = appointments.filter(
        (app) => app.status === "approved"
      ).length;

      // Department statistics
      const departmentStats = calculateDepartmentStats(doctors, appointments);

      setDashboardData({
        totalDoctors: doctors.length,
        totalDepartments: departments.length,
        totalAppointments: appointments.length,
        totalBlogs: blogs.length,
        totalGallery: gallery.length,
        totalInquiries: inquiries.length,
        recentAppointments,
        recentInquiries,
        monthlyInquiries,
        monthlyAppointments,
        departmentStats,
        inquiryGrowth,
        appointmentGrowth,
        pendingAppointments,
        approvedAppointments,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate monthly inquiry data
  const generateMonthlyInquiries = (inquiries) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;

      const monthStart = new Date(year, monthIndex, 1);
      const monthEnd = new Date(year, monthIndex + 1, 0);

      const monthInquiries = inquiries.filter((inq) => {
        const inqDate = new Date(inq.createdAt);
        return inqDate >= monthStart && inqDate <= monthEnd;
      });

      last6Months.push({
        month: months[monthIndex],
        inquiries: monthInquiries.length,
        year: year,
      });
    }

    return last6Months;
  };

  // Generate monthly appointment data
  const generateMonthlyAppointments = (appointments) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;

      const monthStart = new Date(year, monthIndex, 1);
      const monthEnd = new Date(year, monthIndex + 1, 0);

      const monthAppointments = appointments.filter((app) => {
        const appDate = new Date(app.createdAt || app.date);
        return appDate >= monthStart && appDate <= monthEnd;
      });

      last6Months.push({
        month: months[monthIndex],
        appointments: monthAppointments.length,
        year: year,
      });
    }

    return last6Months;
  };

  // Calculate growth rate
  const calculateGrowthRate = (monthlyData) => {
    if (monthlyData.length < 2) return 0;
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const currentValue = current.inquiries || current.appointments || 0;
    const previousValue = previous.inquiries || previous.appointments || 0;

    if (previousValue === 0) return currentValue > 0 ? 100 : 0;
    return (((currentValue - previousValue) / previousValue) * 100).toFixed(1);
  };

  // Calculate department statistics
  const calculateDepartmentStats = (doctors, appointments) => {
    const deptMap = new Map();

    doctors.forEach((doctor) => {
      const dept = doctor.department;
      if (!deptMap.has(dept)) {
        deptMap.set(dept, { name: dept, doctorCount: 0, appointmentCount: 0 });
      }
      deptMap.get(dept).doctorCount++;
    });

    appointments.forEach((app) => {
      const dept = app.department;
      if (deptMap.has(dept)) {
        deptMap.get(dept).appointmentCount++;
      }
    });

    // Use specified color scheme - teal-500, gray-800, white, orange-200
    const colors = [
      "#14B8A6",
      "#1F2937",
      "#F97316",
      "#FED7AA",
      "#0891B2",
      "#374151",
      "#FB923C",
    ];

    return Array.from(deptMap.values())
      .slice(0, 7)
      .map((dept, index) => ({
        ...dept,
        value: dept.appointmentCount,
        color: colors[index % colors.length],
      }));
  };

  // Export inquiries to Excel
  const exportInquiriesToExcel = async () => {
    try {
      const res = await API.get("/api/contact/getall");
      const inquiries = res.data || [];

      const workbook = XLSX.utils.book_new();

      const inquiryData = [
        ["Patient Inquiries Report"],
        ["Generated on", new Date().toLocaleString()],
        [""],
        [
          "Patient Name",
          "Email",
          "Mobile",
          "Message",
          "Date Created",
          "Status",
        ],
        ...inquiries.map((inq) => [
          inq.patientName || "N/A",
          inq.email || "N/A",
          inq.mobileNo || "N/A",
          inq.message || "N/A",
          new Date(inq.createdAt).toLocaleString(),
          "Pending",
        ]),
      ];

      const monthlyData = [
        ["Monthly Inquiries Summary"],
        ["Month", "Inquiries Count"],
        ...dashboardData.monthlyInquiries.map((item) => [
          item.month,
          item.inquiries,
        ]),
      ];

      const inquiryWs = XLSX.utils.aoa_to_sheet(inquiryData);
      const monthlyWs = XLSX.utils.aoa_to_sheet(monthlyData);

      XLSX.utils.book_append_sheet(workbook, inquiryWs, "All Inquiries");
      XLSX.utils.book_append_sheet(workbook, monthlyWs, "Monthly Summary");

      XLSX.writeFile(
        workbook,
        `Inquiries_Report_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting inquiries:", error);
      alert("Error exporting inquiries data");
    }
  };

  // Export appointments to Excel
  const exportAppointmentsToExcel = async () => {
    try {
      const res = await API.get("/api/appointments");
      const appointments = res.data || [];

      const workbook = XLSX.utils.book_new();

      const appointmentData = [
        ["Appointments Report"],
        ["Generated on", new Date().toLocaleString()],
        [""],
        [
          "Patient Name",
          "Email",
          "Phone",
          "Doctor",
          "Department",
          "Date",
          "Time",
          "Status",
        ],
        ...appointments.map((app) => [
          app.patientName || "N/A",
          app.email || "N/A",
          app.phone || "N/A",
          app.doctor?.name || "N/A",
          app.department || "N/A",
          new Date(app.date).toLocaleDateString(),
          app.time || "N/A",
          app.status || "pending",
        ]),
      ];

      const monthlyData = [
        ["Monthly Appointments Summary"],
        ["Month", "Appointments Count"],
        ...dashboardData.monthlyAppointments.map((item) => [
          item.month,
          item.appointments,
        ]),
      ];

      const statusData = [
        ["Appointment Status Summary"],
        ["Status", "Count"],
        ["Pending", dashboardData.pendingAppointments],
        ["Approved", dashboardData.approvedAppointments],
        ["Total", dashboardData.totalAppointments],
      ];

      const appointmentWs = XLSX.utils.aoa_to_sheet(appointmentData);
      const monthlyWs = XLSX.utils.aoa_to_sheet(monthlyData);
      const statusWs = XLSX.utils.aoa_to_sheet(statusData);

      XLSX.utils.book_append_sheet(workbook, appointmentWs, "All Appointments");
      XLSX.utils.book_append_sheet(workbook, monthlyWs, "Monthly Summary");
      XLSX.utils.book_append_sheet(workbook, statusWs, "Status Summary");

      XLSX.writeFile(
        workbook,
        `Appointments_Report_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting appointments:", error);
      alert("Error exporting appointments data");
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) return <FaArrowUp className="text-green-500" />;
    if (growth < 0) return <FaArrowDown className="text-red-500" />;
    return <FaEquals className="text-gray-500" />;
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };

  useEffect(() => {
    fetchDashboardData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <FaSpinner className="animate-spin text-6xl text-indigo-500 mb-6 mx-auto" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Loading Dashboard
              </h3>
              <p className="text-gray-600">
                Fetching real-time hospital data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-red-200 max-w-md mx-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-2xl text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Error Loading Data
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50/70 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route
              path="dashboard"
              element={
                <div className="container mx-auto w-full">
                  {/* Modern Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 items-stretc">
                    {[
                      {
                        title: "Total Doctors",
                        value: dashboardData.totalDoctors,
                        icon: FaUserMd,
                        borderColor: "border-blue-500",
                        iconBg: "bg-blue-500",
                        iconColor: "text-blue-600",
                        link: "/admin/doctors",
                      },
                      {
                        title: "Departments",
                        value: dashboardData.totalDepartments,
                        icon: FaHospital,
                        borderColor: "border-emerald-500",
                        iconBg: "bg-emerald-500",
                        iconColor: "text-emerald-600",
                        link: "/admin/departments",
                      },
                      {
                        title: "Appointments",
                        value: dashboardData.totalAppointments,
                        icon: FaCalendarAlt,
                        borderColor: "border-purple-500",
                        iconBg: "bg-purple-500",
                        iconColor: "text-purple-600",
                        // change: `${
                        //   dashboardData.appointmentGrowth > 0 ? "+" : ""
                        // }${dashboardData.appointmentGrowth}% this month`,
                        // changeType:
                        //   dashboardData.appointmentGrowth > 0
                        //     ? "positive"
                        //     : "negative",
                        link: "/admin/appointments",
                      },
                      {
                        title: "Inquiries",
                        value: dashboardData.totalInquiries,
                        icon: FaEnvelope,
                        borderColor: "border-orange-500",
                        iconBg: "bg-orange-500",
                        iconColor: "text-orange-600",
                        // change: `${dashboardData.inquiryGrowth > 0 ? "+" : ""}${
                        //   dashboardData.inquiryGrowth
                        // }% this month`,
                        // changeType:
                        //   dashboardData.inquiryGrowth > 0
                        //     ? "positive"
                        //     : "negative",
                        link: "/admin/inquiries",
                      },
                      {
                        title: "Gallery",
                        value: dashboardData.totalGallery,
                        icon: FaImage,
                        borderColor: "border-teal-500",
                        iconBg: "bg-teal-500",
                        iconColor: "text-teal-600",
                        link: "/admin/gallery",
                      },
                      {
                        title: "Blogs",
                        value: dashboardData.totalBlogs,
                        icon: FaNewspaper,
                        borderColor: "border-indigo-500",
                        iconBg: "bg-indigo-500",
                        iconColor: "text-indigo-600",
                        link: "/admin/blogs",
                      },
                    ].map((stat, index) => (
                      <Link key={index} to={stat.link} className="block h-full">
                        <div
                          className={`bg-white rounded-2xl shadow-xl p-6 border-t-4 ${stat.borderColor} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-gray-500 text-sm font-medium">
                                {stat.title}
                              </h3>
                              <p className="text-3xl font-bold text-gray-800 mt-1">
                                {stat.value.toLocaleString()}
                              </p>
                              {stat.change && (
                                <div className="mt-2 flex items-center">
                                  {stat.changeType === "positive" && (
                                    <>
                                      <FaArrowUp className="text-green-500 mr-1" />
                                      <span className="text-green-600 text-sm font-medium">
                                        {stat.change}
                                      </span>
                                    </>
                                  )}
                                  {stat.changeType === "negative" && (
                                    <>
                                      <FaArrowDown className="text-red-500 mr-1" />
                                      <span className="text-red-600 text-sm font-medium">
                                        {stat.change}
                                      </span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                            <div
                              className={`${stat.iconBg} p-4 rounded-full shadow-md`}
                            >
                              <stat.icon
                                className={`text-white text-2xl`}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* Recent Activities Grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                    {/* Recent Inquiries */}
                    <div className=" bg-white backdrop-blur-sm rounded-2xl  border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg mr-3">
                            <FaQuestionCircle className="text-white" />
                          </div>
                          Recent Inquiries
                        </h3>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                          {dashboardData.recentInquiries.length}
                        </span>
                      </div>

                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {dashboardData.recentInquiries.length > 0 ? (
                          dashboardData.recentInquiries.map(
                            (inquiry, index) => (
                              <div
                                key={inquiry._id || index}
                                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-all"
                              >
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-sm">
                                    {inquiry.patientName?.charAt(0) || "N"}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 truncate">
                                    {inquiry.patientName || "Unknown"}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {inquiry.email}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {getTimeAgo(new Date(inquiry.createdAt))}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                    Pending
                                  </span>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="text-center py-12">
                            <FaEnvelope className="text-4xl text-gray-300 mb-4 mx-auto" />
                            <p className="text-gray-500">No recent inquiries</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Recent Appointments */}
                    <div className=" bg-white backdrop-blur-sm rounded-2xl  border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mr-3">
                            <FaCalendarCheck className="text-white" />
                          </div>
                          Last 24 Hours Appointments
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {dashboardData.recentAppointments.length}
                        </span>
                      </div>

                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {dashboardData.recentAppointments.length > 0 ? (
                          dashboardData.recentAppointments.map(
                            (appointment, index) => (
                              <div
                                key={appointment._id || index}
                                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all"
                              >
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-sm">
                                    {appointment.patientName?.charAt(0) || "N"}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 truncate">
                                    {appointment.patientName ||
                                      "Unknown Patient"}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {appointment.doctor?.name ||
                                      appointment.doctor ||
                                      "Dr. N/A"}{" "}
                                    • {appointment.department}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(
                                      appointment.date
                                    ).toLocaleDateString()}{" "}
                                    at {appointment.time}
                                  </p>
                                </div>
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    appointment.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : appointment.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {(appointment.status || "pending")
                                    .charAt(0)
                                    .toUpperCase() +
                                    (appointment.status || "pending").slice(1)}
                                </span>
                              </div>
                            )
                          )
                        ) : (
                          <div className="text-center py-12">
                            <FaCalendarAlt className="text-4xl text-gray-300 mb-4 mx-auto" />
                            <p className="text-gray-500">
                              No appointments in the last 24 hours
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Modern Charts Section */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                    {/* Monthly Inquiries Comparison */}
                    <div className="bg-white backdrop-blur-sm rounded-2xl  border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg mr-3">
                            <FaChartLine className="text-white" />
                          </div>
                          Monthly Inquiries Trend
                        </h3>
                        <div
                          className={`flex items-center space-x-1 ${getGrowthColor(
                            dashboardData.inquiryGrowth
                          )}`}
                        >
                          {getGrowthIcon(dashboardData.inquiryGrowth)}
                          <span className="font-bold text-sm">
                            {dashboardData.inquiryGrowth}%
                          </span>
                        </div>
                      </div>

                      {/* Chart */}
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={dashboardData.monthlyInquiries}>
                          <defs>
                            <linearGradient
                              id="inquiryGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#10B981"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#10B981"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5E7EB"
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#6B7280"
                            fontSize={12}
                          />
                          <YAxis stroke="#6B7280" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "none",
                              borderRadius: "12px",
                              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="inquiries"
                            stroke="#10B981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#inquiryGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>

                      {/* Export Button Inside Card */}
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={exportInquiriesToExcel}
                          className="inline-flex cursor-pointer items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md min-w-[200px] focus:ring-4 focus:ring-green-500/20"
                        >
                          <FaFileExcel className="text-lg" />
                          <span>Export Inquiries</span>
                        </button>
                      </div>
                    </div>

                    {/* Monthly Appointments Comparison */}
                    <div className="bg-white backdrop-blur-sm rounded-2xl   border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mr-3">
                            <FaChartBar className="text-white" />
                          </div>
                          Monthly Appointments Trend
                        </h3>
                        <div
                          className={`flex  items-center space-x-1 ${getGrowthColor(
                            dashboardData.appointmentGrowth
                          )}`}
                        >
                          {getGrowthIcon(dashboardData.appointmentGrowth)}
                          <span className="font-bold text-sm">
                            {dashboardData.appointmentGrowth}%
                          </span>
                        </div>
                      </div>

                      {/* Chart */}
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dashboardData.monthlyAppointments}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5E7EB"
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#6B7280"
                            fontSize={12}
                          />
                          <YAxis stroke="#6B7280" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "none",
                              borderRadius: "12px",
                              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Bar
                            dataKey="appointments"
                            fill="url(#appointmentGradient)"
                            radius={[8, 8, 0, 0]}
                          >
                            <defs>
                              <linearGradient
                                id="appointmentGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#3B82F6"
                                  stopOpacity={0.9}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#6366F1"
                                  stopOpacity={0.7}
                                />
                              </linearGradient>
                            </defs>
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>

                      {/* Export Button Inside Card */}
                      <div className="mt-6  flex justify-center">
                        <button
                          onClick={exportAppointmentsToExcel}
                          className="inline-flex cursor-pointer items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md min-w-[200px] focus:ring-4 focus:ring-blue-500/20"
                        >
                          <FaFileExcel className="text-lg" />
                          <span>Export Appointments</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Department Statistics - Collapsible */}
                  {dashboardData.departmentStats.length > 0 && (
                    <div className="bg-white rounded-2xl  border border-gray-200 p-6 mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                          <div className="p-2 bg-teal-500 rounded-lg mr-3">
                            <FaStethoscope className="text-white" />
                          </div>
                          Department Performance
                        </h3>
                        <button
                          onClick={() =>
                            setShowDepartmentStats(!showDepartmentStats)
                          }
                          className="flex items-center text-teal-500 hover:text-teal-600 transition-colors p-2 rounded-lg hover:bg-teal-50"
                        >
                          {showDepartmentStats ? (
                            <FaChevronUp className="text-lg" />
                          ) : (
                            <FaChevronDown className="text-lg" />
                          )}
                        </button>
                      </div>

                      {/* Always show summary stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full">
                        {[
                          {
                            title: "Active Departments",
                            value: dashboardData.departmentStats.length,
                            icon: FaHospital,
                            iconBg: "bg-orange-500",
                            borderColor: "border-orange-500",
                            link: "/admin/departments",
                          },
                          {
                            title: "Total Doctors",
                            value: dashboardData.departmentStats.reduce(
                              (sum, dept) => sum + dept.doctorCount,
                              0
                            ),
                            icon: FaUserMd,
                            iconBg: "bg-teal-500",
                            borderColor: "border-teal-500",
                            link: "/admin/doctors",
                          },
                          {
                            title: "Total Appointments",
                            value: dashboardData.departmentStats.reduce(
                              (sum, dept) => sum + dept.appointmentCount,
                              0
                            ),
                            icon: FaCalendarAlt,
                            iconBg: "bg-gray-500",
                            borderColor: "border-gray-500",
                            link: "/admin/appointments",
                          },
                          {
                            title: "Avg Doctors/Dept",
                            value: Math.round(
                              dashboardData.departmentStats.reduce(
                                (sum, dept) => sum + dept.doctorCount,
                                0
                              ) / dashboardData.departmentStats.length
                            ),
                            icon: FaUsers,
                            iconBg: "bg-purple-500",
                            borderColor: "border-purple-500",
                            link: "/admin/departments",
                          },
                        ].map((stat, index) => (
                          <Link
                            key={index}
                            to={stat.link}
                            className="group block"
                          >
                            <div
                              className={`relative bg-white rounded-2xl p-6 border-t-4 ${stat.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col items-center text-center`}
                            >
                              {/* Icon */}
                              <div
                                className={`${stat.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mb-4`}
                              >
                                <stat.icon className="text-white text-3xl" />
                              </div>

                              {/* Value */}
                              <h3 className="text-3xl font-extrabold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-2">
                                {stat.value.toLocaleString()}
                              </h3>

                              {/* Title */}
                              <p className="text-base font-medium text-gray-600">
                                {stat.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Expandable detailed view */}
                      {showDepartmentStats && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 pt-6 border-t border-gray-200">
                          <div className="bg-white">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                              Appointments Distribution
                            </h4>
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={dashboardData.departmentStats}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                  }
                                  labelLine={false}
                                  fontSize={12}
                                >
                                  {dashboardData.departmentStats.map(
                                    (entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                      />
                                    )
                                  )}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                              Department Details
                            </h4>
                            <div className="max-h-64 overflow-y-auto space-y-3">
                              {dashboardData.departmentStats.map(
                                (dept, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className="w-4 h-4 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: dept.color }}
                                      ></div>
                                      <div>
                                        <p className="font-medium text-gray-800">
                                          {dept.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          {dept.doctorCount} doctor
                                          {dept.doctorCount !== 1 ? "s" : ""}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-lg font-bold text-teal-600">
                                        {dept.appointmentCount}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        appointments
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation Cards */}
                  <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 p-8 rounded-2xl ">
                    {[
                      {
                        title: "Departments",
                        desc: "Manage hospital departments",
                        icon: FaHospital,
                        gradient: "from-emerald-500 to-teal-600",
                        bgGradient: "from-emerald-50 to-teal-50",
                        link: "/admin/departments",
                      },
                      {
                        title: "Doctors",
                        desc: "Manage doctor profiles",
                        icon: FaUserMd,
                        gradient: "from-blue-500 to-indigo-600",
                        bgGradient: "from-blue-50 to-indigo-50",
                        link: "/admin/doctors",
                      },
                      {
                        title: "Appointments",
                        desc: "View patient bookings",
                        icon: FaCalendarAlt,
                        gradient: "from-purple-500 to-pink-600",
                        bgGradient: "from-purple-50 to-pink-50",
                        link: "/admin/appointments",
                      },
                      {
                        title: "Blogs",
                        desc: "Create health content",
                        icon: FaBlog,
                        gradient: "from-indigo-500 to-purple-600",
                        bgGradient: "from-indigo-50 to-purple-50",
                        link: "/admin/blogs",
                      },
                      {
                        title: "Gallery",
                        desc: "Manage facility images",
                        icon: FaImages,
                        gradient: "from-pink-500 to-rose-600",
                        bgGradient: "from-pink-50 to-rose-50",
                        link: "/admin/gallery",
                      },
                      {
                        title: "Inquiries",
                        desc: "Respond to questions",
                        icon: FaEnvelope,
                        gradient: "from-orange-500 to-red-600",
                        bgGradient: "from-orange-50 to-red-50",
                        link: "/admin/inquiries",
                      },
                    ].map((item, index) => (
                      <Link key={index} to={item.link} className="group block">
                        <div
                          className={`container  bg-white rounded-2xl p-6 border-t-4 border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col items-center text-center`}
                        >
                          {/* Icon */}
                          <div
                            className={`p-4 rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}
                          >
                            <item.icon className="text-white text-3xl" />
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 mb-4">{item.desc}</p>

                          {/* Action / Link Text */}
                          <div
                            className={`text-center font-medium flex items-center justify-center bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                          >
                            <span>Manage {item.title}</span>
                            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform text-gray-500" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-12">
                    {/* Footer */}
                    <div className="container  flex justify-center fixed bottom-0 left-0  text-white ">
                      <Footer />
                    </div>
                  </div>
                </div>
              }
            />

            {/* Other Routes */}
            <Route path="departments" element={<AdminDepartment />} />
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {modalContent.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div
                  className={`p-6 rounded-full bg-gradient-to-br ${modalContent.color} mb-4 shadow-lg`}
                >
                  {modalContent.icon}
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {modalContent.value}
                </p>
                <p className="text-gray-600 text-center">
                  {modalContent.description}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg transform hover:scale-105"
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
