import React, { useState, useEffect } from "react";
import {
  Activity,
  Users,
  Calendar,
  MapPin,
  Phone,
  Building2,
  Heart,
  Shield,
  Truck,
  Camera,
  FlaskConical,
  Bed,
  Utensils,
  Waves,
  Star,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
// Mock BreadCrumbs Component
 import BreadCrumb from '../../components/Breadcrumb'; // updated import


const FacilitiesComponent = () => {
  // State for dynamic data
  const [featuredFacility, setFeaturedFacility] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  const navigate = useNavigate();

  // ICU Detailed Data
  const icuData = {
    id: 1,
    title: "ICU (Intensive Care Unit)",
    shortDescription:
      "State-of-the-art Intensive Care Unit equipped with advanced life support systems, continuous monitoring equipment, and specialized medical staff to provide critical care for patients requiring intensive medical attention.",
    icon: "Heart",
    url: "/facilities/icu",
    capacity: "20 beds",
    availability: "24/7",
    equipment: [
      { id: 1, name: "Mechanical Ventilators", count: 15, status: "Available" },
      { id: 2, name: "Cardiac Monitors", count: 20, status: "Available" },
      { id: 3, name: "Defibrillators", count: 8, status: "Available" },
      { id: 4, name: "Infusion Pumps", count: 25, status: "Available" },
      { id: 5, name: "Central Monitoring System", count: 1, status: "Active" },
      { id: 6, name: "Dialysis Machines", count: 3, status: "Available" },
      {
        id: 7,
        name: "X-Ray Machines (Portable)",
        count: 2,
        status: "Available",
      },
      { id: 8, name: "Ultrasound Machines", count: 2, status: "Available" },
    ],
    staff: [
      { id: 1, role: "ICU Specialists", count: 6, shift: "24/7 Coverage" },
      {
        id: 2,
        role: "Critical Care Nurses",
        count: 24,
        shift: "Round the Clock",
      },
      {
        id: 3,
        role: "Respiratory Therapists",
        count: 8,
        shift: "24/7 Available",
      },
      { id: 4, role: "Physiotherapists", count: 4, shift: "Day & Evening" },
    ],
    services: [
      { id: 1, service: "Post-Operative Care", available: true },
      { id: 2, service: "Trauma Care", available: true },
      { id: 3, service: "Cardiac Emergency Care", available: true },
      { id: 4, service: "Neurological Critical Care", available: true },
      { id: 5, service: "Respiratory Support", available: true },
      { id: 6, service: "Continuous Renal Replacement", available: true },
      { id: 7, service: "Hemodynamic Monitoring", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Individual Patient Rooms",
        description: "Private ICU rooms with glass partitions",
      },
      {
        id: 2,
        feature: "Advanced Air Filtration",
        description: "HEPA filtered air circulation system",
      },
      {
        id: 3,
        feature: "Family Consultation Areas",
        description: "Dedicated spaces for family meetings",
      },
      {
        id: 4,
        feature: "Emergency Response System",
        description: "Immediate alert and response protocols",
      },
    ],
  };

  // NICU Detailed Data
  const nicuData = {
    id: 2,
    title: "NICU (Neonatal Intensive Care Unit)",
    shortDescription:
      "Specialized unit designed to provide intensive medical attention and support to newborns with critical health conditions, including premature birth, respiratory issues, and congenital disorders.",
    icon: "Baby",
    url: "nicu",
    capacity: "15 beds",
    availability: "24/7",
    equipment: [
      { id: 1, name: "Incubators", count: 12, status: "Available" },
      { id: 2, name: "Neonatal Ventilators", count: 10, status: "Available" },
      { id: 3, name: "Phototherapy Units", count: 6, status: "Available" },
      {
        id: 4,
        name: "Cardio-Respiratory Monitors",
        count: 15,
        status: "Available",
      },
      { id: 5, name: "Infusion Pumps", count: 20, status: "Available" },
      { id: 6, name: "Central Monitoring System", count: 1, status: "Active" },
      { id: 7, name: "Portable X-Ray Machine", count: 1, status: "Available" },
      { id: 8, name: "CPAP Machines", count: 5, status: "Available" },
    ],
    staff: [
      { id: 1, role: "Neonatologists", count: 4, shift: "24/7 Coverage" },
      { id: 2, role: "NICU Nurses", count: 20, shift: "Round the Clock" },
      {
        id: 3,
        role: "Respiratory Therapists",
        count: 6,
        shift: "24/7 Available",
      },
      { id: 4, role: "Pediatric Nutritionists", count: 2, shift: "Day Shift" },
    ],
    services: [
      { id: 1, service: "Preterm Birth Care", available: true },
      { id: 2, service: "Respiratory Distress Treatment", available: true },
      { id: 3, service: "Neonatal Jaundice Therapy", available: true },
      { id: 4, service: "Sepsis Management", available: true },
      { id: 5, service: "Congenital Disorder Monitoring", available: true },
      { id: 6, service: "Nutritional Support", available: true },
      { id: 7, service: "Neonatal Surgery Support", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Temperature-Controlled Incubators",
        description: "Maintains optimal environment for newborns",
      },
      {
        id: 2,
        feature: "Infection Control Protocols",
        description: "Strict hygiene and sanitation procedures",
      },
      {
        id: 3,
        feature: "24x7 Parental Access",
        description: "Dedicated spaces for parents to be near their newborns",
      },
      {
        id: 4,
        feature: "Real-time Monitoring",
        description: "Continuous observation with alert systems",
      },
    ],
  };

  //emergencyData
  const emergencyData = {
    id: 3,
    title: "Emergency Department (Casualty)",
    shortDescription:
      "24/7 emergency care unit equipped to handle trauma, critical injuries, and acute medical conditions with rapid response and stabilization.",
    icon: "AlertCircle",
    url: "emergency",
    capacity: "20 beds",
    availability: "24/7",
    equipment: [
      { id: 1, name: "Defibrillators", count: 5, status: "Available" },
      { id: 2, name: "Cardiac Monitors", count: 10, status: "Available" },
      { id: 3, name: "Ventilators", count: 6, status: "Available" },
      { id: 4, name: "Suction Devices", count: 8, status: "Available" },
      { id: 5, name: "ECG Machines", count: 4, status: "Available" },
      { id: 6, name: "Crash Carts", count: 3, status: "Available" },
      { id: 7, name: "Infusion Pumps", count: 10, status: "Available" },
      { id: 8, name: "Portable X-Ray Unit", count: 1, status: "Available" },
    ],
    staff: [
      { id: 1, role: "Emergency Physicians", count: 6, shift: "24/7 Coverage" },
      { id: 2, role: "Trauma Nurses", count: 15, shift: "Round the Clock" },
      { id: 3, role: "Paramedics", count: 10, shift: "24/7 Available" },
      { id: 4, role: "Surgeons On-Call", count: 3, shift: "As Needed" },
    ],
    services: [
      { id: 1, service: "Trauma Care", available: true },
      { id: 2, service: "Cardiac Emergency Response", available: true },
      { id: 3, service: "Stroke Management", available: true },
      { id: 4, service: "Poisoning Treatment", available: true },
      { id: 5, service: "Burn Treatment", available: true },
      { id: 6, service: "Road Accident Response", available: true },
      { id: 7, service: "Emergency Surgery Prep", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Rapid Triage System",
        description: "Quick evaluation and categorization of patient urgency",
      },
      {
        id: 2,
        feature: "Ambulance Bay",
        description: "Dedicated access for emergency vehicle drop-off",
      },
      {
        id: 3,
        feature: "Immediate Resuscitation Area",
        description: "Equipped for life-saving interventions",
      },
      {
        id: 4,
        feature: "24x7 Medical Imaging Support",
        description: "X-ray, CT, and ultrasound available round the clock",
      },
    ],
  };

  //Ventilator
  const ventilatorDepartmentData = {
    id: 4,
    title: "Ventilator Support Unit",
    shortDescription:
      "Dedicated unit equipped with advanced ventilators for respiratory support in critical care scenarios including ICU and emergency cases.",
    icon: "Activity",
    url: "ventilator",
    capacity: "12 beds",
    availability: "24/7",
    equipment: [
      { id: 1, name: "GE Carescape R860", count: 2, status: "Available" },
      { id: 2, name: "Philips Respironics V60", count: 1, status: "In Use" },
      {
        id: 3,
        name: "Dräger Evita Infinity V500",
        count: 1,
        status: "Available",
      },
      { id: 4, name: "Hamilton-C6", count: 1, status: "Maintenance" },
      { id: 5, name: "Mindray SynoVent E5", count: 1, status: "Available" },
      {
        id: 6,
        name: "Medtronic Puritan Bennett 980",
        count: 2,
        status: "Available",
      },
    ],
    staff: [
      {
        id: 1,
        role: "Respiratory Therapists",
        count: 4,
        shift: "24/7 Coverage",
      },
      {
        id: 2,
        role: "Critical Care Nurses",
        count: 8,
        shift: "Round the Clock",
      },
      { id: 3, role: "Pulmonologists", count: 3, shift: "On-Call" },
      { id: 4, role: "Biomedical Engineers", count: 2, shift: "Day Shift" },
    ],
    services: [
      { id: 1, service: "Mechanical Ventilation", available: true },
      { id: 2, service: "Non-Invasive Ventilation", available: true },
      { id: 3, service: "Oxygen Therapy", available: true },
      { id: 4, service: "Respiratory Monitoring", available: true },
      { id: 5, service: "Critical Care Support", available: true },
      { id: 6, service: "Ventilator Weaning", available: true },
      { id: 7, service: "24/7 Emergency Backup", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Advanced Ventilator Models",
        description: "Supports invasive and non-invasive ventilation modes",
      },
      {
        id: 2,
        feature: "Real-Time Monitoring",
        description: "Continuous patient respiratory parameter tracking",
      },
      {
        id: 3,
        feature: "Sterile Environment",
        description: "Strict infection control and air purification",
      },
      {
        id: 4,
        feature: "Battery Backup Systems",
        description: "Ensures uninterrupted function during power outages",
      },
    ],
  };

  //Ambulance
  const ambulanceData = {
    id: 5,
    title: "Ambulance Services",
    shortDescription:
      "24/7 ambulance services equipped with life-saving equipment and trained staff to ensure quick and safe patient transport.",
    icon: "Truck",
    url: "ambulance",
    capacity: "6 ambulances",
    availability: "24/7",
    equipment: [
      { id: 1, name: "Stretcher Trolleys", count: 6, status: "Available" },
      { id: 2, name: "Oxygen Cylinders", count: 12, status: "Available" },
      { id: 3, name: "Portable Ventilators", count: 4, status: "Available" },
      { id: 4, name: "Suction Machines", count: 6, status: "Available" },
      { id: 5, name: "Cardiac Monitors", count: 3, status: "Available" },
      { id: 6, name: "First Aid Kits", count: 6, status: "Available" },
      { id: 7, name: "Defibrillators", count: 2, status: "Available" },
      {
        id: 8,
        name: "Ambulance Communication Radios",
        count: 6,
        status: "Available",
      },
    ],
    staff: [
      { id: 1, role: "Ambulance Drivers", count: 6, shift: "24/7 Rotational" },
      { id: 2, role: "Paramedics", count: 6, shift: "24/7 Coverage" },
      { id: 3, role: "Emergency Technicians", count: 4, shift: "On Call" },
      {
        id: 4,
        role: "Dispatch Coordinators",
        count: 2,
        shift: "Day & Night Shifts",
      },
    ],
    services: [
      { id: 1, service: "Emergency Patient Transport", available: true },
      { id: 2, service: "ICU Ambulance Support", available: true },
      { id: 3, service: "Accident Site Response", available: true },
      { id: 4, service: "Cardiac Ambulance", available: true },
      { id: 5, service: "Inter-Hospital Transfer", available: true },
      { id: 6, service: "Medical Escort for Long Distance", available: true },
      { id: 7, service: "Neonatal Ambulance Support", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "GPS Tracking",
        description:
          "Real-time location tracking for quick dispatch and arrival",
      },
      {
        id: 2,
        feature: "Advanced Life Support (ALS)",
        description:
          "ALS equipment including monitors, oxygen, and emergency medication",
      },
      {
        id: 3,
        feature: "Communication System",
        description:
          "Two-way radios for continuous contact with hospital emergency room",
      },
      {
        id: 4,
        feature: "24x7 Availability",
        description: "Round-the-clock service for all emergency needs",
      },
    ],
  };

  //X-ray
  const xrayData = {
    id: 6,
    title: "X-Ray Department",
    shortDescription:
      "Equipped with digital and portable X-ray systems to provide high-resolution imaging for accurate diagnosis and treatment support.",
    icon: "ScanLine",
    url: "xray",
    capacity: "3 X-Ray Units",
    availability: "Mon-Sat, 8 AM - 8 PM",
    equipment: [
      { id: 1, name: "Digital X-Ray Machine", count: 2, status: "Available" },
      { id: 2, name: "Portable X-Ray Unit", count: 1, status: "In Use" },
      { id: 3, name: "Lead Aprons", count: 5, status: "Available" },
      { id: 4, name: "X-Ray Film Processor", count: 1, status: "Available" },
      {
        id: 5,
        name: "Radiation Protection Screens",
        count: 2,
        status: "Available",
      },
      { id: 6, name: "Cassettes & Grids", count: 10, status: "Available" },
      { id: 7, name: "Exposure Control Panel", count: 1, status: "Available" },
      {
        id: 8,
        name: "Patient Positioning Devices",
        count: 4,
        status: "Available",
      },
    ],
    staff: [
      {
        id: 1,
        role: "Radiologic Technologists",
        count: 4,
        shift: "Rotational Shifts",
      },
      { id: 2, role: "Radiology Assistants", count: 2, shift: "Day Shift" },
      { id: 3, role: "Radiologist (On-Call)", count: 1, shift: "As Required" },
      { id: 4, role: "Technician Support Staff", count: 2, shift: "Full Day" },
    ],
    services: [
      { id: 1, service: "Chest X-Ray", available: true },
      { id: 2, service: "Abdominal X-Ray", available: true },
      { id: 3, service: "Skeletal X-Ray", available: true },
      { id: 4, service: "Portable Bedside X-Ray", available: true },
      { id: 5, service: "Emergency Trauma Imaging", available: true },
      { id: 6, service: "X-Ray for Pre-Operative Evaluation", available: true },
      { id: 7, service: "Digital Image Archiving", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "High-Resolution Imaging",
        description: "Digital systems provide crisp diagnostic-quality images",
      },
      {
        id: 2,
        feature: "PACS Integration",
        description:
          "Picture Archiving and Communication System for instant access",
      },
      {
        id: 3,
        feature: "Radiation Safety Protocols",
        description: "Ensures patient and staff protection during procedures",
      },
      {
        id: 4,
        feature: "Emergency X-Ray Access",
        description: "Round-the-clock support for critical patients",
      },
    ],
  };

  //Pathology
  const pathologyData = {
    id: 7,
    title: "Pathology Department",
    shortDescription:
      "Fully equipped diagnostic lab offering a wide range of pathology tests for timely and accurate disease detection and monitoring.",
    icon: "FlaskConical",
    url: "pathology",
    capacity: "3 Diagnostic Labs",
    availability: "24/7 for Emergency, 8 AM - 8 PM OPD",
    equipment: [
      {
        id: 1,
        name: "Automated Hematology Analyzer",
        count: 2,
        status: "Available",
      },
      { id: 2, name: "Biochemistry Analyzer", count: 2, status: "Available" },
      { id: 3, name: "Centrifuge Machines", count: 4, status: "Available" },
      { id: 4, name: "Microscopes", count: 6, status: "Available" },
      {
        id: 5,
        name: "Blood Sample Refrigerators",
        count: 2,
        status: "Available",
      },
      { id: 6, name: "Urine Analyzer", count: 1, status: "Available" },
      { id: 7, name: "Histopathology Setup", count: 1, status: "Available" },
      {
        id: 8,
        name: "PCR Machine (Molecular Lab)",
        count: 1,
        status: "Available",
      },
    ],
    staff: [
      { id: 1, role: "Pathologists", count: 2, shift: "Day + On-Call" },
      { id: 2, role: "Lab Technicians", count: 8, shift: "Rotational Shifts" },
      { id: 3, role: "Phlebotomists", count: 3, shift: "8 AM - 8 PM" },
      {
        id: 4,
        role: "Sample Collection Staff",
        count: 2,
        shift: "Morning Shift",
      },
    ],
    services: [
      { id: 1, service: "Complete Blood Count (CBC)", available: true },
      { id: 2, service: "Liver Function Test (LFT)", available: true },
      { id: 3, service: "Kidney Function Test (KFT)", available: true },
      { id: 4, service: "Blood Sugar & Lipid Profile", available: true },
      { id: 5, service: "Urine & Stool Examination", available: true },
      { id: 6, service: "Biopsy & Histopathology", available: true },
      { id: 7, service: "RT-PCR & Viral Load Testing", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Fully Automated Lab",
        description: "Ensures accurate and efficient processing of samples",
      },
      {
        id: 2,
        feature: "Home Sample Collection",
        description: "Available for selected tests within city limits",
      },
      {
        id: 3,
        feature: "Digital Reporting",
        description:
          "Test results shared electronically with doctors & patients",
      },
      {
        id: 4,
        feature: "Emergency Diagnostics",
        description: "Fast-track processing for critical patients",
      },
    ],
  };

  //General Ward
  const generalWardData = {
    id: 8,
    title: "General Ward",
    shortDescription:
      "Spacious and hygienic inpatient facility offering affordable and essential care for recovering patients with 24/7 monitoring and nursing support.",
    icon: "BedDouble",
    url: "generalward",
    capacity: "60 Beds",
    availability: "24/7",
    equipment: [
      {
        id: 1,
        name: "Hospital Beds with Side Rails",
        count: 60,
        status: "Available",
      },
      { id: 2, name: "Vital Sign Monitors", count: 20, status: "Available" },
      { id: 3, name: "IV Stands", count: 60, status: "Available" },
      { id: 4, name: "Wheelchairs", count: 10, status: "Available" },
      { id: 5, name: "Oxygen Cylinders", count: 15, status: "Available" },
      { id: 6, name: "Bedside Lockers", count: 60, status: "Available" },
      { id: 7, name: "Sanitation Kits", count: 60, status: "Available" },
      { id: 8, name: "Emergency Call Buttons", count: 60, status: "Available" },
    ],
    staff: [
      { id: 1, role: "Ward Incharge", count: 1, shift: "Day Shift" },
      { id: 2, role: "Nursing Staff", count: 12, shift: "24/7 Coverage" },
      { id: 3, role: "Ward Boys", count: 8, shift: "Rotational Shifts" },
      { id: 4, role: "Cleaning Staff", count: 6, shift: "Three Shifts" },
    ],
    services: [
      { id: 1, service: "Basic Nursing Care", available: true },
      { id: 2, service: "Vital Monitoring", available: true },
      { id: 3, service: "Doctor Rounds", available: true },
      { id: 4, service: "Bedside Procedures", available: true },
      { id: 5, service: "Nutritional Support", available: true },
      { id: 6, service: "Patient Hygiene Management", available: true },
      { id: 7, service: "Infection Control Measures", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Affordable Accommodation",
        description: "Economical care for inpatients with essential facilities",
      },
      {
        id: 2,
        feature: "Shared Environment",
        description: "Multiple patients per room with privacy partitions",
      },
      {
        id: 3,
        feature: "24x7 Nursing Availability",
        description: "Round-the-clock patient assistance and monitoring",
      },
      {
        id: 4,
        feature: "Daily Sanitization",
        description: "Regular cleaning and disinfection of all areas",
      },
    ],
  };

  //Private Ward
  const privateWardData = {
    id: 9,
    title: "Private Ward",
    shortDescription:
      "Comfortable and private inpatient rooms designed for personalized care, featuring premium amenities and dedicated medical attention.",
    icon: "UserCheck",
    url: "private",
    capacity: "20 Rooms",
    availability: "24/7",
    equipment: [
      {
        id: 1,
        name: "Adjustable Electric Beds",
        count: 20,
        status: "Available",
      },
      {
        id: 2,
        name: "Personal Vital Monitors",
        count: 20,
        status: "Available",
      },
      { id: 3, name: "Oxygen Supply Units", count: 20, status: "Available" },
      {
        id: 4,
        name: "Recliner Chairs for Attendants",
        count: 20,
        status: "Available",
      },
      { id: 5, name: "Personal Televisions", count: 20, status: "Available" },
      { id: 6, name: "Air Conditioning Units", count: 20, status: "Available" },
      { id: 7, name: "Private Washrooms", count: 20, status: "Available" },
      { id: 8, name: "Room Intercom Systems", count: 20, status: "Available" },
    ],
    staff: [
      { id: 1, role: "Ward Incharge", count: 1, shift: "Day Shift" },
      { id: 2, role: "Dedicated Nurses", count: 10, shift: "24/7 Coverage" },
      {
        id: 3,
        role: "Housekeeping Staff",
        count: 5,
        shift: "Rotational Shifts",
      },
      { id: 4, role: "On-Call Doctors", count: 3, shift: "On Demand" },
    ],
    services: [
      { id: 1, service: "Private Nursing", available: true },
      { id: 2, service: "Daily Doctor Visits", available: true },
      { id: 3, service: "In-room Meals & Diet Plans", available: true },
      { id: 4, service: "Entertainment Facility", available: true },
      { id: 5, service: "Family Stay Option", available: true },
      { id: 6, service: "Personalized Treatment Plans", available: true },
      { id: 7, service: "Exclusive Housekeeping", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Enhanced Privacy",
        description: "Single occupancy rooms with minimal disruption",
      },
      {
        id: 2,
        feature: "Luxury Comfort",
        description: "Well-furnished rooms with patient-centric design",
      },
      {
        id: 3,
        feature: "Dedicated Care",
        description: "1:1 nursing ratio for critical or high-care patients",
      },
      {
        id: 4,
        feature: "Modern Infrastructure",
        description: "Equipped with smart systems and emergency support",
      },
    ],
  };

  // semiParivateWaod
  const semiPrivateWardData = {
    id: 10,
    title: "Semi-Private Ward",
    shortDescription:
      "Comfortable shared inpatient rooms with limited occupancy, providing essential amenities and affordable care in a semi-private environment.",
    icon: "Users",
    url: "semiprivate",
    capacity: "30 Beds",
    availability: "24/7",
    equipment: [
      { id: 1, name: "Hospital Beds", count: 30, status: "Available" },
      { id: 2, name: "Shared Vital Monitors", count: 15, status: "Available" },
      { id: 3, name: "Oxygen Outlets", count: 30, status: "Available" },
      { id: 4, name: "Curtains for Privacy", count: 30, status: "Available" },
      { id: 5, name: "Bedside Lockers", count: 30, status: "Available" },
      { id: 6, name: "IV Stands", count: 30, status: "Available" },
      {
        id: 7,
        name: "Sanitary Facilities (Shared)",
        count: 10,
        status: "Available",
      },
      { id: 8, name: "Fans and Ventilation", count: 30, status: "Available" },
    ],
    staff: [
      { id: 1, role: "Ward Incharge", count: 1, shift: "Day Shift" },
      { id: 2, role: "Nursing Staff", count: 10, shift: "Round the Clock" },
      { id: 3, role: "Ward Boys", count: 6, shift: "Rotational Shifts" },
      { id: 4, role: "Cleaning Staff", count: 4, shift: "Three Shifts" },
    ],
    services: [
      { id: 1, service: "Basic Nursing Care", available: true },
      { id: 2, service: "Vital Monitoring", available: true },
      { id: 3, service: "Doctor Rounds", available: true },
      { id: 4, service: "In-Room Food Service", available: true },
      { id: 5, service: "Hygiene Maintenance", available: true },
      { id: 6, service: "Shared Patient Facilities", available: true },
      { id: 7, service: "Family Visiting Hours", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Shared Room with Fewer Occupants",
        description: "2-3 beds per room with privacy curtains and ample space",
      },
      {
        id: 2,
        feature: "Balanced Comfort and Affordability",
        description: "Ideal for patients seeking value and quality care",
      },
      {
        id: 3,
        feature: "Accessible Medical Support",
        description: "On-call medical staff available 24/7",
      },
      {
        id: 4,
        feature: "Essential Patient Amenities",
        description: "Locker, food, and sanitation within reach",
      },
    ],
  };

  //Deluxe
  const deluxeWardData = {
    id: 11,
    title: "Deluxe Ward",
    shortDescription:
      "Premium single occupancy rooms offering luxury, advanced medical support, and personalized care in a hotel-like environment.",
    icon: "Hotel",
    url: "deluxe",
    capacity: "10 Rooms",
    availability: "24/7",
    equipment: [
      {
        id: 1,
        name: "Fully Automatic Electric Beds",
        count: 10,
        status: "Available",
      },
      { id: 2, name: "Smart Vital Monitors", count: 10, status: "Available" },
      { id: 3, name: "In-Room Oxygen Units", count: 10, status: "Available" },
      { id: 4, name: "Personal Refrigerators", count: 10, status: "Available" },
      { id: 5, name: "Flat-Screen TVs", count: 10, status: "Available" },
      { id: 6, name: "Split AC Units", count: 10, status: "Available" },
      {
        id: 7,
        name: "Electronic Nurse Call Systems",
        count: 10,
        status: "Available",
      },
      { id: 8, name: "Luxury Recliner Chairs", count: 10, status: "Available" },
    ],
    staff: [
      {
        id: 1,
        role: "Personal Nurse",
        count: 10,
        shift: "24/7 Individual Coverage",
      },
      { id: 2, role: "Ward Manager", count: 1, shift: "Day Shift" },
      { id: 3, role: "On-Call Specialists", count: 5, shift: "As Required" },
      {
        id: 4,
        role: "Dedicated Housekeeping",
        count: 5,
        shift: "Rotational Shifts",
      },
    ],
    services: [
      { id: 1, service: "24/7 Personalized Nursing", available: true },
      { id: 2, service: "Specialist Doctor Access", available: true },
      { id: 3, service: "Gourmet Meal Service", available: true },
      { id: 4, service: "Private Attendant Space", available: true },
      { id: 5, service: "Concierge Support", available: true },
      { id: 6, service: "High-Speed Wi-Fi", available: true },
      { id: 7, service: "In-Room Entertainment", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Hotel-Style Ambience",
        description: "Luxury interiors with superior comfort and aesthetics",
      },
      {
        id: 2,
        feature: "One-on-One Care",
        description: "Dedicated staff per patient ensuring focused treatment",
      },
      {
        id: 3,
        feature: "Smart Room Technology",
        description: "Automated controls, nurse calling, and climate control",
      },
      {
        id: 4,
        feature: "Private Washroom & Lounge Area",
        description: "Exclusive space for patient and attendants",
      },
    ],
  };

  //Phsiotherapy

  const physiotherapyData = {
    id: 12,
    title: "Physiotherapy Department",
    shortDescription:
      "Comprehensive rehabilitation center providing therapeutic services for injury recovery, mobility improvement, and chronic pain management.",
    icon: "Activity",
    url: "physiotherapy",
    capacity: "15 Patients per Session",
    availability: "Mon-Sat, 9 AM - 6 PM",
    equipment: [
      { id: 1, name: "Electrotherapy Units", count: 4, status: "Available" },
      { id: 2, name: "Treadmills", count: 2, status: "Available" },
      {
        id: 3,
        name: "Ultrasound Therapy Devices",
        count: 3,
        status: "Available",
      },
      { id: 4, name: "Therapy Balls", count: 6, status: "Available" },
      { id: 5, name: "Resistance Bands", count: 20, status: "Available" },
      { id: 6, name: "Hydrotherapy Tub", count: 1, status: "Available" },
      { id: 7, name: "Traction Equipment", count: 2, status: "Available" },
      { id: 8, name: "Exercise Mats", count: 10, status: "Available" },
    ],
    staff: [
      { id: 1, role: "Senior Physiotherapist", count: 2, shift: "Full Day" },
      {
        id: 2,
        role: "Junior Physiotherapists",
        count: 4,
        shift: "Rotational Shifts",
      },
      { id: 3, role: "Therapy Assistants", count: 3, shift: "Support Role" },
      { id: 4, role: "Reception/Coordinator", count: 1, shift: "Front Desk" },
    ],
    services: [
      { id: 1, service: "Post-Surgery Rehabilitation", available: true },
      { id: 2, service: "Back & Neck Pain Therapy", available: true },
      { id: 3, service: "Joint Mobilization", available: true },
      { id: 4, service: "Sports Injury Therapy", available: true },
      { id: 5, service: "Neurological Rehab", available: true },
      { id: 6, service: "Geriatric Physiotherapy", available: true },
      { id: 7, service: "Hydrotherapy Sessions", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Personalized Recovery Plans",
        description:
          "Custom programs tailored to individual needs and diagnosis",
      },
      {
        id: 2,
        feature: "Modern Rehabilitation Equipment",
        description: "Cutting-edge technology for faster healing",
      },
      {
        id: 3,
        feature: "Comfortable Therapy Environment",
        description:
          "Spacious, well-lit therapy zones designed for patient comfort",
      },
      {
        id: 4,
        feature: "Follow-up & Progress Tracking",
        description: "Continuous assessment to track patient improvement",
      },
    ],
  };

  //Canteen
  const canteenFacilityData = {
    id: 13,
    title: "Canteen Facility",
    shortDescription:
      "Well-maintained hospital canteen offering hygienic, nutritious, and affordable meals to patients, visitors, and staff throughout the day.",
    icon: "Utensils",
    url: "canteen",
    capacity: "50+ Seating Capacity",
    availability: "7 AM – 10 PM (All Days)",
    equipment: [
      { id: 1, name: "Food Warmers", count: 4, status: "Available" },
      { id: 2, name: "Refrigeration Units", count: 3, status: "Available" },
      {
        id: 3,
        name: "Industrial Microwave Ovens",
        count: 2,
        status: "Available",
      },
      {
        id: 4,
        name: "Gas Stoves with Chimneys",
        count: 5,
        status: "Available",
      },
      { id: 5, name: "Dishwashers", count: 2, status: "Available" },
      { id: 6, name: "Serving Counters", count: 3, status: "Available" },
      { id: 7, name: "Dining Tables", count: 12, status: "Available" },
      {
        id: 8,
        name: "Hand Sanitizer Dispensers",
        count: 8,
        status: "Available",
      },
    ],
    staff: [
      { id: 1, role: "Head Chef", count: 1, shift: "Morning to Evening" },
      { id: 2, role: "Assistant Cooks", count: 4, shift: "Rotational" },
      { id: 3, role: "Cleaning Staff", count: 3, shift: "Morning & Night" },
      { id: 4, role: "Cashier & Counter Staff", count: 2, shift: "Full Day" },
    ],
    services: [
      { id: 1, service: "Patient Meal Delivery", available: true },
      { id: 2, service: "Healthy & Balanced Meals", available: true },
      { id: 3, service: "Snacks & Beverages", available: true },
      { id: 4, service: "Custom Diet Orders", available: true },
      { id: 5, service: "Affordable Pricing", available: true },
      { id: 6, service: "Visitor Dining Area", available: true },
      { id: 7, service: "24x7 Tea & Coffee Vending", available: true },
    ],
    features: [
      {
        id: 1,
        feature: "Dietitian-Supervised Menu",
        description: "Daily meals approved by clinical dietitians",
      },
      {
        id: 2,
        feature: "Hygiene-Certified Kitchen",
        description: "Strict sanitation standards with regular inspections",
      },
      {
        id: 3,
        feature: "Spacious Dining Area",
        description: "Comfortable seating and waiting area for visitors",
      },
      {
        id: 4,
        feature: "Cashless Payment Options",
        description: "Supports UPI, cards, and prepaid meal cards",
      },
    ],
  };

  // Facilities data array with URLs
  const facilitiesData = [
    {
      id: 1,
      title: icuData.title,
      description: icuData.shortDescription,
      icon: icuData.icon,
      url: icuData.url,
      detailedData: icuData,
    },
    {
      id: 2,
      title: nicuData.title,
      description: nicuData.shortDescription,
      icon: nicuData.icon,
      url: nicuData.url,
      detailedData: nicuData,
    },
    {
      id: 3,
      title: emergencyData.title,
      description: emergencyData.shortDescription,
      icon: emergencyData.icon,
      url: emergencyData.url,
      detailedData: emergencyData,
    },
    {
      id: 4,
      title: ventilatorDepartmentData.title,
      description: ventilatorDepartmentData.shortDescription,
      icon: ventilatorDepartmentData.icon,
      url: ventilatorDepartmentData.url,
      detailedData: ventilatorDepartmentData,
    },
    {
      id: 5,
      title: ambulanceData.title,
      description: ambulanceData.shortDescription,
      icon: ambulanceData.icon,
      url: ambulanceData.url,
      detailedData: ambulanceData,
    },
    {
      id: 6,
      title: xrayData.title,
      description: xrayData.shortDescription,
      icon: xrayData.icon,
      url: xrayData.url,
      detailedData: xrayData,
    },
    {
      id: 7,
      title: pathologyData.title,
      description: pathologyData.shortDescription,
      icon: pathologyData.icon,
      url: pathologyData.url,
      detailedData: pathologyData,
    },
    {
      id: 8,
      title: generalWardData.title,
      description: generalWardData.shortDescription,
      icon: generalWardData.icon,
      url: generalWardData.url,
      detailedData: generalWardData,
    },
    {
      id: 9,
      title: privateWardData.title,
      description: privateWardData.shortDescription,
      icon: privateWardData.icon,
      url: privateWardData.url,
      detailedData: privateWardData,
    },
    {
      id: 10,
      title: semiPrivateWardData.title,
      description: semiPrivateWardData.shortDescription,
      icon: semiPrivateWardData.icon,
      url: semiPrivateWardData.url,
      detailedData: semiPrivateWardData,
    },
    {
      id: 11,
      title: deluxeWardData.title,
      description: deluxeWardData.shortDescription,
      icon: deluxeWardData.icon,
      url: deluxeWardData.url,
      detailedData: deluxeWardData,
    },
    {
      id: 12,
      title: physiotherapyData.title,
      description: physiotherapyData.shortDescription,
      icon: physiotherapyData.icon,
      url: physiotherapyData.url,
      detailedData: physiotherapyData,
    },
    {
      id: 13,
      title: canteenFacilityData.title,
      description: canteenFacilityData.shortDescription,
      icon: canteenFacilityData.icon,
      url: canteenFacilityData.url,
      detailedData: canteenFacilityData,
    },
  ];

  // Specialties data array with URLs
  const specialtiesData = [
    { id: 1, name: "ICU", url: "/facility/icu" },
    { id: 2, name: "NICU", url: "/facility/nicu" },
    { id: 3, name: "Emergency", url: "/facility/emergency" },
    { id: 4, name: "Ventilator", url: "/facility/ventilator" },
    { id: 5, name: "Ambulance", url: "/facility/ambulance" },
    { id: 6, name: "XRay", url: "/facility/xray" },
    { id: 7, name: "Pathology", url: "/facility/pathology" },
    { id: 8, name: "General Ward", url: "/facility/general-ward" },
    { id: 9, name: "Private", url: "/facility/private" },
    { id: 10, name: "Semi Private", url: "/facility/semi-private" },
    { id: 11, name: "Deluxe", url: "/facility/deluxe" },
    { id: 12, name: "Physiotherapy", url: "/facility/physiotherapy" },
    { id: 13, name: "Canteen", url: "/facility/canteen" },
  ];

  // Quick facilities overview data
  const quickFacilitiesData = [
    { id: 1, text: "24/7 Emergency & ICU Services" },
    { id: 2, text: "Advanced Diagnostic Services" },
    { id: 3, text: "Multiple Accommodation Options" },
    { id: 4, text: "Rehabilitation Services" },
  ];

  // Breadcrumb data

  // Icon mapping function
  const getIcon = (iconName) => {
    const iconMap = {
      Heart: <Heart className="w-6 h-6" />,
      Shield: <Shield className="w-6 h-6" />,
      Activity: <Activity className="w-6 h-6" />,
      Waves: <Waves className="w-6 h-6" />,
      Truck: <Truck className="w-6 h-6" />,
      Camera: <Camera className="w-6 h-6" />,
      FlaskConical: <FlaskConical className="w-6 h-6" />,
      Bed: <Bed className="w-6 h-6" />,
      Building2: <Building2 className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />,
      Utensils: <Utensils className="w-6 h-6" />,
    };
    return iconMap[iconName] || <Activity className="w-6 h-6" />;
  };

  // useEffect to dynamically load first index data
  // useEffect(() => {
  //   const loadFeaturedFacility = () => {
  //     setLoading(true);

  //     // Simulate API call or data loading
  //     setTimeout(() => {
  //       // console.log("params url", params.name);

  //       const matchedService = facilitiesData.find((e) => {
  //         return e.url === params.name;
  //       });

  //       // If match found, load that, else default to first
  //       if (matchedService && matchedService.detailedData) {
  //         setFeaturedFacility(matchedService.detailedData);
  //       } else {
  //         setFeaturedFacility(facilitiesData[0].detailedData);
  //       }

  //       // Get first index (0) facility data
  //       // const firstFacility = facilitiesData[0];
  //       // if (firstFacility && firstFacility.detailedData) {
  //       //   setFeaturedFacility(firstFacility.detailedData);
  //       // }
  //       setLoading(false);
  //     }, 500); // Simulate loading delay
  //   };

  //   loadFeaturedFacility();
  // }, []);

  const handleMore = (data) => {
    navigate(`${data?.url}`);
  };

  useEffect(() => {
    const matchedService = facilitiesData.find((e) => {
      return e.url === name;
    });

    console.log(matchedService);

    // If match found, load that, else default to first
    if (matchedService && matchedService.detailedData) {
      setFeaturedFacility(matchedService.detailedData);
    } else {
      setFeaturedFacility(facilitiesData[0].detailedData);
    }
    // console.log(featuredFacility);
  }, [name]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Facility' },
  ];

  return (
    <div className=" bg-gray-50">
      <BreadCrumb items={breadcrumbItems} title=" Facilities" />

    
      <div className="container lg:px-12 px-2 sm:px-6 md:px-8  mx-auto  py-2   ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Facility Card */}
            {loading ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ) : featuredFacility ? (
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="py-8 px-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="lg:text-2xl text-md font-bold text-gray-800">
                          {featuredFacility.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {featuredFacility.shortDescription}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Equipment Card */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">🏥</span>
                        <h4 className="font-semibold text-gray-800">
                          Equipment
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {featuredFacility.equipment.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">{item.name}</span>
                            <span className="font-bold text-orange-600">
                              {item.count}
                            </span>
                          </div>
                        ))}
                        {featuredFacility.equipment.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{featuredFacility.equipment.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Staff Card */}
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">👨‍⚕️</span>
                        <h4 className="font-semibold text-gray-800">Staff</h4>
                      </div>
                      <div className="space-y-1">
                        {featuredFacility.staff.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">{item.role}</span>
                            <span className="font-bold text-teal-600">
                              {item.count}
                            </span>
                          </div>
                        ))}
                        {featuredFacility.staff.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{featuredFacility.staff.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Services Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">🔬</span>
                        <h4 className="font-semibold text-gray-800">
                          Services
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {featuredFacility.services.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center text-sm"
                          >
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                item.available ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-gray-600 text-xs">
                              {item.service}
                            </span>
                          </div>
                        ))}
                        {featuredFacility.services.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{featuredFacility.services.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">✨</span>
                        <h4 className="font-semibold text-gray-800">
                          Features
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {featuredFacility.features.slice(0, 2).map((item) => (
                          <div key={item.id} className="text-xs text-gray-700">
                            {item.feature}
                          </div>
                        ))}
                        {featuredFacility.features.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{featuredFacility.features.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center group">
                    View Complete Details
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button> */}
                </div>
              </div>
            ) : null}

            {/* All Facilities Section */}
            <div className="bg-white rounded-2xl shadow-xl py-8 lg:px-4 px-2">
              <div className="flex items-center mb-2">
                <h2 className="lg:text-3xl text-shadow-md text-xl md:text-2xl font-bold text-gray-800">
                  Our Medical Facilities
                </h2>
              </div>

              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                Discover our comprehensive range of medical facilities, each
                designed with cutting-edge technology and staffed by expert
                healthcare professionals to ensure the highest quality of care.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {facilitiesData.map((facility) => (
                  <div
                    key={facility.id}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl px-2 py-2 border shadow-lg border-teal-200 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => console.log(`Navigate to: ${facility.url}`)}
                  >
                    <div className="flex items-start ">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="md:text-xl  text-md  font-bold text-gray-900 transition-colors">
                            {facility.title}
                          </h3>
                          {facility.detailedData && (
                            <div className="flex space-x-2">
                              {/* <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                {facility.detailedData.capacity}
                              </span> */}
                              {/* <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                {facility.detailedData.availability}
                              </span> */}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-0">
                          {facility.description}
                        </p>

                        {/* <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-teal-400 rounded-full mr-1"></span>
                              Active 24/7
                            </span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 mr-1" />
                              Premium Care
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-2 lg:px-4 px-2 ">
            {/* Specialties Card */}
            <div className="bg-white rounded-2xl shadow-xl p-2 ">
              <div className="flex items-center mb-3">
                <h3 className="text-xl font-bold text-gray-800">
                  Our Facility
                </h3>
              </div>
              <div className="space-y-2">
                {specialtiesData.map((specialty) => (
                  <div
                    key={specialty.id}
                    className="group flex items-center cursor-pointer justify-between px-3 py-3 text-gray-700 bg-gradient-to-r from-teal-50 to-blue-50 hover:text-teal-700 rounded-lg transition-all duration-200"
                    onClick={() => {
                      handleMore(specialty);
                    }}
                  >
                    <span className="font-medium">{specialty.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-blue-800 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-3">
                  Need Medical Assistance?
                </h3>
                <p className="text-teal-100 mb-6 leading-relaxed">
                  Our expert medical team is available 24/7 to provide you with
                  the best healthcare services.
                </p>
                <Link
                  to="/book-appointment"
                  className="w-full bg-white text-teal-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group mb-4 transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
                <div className="flex items-center text-teal-100">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Lucknow, Uttar Pradesh</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-white/20 rounded-lg mr-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Emergency Contact</h3>
              </div>
              <p className="text-red-100 text-sm mb-4">
                For immediate medical assistance
              </p>
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4">
  <a
    href="tel:+918303212210"
    className="sora-400 text-white font-semibold text-xl 
               hover:text-teal-300 hover:underline 
               transition-all duration-300 ease-in-out"
  >
    +91-83032 12210
  </a>

  <div className="p-2 bg-white/20 rounded-lg hover:bg-teal-500/30 transition-colors duration-300">
    <Phone className="w-5 h-5 text-white" />
  </div>
</div>

            </div>

            {/* Quick Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Quick Overview
              </h3>
              <div className="space-y-3">
                {quickFacilitiesData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center text-blue-700 bg-white/50 rounded-lg py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesComponent;
