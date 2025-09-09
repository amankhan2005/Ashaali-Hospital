import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdContactPhone, MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import BreadcrumbComponent from "../../components/Breadcums";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Contact = () => {

  const socialLinks = [

    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/drmonikagynae/",
      color: "bg-gradient-to-r from-pink-500 to-yellow-500", // Instagram gradient
    },
        {
      icon: <FaWhatsapp />,
      url: `https://wa.me/919277163686?text=${encodeURIComponent("Hello, I need help!")}`, // Replace with your WhatsApp number
      color: "bg-green-500", // WhatsApp green
    },
      {
    icon: <FaPhoneAlt />,
    url: "tel:+919277163686",
    color: "bg-indigo-600", // Call button with indigo background
  },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com",
      color: "bg-red-600", // YouTube red
    },
        {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/",
      color: "bg-blue-600", // Facebook blue
    },

  ];


  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const location=useLocation()


  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true)
    const response = await dispatch(submitInquiry(formData))

    console.log(response);
    setIsLoading(false)

    // Reset the form
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      message: ""
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    useEffect(() => {
    if (location.pathname === '/contact') {
      window.scrollTo(0, 0);
    }
  }, [location]);


  return (
    <section>
      {/* <Helmet>
        <title>Contact Us | Dr. Monika Pandey - Best Gynaecologist in Indira Nagar</title>
        <meta name="description" content="Get in touch with Dr. Monika Pandey's clinic in Indira Nagar, Lucknow. Contact for appointments, inquiries, and more information." />
        <meta name="keywords" content="Dr. Monika Pandey, Gynaecologist Lucknow, Contact Clinic, Indira Nagar, Women's Health" />
        <meta property="og:title" content="Contact Us | Dr. Monika Pandey Clinic" />
        <meta property="og:description" content="Reach out to Dr. Monika Pandey for appointments and inquiries. Located in Indira Nagar, Lucknow." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
      </Helmet> */}

      <BreadcrumbComponent
        items={[
          { label: 'Home', path: '/' },
          { label: 'Contact' },

        ]}
        headText="Contact Us"
      />
      <div className="relative w-full  flex items-center justify-center lg:p-8 p-2  md:px-4   bg-gray-100 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-b from-teal-500 to-teal-600 rounded-full transform translate-x-[40%] translate-y-[40%] opacity-30"></div>

        <div className="grid md:grid-cols-2 w-full bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl">
          {/* Contact Info Section */}
          <div className="max-w-[34rem] px-4 md:max-w-[35rem] flex lg: lg:pt-6 pt-2 md:pt-4  border-red-500">
            <div>
              <h1 className="sora-600 leading-[3rem]  text-xl sm:text-2xl lg:text-2xl text-[#18978d] lg:mb-6 mb-2 md:mb-4">
                Get In Touch With Us
              </h1>

              <div className="space-y-2">

                <div className="flex items-start space-x-4">
                  <a
                    href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggCEEUYOzIGCAAQRRg5MgcIARAAGIAEMgYIAhBFGDsyBwgDEAAYgAQyBwgEEC4YgAQyDwgFEC4YChivARjHARiABDIHCAYQABiABDIGCAcQRRg90gEINTI0NGowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KcMBp_kDVZk5Mb_pkHQJM-K7&daddr=PH-7,+Amrapali+Yojna,+E2,+IIM+ROAD,+near+JOGGERS+PARK,+Dubagga,+Lucknow,+Uttar+Pradesh+226003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md"
                  >
                    <FaLocationDot className="text-[1.4rem] text-white" />
                  </a>
                  <div>
                    <h2 className="text-[#18978d] text-[1.3rem] sora-600">Address</h2>
                    <a
                      href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggCEEUYOzIGCAAQRRg5MgcIARAAGIAEMgYIAhBFGDsyBwgDEAAYgAQyBwgEEC4YgAQyDwgFEC4YChivARjHARiABDIHCAYQABiABDIGCAcQRRg90gEINTI0NGowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KcMBp_kDVZk5Mb_pkHQJM-K7&daddr=PH-7,+Amrapali+Yojna,+E2,+IIM+ROAD,+near+JOGGERS+PARK,+Dubagga,+Lucknow,+Uttar+Pradesh+226003"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sora-400 text-[1rem] text-[#535760] no-underline"
                    >
             
                      E2/PH-7, Amrapali Yojana Joggers Park Chauraha,<br></br> Lucknow, Uttar Pradesh 226003
                 
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <a
                    href="tel:+91789793494990"
                    className="bg-gradient-to-r from-[#ed8022] to-[#18978d] p-3 rounded-md"
                  >
                    <MdContactPhone className="text-[1.4rem] text-white" />
                  </a>
                  <div>
                    <h2 className="text-[#18978d] text-[1.3rem] sora-600">Call for Help</h2>
                    <a
                          href="tel:+91789793494990"
                      className="sora-400 text-[1rem] text-[#535760] no-underline"
                    >
                      +91-978977934948
                    </a> ,

                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <a
                    href="tel:++91 789793494990"
                    className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md"
                  >
                    <IoMdTime className="text-[1.4rem] text-white" />
                  </a>
                  <div>
                    <h2 className="text-[#18978d] text-[1.3rem] sora-600">Clinic Opening Hours</h2>
                    <a
                      href="tel:+91 789793494990"
                      className="sora-400 text-[1rem] text-[#535760] no-underline"
                    >
                      {/* 10:00-1:30 PM (MON-SUN) , */}
                      (Monday-Sunday) 10:00-1:30PM & 6:00-8:30PM
                    </a>
                    <a
                      href="tel:+91 789793494990"
                      className="sora-400 text-[1rem] text-[#535760] no-underline ml-1"
                    >
                      {/* 06-8:30 PM (MON-SUN) */}
                    </a>
                  </div>
                </div>



                <div className="flex items-start space-x-4">
                  <a
                    href="mailto:Ashaalihospital@gmail.com"
                    className="bg-gradient-to-r from-[#18978d] to-[#ed8022] p-3 rounded-md"
                  >
                    <MdEmail className="text-[1.4rem] text-white" />
                  </a>
                  <div>
                    <h2 className="text-[#18978d] text-[1.3rem] sora-600">Mail for Information</h2>
                    <a
                      href="mailto:Sadbhawanaclinic98@gmail.com"
                      className="sora-400 text-[1rem] text-[#535760] no-underline"
                    >
                       Ashaalihospital@gmail.com
                    </a>
                  </div>
                </div>

                <div className=" flex flex-row space-x-4 mt-6 " style={{ zIndex: 1000 }}>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-12 h-12 ${social.color} rounded-full shadow-lg transition-transform transform hover:scale-105 hover:opacity-80`}
                      style={{ transition: 'transform 0.2s' }}
                    >
                      <div className="text-white text-2xl">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>



              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-4  bg-gradient-to-r from-[#18978d] to-[#ed8022] text-white relative shadow-md rounded-lg mt-4 lg:mt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="lg:text-3xl text-xl sm:text-2xl font-semibold">Contact Us</h3>

              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white py-2 outline-none pr-2 focus:border-teal-300 placeholder-white px-2"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white py-2 pr-2 outline-none focus:border-teal-300 placeholder-white  px-2"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white py-2  pr-2 outline-none focus:border-teal-300 placeholder-white px-2"
                  placeholder="Phone"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white py-2 outline-none focus:border-teal-300 placeholder-white resize-none px-2"
                  rows="4"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-white text-[#18978d] font-semibold rounded-full hover:bg-teal-300 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 border-2 border-t-white border-[#1A466D] rounded-full"
                      viewBox="0 0 24 24"
                    ></svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

    </section>


  );
};

export default Contact;
