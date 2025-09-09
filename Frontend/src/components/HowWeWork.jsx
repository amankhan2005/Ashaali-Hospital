import { useState } from 'react';
import {
  Calendar,
  Clipboard,
  Stethoscope,
  FileText,
  PhoneCall,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(null);

  const navigate = useNavigate();

  const steps = [
    {
      icon: <Calendar strokeWidth={1.5} size={36} />,
      title: 'Schedule Consultation',
      description:
        'Book your appointment through our online portal or contact our friendly staff by phone.',
      number: '01',
    },
    {
      icon: <Clipboard strokeWidth={1.5} size={36} />,
      title: 'Initial Assessment',
      description:
        'Complete your medical history form and discuss your health concerns with our nursing team.',
      number: '02',
    },
    {
      icon: <Stethoscope strokeWidth={1.5} size={36} />,
      title: 'Doctor Consultation',
      description:
        'Meet with  for a thorough examination and personalized care plan discussion.',
      number: '03',
    },
    {
      icon: <FileText strokeWidth={1.5} size={36} />,
      title: 'Treatment Plan',
      description:
        'Receive your customized treatment recommendations and prescription if needed.',
      number: '04',
    },
    {
      icon: <PhoneCall strokeWidth={1.5} size={36} />,
      title: 'Ongoing Care',
      description:
        'Get continuous support through follow-up visits and our 24/7 patient portal.',
      number: '05',
    },
  ];

  const toggleStep = (index) => {
    setActiveStep(activeStep === index ? null : index);
  };

  const primaryColor = '#18978d'; // Dark Blue
  const secondaryColor = '#ed8022'; // Light Blue

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="lg:mb-16 mb-10 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Your Journey to Better Health
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: secondaryColor }}>
             Patient-centered approach ensures a seamless experience from your first call to ongoing care
          </p>
          <div
            className="mt-6 w-24 h-1 mx-auto rounded-full"
            style={{
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
            }}
          ></div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:flex justify-between items-start mb-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-1/5 px-4 relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-1/2 w-full h-0.5">
                  <div
                    className="h-full w-full"
                    style={{ backgroundColor: `${primaryColor}40` }}
                  ></div>
                </div>
              )}

              {/* Icon */}
              <div
                className="bg-white p-4 rounded-full border-2 shadow-lg mb-4 relative z-10 group-hover:bg-blue-50 transition-all duration-300"
                style={{ borderColor: primaryColor }}
              >
                <div
                  className="transition-colors duration-300"
                  style={{ color: primaryColor }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Step number */}
              <div
                className="absolute -top-3 -right-3 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center z-20"
                style={{ backgroundColor: secondaryColor }}
              >
                {step.number}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => toggleStep(index)}
              >
                <div className="flex items-center">
                  <div
                    className="p-2 rounded-full mr-3 relative"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <div style={{ color: primaryColor }}>{step.icon}</div>
                    <div
                      className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: secondaryColor }}>
                    {step.title}
                  </h3>
                </div>
                {activeStep === index ? (
                  <ChevronUp style={{ color: primaryColor }} size={20} />
                ) : (
                  <ChevronDown style={{ color: primaryColor }} size={20} />
                )}
              </button>

              {activeStep === index && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{step.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
            }}

            onClick={()=>navigate("/contact")}
          >
            Schedule Your Visit
            <Calendar className="ml-2" size={18} />
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Experience the difference with personalized care
          </p>
        </div>
      </div>
    </div>
  );
}