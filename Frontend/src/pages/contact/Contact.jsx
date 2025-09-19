// import React, { useState, useEffect } from "react";
// import { 
//   FaInstagram, 
//   FaWhatsapp, 
//   FaPhoneAlt, 
//   FaYoutube, 
//   FaFacebookF, 
//   FaLinkedin, 
//   FaEnvelope 
// } from "react-icons/fa";
// import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
// import { MdContactPhone, MdEmail } from "react-icons/md";
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import BreadCrumb from "../../components/Breadcrumb";


// const Contact = () => {
//    const socialLinks = [
//   {
//     icon: <FaInstagram />,
//     url: "https://www.instagram.com/ashaalihospital",
//     color: "bg-gradient-to-r from-pink-500 to-yellow-500",
//   },
//   {
//     icon: <FaWhatsapp />,
//     url: `https://wa.me/+917897934949?text=${encodeURIComponent(
//       "Hello, I need help!"
//     )}`,
//     color: "bg-green-500",
//   },
//   {
//     icon: <FaPhoneAlt />,
//     url: "tel:+917897934949",
//     color: "bg-indigo-600",
//   },
//   {
//     icon: <FaYoutube />,
//     url: "https://www.youtube.com/@AshaaliHospital",
//     color: "bg-red-600",
//   },
//   {
//     icon: <FaFacebookF />,
//     url: "https://www.facebook.com/people/Ashaali-Hospital/61555497311285/",
//     color: "bg-blue-600",
//   },
//   {
//     icon: <FaLinkedin />,
//     url: "https://www.linkedin.com/company/ashaali-hospital/",
//     color: "bg-blue-700",
//   },
//   // {
//   //   icon: <FaXTwitter />,
//   //   url: "https://twitter.com/ashaali_hospital",
//   //   color: "bg-black",
//   // },
//   {
//     icon: <FaEnvelope />,
//     url: "mailto:ashaalihospital@gmail.com",
//     color: "bg-gradient-to-r from-[#18978d] to-[#ed8022]",
//   },
// ];

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();

//   const backendUrl = import.meta.env.VITE_API_URL + "/api/contact/save";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name" && /^[A-Za-z\s]*$/.test(value))
//       setFormData({ ...formData, [name]: value });
//     else if (name === "phone" && /^\d*$/.test(value))
//       setFormData({ ...formData, [name]: value });
//     else setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = "Name is required.";
//     if (!formData.phone.trim()) errors.phone = "Phone number is required.";
//     else if (!/^\d{10}$/.test(formData.phone))
//       errors.phone = "Phone must be 10 digits.";
//     if (!formData.email.trim()) errors.email = "Email is required.";
//     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
//       errors.email = "Invalid email address.";
//     if (!formData.message.trim()) errors.message = "Message is required.";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await axios.post(backendUrl, {
//         patientName: formData.name,
//         mobileNo: formData.phone,
//         email: formData.email,
//         message: formData.message,
//       });

//       Swal.fire({
//         title: "Success!",
//         text: "Your query has been submitted successfully!",
//         icon: "success",
//         confirmButtonText: "OK",
//       });

//       setFormData({ name: "", email: "", phone: "", message: "" });
//       setFormErrors({});
//     } catch (err) {
//       Swal.fire({
//         title: "Error!",
//         text:
//           err.response?.data?.message ||
//           "Something went wrong. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   const breadcrumbItems = [
//     { label: "Home", link: "/" },
//     { label: "Contact Us" },
//   ];

//   return (
//     <section>
//       <BreadCrumb items={breadcrumbItems} title=" Ashaali Hospital" />

//       <div className="relative w-full flex items-center justify-center lg:p-8 p-2 md:px-4 bg-gray-100 overflow-hidden">
//         <div className="absolute w-[500px] h-[500px] bg-gradient-to-b from-teal-500 to-teal-600 rounded-full transform translate-x-[40%] translate-y-[40%] opacity-30"></div>

//         <div className="grid md:grid-cols-2 w-full bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl">
//           {/* Contact Info Section */}
//           <div className="max-w-[34rem] px-4 md:max-w-[35rem] flex lg:pt-6 pt-2 md:pt-4">
//             <div>
//               <h1 className="sora-600 leading-[3rem] text-xl sm:text-2xl lg:text-2xl text-[#18978d] lg:mb-6 mb-2 md:mb-4">
//                 Get In Touch With Us
//               </h1>

