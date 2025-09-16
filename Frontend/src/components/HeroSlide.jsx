  import React, { memo } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
 
// Slider data
const slides = [
   { id: 2, image: banner2, title: "Best Healthcare Services" },
  { id: 3, image: banner1, title: "Trustworthy Hospital" },
];

// Memoized Slide component
const Slide = memo(({ slide }) => (
  <div className="relative w-full h-auto lg:h-[70vh]">
    <img
      src={slide.image}
      alt={slide.title}
      title={slide.title}
      loading="lazy"
      className="w-full lg:h-full object-cover"
    />
  </div>
));

// Memoized custom arrows
const SampleNextArrow = memo(({ onClick }) => (
  <button
    aria-label="Next"
    title="Next"
    className="absolute top-1/2 right-6 -translate-y-1/2 bg-primary text-white rounded-full p-3 hover:bg-primary cursor-pointer z-10"
    onClick={onClick}
  >
    <FaArrowRight size={20} />
  </button>
));

const SamplePrevArrow = memo(({ onClick }) => (
  <button
    aria-label="Previous"
    title="Previous"
    className="absolute top-1/2 left-6 -translate-y-1/2 bg-primary text-white rounded-full p-3 hover:bg-primary cursor-pointer z-10"
    onClick={onClick}
  >
    <FaArrowLeft size={20} />
  </button>
));

export default function HeroSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    draggable: false, // reduces unnecessary event listeners
    responsive: [
      { breakpoint: 1024, settings: { arrows: false } },
      { breakpoint: 600, settings: { arrows: false } },
      { breakpoint: 480, settings: { arrows: false, dots: false } },
    ],
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <Slide key={slide.id} slide={slide} />
        ))}
      </Slider>
    </div>
  );
}