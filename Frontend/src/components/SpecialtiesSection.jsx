 import React from 'react';
import { Link } from 'react-router-dom';

// fallback/original images (you already had these)
import img from '../assets/department/cardiology.webp';
import img1 from '../assets/department/body-parts.webp';
import img2 from '../assets/department/pediatrics.webp';
import img3 from '../assets/department/neurology.webp';
import img4 from '../assets/department/first-aid-kit.webp';
import img5 from '../assets/department/ent.webp';
import img6 from '../assets/department/ortopedic.webp';
import img7 from '../assets/department/surgical.webp';
import img8 from '../assets/department/obstetrics.webp';
import img9 from '../assets/department/urology.webp';
import img10 from '../assets/department/nephrology.webp';
import img11 from '../assets/department/dental-implant.webp';
import img12 from '../assets/department/hematology.webp';
import img13 from '../assets/department/pulmonology.webp';
import img14 from '../assets/department/skin.webp';
import img15 from '../assets/department/human-brain.webp';
import img16 from '../assets/department/oncology.webp';
import img17 from '../assets/department/icu.webp';
import img18 from '../assets/department/neurosurgery.webp';
import img19 from '../assets/department/gastroenterology.webp';
import img20 from '../assets/department/endocrinology.webp';

const originals = {
  'cardiology': img,
  'body-parts': img1,
  'pediatrics': img2,
  'neurology': img3,
  'first-aid-kit': img4,
  'ent': img5,
  'ortopedic': img6,
  'surgical': img7,
  'obstetrics': img8,
  'urology': img9,
  'nephrology': img10,
  'dental-implant': img11,
  'hematology': img12,
  'pulmonology': img13,
  'skin': img14,
  'human-brain': img15,
  'oncology': img16,
  'icu': img17,
  'neurosurgery': img18,
  'gastroenterology': img19,
  'endocrinology': img20,
};

// Safe loader: try Webpack require.context, else Vite import.meta.globEager, else empty map
function loadSmallFiles() {
  let map = {};
  try {
    // Webpack/Cra
    if (typeof require !== 'undefined' && typeof require.context === 'function') {
      const r = require.context('../assets/department', false, /\.(webp|png|jpg)$/);
      r.keys().forEach((key) => {
        const name = key.replace('./', '');
        map[name] = r(key).default || r(key);
      });
      return map;
    }
  } catch (e) {
    // ignore and try next
  }

  try {
    // Vite
    if (typeof import.meta !== 'undefined' && typeof import.meta.globEager === 'function') {
      const modules = import.meta.globEager('../assets/department/*.{webp,png,jpg}');
      Object.keys(modules).forEach((fullPath) => {
        // fullPath like "../assets/department/cardiology-56.webp"
        const parts = fullPath.split('/');
        const name = parts[parts.length - 1];
        const value = modules[fullPath].default || modules[fullPath];
        map[name] = value;
      });
      return map;
    }
  } catch (e) {
    // ignore
  }

  // fallback: empty map (no small files)
  return map;
}

const smallFiles = loadSmallFiles();

const SpecialistSection = () => {
  const primaryColor = '#18978d';
  const secondaryColor = '#ed8022';

  const specialists = [
    { name: 'Orthopaedics', base: 'ortopedic' },
    { name: 'Ophthalmology', base: 'body-parts' },
    { name: 'Pediatrics', base: 'pediatrics' },
    { name: 'Neurology', base: 'neurology' },
    { name: 'General Medicine', base: 'first-aid-kit' },
    { name: 'ENT', base: 'ent' },
    { name: 'Cardiology', base: 'cardiology' },
    { name: 'General Surgery', base: 'surgical' },
    { name: 'obstetrics-gynaecology', base: 'obstetrics' },
    { name: 'urology-and-andrology', base: 'urology' },
    { name: 'nephrology', base: 'nephrology' },
    { name: 'dental', base: 'dental-implant' },
    { name: 'hematology', base: 'hematology' },
    { name: 'pulmonology', base: 'pulmonology' },
    { name: 'dermatology', base: 'skin' },
    { name: 'neurosurgery', base: 'neurosurgery' },
    { name: 'gastrology', base: 'gastroenterology' },
    { name: 'endocrinology', base: 'endocrinology' },
    { name: 'psychiatry', base: 'human-brain' },
    { name: 'oncology', base: 'oncology' },
    { name: 'icu-and-critical-care', base: 'icu' },
  ];

  const DISPLAY_SIZE = 56;

  const getSrcSet = (base) => {
    const f56 = smallFiles[`${base}-56.webp`];
    const f112 = smallFiles[`${base}-112.webp`];
    if (f56 && f112) return `${f56} 56w, ${f112} 112w`;
    if (f56) return `${f56} 56w`;
    return null;
  };

  const getFallback = (base) => {
    return originals[base] || Object.values(originals)[0];
  };

  return (
    <div className="bg-gray-50 py-6 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-6 md:mb-12 px-4">
          <div className="mb-3 md:mb-4">
            <span
              className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider inline-block px-3 py-1 rounded-full border-2"
              style={{
                color: primaryColor,
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              Meet Our Expert Doctors Across Specialties
            </span>
          </div>

          <h1 className="text-xl md:text-3xl lg:text-3xl xl:text-5xl font-bold">
            Every Specialty, One Place
          </h1>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {specialists.map((s, index) => {
            const srcset = getSrcSet(s.base);
            const src = getFallback(s.base);
            return (
              <Link
                key={index}
                to={`/department/${s.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="h-full"
              >
                <div
                  className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-opacity-0 transform hover:-translate-y-1 sm:hover:-translate-y-2 h-full flex flex-col justify-between overflow-hidden"
                  style={{
                    '--hover-shadow': `0 20px 40px rgba(24, 151, 141, 0.15)`,
                    minHeight: '180px',
                  }}
                >
                  <div className="flex justify-center mb-1 sm:mb-3">
                    <div
                      className="w-20 h-20 sm:w-20 md:w-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        border: `2px solid ${primaryColor}30`,
                      }}
                    >
                      <img
                        src={src}
                        srcSet={srcset || undefined}
                        sizes={`${DISPLAY_SIZE}px`}
                        width={DISPLAY_SIZE}
                        height={DISPLAY_SIZE}
                        loading="lazy"
                        decoding="async"
                        alt={s.name}
                        className="w-12 h-12 sm:w-12 md:w-14 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  <div className="flex-grow flex items-center justify-center">
                    <h3
                      className="text-xl capitalize sm:text-sm md:text-sm md:font-semibold leading-tight transition-colors duration-300 group-hover:font-bold "
                      style={{
                        color: '#374151',
                      }}
                    >
                      {s.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecialistSection;