//               <div className="space-y-4">
//                 <div className="flex items-start space-x-4">
//                   <a
//                     href="https://www.google.com/maps/place/Lucknow"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md"
//                   >
//                     <FaLocationDot className="text-[1.4rem] text-white" />
//                   </a>
//                   <div>
//                     <h2 className="text-[#18978d] text-[1.3rem] sora-600">
//                       Address
//                     </h2>
//                     <div className="sora-400 text-[1rem] text-[#535760]">
//                       <a
//                         href="https://maps.app.goo.gl/K6wTMGm69bhJZ6Ds8"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {" "}
//                         E2/PH-7, Amrapali Yojana Joggers Park Chauraha,
//                         <br />
//                         Lucknow, Uttar Pradesh 226003
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <a
//                     href="tel:+919277163686"
//                     className="bg-gradient-to-r from-[#ed8022] to-[#18978d] p-3 rounded-md"
//                   >
//                     <MdContactPhone className="text-[1.4rem] text-white" />
//                   </a>
//                   <div>
//                     <h2 className="text-[#18978d] text-[1.3rem] sora-600">
//                       Call for Help
//                     </h2>
//                     <a
//                       href="tel:+917897934949
// "
//                       className="sora-400 text-[1rem] text-[#535760] no-underline"
//                     >
//                       +91-78979 34949
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <a
//                     href="mailto:Ashaalihospital@gmail.com"
//                     className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md"
//                   >
//                     <MdEmail className="text-[1.4rem] text-white" />
//                   </a>
//                   <div>
//                     <h2 className="text-[#18978d] text-[1.3rem] sora-600">
//                       Mail for Information
//                     </h2>
//                     <a
//                       href="mailto:Ashaalihospital@gmail.com"
//                       className="sora-400 text-[1rem] text-[#535760] no-underline"
//                     >
//                       Ashaalihospital@gmail.com
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex flex-row space-x-4 mt-6">
//                   {socialLinks.map((social, index) => (
//                     <a
//                       key={index}
//                       href={social.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`flex items-center justify-center w-12 h-12 ${social.color} rounded-full shadow-lg transition-transform transform hover:scale-105 hover:opacity-80`}
//                     >
//                       <div className="text-white text-2xl">{social.icon}</div>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form Section */}
//           <div className="p-6 bg-gradient-to-r from-[#18978d] to-[#ed8022] text-white relative shadow-md rounded-lg mt-4 lg:mt-0">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <h3 className="lg:text-3xl text-xl sm:text-2xl font-semibold mb-4">
//                 Contact Us
//               </h3>

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your Name"
//                 className="w-full bg-transparent border-b-2 border-white py-2 px-2 outline-none focus:border-teal-300 placeholder-white"
//               />
//               {formErrors.name && (
//                 <span className="text-red-200 text-sm">{formErrors.name}</span>
//               )}

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email Address"
//                 className="w-full bg-transparent border-b-2 border-white py-2 px-2 outline-none focus:border-teal-300 placeholder-white"
//               />
//               {formErrors.email && (
//                 <span className="text-red-200 text-sm">{formErrors.email}</span>
//               )}

//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="10-digit Phone Number"
//                 maxLength="10"
//                 className="w-full bg-transparent border-b-2 border-white py-2 px-2 outline-none focus:border-teal-300 placeholder-white"
//               />
//               {formErrors.phone && (
//                 <span className="text-red-200 text-sm">{formErrors.phone}</span>
//               )}

