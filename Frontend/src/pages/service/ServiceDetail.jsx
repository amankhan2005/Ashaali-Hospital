 import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Bone,
  Phone,
  Activity,
  CheckCircle,
  AlertTriangle,
  Shield,
  Star,
  MapPin,
  Clock,
  Stethoscope,
  Award,
  Users,
  Microscope,
  Heart,
  MessageCircle,
  Target,
} from "lucide-react";
import BreadCrumbs from "../../components/Breadcums";
import ServiceBreadcums from "./ServiceBrad";

// Import department images
import cardiology from "../../assets/service-breas/Cardiology.jpg";
import Dental from "../../assets/service-breas/Dental.jpg";
import Dermatology from "../../assets/service-breas/Dermatology.jpg";
import Doctos from "../../assets/service-breas/Doctors.jpg";
import Endocrinology from "../../assets/service-breas/Endoerinology.jpg";
import Gastrology from "../../assets/service-breas/Gastrology.jpg";
import General from "../../assets/service-breas/General.jpg";
import GeneralMedicine from "../../assets/service-breas/generalmedcine.jpg";
import Hematology from "../../assets/service-breas/Hematology.jpg";
import ICU from "../../assets/service-breas/icu.jpg";
import Nephrology from "../../assets/service-breas/Nephrology.jpg";
import Obstetrics from "../../assets/service-breas/obsertic.jpg";
import Oncology from "../../assets/service-breas/Oncology.jpg";
import Ophthalmology from "../../assets/service-breas/Ophthalmology.jpg";
import Orthopedics from "../../assets/service-breas/Orthopedics.jpg";
import Pediatrics from "../../assets/service-breas/Pediatrics.jpg";
import Psychiatry from "../../assets/service-breas/Psychiatry.jpg";
import Pulmonology from "../../assets/service-breas/Pulmonology.jpg";
import Urology from "../../assets/service-breas/Urology.jpg";
import serviceDetails from '../../data/services.js'
const DepartmentPage = () => {
  const primaryColor = "#18978d";
  const secondaryColor = "#ed8022";
  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();
  const { name } = useParams();

  const specialties = [
    "Orthopaedics",
    "Ophthalmology",
    "Pediatrics",
    "Neurology",
    "General Medicine",
    "ENT",
    "Gastrology",
    "General Surgery",
    "Obstetrics & Gynaecology",
    "Urology",
    "Nephrology",
    "Dental",
    "Pulmonology",
    "Dermatology",
    "Psychiatry",
    "Cardiology",
    "Oncology",
    "Hematology",
    "Endocrinology",
  ];

 

  const handleMore = (data) => {
    navigate(`/department/${data.toLowerCase().replace(/\s+/g, "-")}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const findServiceDetail = serviceDetails.find((val) => val.url === name);
    setActiveService(findServiceDetail);
  }, [name]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Treatment" },
  ];

  return (
    <div className="bg-gray-50">
      <ServiceBreadcums
        items={breadcrumbItems}
        headText={activeService?.departmentTitle}
        image={activeService?.image}
      />

      {!activeService ? (
        <p className="text-center py-20 mx-auto text-bold text-3xl">No data</p>
      ) : (
        <div>
          {/* Main Content */}
          <div className="container mx-auto lg:px-12 px-4 sm:px-6 md:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white">
                  <div className="py-4 mx-auto px-4 rounded-xl shadow-lg border border-gray-200">
                    <div className="w-full">
                      <h1 className="lg:text-4xl text-xl md:text-3xl font-bold text-gray-900 mb-2 md:text-justify">
                        {activeService?.subtitle}
                      </h1>
                      <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-full md:text-justify">
                        {activeService?.heroDescription}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
             <Link
  to={`/book-appointment?department=${activeService?.slug}`}
  className="bg-teal-600 flex items-center justify-center p-3 px-4 hover:bg-teal-700 rounded-lg transform-fill"
>
  Book Appointment
</Link>




                        <a
                          href="tel:+918303212210"
                          className="border-2 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                          style={{
                            borderColor: secondaryColor,
                            color: secondaryColor,
                          }}
                        >
                          <Phone className="mr-2 w-5 h-5" />
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-white rounded-lg py-8 px-4 shadow-sm border border-gray-200">
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center md:text-justify">
                    <Activity
                      className="w-8 h-8 mr-3"
                      style={{ color: primaryColor }}
                    />
                    {activeService?.treatmentExperienceTitle}
                  </h2>

                  <p className="text-gray-700 mb-8 text-lg leading-relaxed items-center md:text-justify">
                    {activeService?.treatmentExperienceDesc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {activeService?.caseStats &&
                      activeService?.caseStats.map((stat, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 py-2 px-2 rounded-lg"
                        >
                          <div
                            className="text-3xl items-center md:text-justify font-bold mb-2"
                            style={{ color: primaryColor }}
                          >
                            {stat.count}
                          </div>
                          <div className="text-lg font-semibold items-center md:text-justify text-gray-900 mb-2">
                            {stat.title}
                          </div>
                          <p className="text-gray-600 text-sm items-center md:text-justify leading-relaxed">
                            {stat.description}
                          </p>
                        </div>
                      ))}
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-lg items-center md:text-justify font-semibold text-green-800 mb-2">
                          {activeService?.successRateTitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed items-center md:text-justify">
                          {activeService?.successRateDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Content Sections */}
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                  {/* Conditions We Treat */}
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold items-center md:text-justify text-gray-900 mb-2">
                    {activeService?.conditionsTitle}
                  </h2>
                  <p className="text-gray-700 mb-6 items-center md:text-justify text-lg">
                    {activeService?.conditionsDesc}
                  </p>

                  <div className="space-y-3 mb-10">
                    {activeService?.conditionsTreated &&
                      activeService?.conditionsTreated.map(
                        (condition, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 p-3 rounded-md hover:shadow transition-shadow bg-gray-50"
                          >
                            <p className="text-gray-800">{condition}</p>
                          </div>
                        )
                      )}
                  </div>

                  {/* Procedures & Surgeries */}
                  <h2 className="lg:text-3xl text-xl md:text-2xl items-center md:text-justify font-bold text-gray-900 mb-2">
                    {activeService?.proceduresTitle}
                  </h2>
                  <p className="text-gray-700 mb-6 items-center md:text-justify text-lg">
                    {activeService?.proceduresDesc}
                  </p>

                  <div className="overflow-x-auto mb-10">
                    <table className="w-full border border-gray-300 text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">
                            Procedure
                          </th>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeService?.procedures &&
                          activeService?.procedures.map((procedure, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td
                                className="px-4 py-3 border border-gray-300 font-medium"
                                style={{ color: primaryColor }}
                              >
                                {procedure.name}
                              </td>
                              <td className="px-4 py-3 border border-gray-300 text-gray-700">
                                {procedure.description}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Treatment & Rehabilitation */}
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {activeService?.rehabTitle}
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg">
                    {activeService?.rehabDesc}
                  </p>

                  <div className="overflow-x-auto mb-10">
                    <table className="w-full table-auto border border-gray-300 text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">
                            Title
                          </th>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeService?.treatments &&
                          activeService?.treatments.map((treatment, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 border border-gray-300 font-medium">
                                {treatment.title}
                              </td>
                              <td className="px-4 py-3 border border-gray-300 text-gray-700">
                                {treatment.description}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Symptoms to Watch Out For */}
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {activeService?.symptomsTitle}
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg">
                    {activeService?.symptomsDesc}
                  </p>

                  <div className="space-y-3 mb-10">
                    {activeService?.symptoms &&
                      activeService?.symptoms.map((symptom, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-md border border-gray-300 bg-gray-100"
                        >
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            <p className="text-gray-800">{symptom.text}</p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Side Effects */}
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {activeService?.sideEffectsTitle}
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg">
                    {activeService?.sideEffectsDesc}
                  </p>

                  <div className="space-y-3">
                    {activeService?.sideEffects &&
                      activeService?.sideEffects.map((effect, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-md border border-gray-300 bg-gray-100"
                        >
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <p className="text-gray-800">{effect.text}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Our Specialties */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-[#18978d] px-6 py-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Users className="w-6 h-6 mr-2" />
                      Our Specialties
                    </h3>
                  </div>
                  <div className="p-3">
                    <div className="space-y-3">
                      {specialties.map((specialty, index) => (
                        <div
                          key={index}
                          className="group flex items-center p-3 bg-[#18978d] hover:bg-[#73cac2] rounded-lg transition-all duration-300 cursor-pointer text-white"
                          onClick={() => handleMore(specialty)}
                        >
                          <div className="w-3 h-3 rounded-full bg-white mr-4"></div>
                          <span className="font-semibold">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      Trauma Emergency
                    </h3>
                    <p className="text-red-700 text-sm mb-4">
                      24/7 Emergency Cardiac Care
                    </p>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <a href="tel:+918303212210" className="hover:text-gray-800 hover:font-bold">
                        +91-83032 12210
                      </a>
                      <span className="mx-2">|</span>
                      <a href="tel:05223503390" className="hover:text-gray-800 hover:font-bold">
                        0522-3503390
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;