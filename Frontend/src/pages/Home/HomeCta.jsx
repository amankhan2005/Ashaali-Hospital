import React, { useState } from "react";
import { FaStethoscope } from "react-icons/fa";

const HospitalDoctorsCTA = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const validatePhone = (number) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Check if it's exactly 10 digits and starts with 6, 7, 8, or 9
    if (cleaned.length === 10) {
      const firstDigit = cleaned.charAt(0);
      return ['6', '7', '8', '9'].includes(firstDigit);
    }
    return false;
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Allow only digits and limit to 10 characters
    value = value.replace(/\D/g, '').slice(0, 10);
    
    setPhoneNumber(value);
    const valid = validatePhone(value);
    setIsValid(valid);
    setShowError(value !== '' && !valid);
  };

  const handleSubmit = () => {
    if (isValid) {
      alert(`Thank you! We'll contact you at: ${phoneNumber}`);
      setPhoneNumber('');
      setIsValid(false);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <section
      className="relative lg:py-[4rem] py-[2rem] flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${"https://thumbs.dreamstime.com/b/doctors-hospital-corridor-nurse-pushing-gurney-stretcher-bed-male-senior-female-patient-32154012.jpg"})` }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      {/* Main Content Container */}
      <div className="relative container mx-auto px-6 z-10 text-center">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <FaStethoscope className="text-white h-16 w-16" />
          </div>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" >
            Meet Our Most <span className="text-[#18978d]">Experienced</span> Doctors
          </h2>
             <p className="text-lg text-gray-200 max-w-3xl mx-auto " style={{textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto'}}>
            Our Experienced Medical Team: Your Partners in Health
          </p>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto " style={{textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto'}}>
            Dedicated professionals with decades of combined experience, committed to providing exceptional healthcare and personalized treatment for every patient.
          </p>
        </div>

        {/* Phone Number Input */}
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter your 10-digit mobile number"
              className={`w-full px-6 py-4 text-lg rounded-full bg-white/20 backdrop-blur-sm border-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 text-center ${
                showError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : isValid 
                  ? 'border-green-500 focus:ring-green-500' 
                  : 'border-white/50 focus:ring-[#18978d]'
              }`}
            />
            {showError && (
              <p className="text-red-400 text-sm mt-2">
                Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9
              </p>
            )}
            {isValid && (
              <p className="text-green-400 text-sm mt-2">
                ✓ Valid mobile number
              </p>
            )}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!isValid}
            className={`font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl min-w-[200px] ${
             
                'bg-[#18978d] hover:bg-[#16857c] text-white cursor-pointer hover:shadow-yellow-400/25' 
                
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default HospitalDoctorsCTA;