import { useState } from 'react';

export default function CallbackRequestComponent() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile') {
      const phoneValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: phoneValue }));
    } else if (name === 'otp') {
      const otpValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, [name]: otpValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    } else if (!/^[6-9]/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must start with 6, 7, 8, or 9';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = () => {
    if (!formData.mobile || formData.mobile.length !== 10) {
      setErrors({ mobile: 'Please enter valid mobile number' });
      return;
    }
    
    setOtpSent(true);
    setShowOtpField(true);
    alert('OTP sent to your mobile number!');
  };

  const handleChangeNumber = () => {
    setOtpSent(false);
    setShowOtpField(false);
    setFormData(prev => ({ ...prev, mobile: '', otp: '' }));
  };

  const handleResendOTP = () => {
    alert('OTP resent to your mobile number!');
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    if (showOtpField && !formData.otp) {
      setErrors({ otp: 'Please enter OTP' });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Callback request submitted successfully! We will contact you soon.');
      setFormData({ name: '', mobile: '', otp: '' });
      setOtpSent(false);
      setShowOtpField(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#18978d' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" 
             style={{ backgroundColor: '#18978d' }}></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000" 
             style={{ backgroundColor: '#18978d' }}></div>
        <div className="absolute -bottom-32 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500" 
             style={{ backgroundColor: '#18978d' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left Content Section */}
              <div className="p-8 lg:p-16 flex flex-col justify-center">
                
                {/* Header */}
                <div className="mb-12">
                  <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 border border-white/30" 
                       style={{ backgroundColor: 'rgba(24, 151, 141, 0.2)' }}>
                    <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
                    <span className="text-white text-sm font-medium">24/7 Support Available</span>
                  </div>
                  
                  <p className="text-white/80 text-lg mb-4 font-light">
                    Could not find what you are looking for?
                  </p>
                  
                  <h1 className="text-white text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Request a
                    <span className="text-white"> Callback</span>
                  </h1>
                  
                  <p className="text-white/90 text-lg leading-relaxed opacity-90">
                    Get expert assistance within 30 minutes. Our team is ready to help you.
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm border ${
                        errors.name ? 'border-red-400' : 'border-white/30 group-hover:border-white/50 focus:border-white/70'
                      } text-white placeholder-white/70 rounded-xl focus:outline-none transition-all duration-300 text-lg`}
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {errors.name && <p className="text-red-300 text-sm mt-2 ml-2">{errors.name}</p>}
                  </div>

                  {/* Mobile Input */}
                  <div className="relative group">
                    <div className="flex">
                      <div className="flex items-center px-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-l-xl">
                        <span className="text-white text-lg font-medium">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        disabled={otpSent}
                        className={`flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border-t border-b ${
                          errors.mobile ? 'border-red-400' : 'border-white/30 group-hover:border-white/50 focus:border-white/70'
                        } text-white placeholder-white/70 focus:outline-none transition-all duration-300 text-lg ${
                          otpSent ? 'opacity-70' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={otpSent}
                        className={`px-6 py-4 text-white font-semibold rounded-r-xl transition-all duration-300 text-lg ${
                          otpSent 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:shadow-lg transform hover:scale-105'
                        }`}
                        style={{ 
                          backgroundColor: otpSent ? 'rgba(24, 151, 141, 0.5)' : '#18978d',
                          filter: otpSent ? 'brightness(0.7)' : 'brightness(1.2)'
                        }}
                      >
                        {otpSent ? '✓ Sent' : 'Send OTP'}
                      </button>
                    </div>
                    {errors.mobile && <p className="text-red-300 text-sm mt-2 ml-2">{errors.mobile}</p>}
                    
                    {otpSent && (
                      <button
                        type="button"
                        onClick={handleChangeNumber}
                        className="text-white/80 text-sm mt-2 ml-2 hover:text-white transition-colors"
                      >
                        Change Number
                      </button>
                    )}
                  </div>

                  {/* OTP Input */}
                  {showOtpField && (
                    <div className="relative group animate-fade-in">
                      <input
                        type="text"
                        name="otp"
                        placeholder="Enter 6-digit OTP"
                        value={formData.otp}
                        onChange={handleInputChange}
                        className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm border ${
                          errors.otp ? 'border-red-400' : 'border-white/30 group-hover:border-white/50 focus:border-white/70'
                        } text-white placeholder-white/70 rounded-xl focus:outline-none transition-all duration-300 text-lg tracking-widest`}
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      {errors.otp && <p className="text-red-300 text-sm mt-2 ml-2">{errors.otp}</p>}
                      
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-white/80 text-sm mt-2 ml-2 hover:text-white transition-colors"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 font-bold rounded-xl transition-all duration-300 transform text-lg ${
                      isSubmitting
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : 'text-white hover:scale-105 hover:shadow-2xl'
                    }`}
                    style={{ 
                      backgroundColor: isSubmitting ? '#666' : '#18978d',
                      filter: isSubmitting ? 'brightness(0.7)' : 'brightness(1.2)'
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Request Callback
                      </div>
                    )}
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex items-center justify-between text-sm text-white/80">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure & Private
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5 Rating
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    500K+ Served
                  </div>
                </div>
              </div>

              {/* Right Image Section */}
              <div className="relative backdrop-blur-sm" style={{ backgroundColor: 'rgba(24, 151, 141, 0.2)' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="relative h-full min-h-[600px] flex items-center justify-center p-8">
                  <img
                    src="https://www.apollohospitals.com/sites/default/files/2024-12/image%2055.png"
                    alt="Healthcare professional"
                    className="w-full h-full object-cover object-center max-w-md rounded-2xl shadow-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="text-center p-8">
                            <div class="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl" style="background-color: #18978d">
                              <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                              </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-2">Expert Support</h3>
                            <p class="text-white/80 text-lg">Ready to assist you 24/7</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" 
                             style={{ backgroundColor: '#18978d' }}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">Trusted Healthcare</p>
                          <p className="text-white/80 text-sm">Excellence in patient care</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-white mb-1">
                          <span className="text-xl font-bold mr-1">4.9</span>
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="text-white/80 text-xs">500K+ reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}