import { Play, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";

const CTA = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "Regular Checkup"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment data:", appointmentData);
    alert("Appointment request submitted successfully!");
    setShowAppointmentModal(false);
    setAppointmentData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "Regular Checkup"
    });
  };

  return (
    <div className="relative w-full h-[60vh] max-h-[550px] overflow-hidden ">
      {/* Background with image, blur, and color overlay */}
      <div className="absolute inset-0">
        <img
          src="https://html.awaikenthemes.com/dentaire/images/visit-clinic-bg.jpg"
          alt="Clinic background"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 "></div> */}
        <div className="absolute inset-0 bg-[#18978d]/60"></div>
      </div>

      {/* Foreground Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 md:px-8">
        <div className="max-w-5xl w-full mx-auto">
          {/* Top Icons (optional) */}
          <div className="flex justify-between w-full mb-2">
            <div className="text-blue-300">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 12L12 22L22 12L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex space-x-2">
              <button className="text-white p-2 rounded-md">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 3h18v18H3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center text-center">
            <button className="text-white bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-full flex items-center space-x-2 mb-6">
              <span className="mr-1">+</span> VISIT CLINIC
            </button>

            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4">
              Comprehensive Dental Care
              <br />
              For All Ages
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={() =>
                  window.open("https://shine.trecoarabia.com/", "_blank")
                }
                className="flex items-center justify-center space-x-2 bg-white text-[#3F8BA1] rounded-full px-6 py-3 font-medium transition-all"
              >
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Modal (currently commented) */}
      {/* {showAppointmentModal && (...)} */}
    </div>
  );
};

export default CTA;
