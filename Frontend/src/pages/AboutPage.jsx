import React, { useState } from 'react';
import { 
  Heart, 
  Shield, 
  Award, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle,
  Target,
  Eye,
  Lightbulb,
  Building,
  Stethoscope,
  UserCheck,
  TrendingUp,
  Globe,
  Play,
  User
} from 'lucide-react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: Award },
    { number: '50+', label: 'Expert Doctors', icon: UserCheck },
    { number: '10,000+', label: 'Happy Patients', icon: Heart },
    { number: '25+', label: 'Specialties', icon: Stethoscope },
    { number: '24/7', label: 'Emergency Care', icon: Clock },
    { number: '95%', label: 'Success Rate', icon: TrendingUp }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and dignity, ensuring comfort throughout their healthcare journey.'
    },
    {
      icon: Shield,
      title: 'Medical Excellence',
      description: 'Our commitment to the highest standards of medical practice ensures the best possible outcomes for our patients.'
    },
    {
      icon: Users,
      title: 'Patient-Centered',
      description: 'Every decision we make is guided by what is best for our patients and their families.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technology and innovative treatments to provide advanced healthcare solutions.'
    },
    {
      icon: CheckCircle,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our interactions and medical practices.'
    },
    {
      icon: Globe,
      title: 'Community Focus',
      description: 'We are committed to improving the health and well-being of our entire community.'
    }
  ];

  const milestones = [
    { year: '2008', title: 'Hospital Founded', desc: 'Ashaali Hospital opened its doors with a vision to provide world-class healthcare.' },
    { year: '2012', title: 'ICU Expansion', desc: 'Added state-of-the-art ICU facilities with advanced life support systems.' },
    { year: '2015', title: 'Cardiac Center', desc: 'Launched specialized cardiac care center with catheterization lab.' },
    { year: '2018', title: 'Digital Innovation', desc: 'Implemented comprehensive EMR system and telemedicine services.' },
    { year: '2020', title: 'COVID Response', desc: 'Established dedicated COVID care unit and vaccination center.' },
    { year: '2023', title: 'Future Ready', desc: 'Expanding with new wings and advanced robotic surgery capabilities.' }
  ];

  const leadership = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Chief Medical Officer',
      image: '/api/placeholder/200/200',
      qualification: 'MBBS, MD (Internal Medicine)',
      experience: '20+ years'
    },
    {
      name: 'Dr. Priya Sharma',
      position: 'Head of Surgery',
      image: '/api/placeholder/200/200',
      qualification: 'MBBS, MS (Surgery)',
      experience: '18+ years'
    },
    {
      name: 'Mr. Amit Patel',
      position: 'Hospital Administrator',
      image: '/api/placeholder/200/200',
      qualification: 'MBA Healthcare Management',
      experience: '15+ years'
    }
  ];

  const tabContent = {
    mission: {
      title: 'Our Mission',
      icon: Target,
      content: 'To provide exceptional, compassionate healthcare services that enhance the quality of life for our patients and community. We strive to be the leading healthcare provider by delivering personalized care through advanced medical technology, skilled professionals, and a commitment to continuous improvement.'
    },
    vision: {
      title: 'Our Vision',
      icon: Eye,
      content: 'To be the most trusted healthcare partner in the region, recognized for our clinical excellence, innovative treatments, and patient-centered care. We envision a healthier community where everyone has access to world-class medical services delivered with compassion and integrity.'
    },
    values: {
      title: 'Our Values',
      icon: Heart,
      content: 'Our core values guide every aspect of our healthcare delivery - from patient interactions to clinical decisions. We believe in treating every individual with respect, providing transparent communication, and maintaining the highest standards of medical ethics and professionalism.'
    }
  };
const ActiveIcon = tabContent[activeTab].icon;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-orange-500">Ashaali Hospital</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we've been dedicated to providing exceptional healthcare services 
            with a perfect blend of advanced medical technology and compassionate care.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission, Vision, Values Tabs */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-12 bg-white rounded-2xl p-2 shadow-lg">
              {Object.entries(tabContent).map(([key, tab]) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6">
                  <ActiveIcon  className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{tabContent[activeTab].title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  {tabContent[activeTab].content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h3>
            <p className="text-lg text-gray-600">Milestones in our commitment to healthcare excellence</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-orange-500"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start mb-12 last:mb-0">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className="ml-20 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="text-2xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.desc}</p>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h3>
            <p className="text-lg text-gray-600">Meet the experienced professionals leading our healthcare mission</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-r from-teal-500 to-orange-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h4>
                <p className="text-teal-600 font-semibold mb-2">{leader.position}</p>
                <p className="text-gray-600 text-sm mb-1">{leader.qualification}</p>
                <p className="text-gray-500 text-sm">{leader.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
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
    </section>
  );
};

export default AboutSection;