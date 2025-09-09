import React, { useEffect, useState } from 'react';
import {
  Bone, Phone, Activity, CheckCircle, AlertTriangle, Shield,
  Star, MapPin, Clock, Stethoscope, Award, Users,
  Microscope, Heart, MessageCircle, Target
} from 'lucide-react';

import BreadCrumbs from '../../components/Breadcums';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServiceBreadcums from './ServiceBrad';

import cardiology from '../../assets/service-breas/Cardiology.jpg'
import Dental from '../../assets/service-breas/Dental.jpg'
import Dermatology from '../../assets/service-breas/Dermatology.jpg'
import Doctos from '../../assets/service-breas/Doctors.jpg'
import Enderinology from '../../assets/service-breas/Endoerinology.jpg'
import gasterology from '../../assets/service-breas/Gastrology.jpg'
import general from '../../assets/service-breas/General.jpg'
import generalmedicine from '../../assets/service-breas/generalmedcine.jpg'
import hematology from '../../assets/service-breas/Hematology.jpg'
import icu from '../../assets/service-breas/icu.jpg'
import nephrology from '../../assets/service-breas/Nephrology.jpg'
// import neurology from '../../assets/service-breas/neurology.jpg'
import obsetric from '../../assets/service-breas/obsertic.jpg'
import oncology from '../../assets/service-breas/Oncology.jpg'
import ophthalmology from '../../assets/service-breas/Ophthalmology.jpg'
import Orthopedics from '../../assets/service-breas/Orthopedics.jpg'
import pediatrics from '../../assets/service-breas/Pediatrics.jpg'
import psychaitry from '../../assets/service-breas/Psychiatry.jpg'
import pulmonology from '../../assets/service-breas/Pulmonology.jpg'
import rheumatology from '../../assets/service-breas/Rheumatology.jpg'
import urology from '../../assets/service-breas/Urology.jpg'







