import React from 'react';
import { Shield, Heart, Users, Lightbulb } from 'lucide-react';

const CoreValues = () => {
  const values = [
    {
      icon: Shield,
      title: "Courage & Integrity",
      description: "Uphold the highest ethics, prioritize patients, and demonstrate the unwavering courage",
      color: "text-teal-500",
      bgColor: "bg-teal-50"
    },
    {
      icon: Heart,
      title: "Patient Centric Care",
      description: "Foster a culture where every one of us is committed to care for patients and their caregivers",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50"
    },
    {
      icon: Users,
      title: "Leadership & Quality",
      description: "Commit to delivering excellence in everything we do through exemplary action and behaviour",
      color: "text-teal-500",
      bgColor: "bg-teal-50"
    },
    {
      icon: Lightbulb,
      title: "Learning & Innovation",
      description: "Promote teamwork and collaboration, welcome change and creativity, encourage innovation",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50"
    }
  ];

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Our Core Values
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Healthcare professionals with patient"
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>
          </div>

          {/* Values Grid */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="text-center"
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 rounded-full ${value.bgColor} ${value.color}`}>
                        <IconComponent size={36} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed px-2">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;