//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Enter Your Message"
//                 rows={4}
//                 className="w-full bg-transparent border-b-2 border-white py-2 px-2 outline-none focus:border-teal-300 placeholder-white resize-none"
//               />
//               {formErrors.message && (
//                 <span className="text-red-200 text-sm">
//                   {formErrors.message}
//                 </span>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-2 px-4 bg-white text-[#18978d] font-semibold rounded-full hover:bg-teal-300 transition duration-300"
//               >
//                 {isLoading ? "Sending..." : "Send Message"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;


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
    icon: <FaPhoneAlt />,
    url: "tel:+917897934949",
    color: "bg-indigo-600",
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
  // {
  //   icon: <FaXTwitter />,
  //   url: "https://twitter.com/ashaali_hospital",
  //   color: "bg-black",
  // },
  {
    icon: <FaEnvelope />,
    url: "mailto:ashaalihospital@gmail.com",
    color: "bg-gradient-to-r from-[#18978d] to-[#ed8022]",
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
    <section>
      <BreadCrumb items={breadcrumbItems} title="Contact Us" />

      <div className="relative w-full flex items-center justify-center lg:p-8 p-2 md:px-4 bg-gray-100 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-b from-teal-500 to-teal-600 rounded-full transform translate-x-[40%] translate-y-[40%] opacity-30"></div>

        <div className="grid md:grid-cols-2 w-full bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl">
          {/* Contact Info Section */}
          <div className="max-w-[34rem] px-4 md:max-w-[35rem] flex lg:pt-6 pt-2 md:pt-4">
            <div>
              <h1 className="sora-600 leading-[3rem] text-xl sm:text-2xl lg:text-2xl text-[#18978d] lg:mb-6 mb-2 md:mb-4">
                Get In Touch With Us
              </h1>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <a
                    href="https://www.google.com/maps/place/Lucknow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md"
                  >
                    <FaLocationDot className="text-[1.4rem] text-white" />
                  </a>
                  <div>
                    <h2 className="text-[#18978d] text-[1.3rem] sora-600">
                      Address
                    </h2>
                    <div className="sora-400 text-[1rem] text-[#535760]">
                      <a
                        href="https://maps.app.goo.gl/K6wTMGm69bhJZ6Ds8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
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
                    className="bg-gradient-to-r from-[#ed8022] to-[#18978d] p-3 rounded-md"
                  >
                    <MdContactPhone className="text-[1.4rem] text-white" />
                  </a>
                  <div>
                    <h2 className="text-[#18978d] text-[1.3rem] sora-600">
                      Call for Help
                    </h2>
                    <a
                      href="tel:+917897934949
"
                      className="sora-400 text-[1rem] text-[#535760] no-underline"
                    >
                      +91-78979 34949
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <a
                    href="mailto:ashaalihospital@gmail.com"
                    className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md"
                  >
                    <MdEmail className="text-[1.4rem] text-white" />
                  </a>
                  <div>
                    <h2 className="text-[#18978d] text-[1.3rem] sora-600">
                      Mail for Information
                    </h2>
                    <a
                      href="mailto:ashaalihospital@gmail.com"
                      className="sora-400 text-[1rem] text-[#535760] no-underline"
                    >
                     ashaalihospital@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-row space-x-4 mt-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-12 h-12 ${social.color} rounded-full shadow-lg transition-transform transform hover:scale-105 hover:opacity-80`}
                    >
                      <div className="text-white text-2xl">{social.icon}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 bg-gradient-to-r from-[#18978d] to-[#ed8022] text-white relative shadow-md rounded-lg mt-4 lg:mt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="lg:text-3xl text-xl sm:text-2xl font-semibold mb-4">
                Contact Us
              </h3>

              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full bg-transparent border-b-2 py-2 px-2 outline-none focus:border-teal-300 placeholder-white ${formErrors.name ? 'border-red-300' : 'border-white'}`}
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
                  className={`w-full bg-transparent border-b-2 py-2 px-2 outline-none focus:border-teal-300 placeholder-white ${formErrors.email ? 'border-red-300' : 'border-white'}`}
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
                  className={`w-full bg-transparent border-b-2 py-2 px-2 outline-none focus:border-teal-300 placeholder-white ${formErrors.phone ? 'border-red-300' : 'border-white'}`}
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
                  className={`w-full bg-transparent border-b-2 py-2 px-2 outline-none focus:border-teal-300 placeholder-white resize-none ${formErrors.message ? 'border-red-300' : 'border-white'}`}
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
                className="w-full py-2 px-4 bg-white text-[#18978d] font-semibold rounded-full hover:bg-teal-300 transition duration-300 disabled:opacity-70"
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


