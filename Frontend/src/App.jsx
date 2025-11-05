 // App.js
import React, { Suspense, lazy } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // keep Home static (no lazy)
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from "./components/Loader"; // loader component

// Lazy load all other pages (except Home)
const Contact = lazy(() => import('./pages/contact/Contact' /* webpackChunkName: "contact" */));
const Gallery = lazy(() => import('./pages/Gallery/Gallery' /* webpackChunkName: "gallery" */));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage' /* webpackChunkName: "blogpage" */));
const BlogDetails = lazy(() => import('./pages/Blog/BlogDetail' /* webpackChunkName: "blogdetail" */));
const ServiceDetail = lazy(() => import('./pages/service/ServiceDetail' /* webpackChunkName: "servicedetail" */));
const FacilitiesComponent = lazy(() => import('./pages/facilites/Facilites' /* webpackChunkName: "facilities" */));
const AshaaliHospitalAbout = lazy(() => import('./pages/About/AboutHospital' /* webpackChunkName: "about-hospital" */));
const Team = lazy(() => import('./pages/About/Team' /* webpackChunkName: "team" */));
const DoctorProfile = lazy(() => import('./pages/About/DoctorProfile' /* webpackChunkName: "doctor-profile" */));
const BookAppointment = lazy(() => import('./pages/Booking/BookAppointment' /* webpackChunkName: "book-appointment" */));
const CareerPage = lazy(() => import('./pages/CareerPage.jsx' /* webpackChunkName: "career" */));

// Route change loader (kept as you had it)
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function RouteChangeLoader({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400); // smooth transition
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <Loader variant="spinner" message="Loading page..." />
        </div>
      )}
      {children}
    </>
  );
}

export default function App() {
  return (
    <div className="overflow-x-hidden relative min-h-screen">
      <ScrollToTop />

      <RouteChangeLoader>
        <div className="h-32">
          <Header />
        </div>

        {/* Suspense wraps Routes so any lazy page shows fallback while loading */}
        <Suspense
          fallback={
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <Loader variant="spinner" message="Loading..." />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/ashaali-hospitals" element={<AshaaliHospitalAbout />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/team/:doctorId" element={<DoctorProfile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/department/:name" element={<ServiceDetail />} />
            <Route path="/facility/:name" element={<FacilitiesComponent />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:detail" element={<BlogDetails />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/careers" element={<CareerPage />} />
          </Routes>
        </Suspense>

        <Footer />
      </RouteChangeLoader>
    </div>
  );
}
