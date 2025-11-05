 // App.js
import React, { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home'; // keep Home static (no lazy)
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Spinner from './components/Spinner'; // <-- replace Loader

// Lazy routes (prefetch on idle for faster 2nd load)
const Contact = lazy(() => import(/* webpackChunkName:"contact", webpackPrefetch:true */ './pages/contact/Contact'));
const Gallery = lazy(() => import(/* webpackChunkName:"gallery", webpackPrefetch:true */ './pages/Gallery/Gallery'));
const BlogPage = lazy(() => import(/* webpackChunkName:"blogpage", webpackPrefetch:true */ './pages/Blog/BlogPage'));
const BlogDetails = lazy(() => import(/* webpackChunkName:"blogdetail", webpackPrefetch:true */ './pages/Blog/BlogDetail'));
const ServiceDetail = lazy(() => import(/* webpackChunkName:"servicedetail", webpackPrefetch:true */ './pages/service/ServiceDetail'));
const FacilitiesComponent = lazy(() => import(/* webpackChunkName:"facilities", webpackPrefetch:true */ './pages/facilites/Facilites'));
const AshaaliHospitalAbout = lazy(() => import(/* webpackChunkName:"about-hospital", webpackPrefetch:true */ './pages/About/AboutHospital'));
const Team = lazy(() => import(/* webpackChunkName:"team", webpackPrefetch:true */ './pages/About/Team'));
const DoctorProfile = lazy(() => import(/* webpackChunkName:"doctor-profile", webpackPrefetch:true */ './pages/About/DoctorProfile'));
const BookAppointment = lazy(() => import(/* webpackChunkName:"book-appointment", webpackPrefetch:true */ './pages/Booking/BookAppointment'));
const CareerPage = lazy(() => import(/* webpackChunkName:"career", webpackPrefetch:true */ './pages/CareerPage.jsx'));

// Tiny route-change spinner (covers non-lazy state too)
function RouteChangeLoader({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // show a very brief spinner on every navigation
    setLoading(true);
    const id = requestAnimationFrame(() => {
      // allow next screen to paint; if Suspense kicks in, its fallback will show
      setLoading(false);
    });
    return () => cancelAnimationFrame(id);
  }, [location]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-white/60 backdrop-blur-sm">
          <Spinner label="Loading page..." />
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
        {/* Keep header slim so banner shows ASAP */}
        <div className="h-32">
          <Header />
        </div>

        {/* Suspense fallback with spinner (replaces Loader) */}
        <Suspense
          fallback={
            <div className="fixed inset-0 z-40 grid place-items-center bg-white/70 backdrop-blur-sm">
              <Spinner label="Loading..." />
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
