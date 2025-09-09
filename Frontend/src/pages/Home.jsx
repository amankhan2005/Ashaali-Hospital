// import React from 'react'
import AboutSection from '../components/AboutSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroSlider from '../components/HeroSlide'
import SpecialtiesSection from '../components/SpecialtiesSection'
import TeamSection from '../components/TeamSection'
import ClinicStats from '../components/ClientStat'
import WhyChooseUs from '../components/WhyChooseUs'
import CTA from '../components/CTA'
import HowWeWork from '../components/HowWeWork'
import Testinomial from '../components/Testonomial'
import HomeBlogSlider from './Home/HomeBlogSlider'
import HospitalFacilities from './Home/Facilites'
import StatsComponent from '../components/StatsComponent'
import HomeFeatures from './Home/HomeFeature'
import HospitalDoctorsCTA from './Home/HomeCta'
import CallbackRequestComponent from './Home/HomeCTA2'
import AshalliCompoonent from './Home/AshalliComponent'
import DoctorCarousel from './Home/DoctorCarsouel'
import HomeGallery from './Home/HomeGalley'
import YouTubeChannelShowcase from './Home/GalleryVideo'
import TruestedAshaali from './Home/TruestedAshaali'


export default function Home() {
  return (
    <div className='overflow-x-hidden'>
      <HeroSlider />
      <AboutSection />   
      <SpecialtiesSection />
      <StatsComponent />
      {/* <CTASection/> */}
      {/* <HomeFeatures /> */}
      {/* <HospitalDoctorsCTA/> */}
      <TruestedAshaali/>
      <HospitalFacilities />
      <AshalliCompoonent />
      <DoctorCarousel />
      <HomeGallery />
      <HospitalDoctorsCTA />
      {/* <YouTubeVideoGallery/> */}
      <YouTubeChannelShowcase />
      {/* <WhyChooseUs />     */}
      {/* <CTA/> */}
      {/* <HowWeWork/> */}
      <Testinomial />

      <HomeBlogSlider />



      {/* <CallbackRequestComponent/> */}
      {/* <TeamSection/> */}

    </div>
  )
}