const OrthopaedicDepartment = () => {
  const primaryColor = "#18978d";
  const secondaryColor = "#ed8022";

  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate()

  const tabs = [];

  const caseStats = [
    {
      count: '5000+',
      title: 'Successful Surgeries',
      description: 'Complex joint replacements, fracture repairs, and spine surgeries completed with excellent outcomes'
    },
    {
      count: '15+',
      title: 'Years Experience',
      description: 'Decades of combined expertise in orthopaedic care and surgical excellence'
    },
    {
      count: '24/7',
      title: 'Emergency Care',
      description: 'Round-the-clock availability for urgent orthopaedic emergencies and trauma cases'
    },
    {
      count: '98%',
      title: 'Patient Satisfaction',
      description: 'High success rates and positive patient outcomes across all treatment categories'
    }
  ];

  const conditionsTreated = [
    'Osteoarthritis & Rheumatoid Arthritis – pain, stiffness, joint deformity',
    'Fractures & Dislocations – from simple to complex injuries',
    'Ligament & Meniscus Tears – e.g., ACL, PCL, rotator tears',
    'Sports Injuries – knee, shoulder, ankle injuries in active patients',
    'Back Pain & Sciatica – due to muscle strain or spinal issues',
    'Herniated & Slipped Discs – causing nerve compression',
    'Spine Deformities – scoliosis, kyphosis in adults and children',
    'Frozen Shoulder & Tennis Elbow – repetitive stress conditions',
    'Osteomyelitis – bone infections',
    'Pediatric Orthopaedics – congenital and growth‑related issues'
  ];

  const procedures = [
    {
      name: 'Arthroscopy (knee, shoulder, ankle)',
      description: 'Minimally invasive for diagnostics & repair'
    },
    {
      name: 'Total Joint Replacement (hip, knee)',
      description: 'Restoring mobility and pain relief'
    },
    {
      name: 'Fracture Fixation',
      description: 'Plate, rod or screw stabilization'
    },
    {
      name: 'Ligament Reconstruction',
      description: 'ACL/PCL or rotator cuff repairs'
    },
    {
      name: 'Spinal Fusion & Disc Replacement',
      description: 'Correcting deformities, relieving nerve pressure'
    },
    {
      name: 'Tendon Repair & Realignment',
      description: 'For muscle/structure support'
    },
    {
      name: 'Bone Biopsy & Tumor Removal',
      description: 'Diagnostic and therapeutic surgeries'
    }
  ];

  const treatments = [
    {
      title: 'Medication & Pain Management',
      description: 'Anti-inflammatories, analgesics for comprehensive pain control'
    },
    {
      title: 'Physiotherapy & Personalized Rehab',
      description: 'Full recovery plans tailored to individual patient needs'
    },
    {
      title: 'Corticosteroid Injections & Visco-supplementation',
      description: 'Targeted treatments for joint inflammation and lubrication'
    },
    {
      title: 'PRP (Platelet-Rich Plasma) Therapy',
      description: 'Regenerative approach using the body\'s natural healing factors'
    },
    {
      title: 'Orthotic Supports & Mobility Aids',
      description: 'Braces, walkers, and supportive devices for enhanced mobility'
    },
    {
      title: 'Lifestyle Counseling',
      description: 'Posture, diet, exercise guidance for long-term wellness'
    }
  ];

  const symptoms = [
    {
      text: 'Persistent or deep-seated joint/bone pain',
      severity: 'high'
    },
    {
      text: 'Swelling, redness, or restricted motion',
      severity: 'medium'
    },
    {
      text: 'Difficulty walking, climbing stairs, or weight-bearing',
      severity: 'high'
    },
    {
      text: 'Audible "popping" sounds or grinding sensation',
      severity: 'medium'
    },
    {
      text: 'Radiating back or limb pain',
      severity: 'high'
    },
    {
      text: 'Visible deformities or bone protrusions',
      severity: 'high'
    },
    {
      text: 'Recurrent bone/joint infections or weakness',
      severity: 'high'
    }
  ];

  const sideEffects = [
    {
      text: 'Post-op pain, swelling, bruising (managed medically)',
      risk: 'expected'
    },
    {
      text: 'Infection or bleeding – rare, treated promptly',
      risk: 'rare'
    },
    {
      text: 'Stiffness or reduced flexibility – improved with PT',
      risk: 'common'
    },
    {
      text: 'Anesthesia after-effects – fatigue, nausea',
      risk: 'expected'
    },
    {
      text: 'Blood clots – minimized with early movement and prophylaxis',
      risk: 'rare'
    },
    {
      text: 'Physical therapy requirement – for optimizing outcomes',
      risk: 'expected'
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Expert Surgeons & Staff',
      description: 'Years of orthopaedic expertise with proven track record'
    },
    {
      icon: Microscope,
      title: 'Cutting-Edge Facilities',
      description: 'Digital imaging, smart OTs and latest medical technology'
    },
    {
      icon: Clock,
      title: 'Timely Emergency Response',
      description: '24/7 care & stable transfers for urgent cases'
    },
    {
      icon: Heart,
      title: 'Personalized Care Plans',
      description: 'Treatment designed around your specific needs'
    },
    {
      icon: MessageCircle,
      title: 'Transparent Communication',
      description: 'Clear costs, realistic expectations, honest guidance'
    },
    {
      icon: Target,
      title: 'Holistic Approach',
      description: 'Physical, psychological, and lifestyle recovery focus'
    }
  ];

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
    "Hematology",
    "Pulmonology",
    "Dermatology",
    "Psychiatry",
    "Cardiology",
    "Oncology",
    "ICU and Critical Care",
    "Rheumatology",
    "Endocrinology"
  ];


  // const breadcrumbItems = [
  //   { label: 'Home', href: '/' },
  //   { label: 'Department' },
  //   { label: 'orthopaedic' }
  // ];

  const serviceDetails = [
    {
      departmentTitle: "Orthopedic Surgery Department",
      subtitle: "Advanced Bone & Joint Care",
      heroDescription: "Our orthopedic department provides comprehensive care for all musculoskeletal conditions with state-of-the-art facilities and experienced surgeons dedicated to helping you regain mobility and live pain-free.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "With over 15 years of specialized experience in orthopedic care, our team has successfully treated thousands of patients with various bone and joint conditions.",
      successRateTitle: "High Success Rate",
      successRateDesc: "Our advanced surgical techniques and comprehensive rehabilitation programs have achieved a 95% patient satisfaction rate with excellent long-term outcomes.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We specialize in treating a wide range of orthopedic conditions from simple fractures to complex joint replacements.",
      proceduresTitle: "Procedures & Surgeries",
      proceduresDesc: "Our surgical team performs various advanced procedures using minimally invasive techniques whenever possible.",
      rehabTitle: "Treatment & Rehabilitation",
      rehabDesc: "Comprehensive rehabilitation programs designed to restore function and prevent future injuries.",
      symptomsTitle: "Symptoms to Watch Out For",
      symptomsDesc: "Early detection and treatment of these symptoms can prevent more serious complications.",
      sideEffectsTitle: "Potential Side Effects",
      sideEffectsDesc: "Understanding potential side effects helps in making informed treatment decisions.",
      image: Orthopedics,
      caseStats: [
        {
          count: "5000+",
          title: "Successful Surgeries",
          description: "Complex orthopedic surgeries performed with excellent outcomes"
        },
        {
          count: "98%",
          title: "Patient Satisfaction",
          description: "Patients report high satisfaction with treatment and care quality"
        },
        {
          count: "15+",
          title: "Years Experience",
          description: "Dedicated experience in orthopedic surgery and patient care"
        },
        {
          count: "24/7",
          title: "Emergency Care",
          description: "Round-the-clock emergency orthopedic care available"
        }
      ],
      conditionsTreated: [
        "Arthritis and Joint Pain",
        "Fractures and Trauma",
        "Sports Injuries",
        "Spine Disorders",
        "Joint Replacement Surgery",
        "Ligament and Tendon Injuries",
        "Bone Tumors",
        "Pediatric Orthopedic Conditions"
      ],
      procedures: [
        {
          name: "Total Knee Replacement",
          description: "Complete replacement of knee joint for severe arthritis or injury"
        },
        {
          name: "Hip Replacement Surgery",
          description: "Advanced hip joint replacement for improved mobility and pain relief"
        },
        {
          name: "Arthroscopic Surgery",
          description: "Minimally invasive procedure for joint problems using small incisions"
        },
        {
          name: "Spinal Fusion",
          description: "Surgical procedure to treat spinal instability and disc problems"
        },
        {
          name: "ACL Reconstruction",
          description: "Surgical repair of torn anterior cruciate ligament in the knee"
        }
      ],
      treatments: [
        {
          title: "Physical Therapy",
          description: "Customized exercise programs to restore strength and mobility"
        },
        {
          title: "Pain Management",
          description: "Comprehensive pain control strategies including medications and injections"
        },
        {
          title: "Occupational Therapy",
          description: "Training to help patients return to daily activities and work"
        },
        {
          title: "Post-Surgical Care",
          description: "Specialized care and monitoring during recovery period"
        }
      ],
      symptoms: [
        { text: "Persistent joint pain lasting more than a few days" },
        { text: "Swelling, redness, or warmth around joints" },
        { text: "Limited range of motion or stiffness" },
        { text: "Difficulty bearing weight or walking" },
        { text: "Numbness or tingling in extremities" },
        { text: "Visible deformity after injury" }
      ],
      sideEffects: [
        { text: "Temporary pain and swelling at surgical site" },
        { text: "Risk of infection (less than 1% with proper care)" },
        { text: "Blood clots in rare cases" },
        { text: "Temporary stiffness during recovery" },
        { text: "Possible need for revision surgery in future" }
      ],
      url: "orthopaedics"
    },
    {
      departmentTitle: "Ophthalmology at Ashaali Hospital",
      subtitle: "Expert Eye Care for Clearer Vision and Healthier Lives",
      heroDescription: "Our Ophthalmology Department offers advanced diagnosis, treatment, and surgical care for a full range of eye disorders. With cutting-edge equipment and a skilled team of eye specialists, we provide personalized care — from routine eye exams to complex surgeries — to protect and restore your vision at every stage of life.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "With experienced ophthalmologists and retina specialists, we use advanced laser and microsurgical facilities to provide comprehensive eye care for all ages.",
      successRateTitle: "Why Choose Ashaali Hospital for Eye Care?",
      successRateDesc: "Advanced Laser & Microsurgical Facilities with Pediatric & Geriatric Eye Care Available, On-site Optical & Diagnostic Lab, Quick Appointments & Minimal Waiting Time, and Transparent Consultation and Post-care Guidance.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We manage both common and serious eye conditions, including:",
      proceduresTitle: "Surgeries & Treatments Offered",
      proceduresDesc: "Our eye specialists are skilled in both laser-based and conventional surgical procedures:",
      rehabTitle: "Diagnostic Tools & Procedures",
      rehabDesc: "We use modern diagnostic technologies to detect problems early and provide precise care:",
      symptomsTitle: "Common Symptoms to Watch",
      symptomsDesc: "Seek an ophthalmologist if you notice:",
      sideEffectsTitle: "Possible Side Effects of Eye Treatments/Surgery",
      sideEffectsDesc: "Most treatments are safe, but potential side effects may include:",
      image: ophthalmology,
      caseStats: [
        {
          count: "10,000+",
          title: "Eye Surgeries",
          description: "Successful cataract, LASIK and other eye surgeries performed"
        },
        {
          count: "99%",
          title: "Success Rate",
          description: "High success rate in vision restoration and eye treatments"
        },
        {
          count: "20+",
          title: "Years Experience",
          description: "Experienced ophthalmologists and retina specialists"
        },
        {
          count: "24/7",
          title: "Emergency Care",
          description: "Round-the-clock emergency eye care available"
        }
      ],
      conditionsTreated: [
        "Cataracts – Cloudy vision due to lens opacification",
        "Glaucoma – Increased eye pressure damaging the optic nerve",
        "Refractive Errors – Myopia, Hyperopia, Astigmatism, Presbyopia",
        "Diabetic Retinopathy – Vision issues from diabetes-related damage",
        "Macular Degeneration – Loss of central vision, common in aging",
        "Dry Eye Syndrome – Irritation due to poor tear production",
        "Conjunctivitis (Pink Eye) – Allergic, viral, or bacterial infections",
        "Keratoconus – Thinning of the cornea",
        "Squint & Lazy Eye – Common in children, treated early",
        "Corneal Infections & Injuries"
      ],
      procedures: [
        {
          name: "Cataract Surgery (Phacoemulsification with IOL)",
          description: "Advanced cataract removal with intraocular lens implantation"
        },
        {
          name: "Lasik & Refractive Surgery",
          description: "Laser vision correction for refractive errors"
        },
        {
          name: "Glaucoma Surgery & Laser Trabeculoplasty",
          description: "Surgical and laser treatments to reduce eye pressure"
        },
        {
          name: "Vitrectomy",
          description: "Surgical procedure for retinal disorders and vitreous problems"
        },
        {
          name: "Squint Correction Surgery",
          description: "Surgical correction of eye alignment problems"
        },
        {
          name: "Corneal Transplant (Keratoplasty)",
          description: "Replacement of damaged corneal tissue"
        },
        {
          name: "Intravitreal Injections",
          description: "Treatment for Diabetic Retinopathy and AMD"
        },
        {
          name: "Eyelid & Tear Duct Surgeries",
          description: "Corrective surgeries for eyelid and tear duct problems"
        }
      ],
      treatments: [
        {
          title: "Slit Lamp Examination",
          description: "Detailed examination of eye structures using magnification"
        },
        {
          title: "OCT (Optical Coherence Tomography)",
          description: "Advanced imaging of retinal layers and optic nerve"
        },
        {
          title: "Visual Field Testing",
          description: "Assessment of peripheral vision and visual field defects"
        },
        {
          title: "Fundus Photography & Angiography",
          description: "Detailed imaging of retina and blood vessels"
        },
        {
          title: "Tonometry (Eye Pressure Check)",
          description: "Measurement of intraocular pressure for glaucoma screening"
        },
        {
          title: "Ultrasound B-scan",
          description: "Ultrasound imaging when direct visualization is not possible"
        }
      ],
      symptoms: [
        { text: "Blurred, double, or dim vision" },
        { text: "Sudden flashes or floaters" },
        { text: "Eye redness, discharge, or swelling" },
        { text: "Pain or pressure in or around the eyes" },
        { text: "Difficulty reading or seeing at night" },
        { text: "Sensitivity to light" },
        { text: "Watering or dryness in eyes" },
        { text: "Eye strain or headaches" }
      ],
      sideEffects: [
        { text: "Mild irritation or dryness after eye drops" },
        { text: "Blurred vision temporarily post-surgery" },
        { text: "Sensitivity to light for a few days" },
        { text: "Rare risks of infection, bleeding, or intraocular pressure rise" },
        { text: "Need for glasses or re-treatment in some refractive cases" }
      ],
      url: "ophthalmology"
    },
    {
      departmentTitle: "Pediatrics & Neonatology Department",
      subtitle: "Compassionate, Specialized Care for Newborns, Infants & Children",
      heroDescription: "At Ashaali Hospital, our Pediatrics & Neonatology Department is dedicated to the health and development of children — from birth through adolescence. We offer comprehensive care for newborns, infants, toddlers, and teens with a focus on prevention, early diagnosis, and personalized treatment.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "Our expert pediatricians, neonatologists, and nursing staff create a nurturing, child-friendly environment to make each visit stress-free and safe with years of specialized experience in child healthcare.",
      successRateTitle: "Family-Centered Care",
      successRateDesc: "Our parent-inclusive, family-centered care approach ensures comprehensive support for both children and parents throughout the treatment journey with round-the-clock emergency pediatric care.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We manage a wide range of acute and chronic conditions in children from newborn complications to developmental disorders.",
      proceduresTitle: "Services & Facilities",
      proceduresDesc: "Our pediatric and neonatal care includes preventive, diagnostic, and intensive support with advanced life-saving equipment.",
      rehabTitle: "Treatment & Support",
      rehabDesc: "Comprehensive care programs including nutritional counseling, growth monitoring, and parental support services.",
      symptomsTitle: "Symptoms to Watch in Children",
      symptomsDesc: "Parents should consult a pediatrician if their child shows any of these warning signs for early intervention.",
      sideEffectsTitle: "Possible Side Effects",
      sideEffectsDesc: "While most pediatric treatments are safe, understanding potential mild and temporary effects helps parents make informed decisions.",
      image: pediatrics,
      caseStats: [
        {
          count: "24/7",
          title: "Emergency Care",
          description: "Round-the-clock emergency pediatric care available"
        },
        {
          count: "100%",
          title: "Family-Centered",
          description: "Parent-inclusive care approach for comprehensive support"
        },
        {
          count: "NICU/PICU",
          title: "Advanced Units",
          description: "Specialized intensive care units for critical newborn and pediatric care"
        },
        {
          count: "Full",
          title: "Vaccination Program",
          description: "Complete immunization services as per IAP schedule"
        }
      ],
      conditionsTreated: [
        "Newborn complications (Prematurity, low birth weight, birth asphyxia)",
        "Respiratory issues (Asthma, bronchiolitis, pneumonia)",
        "Infections (Fever, flu, ear infections, gastroenteritis)",
        "Growth and nutrition disorders (Malnutrition, obesity, anemia)",
        "Developmental delays (Speech, motor skills, autism spectrum disorders)",
        "Pediatric jaundice (Especially in newborns)",
        "Seizures and neurological disorders",
        "Congenital abnormalities (Heart defects, metabolic disorders)",
        "Allergies & Skin issues (Eczema, food allergies)"
      ],
      procedures: [
        {
          name: "NICU Care",
          description: "Neonatal Intensive Care Unit for critical newborn care and life support"
        },
        {
          name: "PICU Care",
          description: "Pediatric Intensive Care Unit for emergency and life-threatening conditions"
        },
        {
          name: "Phototherapy",
          description: "Specialized light treatment for neonatal jaundice management"
        },
        {
          name: "Newborn Screening",
          description: "Comprehensive genetic testing and health screening for newborns"
        },
        {
          name: "Vaccination Programs",
          description: "Complete immunization services following IAP schedule guidelines"
        }
      ],
      treatments: [
        {
          title: "Well-baby Clinics",
          description: "Routine checkups and health monitoring for healthy child development"
        },
        {
          title: "Nutritional Counseling",
          description: "Growth monitoring and dietary guidance for optimal child nutrition"
        },
        {
          title: "Parental Support",
          description: "Counseling and breastfeeding support for new parents"
        },
        {
          title: "Developmental Tracking",
          description: "Child growth and development monitoring with early intervention"
        }
      ],
      symptoms: [
        { text: "Persistent fever or cough in children" },
        { text: "Poor feeding or unexplained weight loss" },
        { text: "Lethargy, drowsiness, or excessive crying" },
        { text: "Breathing difficulty or respiratory distress" },
        { text: "Vomiting or persistent diarrhea" },
        { text: "Skin rashes, swelling, or unusual behavior" },
        { text: "Developmental or speech delays" },
        { text: "Yellowing of skin or eyes in newborns" }
      ],
      sideEffects: [
        { text: "Low-grade fever or soreness after vaccination" },
        { text: "Mild diarrhea or nausea with antibiotics" },
        { text: "Temporary fussiness or drowsiness" },
        { text: "Rare allergic reactions (monitored and treated quickly)" },
        { text: "Temporary discomfort during medical procedures" }
      ],
      url: "pediatrics"
    },
    {
      departmentTitle: "Neurology Department",
      subtitle: "Expert Care for Brain, Spine & Nervous System Disorders",
      heroDescription: "At Ashaali Hospital, our Neurology Department offers advanced care for diseases affecting the brain, spinal cord, nerves, and muscles. Our team of neurologists, neurophysicians, and rehabilitation experts use state-of-the-art diagnostics and treatment protocols to provide accurate diagnosis, early intervention, and long-term management of neurological conditions.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "Our experienced neurologists and neuro-specialists provide comprehensive care from common issues like headaches to complex disorders like epilepsy or stroke with advanced diagnostic capabilities.",
      successRateTitle: "Advanced Neurological Care",
      successRateDesc: "Our integrated approach combining advanced diagnostics, specialized treatment protocols, and neuro-rehabilitation services ensures optimal patient outcomes with 24/7 emergency stroke response.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We manage a broad range of neurological disorders affecting the brain, spinal cord, nerves, and muscles with personalized treatment approaches.",
      proceduresTitle: "Diagnostic & Treatment Services",
      proceduresDesc: "We use advanced technology and medical expertise to ensure early diagnosis and personalized treatment with state-of-the-art neurological equipment.",
      rehabTitle: "Treatment & Rehabilitation",
      rehabDesc: "Comprehensive neuro-rehabilitation services and medication management for chronic neurological conditions with integrated support services.",
      symptomsTitle: "Common Symptoms That Need Neurological Attention",
      symptomsDesc: "Please consult a neurologist if you or a loved one experience any of these neurological warning signs for immediate evaluation.",
      sideEffectsTitle: "Possible Side Effects of Neurological Treatment",
      sideEffectsDesc: "Most treatments are safe and managed by specialists. Understanding potential side effects helps in comprehensive patient care and management.",
      // image: neurology,
      caseStats: [
        {
          count: "24/7",
          title: "Stroke Response",
          description: "Emergency stroke response team available round-the-clock"
        },
        {
          count: "Advanced",
          title: "Diagnostic Lab",
          description: "State-of-the-art brain and nerve diagnostic laboratory"
        },
        {
          count: "Comprehensive",
          title: "Epilepsy Care",
          description: "Complete epilepsy and Parkinson's disease management"
        },
        {
          count: "Integrated",
          title: "Neuro-Rehab",
          description: "Comprehensive neuro-rehabilitation and recovery services"
        }
      ],
      conditionsTreated: [
        "Stroke (Ischemic & Hemorrhagic)",
        "Epilepsy & Seizure Disorders",
        "Migraine & Chronic Headache",
        "Parkinson's Disease",
        "Multiple Sclerosis (MS)",
        "Neuropathy & Nerve Pain",
        "Brain Infections (Meningitis, Encephalitis)",
        "Movement Disorders & Tremors",
        "Vertigo, Dizziness & Balance Issues",
        "Memory Disorders (Dementia, Alzheimer's)",
        "Muscle Weakness & Myopathies",
        "Spinal Cord Disorders & Paralysis"
      ],
      procedures: [
        {
          name: "EEG (Electroencephalogram)",
          description: "Advanced brain wave monitoring for seizure activity and neurological assessment"
        },
        {
          name: "EMG/NCS Testing",
          description: "Electromyography and nerve conduction studies for muscle and nerve function evaluation"
        },
        {
          name: "MRI & CT Brain/Spine Scans",
          description: "High-resolution imaging for detailed brain and spinal cord assessment"
        },
        {
          name: "Carotid Doppler & Brain Angiography",
          description: "Vascular imaging to assess blood flow and detect blockages"
        },
        {
          name: "Botox Therapy",
          description: "Specialized treatment for migraine prevention and muscle spasm management"
        }
      ],
      treatments: [
        {
          title: "Stroke Rehabilitation",
          description: "Comprehensive stroke recovery programs and neuro-rehabilitation services"
        },
        {
          title: "Medication Management",
          description: "Personalized medication protocols for chronic neurological conditions"
        },
        {
          title: "Spinal Tap/Lumbar Puncture",
          description: "Diagnostic procedures for neurological condition assessment"
        },
        {
          title: "Counseling & Support",
          description: "Psychological support and counseling for neurological disorder management"
        }
      ],
      symptoms: [
        { text: "Sudden weakness or numbness on one side of the body" },
        { text: "Severe or recurring headaches" },
        { text: "Loss of consciousness or seizures" },
        { text: "Difficulty speaking, walking, or maintaining balance" },
        { text: "Persistent dizziness or vision problems" },
        { text: "Memory loss or confusion" },
        { text: "Involuntary movements or tremors" },
        { text: "Tingling, burning, or nerve pain in limbs" },
        { text: "Slurred speech or facial drooping" }
      ],
      sideEffects: [
        { text: "Drowsiness, nausea, or dizziness from medications" },
        { text: "Fatigue or muscle soreness after neuro-rehab sessions" },
        { text: "Temporary weakness post-stroke therapy" },
        { text: "Allergic reactions to medications (rare)" },
        { text: "Psychological effects (anxiety, depression) in chronic conditions" }
      ],
      url: "neurology"
    },
    {
      departmentTitle: "Gastroenterology Department",
      subtitle: "Comprehensive Care for Digestive Health, from Diagnosis to Recovery",
      heroDescription: "At Ashaali Hospital, our Gastroenterology Department specializes in the diagnosis, treatment, and long-term management of diseases related to the digestive system. Our expert gastroenterologists use state-of-the-art technology and minimally invasive techniques to ensure safe, effective, and comfortable care for lasting relief and better gut health.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "Our skilled gastroenterologists and liver specialists focus not just on treating symptoms but identifying root causes with advanced endoscopy and diagnostic capabilities for comprehensive digestive care.",
      successRateTitle: "Advanced Digestive Care",
      successRateDesc: "Our integrated approach combining medical, surgical, and nutritional support with in-house endoscopy and advanced screening ensures optimal digestive wellness and patient outcomes.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We provide expert care for a wide range of digestive and gastrointestinal conditions from common stomach discomforts to complex liver and pancreatic disorders.",
      proceduresTitle: "Diagnostic & Endoscopy Services",
      proceduresDesc: "Our department is equipped with advanced tools for early and accurate diagnosis including state-of-the-art endoscopy and imaging facilities.",
      rehabTitle: "Treatments & Procedures",
      rehabDesc: "We offer both medical and minimally invasive treatment options with diet counseling and long-term digestive wellness management programs.",
      symptomsTitle: "Symptoms That Need Gastro Care",
      symptomsDesc: "See a gastroenterologist if you have any of these digestive symptoms for comprehensive evaluation and specialized treatment.",
      sideEffectsTitle: "Possible Side Effects of GI Treatments",
      sideEffectsDesc: "While treatments are generally safe and well-tolerated, some mild side effects may occur and are carefully monitored by our specialists.",
      image: gasterology,
      caseStats: [
        {
          count: "In-House",
          title: "Endoscopy Unit",
          description: "Advanced endoscopy, colonoscopy and fibroscan facilities"
        },
        {
          count: "Minimal",
          title: "Wait Times",
          description: "Quick appointments and rapid test report delivery"
        },
        {
          count: "Advanced",
          title: "Cancer Screening",
          description: "Comprehensive screening for liver, stomach and colon cancers"
        },
        {
          count: "Integrated",
          title: "Support",
          description: "Medical, surgical and nutritional support services"
        }
      ],
      conditionsTreated: [
        "Acidity, Gas, and Bloating",
        "Gastritis & Peptic Ulcers",
        "GERD (Acid Reflux / Heartburn)",
        "Irritable Bowel Syndrome (IBS)",
        "Inflammatory Bowel Disease (IBD) – Ulcerative Colitis, Crohn's",
        "Hepatitis (A, B, C) & Other Liver Diseases",
        "Fatty Liver & Cirrhosis",
        "Gallbladder Stones & Inflammation",
        "Pancreatitis (Acute/Chronic)",
        "Constipation & Diarrhea",
        "Swallowing Difficulties (Dysphagia)",
        "Digestive Tract Infections & Parasitic Diseases",
        "Cancers of the Stomach, Colon, Liver, Pancreas"
      ],
      procedures: [
        {
          name: "Upper GI Endoscopy (OGD)",
          description: "Advanced visualization of upper digestive tract for diagnosis and treatment"
        },
        {
          name: "Colonoscopy & Biopsy",
          description: "Comprehensive colon examination with tissue sampling for accurate diagnosis"
        },
        {
          name: "ERCP",
          description: "Endoscopic Retrograde Cholangiopancreatography for bile duct and pancreatic evaluation"
        },
        {
          name: "Fibroscan",
          description: "Non-invasive liver stiffness assessment for liver disease evaluation"
        },
        {
          name: "Abdominal Imaging",
          description: "Ultrasound, CT scan, and MRI for comprehensive digestive system evaluation"
        }
      ],
      treatments: [
        {
          title: "Endoscopic Procedures",
          description: "Minimally invasive endoscopic polyp removal and bleeding ulcer management"
        },
        {
          title: "Liver Disease Management",
          description: "Treatment of liver cirrhosis, portal hypertension, and viral hepatitis"
        },
        {
          title: "Diet Counseling",
          description: "Specialized nutritional guidance for digestive health and wellness"
        },
        {
          title: "Therapeutic ERCP",
          description: "Advanced stone and blockage removal procedures for bile duct disorders"
        }
      ],
      symptoms: [
        { text: "Persistent acidity or heartburn" },
        { text: "Abdominal pain, cramps, or bloating" },
        { text: "Blood in vomit or stool" },
        { text: "Jaundice (yellow eyes/skin)" },
        { text: "Unexplained weight loss or fatigue" },
        { text: "Frequent indigestion or nausea" },
        { text: "Changes in bowel habits (constipation/diarrhea)" },
        { text: "Difficulty swallowing or feeling of fullness" },
        { text: "Gas or flatulence not relieved by home remedies" }
      ],
      sideEffects: [
        { text: "Nausea or dizziness from acid-suppressing drugs" },
        { text: "Mild bloating after endoscopy/colonoscopy" },
        { text: "Allergic reaction to contrast during scans (rare)" },
        { text: "Temporary change in bowel habits post-procedure" },
        { text: "Post-procedure soreness or sedation-related tiredness" }
      ],
      url: "gastrology"
    },
    {
      departmentTitle: "General Surgery Department",
      subtitle: "Safe, Skilled, and Precise Surgical Care You Can Trust",
      heroDescription: "Ashaali Hospital's General Surgery Department provides expert surgical care for a wide range of conditions requiring operative intervention. Our experienced surgeons are trained in the latest techniques — including minimally invasive and laparoscopic methods — to ensure quicker recovery, less pain, and minimal scarring with surgical excellence.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "Our highly experienced and specialized surgical team delivers both elective and emergency surgical care with patient-first approach, focusing on advanced techniques and comprehensive post-operative care.",
      successRateTitle: "Surgical Excellence",
      successRateDesc: "Our modern operation theatres with advanced equipment and minimally invasive expertise ensure optimal surgical outcomes with quick admission-to-discharge process and comprehensive patient care.",
      conditionsTitle: "Conditions We Treat & Surgeries Offered",
      conditionsDesc: "We provide comprehensive surgical care for a wide range of conditions from routine procedures to complex surgeries using latest minimally invasive techniques.",
      proceduresTitle: "Surgical Facilities & Technologies",
      proceduresDesc: "Our operation theatres and surgical protocols follow the highest standards of safety and precision with state-of-the-art equipment and sterile protocols.",
      rehabTitle: "Treatment & Recovery",
      rehabDesc: "Advanced surgical techniques with comprehensive post-operative rehabilitation and recovery programs including day-care surgery options for faster discharge.",
      symptomsTitle: "Symptoms That May Require Surgical Evaluation",
      symptomsDesc: "You should consult a general surgeon if you notice any of these symptoms that may indicate need for surgical intervention.",
      sideEffectsTitle: "Possible Side Effects & Surgical Risks",
      sideEffectsDesc: "Our surgeries are performed with the highest safety standards, but as with any medical procedure, potential side effects are carefully monitored and managed.",
      image: general,
      caseStats: [
        {
          count: "Advanced",
          title: "OT Infrastructure",
          description: "Modern operation theatres with HEPA filters and sterile protocols"
        },
        {
          count: "Minimally Invasive",
          title: "Techniques",
          description: "Laparoscopic and endoscopic expertise for faster recovery"
        },
        {
          count: "Day-Care",
          title: "Surgery Options",
          description: "Quick admission-to-discharge process with same-day procedures"
        },
        {
          count: "24/7",
          title: "Emergency Care",
          description: "Round-the-clock emergency surgical services available"
        }
      ],
      conditionsTreated: [
        "Appendicitis – Laparoscopic Appendectomy",
        "Gallbladder Stones – Laparoscopic Cholecystectomy",
        "Hernias – Inguinal, Umbilical, Incisional (Open or Laparoscopic Repair)",
        "Piles, Fissures & Fistulas – Laser or Surgical Treatments",
        "Thyroid & Parathyroid Disorders – Surgical Removal",
        "Breast Lumps & Abscesses – FNAC, Biopsy, or Surgery",
        "Hydrocele & Varicocele – Surgical Correction",
        "Abdominal Masses & Tumors – Evaluation & Excision",
        "Trauma & Injury Repairs – Emergency Wound or Fracture Surgeries",
        "Minor Surgeries – Abscess drainage, cyst removal, wound suturing"
      ],
      procedures: [
        {
          name: "Laparoscopic Surgery",
          description: "Minimally invasive surgical techniques for faster recovery and minimal scarring"
        },
        {
          name: "Modular Operation Theatre",
          description: "State-of-the-art OT with HEPA filters and advanced sterile protocols"
        },
        {
          name: "Ultrasound & CT-Guided Procedures",
          description: "Image-guided biopsies and surgical interventions for precision"
        },
        {
          name: "Emergency Surgical Care",
          description: "24/7 trauma and emergency surgical services with ICU backup"
        },
        {
          name: "Endoscopic Procedures",
          description: "Advanced endoscopic equipment for diagnostic and therapeutic interventions"
        }
      ],
      treatments: [
        {
          title: "Pre-anesthesia Evaluation",
          description: "Comprehensive pre-operative assessment and anesthesia planning for safe surgery"
        },
        {
          title: "Post-Operative Care",
          description: "Dedicated recovery rooms with specialized monitoring and nursing care"
        },
        {
          title: "Pain Management",
          description: "Advanced pain control protocols for comfortable post-surgical recovery"
        },
        {
          title: "Wound Care & Follow-up",
          description: "Comprehensive wound management and post-operative follow-up care"
        }
      ],
      symptoms: [
        { text: "Severe abdominal pain or swelling" },
        { text: "Lump or bulge in abdomen or groin" },
        { text: "Recurrent vomiting with pain" },
        { text: "Bleeding per rectum (blood in stool)" },
        { text: "Persistent pus, abscess, or non-healing wound" },
        { text: "Changes in bowel or urinary habits" },
        { text: "Pain or swelling in the scrotum or breast" },
        { text: "Difficulty swallowing or persistent indigestion" },
        { text: "Unexplained weight loss with abdominal symptoms" }
      ],
      sideEffects: [
        { text: "Mild pain or swelling at incision site" },
        { text: "Risk of infection or delayed wound healing" },
        { text: "Bleeding or clot formation (rare)" },
        { text: "Anesthesia-related dizziness or nausea" },
        { text: "Scar formation or temporary restricted movement" },
        { text: "Need for follow-up or second-stage surgery (in select cases)" }
      ],
      url:"general-surgery"
    },
    {
      departmentTitle: "Obstetrics & Gynecology Department",
      subtitle: "Comprehensive Women's Health Care",
      heroDescription: "The Obstetrics & Gynecology Department at Ashaali Hospital is dedicated to the healthcare needs of women across all stages of life — from adolescence to menopause and beyond. Our team of skilled obstetricians and gynecologists provide expert care in pregnancy, childbirth, menstrual disorders, infertility, and all female reproductive health concerns.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "Our experienced team of female gynecologists and obstetricians provides comprehensive women's health care with a focus on personalized, respectful, and confidential treatment in a comfortable, safe, and modern environment.",
      successRateTitle: "High Success Rate",
      successRateDesc: "Our advanced medical facilities and women-centric approach ensure excellent outcomes for both routine and high-risk pregnancies, with comprehensive support from first period to motherhood and beyond.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We diagnose and treat a full spectrum of women's health issues across all stages of life.",
      proceduresTitle: "Services & Procedures Offered",
      proceduresDesc: "We provide both outpatient and surgical care, including obstetric and gynecological services.",
      rehabTitle: "Recovery & Postnatal Care",
      rehabDesc: "Comprehensive postnatal care and recovery support designed to ensure optimal health for mother and baby.",
      symptomsTitle: "Symptoms That Require Consultation",
      symptomsDesc: "These symptoms indicate you should see a gynecologist for proper evaluation and treatment.",
      sideEffectsTitle: "Possible Side Effects or Recovery Notes",
      sideEffectsDesc: "Most procedures are safe, but minor issues may occur during recovery.",
      image: obsetric,
      caseStats: [
        {
          count: "24/7",
          title: "Emergency Care",
          description: "Round-the-clock obstetric and gynecological emergency care available"
        },
        {
          count: "100%",
          title: "Women-Centric Care",
          description: "Confidential, respectful, and personalized approach to women's health"
        },
        {
          count: "Advanced",
          title: "Medical Facilities",
          description: "Fully equipped labor room, operation theaters, and NICU support"
        },
        {
          count: "Expert",
          title: "Medical Team",
          description: "Experienced female gynecologists and obstetricians"
        }
      ],
      conditionsTreated: [
        "High-risk & Low-risk Pregnancies",
        "Irregular Menstrual Cycles",
        "PCOS/PCOD (Polycystic Ovary Syndrome)",
        "Uterine Fibroids & Ovarian Cysts",
        "Pelvic Inflammatory Disease (PID)",
        "Infertility & Preconception Counseling",
        "Menopause-Related Issues",
        "Endometriosis & Painful Periods",
        "Vaginal Infections and Discharge",
        "Urinary Tract Infections (UTIs)",
        "Cervical Dysplasia & Cancer Screening"
      ],
      procedures: [
        {
          name: "Normal & Painless Delivery",
          description: "Comprehensive obstetric care for safe and comfortable childbirth experience"
        },
        {
          name: "C-Section (Cesarean Delivery)",
          description: "Advanced surgical delivery when medically necessary for mother and baby safety"
        },
        {
          name: "Laparoscopy & Hysteroscopy",
          description: "Minimally invasive procedures for diagnosis and treatment of gynecological conditions"
        },
        {
          name: "Hysterectomy",
          description: "Uterus removal surgery using open or laparoscopic techniques as required"
        },
        {
          name: "Ovarian Cystectomy & Fibroid Removal",
          description: "Surgical removal of ovarian cysts and uterine fibroids for improved health"
        }
      ],
      treatments: [
        {
          title: "Antenatal Care",
          description: "Comprehensive pregnancy checkups, scans, and monitoring for healthy pregnancy"
        },
        {
          title: "Postnatal Care",
          description: "Complete care for mother and baby including breastfeeding guidance and recovery support"
        },
        {
          title: "Infertility Treatment",
          description: "Specialized care and counseling for couples facing conception difficulties"
        },
        {
          title: "Menopause Management",
          description: "Comprehensive care for managing menopausal symptoms and hormonal changes"
        }
      ],
      symptoms: [
        { text: "Missed or irregular periods" },
        { text: "Heavy bleeding or spotting between periods" },
        { text: "Painful cramps or intercourse" },
        { text: "Vaginal discharge with odor or itching" },
        { text: "Pelvic or lower abdominal pain" },
        { text: "Difficulty conceiving or repeated miscarriages" },
        { text: "Breast lumps or nipple discharge" },
        { text: "Menopausal symptoms disrupting daily life" }
      ],
      sideEffects: [
        { text: "Mild abdominal cramping after ultrasound or D&C" },
        { text: "Slight bleeding post-biopsy procedures" },
        { text: "Temporary fatigue post-surgery or delivery" },
        { text: "Hormonal fluctuations during treatment" },
        { text: "Scar or soreness at incision sites (laparoscopic/open surgery)" }
      ],
      url: "obstetrics-&-gynaecology"
    },
    {
      departmentTitle: "Urology Department",
      subtitle: "Advanced Kidney, Bladder & Male Reproductive Health Care",
      heroDescription: "The Urology Department at Ashaali Hospital provides expert diagnosis, medical management, and surgical care for disorders affecting the urinary tract in both men and women, as well as the male reproductive system. Our experienced urologists use cutting-edge techniques, including minimally invasive and laser-assisted procedures, to deliver safe, effective, and comfortable treatments.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "Our experienced urologists and laser specialists provide comprehensive care using modern diagnostic tools and therapeutic procedures, with emphasis on precision and faster recovery through minimally invasive techniques.",
      successRateTitle: "High Success Rate",
      successRateDesc: "Our advanced endoscopic and laser-assisted procedures, combined with sterile OT protocols and comprehensive post-operative support, ensure excellent treatment outcomes and patient satisfaction.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We manage a wide range of urological conditions affecting the urinary tract and male reproductive system.",
      proceduresTitle: "Surgeries & Minimally Invasive Procedures",
      proceduresDesc: "We offer a full range of urologic surgeries with emphasis on precision, safety, and faster recovery.",
      rehabTitle: "Diagnostic & Treatment Services",
      rehabDesc: "Our department is equipped with modern diagnostic tools and comprehensive therapeutic procedures for optimal patient care.",
      symptomsTitle: "Symptoms That Need Urological Evaluation",
      symptomsDesc: "These symptoms indicate you should consult a urologist for proper evaluation and treatment.",
      sideEffectsTitle: "Possible Side Effects or Post-treatment Observations",
      sideEffectsDesc: "While treatments are generally safe, you may experience minor temporary effects during recovery.",
      image: urology,
      caseStats: [
        {
          count: "24/7",
          title: "Emergency Care",
          description: "Round-the-clock urological emergency care and support available"
        },
        {
          count: "Advanced",
          title: "Laser Technology",
          description: "State-of-the-art laser lithotripsy and minimally invasive procedures"
        },
        {
          count: "Expert",
          title: "Urologists",
          description: "Experienced urologists and laser specialists providing comprehensive care"
        },
        {
          count: "100%",
          title: "Patient Privacy",
          description: "Discreet, private, and patient-friendly consultations maintained"
        }
      ],
      conditionsTreated: [
        "Kidney Stones & Ureteric Stones",
        "Urinary Tract Infections (UTIs)",
        "Prostate Enlargement (BPH)",
        "Blood in Urine (Hematuria)",
        "Bladder Control Problems (Incontinence)",
        "Painful or Difficult Urination (Dysuria)",
        "Male Infertility & Erectile Dysfunction",
        "Hydrocele & Varicocele",
        "Urinary Obstruction & Retention",
        "Recurrent Urinary Infections in Women",
        "Cancers of Kidney, Bladder, Prostate & Testes"
      ],
      procedures: [
        {
          name: "URS (Ureteroscopy)",
          description: "Minimally invasive procedure for removing ureteric stones using advanced endoscopic techniques"
        },
        {
          name: "PCNL (Percutaneous Nephrolithotomy)",
          description: "Advanced surgical procedure for removing large kidney stones through small incisions"
        },
        {
          name: "TURP (Transurethral Resection of Prostate)",
          description: "Surgical treatment for prostate enlargement to improve urinary flow and symptoms"
        },
        {
          name: "Laser Lithotripsy",
          description: "Stone breaking procedure using laser technology without making external cuts"
        },
        {
          name: "Laparoscopic Nephrectomy",
          description: "Minimally invasive kidney surgery using laparoscopic techniques for faster recovery"
        }
      ],
      treatments: [
        {
          title: "Diagnostic Services",
          description: "Comprehensive diagnostic tools including ultrasound KUB, uroflowmetry, PSA tests, and urodynamic studies"
        },
        {
          title: "Stone Management",
          description: "Complete stone analysis, metabolic evaluation, and various treatment options from medication to surgery"
        },
        {
          title: "Male Health Services",
          description: "Specialized care for male sexual health, infertility, and reproductive system disorders"
        },
        {
          title: "Post-operative Care",
          description: "Comprehensive post-surgical support and monitoring for optimal recovery and outcomes"
        }
      ],
      symptoms: [
        { text: "Pain in lower back, abdomen, or groin" },
        { text: "Burning sensation or pain while urinating" },
        { text: "Blood in urine (even once)" },
        { text: "Inability to urinate or weak urine stream" },
        { text: "Frequent urge to urinate (especially at night)" },
        { text: "Swelling or pain in the scrotum" },
        { text: "Sexual dysfunction or infertility" },
        { text: "Unusual discharge or urinary incontinence" }
      ],
      sideEffects: [
        { text: "Temporary burning or urgency after catheter or scope procedure" },
        { text: "Mild blood in urine post-stone or prostate surgery" },
        { text: "Urinary frequency or discomfort after TURP" },
        { text: "Risk of infection (managed with antibiotics)" },
        { text: "Temporary swelling or discomfort at surgical site" }
      ],
      url: "urology"
    },
    {
      departmentTitle: "ENT (Ear, Nose & Throat) Department",
      subtitle: "Complete Care for Hearing, Breathing, and Voice Health",
      heroDescription: "Ashaali Hospital’s ENT Department offers specialized care for disorders related to the ear, nose, throat, head, and neck. Our ENT specialists provide medical and surgical treatments using the latest technology to help patients breathe better, hear clearly, speak confidently, and live comfortably.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "We deliver patient-focused ENT care for everything from minor infections to complex surgeries, using advanced diagnostic tools and expert clinical judgment.",
      successRateTitle: "High Success Rate",
      successRateDesc: "With experienced surgeons and modern technology, our ENT procedures boast a high success rate and quick recovery for most patients.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We diagnose and manage a wide range of ENT-related conditions affecting the ear, nose, throat, and neck regions.",
      proceduresTitle: "Surgeries & Procedures Offered",
      proceduresDesc: "We offer both conservative and advanced surgical management for ENT conditions using minimally invasive techniques.",
      rehabTitle: "Diagnostic & Treatment Services",
      rehabDesc: "Equipped with modern ENT diagnostic tools to enable early and accurate diagnosis and tailored treatment plans.",
      symptomsTitle: "Symptoms to Watch Out For",
      symptomsDesc: "Consult an ENT specialist if you experience any of these persistent or recurring symptoms.",
      sideEffectsTitle: "Possible Side Effects",
      sideEffectsDesc: "Most ENT procedures are safe. However, being aware of minor risks can help in informed decision-making.",
      image: Dental,
      caseStats: [
        {
          count: "3500+",
          title: "ENT Surgeries Done",
          description: "Successful ENT procedures including nasal, throat, and ear surgeries"
        },
        {
          count: "96%",
          title: "Patient Satisfaction",
          description: "Patients appreciate precise diagnosis and effective treatment outcomes"
        },
        {
          count: "10+",
          title: "Years Expertise",
          description: "ENT specialists with over a decade of experience in treating complex cases"
        },
        {
          count: "24/7",
          title: "Emergency ENT Care",
          description: "Immediate treatment for trauma, foreign bodies, and airway blockages"
        }
      ],
      conditionsTreated: [
        "Ear Infections & Hearing Loss",
        "Tinnitus (Ringing in the Ears)",
        "Balance Disorders & Vertigo (BPPV)",
        "Sinusitis & Nasal Blockage",
        "Deviated Nasal Septum (DNS)",
        "Tonsillitis & Throat Infections",
        "Voice Disorders & Hoarseness",
        "Snoring & Sleep Apnea (ENT causes)",
        "Allergic Rhinitis (Dust/Pollen allergies)",
        "Neck Masses, Thyroid Swelling, and Salivary Gland Issues",
        "Benign and Malignant Tumors of ENT region"
      ],
      procedures: [
        {
          name: "Tympanoplasty",
          description: "Surgical repair of a perforated eardrum"
        },
        {
          name: "Mastoidectomy",
          description: "Procedure to treat chronic ear infections"
        },
        {
          name: "Septoplasty",
          description: "Surgical correction of a deviated nasal septum"
        },
        {
          name: "FESS (Functional Endoscopic Sinus Surgery)",
          description: "Minimally invasive sinus surgery for chronic sinusitis"
        },
        {
          name: "Tonsillectomy & Adenoidectomy",
          description: "Removal of tonsils or adenoids for recurrent infections"
        },
        {
          name: "Microlaryngeal Surgery",
          description: "Surgery for vocal cord polyps and nodules"
        },
        {
          name: "Tracheostomy & Foreign Body Removal",
          description: "Emergency airway management and obstruction removal"
        },
        {
          name: "ENT Tumor Biopsy & Excision",
          description: "Diagnosis and surgical removal of ENT tumors"
        }
      ],
      treatments: [
        {
          title: "Audiometry & Hearing Aids",
          description: "Diagnostic tests and solutions for hearing loss"
        },
        {
          title: "Endoscopic Diagnosis",
          description: "Advanced nasal and throat evaluation for accurate treatment"
        },
        {
          title: "Allergy Testing",
          description: "Identifying ENT-related allergic triggers"
        },
        {
          title: "Speech Therapy",
          description: "Support for voice recovery and speech clarity"
        }
      ],
      symptoms: [
        { text: "Hearing loss or ear discharge" },
        { text: "Recurrent sore throat or tonsil infections" },
        { text: "Nasal congestion or facial pressure" },
        { text: "Snoring with disturbed sleep" },
        { text: "Vertigo, dizziness, or balance issues" },
        { text: "Hoarseness lasting more than 2 weeks" },
        { text: "Persistent sneezing or nasal allergies" },
        { text: "Neck swelling or difficulty swallowing" }
      ],
      sideEffects: [
        { text: "Mild bleeding after nasal/throat procedures" },
        { text: "Temporary voice changes after vocal cord surgery" },
        { text: "Dizziness or ear blockage post-ear surgery" },
        { text: "Allergic reaction to ENT sprays or medications" },
        { text: "Scar formation in rare surgical cases" }
      ],
      url: "ent"
    },

    {
      departmentTitle: "Endocrinology Department",
      subtitle: "Comprehensive Hormonal Health & Diabetes Care",
      heroDescription: "Ashaali Hospital’s Endocrinology Department provides expert care for hormonal imbalances and endocrine disorders, including diabetes, thyroid issues, obesity, and growth problems. Our specialists use the latest diagnostic tools and personalized treatment plans to restore hormonal balance and improve quality of life.",
      treatmentExperienceTitle: "Our Treatment Experience",
      treatmentExperienceDesc: "With years of experience managing complex hormonal disorders, our endocrinology team delivers compassionate, research-driven care tailored to each patient’s unique needs.",
      successRateTitle: "High Success Rate",
      successRateDesc: "Our evidence-based treatments and continuous monitoring ensure long-term management and better outcomes for chronic endocrine conditions like diabetes and thyroid dysfunction.",
      conditionsTitle: "Conditions We Treat",
      conditionsDesc: "We manage a wide range of endocrine disorders involving hormones, glands, and metabolism, using holistic and personalized approaches.",
      proceduresTitle: "Diagnostic Procedures",
      proceduresDesc: "We perform advanced diagnostic tests to detect and monitor hormone levels and glandular function accurately.",
      rehabTitle: "Treatment & Management",
      rehabDesc: "Focused on lifestyle modification, medication management, and patient education for long-term wellness.",
      symptomsTitle: "Symptoms to Watch Out For",
      symptomsDesc: "Recognizing early signs of hormonal imbalance can help prevent long-term complications.",
      sideEffectsTitle: "Potential Side Effects",
      sideEffectsDesc: "Endocrine treatments are generally safe, though some medications may cause mild or temporary side effects.",
      image: Enderinology,
      caseStats: [
        {
          count: "6000+",
          title: "Chronic Conditions Managed",
          description: "Long-term care for diabetes, thyroid, and hormonal disorders"
        },
        {
          count: "97%",
          title: "Improved Quality of Life",
          description: "Patients report better health outcomes and daily well-being"
        },
        {
          count: "12+",
          title: "Years of Expertise",
          description: "Specialists with in-depth experience in hormonal therapy"
        },
        {
          count: "24/7",
          title: "Emergency Diabetic Care",
          description: "Round-the-clock support for critical sugar fluctuations"
        }
      ],
      conditionsTreated: [
        "Type 1 & Type 2 Diabetes",
        "Thyroid Disorders (Hypo/Hyperthyroidism, Goiter)",
        "Obesity & Metabolic Syndrome",
        "PCOS (Polycystic Ovary Syndrome)",
        "Osteoporosis & Calcium Disorders",
        "Adrenal Gland Disorders (Addison's, Cushing’s)",
        "Pituitary Gland Disorders",
        "Growth & Puberty Disorders",
        "Male & Female Hormonal Imbalance"
      ],
      procedures: [
        {
          name: "HbA1c Testing",
          description: "Measures long-term blood sugar control in diabetic patients"
        },
        {
          name: "Thyroid Function Tests (T3, T4, TSH)",
          description: "Evaluate thyroid hormone levels and gland function"
        },
        {
          name: "Hormone Panel Screening",
          description: "Comprehensive assessment of multiple hormones"
        },
        {
          name: "Bone Mineral Density Test",
          description: "Checks for osteoporosis and calcium deficiency"
        },
        {
          name: "ACTH & Cortisol Test",
          description: "Evaluates adrenal gland function"
        }
      ],
      treatments: [
        {
          title: "Insulin Therapy",
          description: "Personalized insulin plans for diabetes management"
        },
        {
          title: "Thyroid Medication",
          description: "Daily medication to regulate thyroid hormone levels"
        },
        {
          title: "Hormone Replacement Therapy",
          description: "Restores hormone balance in men and women"
        },
        {
          title: "Lifestyle & Diet Counseling",
          description: "Support for weight loss, healthy eating, and fitness goals"
        }
      ],
      symptoms: [
        { text: "Unexplained weight gain or loss" },
        { text: "Fatigue and weakness" },
        { text: "Irregular menstrual cycles" },
        { text: "Increased thirst or urination" },
        { text: "Hair thinning or excessive hair growth" },
        { text: "Cold or heat intolerance" },
        { text: "Mood swings or depression" }
      ],
      sideEffects: [
        { text: "Mild digestive issues from oral hormone medications" },
        { text: "Low blood sugar from insulin use" },
        { text: "Temporary hormonal fluctuations during adjustment period" },
        { text: "Weight gain from steroid-based treatments" },
        { text: "Rare allergic reaction to certain hormonal therapies" }
      ],
      url: "endocrinology"
    },


    {
  departmentTitle: "Rheumatology Department",
  subtitle: "Expert Care for Joint, Muscle & Autoimmune Disorders",
  heroDescription: "Ashaali Hospital’s Rheumatology Department specializes in diagnosing and treating autoimmune and inflammatory conditions that affect the joints, muscles, and connective tissues. Our rheumatologists use a combination of clinical expertise, laboratory tests, and imaging to provide effective and personalized care.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "Our team has years of experience treating chronic rheumatic conditions like arthritis, lupus, and vasculitis with a patient-centric and compassionate approach.",
  successRateTitle: "High Success Rate",
  successRateDesc: "Through early diagnosis, multidisciplinary management, and advanced therapies, we help patients manage symptoms effectively and improve quality of life.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We manage a wide range of autoimmune and musculoskeletal disorders that cause pain, inflammation, and disability.",
  proceduresTitle: "Diagnostic Procedures",
  proceduresDesc: "We use clinical evaluation, blood markers, imaging, and joint fluid analysis for accurate diagnosis.",
  rehabTitle: "Treatment & Rehabilitation",
  rehabDesc: "Our approach includes medication, physical therapy, and long-term monitoring to manage inflammation and prevent joint damage.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Persistent joint or muscle symptoms may signal an underlying rheumatic condition and should not be ignored.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Some rheumatology treatments may have side effects; monitoring helps minimize risks and ensures safety.",
  image: rheumatology, // Replace with your imported image reference
  caseStats: [
    {
      count: "4000+",
      title: "Chronic Patients Managed",
      description: "Successful long-term care for autoimmune and inflammatory diseases"
    },
    {
      count: "95%",
      title: "Improved Mobility",
      description: "Patients report reduced joint pain and improved physical activity levels"
    },
    {
      count: "10+",
      title: "Years Expertise",
      description: "Expert rheumatologists experienced in complex autoimmune disorders"
    },
    {
      count: "24/7",
      title: "Flare-Up Care",
      description: "Support during sudden symptom flare-ups and emergencies"
    }
  ],
  conditionsTreated: [
    "Rheumatoid Arthritis",
    "Osteoarthritis",
    "Systemic Lupus Erythematosus (SLE)",
    "Ankylosing Spondylitis",
    "Psoriatic Arthritis",
    "Vasculitis",
    "Gout & Pseudogout",
    "Sjogren’s Syndrome",
    "Scleroderma",
    "Polymyalgia Rheumatica",
    "Reactive Arthritis"
  ],
  procedures: [
    {
      name: "Joint Aspiration & Injections",
      description: "Relieves inflammation and pain by removing joint fluid or injecting medication"
    },
    {
      name: "Autoantibody Testing",
      description: "Detects autoimmune markers like ANA, RF, anti-CCP for accurate diagnosis"
    },
    {
      name: "Inflammatory Marker Tests (ESR, CRP)",
      description: "Monitors the level of inflammation in the body"
    },
    {
      name: "Ultrasound-Guided Joint Evaluation",
      description: "Non-invasive imaging for detecting joint damage and synovitis"
    },
    {
      name: "Bone Density Test (DEXA)",
      description: "Assesses bone loss, especially in patients on long-term steroids"
    }
  ],
  treatments: [
    {
      title: "DMARDs (Disease-Modifying Anti-Rheumatic Drugs)",
      description: "Slows down disease progression in autoimmune conditions"
    },
    {
      title: "Biologic Therapy",
      description: "Targeted treatments for moderate-to-severe autoimmune arthritis"
    },
    {
      title: "Pain & Inflammation Management",
      description: "NSAIDs, corticosteroids, and other medications for symptom relief"
    },
    {
      title: "Physiotherapy & Joint Rehab",
      description: "Exercises to maintain joint mobility, reduce stiffness, and strengthen muscles"
    }
  ],
  symptoms: [
    { text: "Joint pain, swelling, or stiffness lasting more than a few weeks" },
    { text: "Morning stiffness lasting more than 30 minutes" },
    { text: "Fatigue or unexplained weight loss" },
    { text: "Muscle aches and tenderness" },
    { text: "Dry eyes and mouth" },
    { text: "Skin rashes or nodules over joints" },
    { text: "Fever with joint pain" }
  ],
  sideEffects: [
    { text: "Increased risk of infections from immunosuppressive drugs" },
    { text: "Gastrointestinal upset from NSAIDs or steroids" },
    { text: "Weight gain and blood sugar rise due to long-term steroid use" },
    { text: "Liver function changes from DMARDs" },
    { text: "Injection site reactions from biologic therapy" }
  ],
  url: "rheumatology"
},

{
  departmentTitle: "Oncology Department",
  subtitle: "Comprehensive Cancer Diagnosis, Treatment & Support",
  heroDescription: "Ashaali Hospital’s Oncology Department offers holistic and advanced care for various types of cancers. Our multidisciplinary team of oncologists, surgeons, radiologists, and counselors work together to provide personalized treatment plans including chemotherapy, radiation, and surgical oncology. We are committed to delivering compassionate, evidence-based cancer care to support patients through every stage of their journey.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "With vast experience in treating solid and blood-related cancers, our expert team combines clinical excellence with emotional support to deliver the best outcomes for patients and families.",
  successRateTitle: "Survivorship & Quality of Life",
  successRateDesc: "Our cancer management strategies aim not just at survival but also at maintaining dignity, strength, and quality of life during and after treatment.",
  conditionsTitle: "Types of Cancers We Treat",
  conditionsDesc: "We treat a broad spectrum of cancers using tailored approaches based on stage, type, and individual patient needs.",
  proceduresTitle: "Treatment Procedures & Therapies",
  proceduresDesc: "We use a combination of chemotherapy, radiotherapy, immunotherapy, and surgical interventions for best outcomes.",
  rehabTitle: "Supportive Care & Rehabilitation",
  rehabDesc: "Nutritional, psychological, pain, and palliative support services are integrated into our cancer care model.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Early detection is critical in cancer care. Be aware of common warning signs that should prompt medical attention.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Cancer treatments may have temporary or long-term side effects that are closely monitored and managed.",
  image: oncology, // Replace this with your actual image import
  caseStats: [
    {
      count: "2500+",
      title: "Cancer Cases Treated",
      description: "Expert multidisciplinary care across all major types of cancers"
    },
    {
      count: "93%",
      title: "Improved Quality of Life",
      description: "Patients report reduced pain, extended remission, and emotional support"
    },
    {
      count: "8+",
      title: "Years of Oncology Expertise",
      description: "Specialists trained in latest cancer care techniques and innovations"
    },
    {
      count: "24/7",
      title: "Onco Emergency Support",
      description: "Emergency care for cancer-related complications and pain management"
    }
  ],
  conditionsTreated: [
    "Breast Cancer",
    "Lung Cancer",
    "Colorectal Cancer",
    "Head & Neck Cancers",
    "Leukemia & Lymphoma",
    "Prostate Cancer",
    "Ovarian & Cervical Cancer",
    "Liver & Pancreatic Cancer",
    "Bone & Soft Tissue Sarcomas",
    "Brain Tumors",
    "Esophageal & Stomach Cancer"
  ],
  procedures: [
    {
      name: "Chemotherapy",
      description: "Use of cancer-killing drugs administered intravenously or orally"
    },
    {
      name: "Radiation Therapy",
      description: "High-energy beams to destroy or shrink cancerous tissues"
    },
    {
      name: "Surgical Oncology",
      description: "Removal of tumors and affected tissues by specialized cancer surgeons"
    },
    {
      name: "Immunotherapy",
      description: "Stimulates body’s immune system to fight cancer cells"
    },
    {
      name: "Targeted Therapy",
      description: "Medications that target specific cancer cell genes or proteins"
    }
  ],
  treatments: [
    {
      title: "Pain Management",
      description: "Dedicated team for controlling chronic cancer-related pain"
    },
    {
      title: "Palliative Care",
      description: "Improves comfort and support for patients with advanced cancer"
    },
    {
      title: "Nutritional Support",
      description: "Customized meal plans and supplements during treatment"
    },
    {
      title: "Psycho-Oncology Counseling",
      description: "Mental health and emotional support for patients and caregivers"
    }
  ],
  symptoms: [
    { text: "Unexplained weight loss" },
    { text: "Persistent fatigue or weakness" },
    { text: "Lump or swelling in breast, neck, or other body parts" },
    { text: "Changes in bowel or bladder habits" },
    { text: "Non-healing sores or ulcers" },
    { text: "Unusual bleeding or discharge" },
    { text: "Chronic cough or hoarseness" },
    { text: "Loss of appetite" }
  ],
  sideEffects: [
    { text: "Hair loss during chemotherapy" },
    { text: "Nausea, vomiting, and appetite loss" },
    { text: "Increased infection risk due to low immunity" },
    { text: "Fatigue and anemia" },
    { text: "Skin sensitivity or burns from radiation" }
  ],
  url: "oncology"
},



{
  departmentTitle: "Cardiology Department",
  subtitle: "Advanced Heart Care & Cardiac Wellness",
  heroDescription: "Ashaali Hospital’s Cardiology Department provides expert diagnosis, treatment, and prevention of heart-related conditions. With state-of-the-art facilities and an experienced team of cardiologists, we offer comprehensive care ranging from routine check-ups to complex cardiac procedures, ensuring every heartbeat is in the right hands.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "With years of experience managing cardiovascular diseases, our team has successfully treated thousands of patients through evidence-based medical and interventional cardiology.",
  successRateTitle: "Trusted Heart Care",
  successRateDesc: "Our cardiology team ensures a high rate of successful interventions and long-term health outcomes, with a strong focus on prevention and patient education.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We diagnose and manage a wide range of cardiovascular conditions, from hypertension to heart failure and congenital heart diseases.",
  proceduresTitle: "Cardiac Tests & Procedures",
  proceduresDesc: "We use advanced diagnostic tools and minimally invasive procedures to assess and restore heart function effectively.",
  rehabTitle: "Cardiac Rehab & Lifestyle Care",
  rehabDesc: "Post-treatment rehabilitation and preventive guidance to ensure long-term heart health and reduce the risk of recurrence.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Don’t ignore signs of heart distress — early diagnosis saves lives.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Cardiac treatments are safe, but like all procedures, some temporary side effects may occur and are monitored closely.",
  image: cardiology, // Replace with your actual image import
  caseStats: [
    {
      count: "7000+",
      title: "Heart Patients Treated",
      description: "Including emergency heart care, angioplasty, and chronic condition management"
    },
    {
      count: "96%",
      title: "Positive Recovery Rate",
      description: "Improved lifestyle and reduced cardiac complications post-treatment"
    },
    {
      count: "12+",
      title: "Years of Expertise",
      description: "Our cardiologists bring extensive experience in interventional and non-invasive cardiology"
    },
    {
      count: "24/7",
      title: "Emergency Cardiac Support",
      description: "Critical heart care including heart attack response available around the clock"
    }
  ],
  conditionsTreated: [
    "Coronary Artery Disease (CAD)",
    "Heart Attack (Myocardial Infarction)",
    "Hypertension (High Blood Pressure)",
    "Heart Failure",
    "Arrhythmias (Irregular Heartbeat)",
    "Valvular Heart Disease",
    "Congenital Heart Defects",
    "Cardiomyopathy",
    "Peripheral Artery Disease",
    "Cholesterol & Lipid Disorders"
  ],
  procedures: [
    {
      name: "Electrocardiogram (ECG)",
      description: "Detects irregularities in heart rhythm and structure"
    },
    {
      name: "Echocardiography (2D/3D Echo)",
      description: "Ultrasound imaging to assess heart chambers, valves, and function"
    },
    {
      name: "Treadmill Test (TMT)",
      description: "Evaluates heart response to stress or exertion"
    },
    {
      name: "Angiography & Angioplasty",
      description: "Imaging and balloon/stent procedure to open blocked arteries"
    },
    {
      name: "Pacemaker Implantation",
      description: "Device placement to regulate heartbeat in rhythm disorders"
    }
  ],
  treatments: [
    {
      title: "Medication Management",
      description: "Customized prescriptions for blood pressure, cholesterol, heart rhythm, and more"
    },
    {
      title: "Interventional Cardiology",
      description: "Minimally invasive procedures like angioplasty and stent placement"
    },
    {
      title: "Preventive Cardiology",
      description: "Lifestyle, diet, and stress management plans to reduce future cardiac risks"
    },
    {
      title: "Cardiac Rehabilitation",
      description: "Supervised program of exercise and education for recovery after cardiac events"
    }
  ],
  symptoms: [
    { text: "Chest pain or discomfort (especially with exertion)" },
    { text: "Shortness of breath during rest or activity" },
    { text: "Rapid, irregular, or skipped heartbeat" },
    { text: "Swelling in legs, ankles, or feet" },
    { text: "Fatigue or dizziness" },
    { text: "Sudden fainting or lightheadedness" },
    { text: "Persistent coughing or wheezing with white or pink mucus" }
  ],
  sideEffects: [
    { text: "Fatigue or lightheadedness after some procedures" },
    { text: "Mild bleeding or bruising at catheter site (angiography/angioplasty)" },
    { text: "Medication-related side effects like dizziness or nausea" },
    { text: "Temporary swelling or pain post-pacemaker placement" },
    { text: "Low blood pressure or irregular heartbeat in rare cases" }
  ],
  url: "cardiology"
},


{
  departmentTitle: "Psychiatry Department",
  subtitle: "Comprehensive Mental Health & Behavioral Wellness",
  heroDescription: "Ashaali Hospital’s Psychiatry Department provides compassionate and confidential care for mental health conditions. Our team of psychiatrists, psychologists, and therapists work collaboratively to diagnose, treat, and support individuals facing emotional, behavioral, or psychiatric challenges. We offer both inpatient and outpatient services tailored to each individual’s needs.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "With a decade of experience treating diverse mental health conditions, our team focuses on empathetic care, accurate diagnosis, and long-term emotional wellness.",
  successRateTitle: "Restoring Mental Well-Being",
  successRateDesc: "Our holistic approach to psychiatry ensures high recovery and satisfaction rates, helping individuals return to productive and fulfilling lives.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We address a broad spectrum of mental health conditions across all age groups using therapeutic and medical management.",
  proceduresTitle: "Diagnostic & Therapy Services",
  proceduresDesc: "Comprehensive assessments, psychiatric evaluations, and evidence-based therapy interventions for accurate treatment planning.",
  rehabTitle: "Therapy & Rehabilitation",
  rehabDesc: "Ongoing counseling, medication support, lifestyle guidance, and family involvement to ensure stable recovery.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Seek help if you or your loved ones notice changes in thinking, behavior, or emotional state that interfere with daily life.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Psychiatric medications and therapies may have some side effects, which are monitored and managed carefully.",
  image: psychaitry, // Replace this with your actual image import
  caseStats: [
    {
      count: "5000+",
      title: "Mental Health Cases Treated",
      description: "Successful treatment of anxiety, depression, schizophrenia, and more"
    },
    {
      count: "94%",
      title: "Stabilization & Recovery Rate",
      description: "Most patients show significant improvement with therapy and medication"
    },
    {
      count: "10+",
      title: "Years of Psychiatric Excellence",
      description: "Our psychiatrists and therapists are trained in both modern and holistic approaches"
    },
    {
      count: "24/7",
      title: "Crisis & Emergency Support",
      description: "Immediate intervention for mental health emergencies including suicide prevention"
    }
  ],
  conditionsTreated: [
    "Depression & Mood Disorders",
    "Anxiety Disorders (GAD, Panic Disorder, Phobia)",
    "Bipolar Disorder",
    "Schizophrenia & Psychosis",
    "Obsessive-Compulsive Disorder (OCD)",
    "Post-Traumatic Stress Disorder (PTSD)",
    "Substance Abuse & Addiction",
    "Sleep Disorders",
    "Personality Disorders",
    "Child & Adolescent Behavioral Issues"
  ],
  procedures: [
    {
      name: "Psychiatric Evaluation",
      description: "In-depth assessment of symptoms, history, and behavior"
    },
    {
      name: "Cognitive Behavioral Therapy (CBT)",
      description: "Structured psychotherapy for depression, anxiety, and other issues"
    },
    {
      name: "Medication Management",
      description: "Prescribing and monitoring antidepressants, antipsychotics, anxiolytics"
    },
    {
      name: "Family & Group Therapy",
      description: "Involving families in care plans and peer group recovery"
    },
    {
      name: "Psychological Testing",
      description: "Standardized tests for memory, IQ, attention, personality traits, etc."
    }
  ],
  treatments: [
    {
      title: "Individual Psychotherapy",
      description: "One-on-one counseling sessions with licensed therapists"
    },
    {
      title: "Mindfulness & Stress Management",
      description: "Techniques for relaxation and coping with daily stress"
    },
    {
      title: "Medication Support",
      description: "Safe and regular pharmacological management for symptom control"
    },
    {
      title: "Rehabilitation & Aftercare",
      description: "Support for reintegration, long-term stability, and relapse prevention"
    }
  ],
  symptoms: [
    { text: "Persistent sadness, hopelessness, or crying spells" },
    { text: "Excessive worry, fear, or panic attacks" },
    { text: "Hallucinations, delusions, or disorganized thinking" },
    { text: "Sleep disturbances or appetite changes" },
    { text: "Substance misuse or addiction" },
    { text: "Social withdrawal or lack of interest in activities" },
    { text: "Thoughts of self-harm or suicide" }
  ],
  sideEffects: [
    { text: "Drowsiness or dizziness from certain medications" },
    { text: "Weight changes or appetite loss" },
    { text: "Mood swings or emotional sensitivity" },
    { text: "Sexual side effects from antidepressants" },
    { text: "Withdrawal symptoms if medications are stopped abruptly" }
  ],
  url: "psychiatry"
},


{
  departmentTitle: "Dermatology Department",
  subtitle: "Expert Skin, Hair & Nail Care for All Ages",
  heroDescription: "Ashaali Hospital’s Dermatology Department provides comprehensive care for skin, hair, and nail conditions. Our experienced dermatologists use advanced diagnostic tools and the latest treatment technologies to address both medical and cosmetic dermatological issues, helping patients achieve healthy, glowing skin with confidence.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "With a team of expert dermatologists and cosmetologists, we have successfully treated thousands of patients for chronic skin conditions, infections, allergies, and aesthetic concerns.",
  successRateTitle: "Healthy Skin, Happy Patients",
  successRateDesc: "With accurate diagnosis and tailored treatment plans, our dermatology care ensures high patient satisfaction and long-term results.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We offer treatment for a wide range of dermatological conditions, including chronic, infectious, allergic, and cosmetic skin issues.",
  proceduresTitle: "Diagnostic & Cosmetic Procedures",
  proceduresDesc: "From skin biopsies to cosmetic lasers, we offer safe and effective procedures tailored to each patient’s needs.",
  rehabTitle: "Skin Care & Maintenance",
  rehabDesc: "Post-treatment care, preventive skincare guidance, and routine follow-ups to ensure lasting results.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Timely consultation can prevent minor skin issues from turning into chronic or severe problems.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Dermatological treatments are generally safe but may cause mild, temporary side effects depending on the procedure.",
  image: Dermatology, // Replace with your actual image import
  caseStats: [
    {
      count: "8000+",
      title: "Skin Conditions Treated",
      description: "From acne to eczema to cosmetic issues with successful outcomes"
    },
    {
      count: "98%",
      title: "Patient Satisfaction Rate",
      description: "Patients report visible improvement and increased confidence"
    },
    {
      count: "10+",
      title: "Years of Expertise",
      description: "Experienced dermatologists trained in both clinical and cosmetic dermatology"
    },
    {
      count: "24/7",
      title: "Emergency Skin Care",
      description: "Support for allergic reactions, burns, and acute infections"
    }
  ],
  conditionsTreated: [
    "Acne & Acne Scars",
    "Eczema & Dermatitis",
    "Psoriasis",
    "Fungal Infections (Ringworm, Candidiasis)",
    "Vitiligo & Pigmentation Disorders",
    "Hair Fall & Dandruff",
    "Skin Allergies & Urticaria",
    "Warts, Moles & Skin Tags",
    "Nail Disorders",
    "Skin Cancers & Precancerous Lesions"
  ],
  procedures: [
    {
      name: "Skin Biopsy",
      description: "Microscopic analysis of skin tissue to diagnose various conditions"
    },
    {
      name: "Chemical Peels",
      description: "Removes damaged outer skin to treat acne, scars, and pigmentation"
    },
    {
      name: "Laser Skin Treatments",
      description: "Advanced laser technology for hair removal, scars, and skin rejuvenation"
    },
    {
      name: "Cryotherapy",
      description: "Freezing technique for wart and lesion removal"
    },
    {
      name: "Electrocautery & Radiofrequency",
      description: "Safe removal of skin tags, warts, and moles"
    }
  ],
  treatments: [
    {
      title: "Medical Skin Care",
      description: "Topical and oral medications for bacterial, fungal, and inflammatory skin conditions"
    },
    {
      title: "Cosmetic Dermatology",
      description: "Anti-aging treatments, pigmentation correction, and skin polishing"
    },
    {
      title: "Hair & Scalp Treatments",
      description: "Solutions for dandruff, alopecia, and thinning hair"
    },
    {
      title: "Allergy Testing & Immunotherapy",
      description: "Identify and manage contact dermatitis and chronic skin allergies"
    }
  ],
  symptoms: [
    { text: "Itchy or inflamed skin" },
    { text: "Redness, scaling, or flaking" },
    { text: "Hair thinning or bald patches" },
    { text: "Discoloration or white patches on the skin" },
    { text: "Persistent acne or boils" },
    { text: "Sudden rash or swelling" },
    { text: "Unusual moles or skin growths" }
  ],
  sideEffects: [
    { text: "Temporary redness or peeling after chemical peels" },
    { text: "Mild irritation or dryness from topical creams" },
    { text: "Slight swelling or scabbing post-laser treatments" },
    { text: "Allergic reaction to cosmetic products" },
    { text: "Hyperpigmentation or light spots in rare cases" }
  ],
  url: "dermatology"
},


{
  departmentTitle: "Pulmonology Department",
  subtitle: "Expert Lung Care & Respiratory Wellness",
  heroDescription: "Ashaali Hospital’s Pulmonology Department specializes in the diagnosis and treatment of respiratory diseases and lung disorders. Our team of expert pulmonologists offers advanced care for chronic and acute conditions such as asthma, COPD, tuberculosis, pneumonia, and sleep-related breathing disorders. With state-of-the-art diagnostics and patient-focused care, we help you breathe easier and live better.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "Our pulmonology team brings years of experience treating thousands of patients with respiratory illnesses through a combination of medical management, diagnostics, and rehabilitation.",
  successRateTitle: "Breathe Easy with Us",
  successRateDesc: "With a strong track record in managing chronic respiratory conditions, our patients enjoy improved lung function, reduced hospitalizations, and a better quality of life.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We manage a wide range of pulmonary conditions affecting the lungs, bronchi, pleura, and respiratory muscles.",
  proceduresTitle: "Diagnostic & Interventional Services",
  proceduresDesc: "Accurate diagnosis using advanced imaging, endoscopy, and lab tests for optimal treatment planning.",
  rehabTitle: "Pulmonary Rehab & Care",
  rehabDesc: "Our comprehensive programs include medication, oxygen therapy, and physical training to improve lung strength and endurance.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Do not ignore breathing issues — early intervention can prevent long-term complications.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Respiratory treatments are safe, but some may cause temporary side effects which are monitored closely.",
  image: pulmonology, // Replace this with your actual image import
  caseStats: [
    {
      count: "6000+",
      title: "Respiratory Cases Managed",
      description: "Effective care for asthma, COPD, TB, and infections"
    },
    {
      count: "95%",
      title: "Improved Breathing Function",
      description: "Majority of patients report better oxygen levels and symptom relief"
    },
    {
      count: "10+",
      title: "Years of Expertise",
      description: "Team experienced in both acute and chronic respiratory care"
    },
    {
      count: "24/7",
      title: "Emergency Respiratory Support",
      description: "Ventilator support and critical care for breathing emergencies"
    }
  ],
  conditionsTreated: [
    "Asthma",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Tuberculosis (TB)",
    "Pneumonia",
    "Interstitial Lung Disease (ILD)",
    "Bronchitis",
    "Sleep Apnea & Snoring",
    "Lung Fibrosis",
    "Pulmonary Hypertension",
    "Lung Cancer (Diagnosis & Referral)"
  ],
  procedures: [
    {
      name: "Pulmonary Function Test (PFT)",
      description: "Measures lung capacity, airflow, and respiratory strength"
    },
    {
      name: "Bronchoscopy",
      description: "Endoscopic procedure to view airways and collect samples"
    },
    {
      name: "Chest X-Ray & CT Scan",
      description: "Imaging to diagnose infections, tumors, or structural abnormalities"
    },
    {
      name: "Sleep Study (Polysomnography)",
      description: "Evaluates sleep apnea and other nighttime breathing disorders"
    },
    {
      name: "Sputum Analysis & Cultures",
      description: "Identifies infections like TB or pneumonia"
    }
  ],
  treatments: [
    {
      title: "Inhaler & Nebulizer Therapy",
      description: "Delivers medication directly to the lungs for rapid relief"
    },
    {
      title: "Antibiotic & Anti-Tubercular Therapy",
      description: "Treats bacterial and mycobacterial lung infections"
    },
    {
      title: "Oxygen Therapy",
      description: "Supports patients with low oxygen levels or chronic hypoxia"
    },
    {
      title: "Pulmonary Rehabilitation",
      description: "Exercise and education to improve lung capacity and reduce breathlessness"
    }
  ],
  symptoms: [
    { text: "Chronic cough lasting more than 3 weeks" },
    { text: "Shortness of breath or wheezing" },
    { text: "Chest tightness or pain while breathing" },
    { text: "Cough with mucus or blood" },
    { text: "Frequent lung infections" },
    { text: "Fatigue during minimal exertion" },
    { text: "Snoring or disturbed sleep patterns" }
  ],
  sideEffects: [
    { text: "Dry mouth or throat irritation from inhalers" },
    { text: "Mild drowsiness from cough syrups or sleep meds" },
    { text: "Allergic reaction to antibiotics or TB drugs" },
    { text: "Lightheadedness from oxygen therapy" },
    { text: "Rare bleeding or discomfort after bronchoscopy" }
  ],
  url: "pulmonology"
},


{
  departmentTitle: "Hematology Department",
  subtitle: "Expert Blood Disorder Diagnosis & Care",
  heroDescription: "Ashaali Hospital’s Hematology Department offers specialized diagnosis and treatment for blood-related disorders. Our experienced hematologists manage both benign and malignant conditions affecting red and white blood cells, platelets, bone marrow, lymph nodes, and coagulation systems. We provide comprehensive care using modern diagnostics, targeted therapies, and compassionate support.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "With years of experience treating complex hematological disorders, we combine clinical expertise with cutting-edge diagnostics and personalized care plans.",
  successRateTitle: "Effective Blood Disorder Management",
  successRateDesc: "Through early diagnosis, targeted therapies, and continuous monitoring, we ensure high treatment success and improved quality of life.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We manage a wide range of hematologic disorders, from anemia and bleeding issues to blood cancers like leukemia and lymphoma.",
  proceduresTitle: "Diagnostic & Therapeutic Services",
  proceduresDesc: "Advanced laboratory tests, bone marrow analysis, transfusions, and chemotherapy for precise treatment planning and delivery.",
  rehabTitle: "Post-Treatment Monitoring & Support",
  rehabDesc: "Ongoing monitoring, nutritional care, and infection control are vital parts of our hematology treatment model.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Timely recognition of blood-related symptoms helps in early diagnosis and successful treatment.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Hematological treatments may involve temporary or long-term side effects, which we manage carefully at each step.",
  image: hematology, // Replace this with your actual image import
  caseStats: [
    {
      count: "3500+",
      title: "Hematology Cases Treated",
      description: "Including anemia, clotting disorders, and hematologic cancers"
    },
    {
      count: "90%",
      title: "Remission & Recovery Rate",
      description: "Patients with early intervention show excellent treatment outcomes"
    },
    {
      count: "8+",
      title: "Years of Hematology Expertise",
      description: "Specialized team trained in rare and chronic blood diseases"
    },
    {
      count: "24/7",
      title: "Emergency Bleeding Care",
      description: "Immediate attention for bleeding crises and transfusion needs"
    }
  ],
  conditionsTreated: [
    "Iron-Deficiency Anemia",
    "Thalassemia",
    "Sickle Cell Anemia",
    "Hemophilia & Bleeding Disorders",
    "Leukemia (Blood Cancer)",
    "Lymphoma & Myeloma",
    "Aplastic Anemia",
    "Thrombocytopenia (Low Platelet Count)",
    "Polycythemia Vera",
    "Deep Vein Thrombosis (DVT) & Clotting Disorders"
  ],
  procedures: [
    {
      name: "Complete Blood Count (CBC)",
      description: "Initial test to evaluate red cells, white cells, and platelets"
    },
    {
      name: "Bone Marrow Biopsy",
      description: "Helps diagnose leukemia, lymphoma, anemia, and marrow failure"
    },
    {
      name: "Coagulation Profile (PT, INR, aPTT)",
      description: "Assesses clotting ability in bleeding or bruising disorders"
    },
    {
      name: "Immunophenotyping & Flow Cytometry",
      description: "Advanced testing for blood cancers"
    },
    {
      name: "Blood Transfusions & Platelet Therapy",
      description: "Used in severe anemia, bleeding, or chemotherapy support"
    }
  ],
  treatments: [
    {
      title: "Oral & IV Iron Therapy",
      description: "For treating iron-deficiency anemia and chronic fatigue"
    },
    {
      title: "Chemotherapy for Blood Cancers",
      description: "Targeted drug therapy for leukemia, lymphoma, and myeloma"
    },
    {
      title: "Clotting Factor Replacement",
      description: "Essential treatment for hemophilia and inherited bleeding disorders"
    },
    {
      title: "Bone Marrow Transplant Referral & Coordination",
      description: "Support for transplant candidates including donor matching"
    }
  ],
  symptoms: [
    { text: "Unexplained fatigue or weakness" },
    { text: "Frequent infections or fever" },
    { text: "Easy bruising or prolonged bleeding" },
    { text: "Pale skin or shortness of breath" },
    { text: "Swollen lymph nodes or bone pain" },
    { text: "Dark-colored urine (in hemolytic disorders)" },
    { text: "Recurrent nosebleeds or gum bleeding" }
  ],
  sideEffects: [
    { text: "Mild nausea or vomiting from chemotherapy" },
    { text: "Low immunity during treatment phases" },
    { text: "Hair thinning or loss (chemotherapy-related)" },
    { text: "Risk of transfusion reactions (rare with matched blood)" },
    { text: "Bleeding or bruising post bone marrow biopsy" }
  ],
  url: "hematology"
},


{
  departmentTitle: "Dental Department",
  subtitle: "Comprehensive Dental & Oral Health Care",
  heroDescription: "Ashaali Hospital’s Dental Department offers complete oral health services ranging from preventive care to advanced restorative and cosmetic procedures. Our team of experienced dentists, orthodontists, and oral surgeons is committed to delivering high-quality, painless, and patient-friendly dental treatments using state-of-the-art equipment.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "With a skilled team and modern facilities, we have treated thousands of patients for dental problems, offering expert care for everything from routine cleanings to surgical procedures.",
  successRateTitle: "Smile with Confidence",
  successRateDesc: "Our focus on precision, hygiene, and aesthetics results in high patient satisfaction and long-lasting oral health outcomes.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We diagnose and manage all common and complex dental and oral health conditions in children and adults.",
  proceduresTitle: "Dental Treatments & Procedures",
  proceduresDesc: "From tooth fillings to smile makeovers, we offer a wide range of dental services under one roof.",
  rehabTitle: "Oral Care & Post-Treatment Support",
  rehabDesc: "We provide guidance for oral hygiene maintenance, diet, and regular check-ups after treatments.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Don't ignore oral symptoms — early treatment prevents complications and ensures better outcomes.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Dental procedures are generally safe, though some may have mild, short-term side effects.",
  image: Dental, // Replace with your actual image import
  caseStats: [
    {
      count: "9000+",
      title: "Dental Procedures Performed",
      description: "From cleanings and fillings to surgeries and cosmetic corrections"
    },
    {
      count: "97%",
      title: "Patient Satisfaction",
      description: "Patients report pain-free experience and long-term dental health improvements"
    },
    {
      count: "12+",
      title: "Years of Dental Excellence",
      description: "Trusted experience across general dentistry, prosthodontics, and orthodontics"
    },
    {
      count: "6 Days",
      title: "Weekly Availability",
      description: "Convenient scheduling with extended hours for working patients"
    }
  ],
  conditionsTreated: [
    "Tooth Decay & Cavities",
    "Gum Disease (Gingivitis & Periodontitis)",
    "Tooth Sensitivity",
    "Jaw Pain & TMJ Disorders",
    "Bad Breath (Halitosis)",
    "Broken or Cracked Teeth",
    "Misaligned or Crooked Teeth",
    "Wisdom Tooth Problems",
    "Oral Infections & Abscesses",
    "Dental Anxiety & Phobia"
  ],
  procedures: [
    {
      name: "Dental Cleaning & Polishing",
      description: "Removes plaque and tartar to prevent gum disease and decay"
    },
    {
      name: "Tooth Filling & Restoration",
      description: "Restores decayed or broken teeth using durable filling materials"
    },
    {
      name: "Root Canal Treatment (RCT)",
      description: "Treats infected tooth pulp and preserves the natural tooth"
    },
    {
      name: "Tooth Extraction & Wisdom Tooth Removal",
      description: "Painless removal of damaged or impacted teeth"
    },
    {
      name: "Braces & Clear Aligners",
      description: "Orthodontic solutions to correct teeth alignment and improve bite"
    }
  ],
  treatments: [
    {
      title: "Pediatric Dental Care",
      description: "Gentle dental services for children including fluoride treatment and sealants"
    },
    {
      title: "Dental Implants & Crowns",
      description: "Permanent replacements for missing teeth with natural appearance"
    },
    {
      title: "Smile Design & Whitening",
      description: "Cosmetic treatments for a brighter, more confident smile"
    },
    {
      title: "Gum Treatment & Surgery",
      description: "Treats gingival diseases, recession, and overgrowth with precision"
    }
  ],
  symptoms: [
    { text: "Toothache or sensitivity to hot/cold" },
    { text: "Swollen, bleeding, or receding gums" },
    { text: "Loose or missing teeth" },
    { text: "Persistent bad breath or metallic taste" },
    { text: "Clicking or pain in the jaw joint (TMJ)" },
    { text: "Difficulty chewing or mouth opening" },
    { text: "Spots or sores inside the mouth that don’t heal" }
  ],
  sideEffects: [
    { text: "Temporary tooth sensitivity after cleaning or whitening" },
    { text: "Mild swelling or discomfort after extraction or RCT" },
    { text: "Minor bleeding or bruising post-surgery" },
    { text: "Discomfort from new braces or aligners initially" },
    { text: "Dry mouth from certain medications used during procedures" }
  ],
  url: "dental"
},


{
  departmentTitle: "Nephrology Department",
  subtitle: "Expert Kidney Care & Renal Health Solutions",
  heroDescription: "Ashaali Hospital’s Nephrology Department provides advanced diagnosis, treatment, and management of kidney-related disorders. Our experienced nephrologists offer personalized care for chronic kidney disease, dialysis, hypertension, and electrolyte imbalances using cutting-edge technology and a multidisciplinary approach.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "With extensive expertise in nephrology, our team has treated thousands of patients with both acute and chronic kidney issues, including those requiring dialysis and long-term care.",
  successRateTitle: "Committed to Renal Wellness",
  successRateDesc: "Our focus on early detection, lifestyle management, and patient education ensures a high success rate in slowing kidney disease progression and improving quality of life.",
  conditionsTitle: "Conditions We Treat",
  conditionsDesc: "We manage a wide range of kidney and urinary disorders including infections, chronic kidney disease, and renal failure.",
  proceduresTitle: "Diagnostic & Therapeutic Services",
  proceduresDesc: "From kidney function tests to dialysis and biopsies, we offer complete nephrology care under one roof.",
  rehabTitle: "Ongoing Monitoring & Renal Rehab",
  rehabDesc: "Our comprehensive follow-up care includes dietary plans, medication management, and dialysis support.",
  symptomsTitle: "Symptoms to Watch Out For",
  symptomsDesc: "Recognizing early signs of kidney problems can help prevent progression to renal failure.",
  sideEffectsTitle: "Potential Side Effects",
  sideEffectsDesc: "Kidney treatments, especially dialysis and medications, may have side effects, which we monitor and manage closely.",
  image: nephrology, // Replace with your actual image import
  caseStats: [
    {
      count: "4000+",
      title: "Kidney Patients Treated",
      description: "Successful treatment of both acute and chronic kidney conditions"
    },
    {
      count: "92%",
      title: "Stabilization Rate in CKD",
      description: "High rate of slowing disease progression with consistent care"
    },
    {
      count: "10+",
      title: "Years of Nephrology Expertise",
      description: "Managing patients across various stages of kidney disorders"
    },
    {
      count: "24/7",
      title: "Dialysis & Emergency Support",
      description: "Critical care for renal failure and 24x7 dialysis services"
    }
  ],
  conditionsTreated: [
    "Chronic Kidney Disease (CKD)",
    "Acute Kidney Injury (AKI)",
    "Glomerulonephritis",
    "Nephrotic Syndrome",
    "Diabetic Nephropathy",
    "Hypertensive Nephropathy",
    "Polycystic Kidney Disease (PKD)",
    "Electrolyte Imbalances",
    "Urinary Tract Infections (UTIs)",
    "End-Stage Renal Disease (ESRD)"
  ],
  procedures: [
    {
      name: "Kidney Function Tests (KFT)",
      description: "Assess levels of creatinine, urea, and electrolytes to monitor kidney performance"
    },
    {
      name: "Hemodialysis",
      description: "Life-saving procedure to filter blood in patients with kidney failure"
    },
    {
      name: "Peritoneal Dialysis",
      description: "Alternative home-based dialysis option for selected patients"
    },
    {
      name: "Kidney Biopsy",
      description: "Microscopic evaluation of kidney tissue for diagnosis"
    },
    {
      name: "Ultrasound & Doppler of Kidneys",
      description: "Non-invasive imaging to detect structural abnormalities and blood flow"
    }
  ],
  treatments: [
    {
      title: "Medical Management for CKD",
      description: "Medications and diet adjustments to control symptoms and slow disease"
    },
    {
      title: "Dialysis Services",
      description: "Comprehensive hemodialysis and peritoneal dialysis services with patient monitoring"
    },
    {
      title: "Anemia & Mineral Management",
      description: "Treatment of complications like low hemoglobin and bone health issues in kidney patients"
    },
    {
      title: "Transplant Evaluation & Referral",
      description: "Workup and coordination for patients eligible for kidney transplant"
    }
  ],
  symptoms: [
    { text: "Swelling in feet, ankles, or face" },
    { text: "Persistent fatigue or weakness" },
    { text: "Frequent urination or foamy urine" },
    { text: "Blood in urine or dark-colored urine" },
    { text: "High blood pressure or uncontrolled sugar levels" },
    { text: "Loss of appetite or nausea" },
    { text: "Difficulty concentrating or muscle cramps" }
  ],
  sideEffects: [
    { text: "Low blood pressure during dialysis sessions" },
    { text: "Mild cramps or nausea post-dialysis" },
    { text: "Injection site pain or bruising" },
    { text: "Iron overload or deficiency due to long-term treatment" },
    { text: "Risk of infections with peritoneal dialysis" }
  ],
  url: "nephrology"
},


{
  departmentTitle: "General Medicine Department",
  subtitle: "Your First Step Toward Accurate Diagnosis and Holistic Medical Care",
  heroDescription: "The General Medicine Department at Ashaali Hospital serves as the foundation of patient care, specializing in the prevention, diagnosis, and treatment of a wide spectrum of adult health conditions. Our experienced physicians focus on non-surgical care, early detection, and long-term disease management to improve your health and quality of life.",
  treatmentExperienceTitle: "Our Treatment Experience",
  treatmentExperienceDesc: "We have managed thousands of patients with acute and chronic conditions, focusing on personalized care, accurate diagnosis, and preventive health strategies.",
  successRateTitle: "Comprehensive & Compassionate Care",
  successRateDesc: "Our patients benefit from early diagnosis, multi-system evaluation, and continuous monitoring, resulting in faster recovery and improved long-term outcomes.",
  conditionsTitle: "Conditions We Commonly Treat",
  conditionsDesc: "We handle a wide variety of acute and chronic medical conditions with a holistic and evidence-based approach.",
  proceduresTitle: "Diagnostic & Support Services",
  proceduresDesc: "Our department is equipped with essential diagnostic tools and offers full internal medicine support with referrals when necessary.",
  rehabTitle: "Lifestyle Counseling & Follow-Up Care",
  rehabDesc: "We guide patients with lifestyle changes, routine monitoring, and timely specialist referrals for better long-term health outcomes.",
  symptomsTitle: "Symptoms to Consult General Medicine For",
  symptomsDesc: "Consult our physicians early if you experience the following symptoms, which could indicate underlying health concerns.",
  sideEffectsTitle: "Possible Treatment Side Effects",
  sideEffectsDesc: "Most treatments are well-tolerated, though mild side effects can occur, and are monitored closely by our care team.",
  image: generalmedicine, // Replace this with your actual image import
  caseStats: [
    {
      count: "10,000+",
      title: "Patients Treated Annually",
      description: "Effective management of common and complex internal health issues"
    },
    {
      count: "95%",
      title: "Diagnosis Accuracy",
      description: "Efficient evaluations with proper lab tests and imaging support"
    },
    {
      count: "12+",
      title: "Years of Internal Medicine Expertise",
      description: "Team of physicians with experience in multisystem care"
    },
    {
      count: "100%",
      title: "Coordination with Specialists",
      description: "Seamless referrals and multi-disciplinary collaboration when needed"
    }
  ],
  conditionsTreated: [
    "Fever & Viral Infections",
    "Respiratory Illnesses – Asthma, COPD, Bronchitis",
    "Hypertension (High Blood Pressure)",
    "Diabetes & Endocrine Disorders",
    "Thyroid Disorders (Hyper/Hypothyroidism)",
    "Digestive Issues – Gastritis, Acidity, Constipation, IBS",
    "Anemia & Nutritional Deficiencies",
    "Urinary Tract Infections (UTIs)",
    "Liver Disorders – Hepatitis, Fatty Liver",
    "Infectious Diseases – Dengue, Typhoid, Tuberculosis",
    "Joint Pains & Minor Rheumatic Complaints"
  ],
  procedures: [
    {
      name: "Blood Investigations (CBC, Sugar, LFT, KFT)",
      description: "Lab tests to assess general health, organ function, and infection"
    },
    {
      name: "ECG & 2D Echo",
      description: "Heart evaluation for chest pain, palpitations, and hypertension"
    },
    {
      name: "X-Ray, Ultrasound, CT Scan",
      description: "Imaging for diagnosis of infections, organ issues, or structural concerns"
    },
    {
      name: "Blood Pressure & Glucose Monitoring",
      description: "Routine tracking for early detection of chronic diseases"
    },
    {
      name: "Lipid Profile & Thyroid Function Tests",
      description: "Detects cholesterol imbalance and thyroid dysfunction"
    },
    {
      name: "Preventive Health Packages & Vaccination",
      description: "Screening and vaccination for lifestyle and infectious diseases"
    }
  ],
  treatments: [
    {
      title: "Medical Management for Acute Conditions",
      description: "Effective treatment for infections, fever, and respiratory conditions"
    },
    {
      title: "Chronic Disease Monitoring",
      description: "Long-term management of diabetes, hypertension, and thyroid issues"
    },
    {
      title: "Nutritional & Lifestyle Counseling",
      description: "Support for weight loss, anemia, and general well-being"
    },
    {
      title: "Vaccination & Preventive Care",
      description: "Protection against diseases like flu, hepatitis, and typhoid"
    }
  ],
  symptoms: [
    { text: "Persistent or high-grade fever" },
    { text: "Breathing difficulty or chest pain" },
    { text: "Long-term fatigue or weakness" },
    { text: "Unexplained weight loss or gain" },
    { text: "Swelling in legs or hands" },
    { text: "Digestive discomfort (bloating, indigestion)" },
    { text: "Frequent urination or urinary discomfort" },
    { text: "Dizziness, blackouts, or palpitations" },
    { text: "Headaches, body aches, or joint pain" }
  ],
  sideEffects: [
    { text: "Drowsiness or dizziness from antihistamines" },
    { text: "Gastric irritation from painkillers" },
    { text: "Temporary fatigue after IV medications" },
    { text: "Allergic reactions (rare, monitored closely)" },
    { text: "Minor bruising after injections or blood draws" }
  ],
  url: "general-medicine"
}















  ];

  const { name } = useParams();



  const handleMore = (data) => {

    navigate(`/department/${data.toLowerCase().replace(/\s+/g, '-')}`)
  }
  

    useEffect(() => {
  window.scrollTo(0, 0);
  }, []);  



  useEffect(() => {
    const findServiceDetail = serviceDetails.find(val => val.url === name);

    setActiveService(findServiceDetail);
  }, [name])










  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    // { label: 'Treatment' },
    { label: 'Treatment' },

  ];


  return (
    <div className=" bg-gray-50">

      <ServiceBreadcums items={breadcrumbItems} headText={activeService?.departmentTitle} image={activeService?.image} />

      {!activeService ? <p className='text-center py-20 mx-auto text-bold text-3xl'>No data</p> :

        <div>
          {/* Main Content */}
          <div className="container mx-auto lg:px-12 px-4 sm:px-6 md:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Left Content */}
              <div className="lg:col-span-2 space-y-4">
                
          <div className="bg-white">
            <div className="py-4 mx-auto px-4   rounded-xl shadow-lg border border-gray-200">
              <div className="w-full">
                <h1 className="lg:text-4xl text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {activeService?.departmentTitle}
                </h1>
                <p className="text-xl text-gray-600">
                  {activeService?.subtitle}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-full">
                  {activeService?.heroDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: primaryColor }}>
                    Book Appointment
                  </button>
                  <button className="border-2 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors" style={{ borderColor: secondaryColor, color: secondaryColor }}>
                    <a href="tel:+917897934949" className="flex items-center">
                      <Phone className="mr-2 w-5 h-5" />
                      Call Now
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>

                {/* Statistics Section */}
                <div className="bg-white rounded-lg py-8 px-4 shadow-sm border border-gray-200">
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Activity className="w-8 h-8 mr-3" style={{ color: primaryColor }} />
                    {activeService?.treatmentExperienceTitle}
                  </h2>

                  <p className="text-gray-700 mb-8 text-lg leading-relaxed text-justify">
                    {activeService?.treatmentExperienceDesc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {activeService?.caseStats && activeService?.caseStats.map((stat, index) => (
                      <div key={index} className="border border-gray-200 py-2 px-2 rounded-lg">
                        <div className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                          {stat.count}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</div>
                        <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          {activeService?.successRateTitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {activeService?.successRateDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Content Sections */}
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                  {/* Conditions We Treat */}
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold text-gray-900 mb-2">{activeService?.conditionsTitle}</h2>
                  <p className="text-gray-700 mb-6 text-lg">{activeService?.conditionsDesc}</p>

                  <div className="space-y-3 mb-10">
                    {activeService?.conditionsTreated && activeService?.conditionsTreated.map((condition, index) => (
                      <div key={index} className="border border-gray-200 p-3 rounded-md hover:shadow transition-shadow bg-gray-50">
                        <p className="text-gray-800">{condition}</p>
                      </div>
                    ))}
                  </div>

                  {/* Procedures & Surgeries */}
                  <h2 className="lg:text-3xl text-xl md:text-2xl font-bold text-gray-900 mb-2">{activeService?.proceduresTitle}</h2>
                  <p className="text-gray-700 mb-6 text-lg">{activeService?.proceduresDesc}</p>

                  <div className="overflow-x-auto mb-10">
                    <table className="w-full border border-gray-300 text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">Procedure</th>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeService?.procedures && activeService?.procedures.map((procedure, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border border-gray-300 font-medium" style={{ color: primaryColor }}>{procedure.name}</td>
                            <td className="px-4 py-3 border border-gray-300 text-gray-700">{procedure.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Treatment & Rehabilitation */}
                  <h2 className="lg:text-3xl text-xl md:text-2x font-bold text-gray-900 mb-2">{activeService?.rehabTitle}</h2>
                  <p className="text-gray-700 mb-6 text-lg">{activeService?.rehabDesc}</p>

                  <div className="overflow-x-auto mb-10">
                    <table className="w-full table-auto border border-gray-300 text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">Title</th>
                          <th className="px-4 py-2 border border-gray-300 font-semibold text-gray-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeService?.treatments && activeService?.treatments.map((treatment, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border border-gray-300 font-medium">{treatment.title}</td>
                            <td className="px-4 py-3 border border-gray-300 text-gray-700">{treatment.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Symptoms to Watch Out For */}
                  <h2 className="lg:text-3xl text-xl md:text-2x font-bold text-gray-900 mb-2">{activeService?.symptomsTitle}</h2>
                  <p className="text-gray-700 mb-6 text-lg">{activeService?.symptomsDesc}</p>

                  <div className="space-y-3 mb-10">
                    {activeService?.symptoms && activeService?.symptoms.map((symptom, index) => (
                      <div key={index} className="p-4 rounded-md border border-gray-300 bg-gray-100">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <p className="text-gray-800">{symptom.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Side Effects */}
                  <h2 className="lg:text-3xl text-xl md:text-2x font-bold text-gray-900 mb-2">{activeService?.sideEffectsTitle}</h2>
                  <p className="text-gray-700 mb-6 text-lg">{activeService?.sideEffectsDesc}</p>

                  <div className="space-y-3">
                    {activeService?.sideEffects && activeService?.sideEffects.map((effect, index) => (
                      <div key={index} className="p-4 rounded-md border border-gray-300 bg-gray-100">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <p className="text-gray-800">{effect.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - You can add additional content here */}
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
                    <h3 className="text-xl font-bold text-red-800 mb-2">Cardiac Emergency</h3>
                    <p className="text-red-700 text-sm mb-4">24/7 Emergency Cardiac Care</p>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <a href="tel:+917897934949" className="hover:underline">
                        +91-7897934949
                      </a>
                    </div>
                  </div>
                </div>

              </div>




            </div>
          </div>
        </div>
      }

    </div>





  );
};

export default OrthopaedicDepartment;