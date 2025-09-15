import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

 const faqData = [
  {
    question: "When should I visit an Orthopaedic doctor?",
    answer: "If you experience persistent joint pain, fractures, arthritis, or difficulty in movement, you should consult an orthopaedic specialist for proper evaluation and treatment."
  },
  {
    question: "What conditions are treated in Ophthalmology?",
    answer: "Ophthalmology deals with vision problems, cataracts, glaucoma, corneal diseases, and other eye-related conditions requiring medical or surgical treatment."
  },
  {
    question: "Why is Pediatrics important for children?",
    answer: "Pediatricians specialize in child health, including regular checkups, vaccinations, growth monitoring, and treatment of childhood illnesses to ensure healthy development."
  },
  {
    question: "When should I consult a Neurologist?",
    answer: "If you have frequent headaches, seizures, dizziness, memory loss, stroke symptoms, or nerve pain, you should consult a neurologist immediately."
  },
  {
    question: "What does General Medicine cover?",
    answer: "General medicine deals with diagnosis and treatment of common illnesses like diabetes, hypertension, fever, infections, and lifestyle diseases."
  },
  {
    question: "When is an ENT consultation necessary?",
    answer: "Visit an ENT specialist if you have hearing loss, sinus problems, throat pain, frequent ear infections, or nasal blockages."
  },
  {
    question: "What is Gastrology?",
    answer: "Gastrology focuses on digestive system issues like acidity, ulcers, liver disease, irritable bowel syndrome (IBS), and stomach pain."
  },
  {
    question: "When is General Surgery required?",
    answer: "General surgeons handle appendicitis, hernia, gallbladder stones, and other abdominal surgeries along with emergency trauma care."
  },
  
];


  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" bg-gray-100 py-4 sm:py-6 lg:py-12 " >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ">
        {/* Header */}
        <div className="lg:text-center mb-12">
          <h1 className="lg:text-4xl text-2xl md:text-3xl  font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto  text-justify">
            Find answers to common questions about our products and services. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-fit"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 md:px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-inset"
                style={{ 
                  '--tw-ring-color': '#18978d',
                  backgroundColor: activeIndex === index ? '#f8fafc' : 'transparent'
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {activeIndex === index ? (
                      <ChevronUp className="w-6 h-6 transition-transform duration-200" style={{ color: '#18978d' }} />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 transition-transform duration-200" />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 pt-2">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default FAQ;