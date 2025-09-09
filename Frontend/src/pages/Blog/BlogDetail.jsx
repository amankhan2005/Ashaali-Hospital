import { useState, useEffect } from 'react';
import BreadcrumbComponent from '../../components/Breadcums';
import { MessageCircleQuestion } from 'lucide-react';
import { href, useNavigate, useParams } from 'react-router-dom';

import img1 from '../../assets/blog/blog1.jpeg'
import img2 from '../../assets/blog/blog2.jpeg'
import img3 from '../../assets/blog/blog3.jpeg'
import img4 from '../../assets/blog/blog4.jpeg'
import img5 from '../../assets/blog/blog5.jpeg'
import img6 from '../../assets/blog/blog6.jpeg'
import ServiceBreadcums from '../service/ServiceBrad';

const BlogDetails = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { detail } = useParams()



const blogPosts = [
  {
    id: 1,
    title: "Understanding Cardiovascular Health and Heart Disease Prevention",
    excerpt: "Cardiovascular diseases are the leading cause of death globally. Learn about coronary artery disease, arrhythmias, heart failure, and preventive cardiology measures including lifestyle modifications and medical interventions.",
    content: `Cardiovascular health is the foundation of a long and active life. Cardiovascular diseases (CVDs) are the leading cause of death globally, affecting millions each year. They include coronary artery disease, heart failure, arrhythmias, and congenital heart defects. One of the most common forms is atherosclerosis, a condition where plaque builds up in the arteries, narrowing them and restricting blood flow.

Prevention begins with lifestyle. A heart-healthy diet emphasizes fruits, vegetables, whole grains, lean proteins, and healthy fats like omega-3s. Physical activity for at least 30 minutes a day improves blood circulation and strengthens the heart muscle. Avoiding tobacco and limiting alcohol are essential. 

Risk factors such as hypertension, high cholesterol, diabetes, obesity, and sedentary behavior significantly raise the chances of developing CVDs. Regular screening and check-ups can detect problems early. Blood pressure monitors, lipid profiles, HbA1c tests, and ECGs are part of routine preventive assessments.

Modern cardiology offers tools like echocardiograms, stress tests, cardiac MRIs, and angiography to evaluate heart function. Treatment ranges from medications like beta-blockers, ACE inhibitors, and anticoagulants to interventional procedures like angioplasty and bypass surgery.

Post-diagnosis, cardiac rehabilitation helps patients recover through supervised physical training, dietary guidance, and emotional support. Community programs, telemedicine, and health apps are making heart care more accessible. Mental health is often overlooked but plays a crucial role—stress and depression can worsen heart conditions.

Ultimately, awareness, early intervention, and sustained lifestyle changes make a significant difference. A proactive approach can delay or prevent the onset of cardiovascular disease entirely.`,
    image: img1,
    author: "Dr. Sarah Johnson",
    date: "April 15, 2025",
    category: "Cardiology",
    slug: "understanding-cardiovascular-health-and-heart-disease-prevention"
  },
  {
    id: 2,
    title: "Advanced Oncology Treatments and Cancer Care Management",
    excerpt: "Explore comprehensive cancer treatment modalities including chemotherapy, radiotherapy, immunotherapy, and surgical oncology. Our multidisciplinary approach ensures personalized care for various malignancies and tumor types.",
    content: `Cancer, once considered a terminal illness, is now increasingly being treated with a multidisciplinary and holistic approach. Modern oncology has expanded to include not only chemotherapy and radiotherapy but also immunotherapy, hormone therapy, and precision medicine.

Each cancer type—be it breast, lung, colorectal, prostate, or blood cancers—has its own unique treatment roadmap. The TNM staging system helps classify cancer based on tumor size, lymph node involvement, and metastasis. Biopsies, PET scans, molecular testing, and MRI imaging are used to determine treatment strategies.

Chemotherapy, which uses drugs to kill rapidly dividing cells, may be administered orally, intravenously, or via injections. Radiation therapy uses high-energy rays to target tumors. Newer forms like proton therapy offer better precision. Immunotherapy stimulates the patient’s immune system to identify and destroy cancer cells. CAR T-cell therapy, checkpoint inhibitors, and cancer vaccines are notable advancements in this area.

Surgical oncology focuses on tumor removal with minimal damage to surrounding tissues. In cases like breast cancer, reconstructive surgery is part of treatment. Targeted therapy identifies mutations in cancer cells and blocks them, minimizing damage to healthy tissue.

In addition to treatment, managing side effects like nausea, fatigue, hair loss, and infections is vital. Nutritionists, psychologists, and palliative care teams ensure comprehensive care. Cancer survivors benefit from rehabilitation and routine screening to monitor recurrence.

Support groups and tele-oncology services empower patients and families through education and emotional support. Today’s oncology is about more than just surviving cancer—it's about living well through and beyond it.`,
    image: img2,
    author: "Dr. Michael Chen",
    date: "April 12, 2025",
    category: "Oncology",
    slug: "advanced-oncology-treatments-and-cancer-care-management"
  },
  {
    id: 3,
    title: "Emergency Medicine and Critical Care Protocols",
    excerpt: "Our emergency department handles trauma cases, acute medical conditions, and life-threatening emergencies. Learn about triage protocols, CPR procedures, and intensive care unit management for critical patients.",
    content: `Emergency medicine is the frontline of healthcare, dealing with life-threatening conditions that require immediate action. Emergency departments (EDs) are designed to triage, stabilize, and initiate treatment for critically ill or injured patients.

Triage ensures that patients with the most urgent needs receive care first. Upon arrival, vital signs are checked and conditions are categorized. Time-sensitive emergencies include cardiac arrest, stroke, sepsis, trauma, and respiratory failure.

CPR and Advanced Cardiac Life Support (ACLS) protocols are implemented in cases of cardiac arrest. Airway management includes intubation, bag-valve-mask ventilation, or emergency tracheotomy. Point-of-care ultrasound and rapid imaging such as CT scans are critical diagnostic tools.

The ICU (Intensive Care Unit) is reserved for patients requiring constant monitoring and advanced life support. Mechanical ventilation, vasopressors, dialysis, and sedation are common here. Nurses and physicians work around the clock to monitor vital parameters.

In trauma cases, the golden hour is critical. Trauma surgeons, orthopedists, and neurosurgeons may be involved. Emergency care also covers toxicology (e.g., poison ingestion), burns, anaphylaxis, and psychiatric emergencies.

Disaster response protocols prepare staff for mass casualty events like natural disasters, fires, and pandemics. Training, simulation drills, and checklists improve readiness. Communication, coordination with ambulance services, and access to emergency equipment make all the difference.

Post-care involves transition to specialized units, rehabilitation, and psychological counseling. Emergency medicine combines speed, skill, and compassion to save lives under pressure.`,
    image: img3,
    author: "Dr. Emily Rodriguez",
    date: "April 10, 2025",
    category: "Emergency Medicine",
    slug: "emergency-medicine-and-critical-care-protocols"
  },
  {
    id: 4,
    title: "Orthopedic Surgery and Musculoskeletal Disorders Treatment",
    excerpt: "Comprehensive orthopedic care including joint replacement surgery, arthroscopy, fracture repair, and sports medicine. Treatment for conditions like osteoarthritis, osteoporosis, and musculoskeletal injuries.",
    content: `Orthopedic medicine treats injuries and disorders of the bones, joints, ligaments, tendons, and muscles. It plays a key role in restoring mobility, relieving pain, and improving the quality of life for patients of all ages.

Common orthopedic issues include osteoarthritis, rheumatoid arthritis, fractures, dislocations, back pain, ligament tears, and bone deformities. Diagnostics include X-rays, MRIs, CT scans, and bone density testing.

Non-surgical treatments involve physical therapy, joint injections (e.g., corticosteroids, hyaluronic acid), orthotics, and medications like NSAIDs or bisphosphonates. Bracing and immobilization may be used to treat sprains or fractures.

Surgical interventions include joint replacement (hip, knee, shoulder), spinal surgeries, arthroscopic procedures for ligament tears, and correction of congenital deformities. Minimally invasive techniques and robotic-assisted surgery reduce recovery time and scarring.

Postoperative care includes pain control, physiotherapy, occupational therapy, and regular monitoring for complications like infections or blood clots. Rehabilitation focuses on regaining full joint function and muscle strength.

Bone health maintenance is essential—especially in postmenopausal women and the elderly. Weight-bearing exercises, calcium and vitamin D supplements, and fall-prevention strategies reduce fracture risk.

Orthopedic care is also important in sports medicine, helping athletes recover from ACL tears, rotator cuff injuries, and stress fractures. Preventive training, ergonomic assessments, and early intervention can help avoid chronic musculoskeletal issues.

By combining technology, rehabilitation, and personalized treatment plans, orthopedic surgery restores movement and freedom.`,
    image: img4,
    author: "Dr. Robert Thompson",
    date: "April 8, 2025",
    category: "Orthopedics",
    slug: "orthopedic-surgery-and-musculoskeletal-disorders-treatment"
  },
  {
    id: 5,
    title: "Neurological Disorders and Brain Health Management",
    excerpt: "Our neurology department treats conditions like stroke, epilepsy, Parkinson's disease, multiple sclerosis, and Alzheimer's disease. Advanced diagnostic tools including MRI, CT scans, and EEG for accurate diagnosis.",
    content: `Neurological disorders are complex conditions that affect the nervous system—brain, spinal cord, and peripheral nerves. With the rise in life expectancy and lifestyle-related disorders, neurology has gained increasing significance in modern medicine.

Common disorders include Alzheimer’s disease, Parkinson’s disease, epilepsy, migraines, stroke, multiple sclerosis, neuropathies, and spinal cord injuries. Symptoms range from memory loss, tremors, seizures, paralysis, to chronic pain and cognitive decline.

Diagnosis requires a detailed clinical history, neurological exams, and investigations like MRI, CT scans, EEGs, EMGs, lumbar punctures, and sometimes genetic testing. Functional MRIs and PET scans offer insights into brain metabolism and structure.

Treatment involves medications like antiepileptics, dopaminergic drugs, corticosteroids, and neuromodulators. Surgery may be required for tumor removal, seizure control (e.g., lobectomy), or decompression. Deep Brain Stimulation (DBS) is a revolutionary treatment for Parkinson’s and dystonia.

Rehabilitation is crucial—physiotherapy, speech therapy, occupational therapy, and cognitive rehabilitation improve outcomes. For degenerative conditions, palliative care and support systems enhance patient comfort and dignity.

Brain health can be preserved with a balanced diet, regular exercise, cognitive training, mental wellness practices, and good sleep hygiene. Early detection of subtle neurological symptoms leads to better prognosis.

Neurologists also manage acute events like stroke—where clot-busting drugs and rapid interventions can prevent permanent disability. The future of neurology lies in personalized medicine, AI-assisted diagnostics, and neuroplasticity-based interventions.`,
    image: img5,
    author: "Dr. Lisa Parker",
    date: "April 5, 2025",
    category: "Neurology",
    slug: "neurological-disorders-and-brain-health-management"
  },
  {
    id: 6,
    title: "Pediatric Medicine and Child Healthcare Services",
    excerpt: "Specialized pediatric care for infants, children, and adolescents. Treatment for pediatric conditions including vaccinations, growth disorders, pediatric surgery, and developmental assessments.",
    content: `Pediatric medicine covers the comprehensive health care of infants, children, and adolescents. From birth to teenage years, children go through multiple growth stages—each with unique physical, emotional, and developmental needs.

Pediatricians manage routine check-ups, vaccinations, growth charts, and developmental screenings. They treat common ailments like fever, infections, allergies, asthma, nutritional deficiencies, and minor injuries. Conditions like congenital heart disease, type 1 diabetes, or ADHD are also managed by pediatric specialists.

Vaccination schedules are carefully maintained to protect against diseases like measles, polio, hepatitis, and more. Nutrition plays a key role in physical and cognitive development—breastfeeding is recommended during infancy, followed by weaning with iron-rich and vitamin-packed foods.

Pediatric surgery handles conditions like hernias, appendicitis, cleft lip/palate, and undescended testes. Neonatology deals with preterm births, jaundice, and respiratory distress in newborns. Adolescent medicine focuses on puberty-related issues, menstrual health, and behavioral problems.

Pediatricians are also vital in identifying and managing developmental delays or disorders such as autism, speech impairments, and dyslexia. Early intervention programs ensure optimal outcomes.

Child-friendly clinics, colorful environments, and compassionate communication are essential. Pediatricians also educate parents on sleep patterns, emotional bonding, toilet training, and screen time management.

Digital tools now assist in tracking vaccinations, teleconsultations, and health monitoring. School health programs and community outreach strengthen pediatric care coverage.

A healthy childhood is the foundation for a healthy adulthood. Investing in pediatric health today ensures a stronger tomorrow.`,
    image: img6,
    author: "Dr. Amanda Wilson",
    date: "April 3, 2025",
    category: "Pediatrics",
    slug: "pediatric-medicine-and-child-healthcare-services"
  }
];








  useEffect(() => {
   
  
    const post = blogPosts.find(post => post.slug === detail);

    if (!post) {
        setCurrentPost(blogPosts[0])
          setRelatedPosts(blogPosts[0]);
    } else {
      setCurrentPost(post);
      const related = blogPosts.filter(p => p.category === post.category && p.id !== post.id);
      setRelatedPosts(related);
    }
    setIsLoading(false);
  }, [detail]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blogs' },
    { label: currentPost?.title },

  ]

  // useEffect(() => {
  // window.scrollTo(0, 0);
  // }, []);  


  return (
    <div className="bg-gray-50 w-full ">


      {/* <BreadcrumbComponent headText={currentPost?.title} items={breadcrumbItems} /> */}

         <ServiceBreadcums items={breadcrumbItems} headText={currentPost?.title} image={currentPost.image}/>

      {/* Content */}
      <main className="w-full mx-auto lg:px-10 px-4 md:px-8  py-8  ">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="py-4 px-2">
                <div className='text-[#18978d] lg:text-3xl text-2xl font-extrabold mb-4'>
                  {currentPost?.title}
                </div>
                <div className="prose max-w-none text-justify">
         
                  <p>{currentPost?.content}</p>
                </div>




              </div>
            </div>


          </div>


          {/* Sidebar */}
          <div className="lg:w-[20rem]">



            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md lg:p-6 mb-6 cursor-pointer">
              <h3 className="font-semibold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} onClick={() => navigate(`/blogs/${post?.slug}`)} className="flex gap-3 group">
                    <div className="w-20 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm group-hover:text-[#3F8BA1] line-clamp-2">{post.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="bg-[#18978d] rounded-lg p-6 text-white">
              <div className="flex justify-center mb-4">
                <MessageCircleQuestion size={48} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Need help?</h2>
              <p className="text-center text-sm mb-4">
                Schedule your initial consultation today and start your journey towards a pain-free, healthier smile. Contact us now!
              </p>
              <div className="flex justify-center">
                <button className="bg-white text-[#3F8BA1] rounded-full px-4 py-2 flex items-center cursor-pointer" onClick={() => navigate("/contact")}>
                  Contact Us
                  <span className="ml-2 bg-[#3F8BA1] rounded-full p-1 text-white">
                    <MessageCircleQuestion size={16} />
                  </span>
                </button>
              </div>
            </div>


          </div>



        </div>


      </main>





    </div>
  )
}

export default BlogDetails