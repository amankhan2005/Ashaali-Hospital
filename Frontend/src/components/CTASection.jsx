import { ArrowRight, Play } from 'lucide-react'
import React from 'react'

export default function CTASection() {
  return (
    <div className='container mx-auto px-4'>
           <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Experience Excellence in Healthcare?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied patients who trust Ashaali Hospital for their healthcare needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center group">
              <span>Book Appointment</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-colors flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              <span>Take Virtual Tour</span>
            </button>
          </div>
        </div>
    </div>
  )
}
