 

import React, { useState, useEffect } from "react";
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaYoutube, 
  FaFacebookF, 
  FaLinkedin, 
  FaEnvelope 
} from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { MdContactPhone, MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../../components/Breadcrumb";

const Contact = () => {
  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/ashaalihospital",
      color: "bg-gradient-to-r from-pink-500 to-yellow-500",
    },
    {
      icon: <FaWhatsapp />,
      url: `https://wa.me/+917897934949?text=${encodeURIComponent(
        "Hello, I need help!"
      )}`,
      color: "bg-green-500",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@AshaaliHospital",
      color: "bg-red-600",
    },
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/people/Ashaali-Hospital/61555497311285/",
      color: "bg-blue-600",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/company/ashaali-hospital/",
      color: "bg-blue-700",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_API_URL + "/api/contact/save";

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Real-time validation feedback
    let newErrors = { ...formErrors };
    
    if (name === "name") {
      if (/^[A-Za-z\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        // Validate name length
        if (value.length > 0 && value.length < 2) {
          newErrors.name = "Name must be at least 2 letters";
        } else {
          delete newErrors.name;
        }
      }
    } 
    else if (name === "email") {
      // Convert email to lowercase
      const lowerCaseEmail = value.toLowerCase();
      setFormData({ ...formData, [name]: lowerCaseEmail });
      // Validate email format
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(lowerCaseEmail)) {
        newErrors.email = "Invalid email address";
      } else {
        delete newErrors.email;
      }
    }
    else if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        // Validate phone number
        if (value.length > 0) {
          if (value.length < 10) {
            newErrors.phone = "Phone must be exactly 10 digits";
          } else if (value.length > 10) {
            newErrors.phone = "Phone cannot exceed 10 digits";
          } else if (!/^[6-9]/.test(value)) {
            newErrors.phone = "Phone must start with 6, 7, 8, or 9";
          } else {
            delete newErrors.phone;
          }
        } else {
          delete newErrors.phone;
        }
      }
    }
    else {
      setFormData({ ...formData, [name]: value });
      if (name === "message" && value.trim()) {
        delete newErrors.message;
      }
    }
    
    setFormErrors(newErrors);
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 letters";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      errors.phone = "Phone must be exactly 10 digits";
    } else if (!/^[6-9]/.test(formData.phone)) {
      errors.phone = "Phone must start with 6, 7, 8, or 9";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(backendUrl, {
        patientName: formData.name,
        mobileNo: formData.phone,
        email: formData.email,
        message: formData.message,
      });

      Swal.fire({
        title: "Success!",
        text: "Your query has been submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      setFormErrors({});
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Contact Us" },
  ];

  return (
    <section className="min-h-screen">
      <BreadCrumb items={breadcrumbItems} title="Contact Us" />

      <div className="relative w-full flex items-center justify-center px-4 py-8 md:py-12 lg:py-16 bg-gray-100 overflow-hidden">
 
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Contact Info Section */}
          <div className="w-full p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#18978d] mb-6 md:mb-8">
              Get In Touch With Us
            </h1>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <a
                  href="https://www.google.com/maps/place/Lucknow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md flex-shrink-0"
                >
                  <FaLocationDot className="text-xl md:text-2xl text-white" />
                </a>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-[#18978d] mb-1">
                    Address
                  </h2>
                  <div className="text-sm md:text-base text-[#535760]">
                    <a
                      href="https://maps.app.goo.gl/K6wTMGm69bhJZ6Ds8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      E2/PH-7, Amrapali Yojana Joggers Park Chauraha,
                      <br />
                      Lucknow, Uttar Pradesh 226003
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <a
                  href="tel:+919277163686"
                  className="bg-gradient-to-r from-[#ed8022] to-[#18978d] p-3 rounded-md flex-shrink-0"
                >
                  <MdContactPhone className="text-xl md:text-2xl text-white" />
                </a>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-[#18978d] mb-1">
                    Call for Help
                  </h2>
                  <div className="text-sm md:text-base text-[#535760]">
                    <a href="tel:+917897934949" className="block hover:underline">
                      +91-78979 34949
                    </a>
                    <a href="tel:+918303212210" className="block hover:underline">
                      +91-83032 12210
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <a
                  href="mailto:ashaalihospital@gmail.com"
                  className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md flex-shrink-0"
                >
                  <MdEmail className="text-xl md:text-2xl text-white" />
                </a>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-[#18978d] mb-1">
                    Mail for Information
                  </h2>
                  <a
                    href="mailto:ashaalihospital@gmail.com"
                    className="text-sm md:text-base text-[#535760] hover:underline"
                  >
                    ashaalihospital@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h2 className="text-lg md:text-xl font-semibold text-[#18978d] mb-3">Follow Us</h2>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 ${social.color} rounded-full shadow-lg transition-transform transform hover:scale-105 hover:opacity-80`}
                    >
                      <div className="text-white text-xl md:text-2xl">{social.icon}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full p-6 md:p-8 lg:p-10 bg-gradient-to-r from-[#18978d] to-[#ed8022] text-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Contact Us
              </h3>

              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full bg-transparent border-b-2 py-3 px-2 outline-none focus:border-teal-300 placeholder-white ${formErrors.name ? 'border-red-300' : 'border-white'}`}
                />
                {formErrors.name && (
                  <span className="text-red-200 text-sm">{formErrors.name}</span>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full bg-transparent border-b-2 py-3 px-2 outline-none focus:border-teal-300 placeholder-white ${formErrors.email ? 'border-red-300' : 'border-white'}`}
                />
                {formErrors.email && (
                  <span className="text-red-200 text-sm">{formErrors.email}</span>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit Phone Number"
                  maxLength="10"
                  className={`w-full bg-transparent border-b-2 py-3 px-2 outline-none focus:border-teal-300 placeholder-white ${formErrors.phone ? 'border-red-300' : 'border-white'}`}
                />
                {formErrors.phone && (
                  <span className="text-red-200 text-sm">{formErrors.phone}</span>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Your Message"
                  rows={4}
                  className={`w-full bg-transparent border-b-2 py-3 px-2 outline-none focus:border-teal-300 placeholder-white resize-none ${formErrors.message ? 'border-red-300' : 'border-white'}`}
                />
                {formErrors.message && (
                  <span className="text-red-200 text-sm">
                    {formErrors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-white text-[#18978d] font-semibold rounded-full hover:bg-teal-300 transition duration-300 disabled:opacity-70"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

