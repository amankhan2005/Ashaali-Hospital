 import React, { memo, useMemo } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";

// Static slide data (kept outside to avoid re-creation)
const slides = [
  { id: 2, image: banner2, title: "Best Healthcare Services" },
  { id: 3, image: banner1, title: "Trustworthy Hospital" },
];

// ✅ Memoized Slide component
const Slide = memo(({ slide }) => (
  <div className="relative w-full h-auto lg:h-[70vh]">
    <img
      src={slide.image}
      alt={slide.title}
      title={slide.title}
      loading="lazy"
      decoding="async"
      width="1600"
      height="900"
      className="w-full lg:h-full object-cover select-none"
      style={{ display: "block" }}
    />
  </div>
));

// ✅ Memoized custom arrows
const SampleNextArrow = memo(({ onClick }) => (
  <button
    aria-label="Next"
    title="Next"
    type="button"
    onClick={onClick}
    className="absolute top-1/2 right-6 -translate-y-1/2 bg-primary text-white rounded-full p-3 hover:bg-primary transition-all cursor-pointer z-10 shadow-md"
  >
    <FaArrowRight size={20} />
  </button>
));

const SamplePrevArrow = memo(({ onClick }) => (
  <button
    aria-label="Previous"
    title="Previous"
    type="button"
    onClick={onClick}
    className="absolute top-1/2 left-6 -translate-y-1/2 bg-primary text-white rounded-full p-3 hover:bg-primary transition-all cursor-pointer z-10 shadow-md"
  >
    <FaArrowLeft size={20} />
  </button>
));

export default function HeroSlider() {
  // ✅ useMemo prevents settings re-creation every render
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      draggable: false, // prevents unnecessary listeners on desktop
      swipe: true, // allow touch on mobile
      responsive: [
        { breakpoint: 1024, settings: { arrows: false, draggable: true } },
        { breakpoint: 768, settings: { arrows: false, draggable: true } },
        { breakpoint: 480, settings: { arrows: false, dots: false, draggable: true } },
      ],
    }),
    []
  );

  return (
    <div className="w-full relative overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <Slide key={slide.id} slide={slide} />
        ))}
      </Slider>
    </div>
  );
}
