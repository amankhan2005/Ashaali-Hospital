import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return. Refunds are processed within 5-7 business days after we receive the returned item."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for 1-2 day delivery. International shipping times vary by destination, usually 7-14 business days."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. Custom duties and taxes may apply depending on your country's regulations."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or directly with the shipping carrier. You'll also receive updates on your order status."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with SSL encryption for your safety."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "You can cancel or modify your order within 1 hour of placing it. After that, we begin processing and cannot make changes. Please contact our customer service team immediately if you need to make changes."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, our customer support team is available Monday-Friday, 9 AM to 6 PM EST. You can reach us via email, phone, or live chat. We strive to respond to all inquiries within 24 hours."
    },
    {
      question: "Are your products eco-friendly?",
      answer: "We're committed to sustainability. Many of our products are made from recycled materials, and we use eco-friendly packaging whenever possible. We're continuously working to reduce our environmental impact."
    }
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