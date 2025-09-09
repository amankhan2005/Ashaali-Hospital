import React from 'react';
import { 
  User,
  Calendar,
  Award,
  Star,
  Clock,
  MapPin
} from 'lucide-react';

const TeamSection = () => {
  const doctors = [
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Head - Department of Cardiology',
      education: 'MBBS, MD Cardiology, DM',
      experience: '20+ Years',
      rating: '4.9',
      consultations: '5000+',
      availability: 'Mon-Sat',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Head - Department of Neurology',
      education: 'MBBS, MD Neurology, DM',
      experience: '18+ Years',
      rating: '4.8',
      consultations: '4500+',
      availability: 'Mon-Fri',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Amit Patel',
      specialty: 'Head - Department of Orthopedics',
      education: 'MBBS, MS Orthopedics',
      experience: '15+ Years',
      rating: '4.9',
      consultations: '3800+',
      availability: 'Mon-Sat',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Sneha Gupta',
      specialty: 'Head - Department of Pediatrics',
      education: 'MBBS, MD Pediatrics',
      experience: '12+ Years',
      rating: '4.8',
      consultations: '4200+',
      availability: 'Daily',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Vikram Singh',
      specialty: 'Head - Department of Surgery',
      education: 'MBBS, MS General Surgery',
      experience: '22+ Years',
      rating: '4.9',
      consultations: '3500+',
      availability: 'Mon-Fri',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Meera Joshi',
      specialty: 'Head - Department of Gynecology',
      education: 'MBBS, MD Obstetrics & Gynecology',
      experience: '16+ Years',
      rating: '4.8',
      consultations: '4800+',
      availability: 'Mon-Sat',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Arjun Reddy',
      specialty: 'Head - Department of Oncology',
      education: 'MBBS, MD Oncology, DM',
      experience: '14+ Years',
      rating: '4.9',
      consultations: '2800+',
      availability: 'Mon-Fri',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Kavita Nair',
      specialty: 'Head - Department of Dermatology',
      education: 'MBBS, MD Dermatology',
      experience: '11+ Years',
      rating: '4.7',
      consultations: '3200+',
      availability: 'Tue-Sat',
      image: '/api/placeholder/300/300'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
        
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-orange-500">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our experienced medical professionals are dedicated to providing you with the highest quality healthcare services
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white grid grid-cols-2 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105">
              
              {/* Doctor Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                  <User className="w-24 h-24 text-teal-400" />
                </div>
                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Available</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-teal-600 font-semibold text-sm mb-2">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {doctor.education}
                  </p>
                </div>

              

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                  
                  <button className="w-full border-2 border-teal-500 text-teal-600 py-2.5 px-4 rounded-xl font-semibold hover:bg-teal-50 transition-colors flex items-center justify-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      

      </div>
    </section>
  );
};

export default TeamSection;