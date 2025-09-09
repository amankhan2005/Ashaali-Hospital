import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import TopHeader from './components/TopHeader'
import Footer from './components/Footer'
import Contact from './pages/contact/Contact'
import Gallery from './pages/Gallery/Gallery'
import BlogPage from './pages/Blog/BlogPage'
import BlogDetails from './pages/Blog/BlogDetail'
import ServiceDetail from './pages/service/ServiceDetail'
import FacilitiesComponent from './pages/facilites/Facilites'
import AshaaliHospitalAbout from './pages/About/AboutHospital'
import Team from './pages/About/Team'
import TeamDetails from './pages/About/TeamDetails'
import DoctorProfile from './pages/About/DoctorProfile'

export default function App() {
  return (
    <div className='overflow-x-hidden'>
      {/* <TopHeader /> */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about/ashaali-hospitals' element={<AshaaliHospitalAbout />} />
        <Route path='/about/team' element={<Team />} />
        <Route path='/about/team/:name' element={<DoctorProfile/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/department/:name' element={<ServiceDetail />} />
        <Route path='/facility/:name' element={<FacilitiesComponent />} />
        <Route path='/blogs' element={<BlogPage />} />
        <Route path='/blogs/:detail' element={<BlogDetails />} />

      </Routes>
      <Footer />
    </div>
  )
}
