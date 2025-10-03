 import React from "react";
import cclogo from "../assets/code.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-3 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Section - Copyright */}
        <div className="text-sm text-gray-600 text-center md:text-left">
          © 2025 Ashaali Hospital. All rights reserved.
        </div>

        {/* Right Section - Designed & Developed by */}
        <div className="flex items-center justify-center md:justify-end">
          <span className="text-sm text-gray-600">
            Designed & Developed by
          </span>
          <a
            href="https://codecrafter.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-1"
          >
            <img src={cclogo} alt="Code crafter Logo" className="h-8 md:h-10" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
