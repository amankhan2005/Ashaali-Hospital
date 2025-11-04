 import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Users,
  Trophy,
  Clock,
  Upload,
  AlertCircle,
  CheckCircle,
  Briefcase,
  MapPin,
  ChevronRight,
  Heart,
  Award,
  GraduationCap,
  Stethoscope,
  Building2,
  CalendarCheck,
  X,
} from 'lucide-react';
import axios from 'axios';

const CareerPage = () => {
  // ---------- FORM STATE ----------
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobId: '',
    jobTitle: '',
    resume: null,
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const fileInputRef = useRef(null);

  // NEW: refs for smooth scroll + focusing
  const formSectionRef = useRef(null);
  const jobSelectRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For phone validation UI
  const [phoneTouched, setPhoneTouched] = useState(false);
  const phoneValid = /^[6-9]\d{9}$/.test(formData.phone);

  // ---------- JOBS STATE (DYNAMIC) ----------
  const API_BASE = import.meta.env.VITE_API_URL;
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');

  // UI filters
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('All');
  const [dept, setDept] = useState('All');

  // Fetch jobs on mount
  useEffect(() => {
    let cancelled = false;
    const fetchJobs = async () => {
      setJobsLoading(true);
      setJobsError('');
      try {
        const res = await axios.get(`${API_BASE}/api/career/positions`, {});
        if (!cancelled) {
          const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
          setJobs(list);
        }
      } catch (err) {
        if (!cancelled) {
          setJobsError(
            err?.response?.data?.message || 'Could not load open positions. Please try again.'
          );
        }
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    };
    fetchJobs();
    return () => {
      cancelled = true;
    };
  }, [API_BASE]);

  // NEW: if arriving with ?jobId=... (or ?id=... or ?title=...) preselect + scroll
  useEffect(() => {
    if (!jobs || jobs.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const byId = params.get('jobId') || params.get('id');
    const byTitle = params.get('title');

    let selected = null;
    if (byId) {
      selected = jobs.find(j => String(j._id) === String(byId));
    } else if (byTitle) {
      const t = byTitle.toLowerCase();
      selected = jobs.find(j => j?.title?.toLowerCase() === t);
    }

    if (selected) {
      setFormData(p => ({ ...p, jobId: String(selected._id), jobTitle: selected.title }));
      setTimeout(() => {
        setIsModalOpen(true);
        jobSelectRef.current?.focus();
      }, 0);
    }
  }, [jobs]);

  // Derived filter options
  const locations = useMemo(() => {
    const set = new Set();
    jobs.forEach(j => j?.location && set.add(j.location));
    return ['All', ...Array.from(set)];
  }, [jobs]);

  const departments = useMemo(() => {
    const set = new Set();
    jobs.forEach(j => j?.department && set.add(j.department));
    return ['All', ...Array.from(set)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const byQ =
        !q ||
        j?.title?.toLowerCase().includes(q.toLowerCase()) ||
        j?.department?.toLowerCase().includes(q.toLowerCase()) ||
        j?.location?.toLowerCase().includes(q.toLowerCase());
      const byLoc = loc === 'All' || j?.location === loc;
      const byDept = dept === 'All' || j?.department === dept;
      return byQ && byLoc && byDept;
    });
  }, [jobs, q, loc, dept]);

  // ---------- HELPERS ----------
  const scrollToForm = () => {
    setIsModalOpen(true);
  };

  const handleApply = (job) => {
    setFormData(p => ({ ...p, jobId: String(job._id), jobTitle: job.title }));
    setTimeout(() => {
      setIsModalOpen(true);
      jobSelectRef.current?.focus();
    }, 0);
  };

  // ---------- HANDLERS ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'jobId') {
      const selected = jobs.find(j => String(j._id) === String(value));
      setFormData(p => ({
        ...p,
        jobId: value,
        jobTitle: selected?.title || (value === 'other' ? 'Other' : ''),
      }));
      return;
    }

    if (name === 'phone') {
      const onlyDigits = value.replace(/\D/g, '').slice(0, 10);
      setFormData(p => ({ ...p, phone: onlyDigits }));
      return;
    }

    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFormData(p => ({ ...p, resume: null }));
      return;
    }
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowed.includes(file.type)) {
      setFormStatus({ submitted: false, error: true, message: 'Please upload PDF, DOC or DOCX only.' });
      e.target.value = '';
      return;
    }
    if (file.size > maxSize) {
      setFormStatus({ submitted: false, error: true, message: 'File must be 5MB or smaller.' });
      e.target.value = '';
      return;
    }
    setFormStatus({ submitted: false, error: false, message: '' });
    setFormData(p => ({ ...p, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneValid) {
      setPhoneTouched(true);
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please enter a valid 10-digit Indian mobile number starting with 6–9.',
      });
      return;
    }

    const { fullName, email, phone, jobId, jobTitle, resume } = formData;
    if (!fullName || !email || !phone || !(jobId || jobTitle) || !resume) {
      setFormStatus({ submitted: false, error: true, message: 'Please fill out all required fields before submitting.' });
      return;
    }

    try {
      setLoadingSubmit(true);
      setFormStatus({ submitted: false, error: false, message: '' });

      const data = new FormData();
      data.append('fullName', fullName?.trim());
      data.append('email', email?.trim());
      data.append('phone', phone?.trim());

      const selectedJob = jobs.find(j => String(j._id) === String(jobId));
      const finalTitle =
        (jobTitle && jobTitle.trim()) ||
        selectedJob?.title ||
        (jobId === 'other' ? 'Other' : '');

      if (jobId && jobId !== 'other') data.append('jobId', String(jobId));
      data.append('jobTitle', finalTitle);
      data.append('resume', resume);

      const res = await axios.post(`${API_BASE}/api/career/save`, data, {
        headers: { Accept: 'application/json' },
        withCredentials: false,
      });

      setFormStatus({ submitted: true, error: false, message: 'Application submitted successfully.' });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        jobId: '',
        jobTitle: '',
        resume: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      const status = err?.response?.status;
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Something went wrong while submitting. Please try again.';
      setFormStatus({ submitted: false, error: true, message: status ? `(${status}) ${apiMsg}` : apiMsg });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormStatus({ submitted: false, error: false, message: '' });
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 text-white overflow-hidden" style={{ height: '60vh' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-14 md:py-14 relative h-full flex items-center">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="inline-block">
                Shape the Future of&nbsp;
              </span>
              <span className="inline-block">
                Medical Excellence
              </span>
            </h1>
            
            <p className="text-xl md:text-xl text-teal-50 mb-10 leading-relaxed max-w-4xl mx-auto">
              Join Ashaali Hospital's team of distinguished healthcare professionals delivering world-class care in Orthopedics, Ophthalmology, Gynecology, and Neurosurgery
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions - Now right after Hero */}
      <div className="bg-white py-12" id="open-positions">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-2xl text-gray-800 max-w-4xl mx-auto">
              Explore exciting career opportunities across various specializations
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-10">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                  placeholder="Search positions, departments..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <select
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                >
                  {departments.map(d => (
                    <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                >
                  {locations.map(l => (
                    <option key={l} value={l}>{l === 'All' ? 'All Locations' : l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {jobsLoading && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading available positions...</p>
              </div>
            </div>
          )}

          {!jobsLoading && jobsError && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 flex items-start gap-4">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to Load Positions</h3>
                  <p className="text-red-700">{jobsError}</p>
                </div>
              </div>
            </div>
          )}

          {!jobsLoading && !jobsError && (
            <div className="max-w-6xl mx-auto">
              {filteredJobs.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <Briefcase size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Positions Found</h3>
                  <p className="text-gray-500">Try adjusting your search filters or check back soon for new opportunities.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <div key={job._id} className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-teal-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              {job.department && (
                                <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3 py-1 rounded-lg font-medium">
                                  <Briefcase size={14} /> {job.department}
                                </span>
                              )}
                              {job.location && (
                                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-medium">
                                  <MapPin size={14} /> {job.location}
                                </span>
                              )}
                              {job.type && (
                                <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-lg font-medium">
                                  <Clock size={14} /> {job.type}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {job.description && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {job.description}
                          </p>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleApply(job)}
                        className="mt-auto w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all duration-300 inline-flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        Apply for this Position
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Why Join Us - Now after Job Roles */}
      <div className="py-10 md:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-4 font-medium">
              <Award size={18} />
              Why Ashaali Hospital
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Build Your Career With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a workplace that values innovation, collaboration, and continuous growth in patient care excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:-translate-y-1 flex flex-col h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Advanced Medical Technology</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Work with cutting-edge equipment and innovative treatment protocols that set industry standards for patient outcomes and care quality.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:-translate-y-1 flex flex-col h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Collaborative Excellence</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Join a multidisciplinary team of renowned specialists fostering a culture of knowledge sharing and collective growth.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:-translate-y-1 flex flex-col h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Continuous Learning</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Access to international conferences, specialized training programs, and mentorship from industry leaders to advance your expertise.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:-translate-y-1 flex flex-col h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Recognition & Rewards</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Competitive compensation packages, performance incentives, and comprehensive benefits recognizing your dedication and contributions.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:-translate-y-1 flex flex-col h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">State-of-the-Art Facilities</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Practice medicine in modern, patient-centered facilities designed for optimal clinical efficiency and comfort.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:-translate-y-1 flex flex-col h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CalendarCheck size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Work-Life Balance</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Flexible scheduling, wellness programs, and supportive policies ensuring you thrive both professionally and personally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't See Your Ideal Position Listed?
            </h2>
            <p className="text-xl text-teal-50 mb-10 leading-relaxed">
              We're always seeking exceptional healthcare professionals to join our growing team. Share your expertise with us, and we'll keep your profile for future opportunities that match your specialization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 font-semibold rounded-xl shadow-xl hover:bg-teal-50 transition-all duration-300 hover:scale-105 text-lg"
              >
                <Heart size={20} />
                Contact HR Department
              </button>
              <a
                href="tel:+918303212210"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 text-lg"
              >
                Call Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[11000] flex items-center justify-center p-3"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

          {/* Compact Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md h-[85vh] overflow-hidden border border-gray-200 flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-gray-600" />
            </button>

            {/* Content Wrapper */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {/* Success Screen */}
              {formStatus.submitted && !formStatus.error ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                   <p className="text-gray-600 text-center mb-8 px-4">
                    {formStatus.message || "Thank you for your application. We'll review it and contact you soon."}
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button
                      onClick={closeModal}
                      className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
                    >
                      Return to Careers
                    </button>
                    <button
                      onClick={() => {
                        closeModal();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3 bg-white text-teal-700 font-semibold rounded-lg border-2 border-teal-200 hover:bg-teal-50 transition-colors"
                    >
                      Explore More Positions
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Content */
                <>
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full mb-2 font-medium text-xs">
                      <Upload size={14} />
                      Submit Your Application
                    </div>
                    <h2 className="text-xl font-bold mb-1 text-gray-900">Start Your Journey With Us</h2>
                    <p className="text-sm text-gray-600">
                      Take the first step towards an exceptional career
                    </p>
                  </div>

                  {/* Error Display */}
                  {formStatus.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700">{formStatus.message}</p>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl p-4 shadow-md border border-gray-200 space-y-3"
                  >
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block mb-0.5 font-semibold text-gray-900 text-xs">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Only allow letters and spaces
                          if (/^[A-Za-z\s]*$/.test(value)) {
                            setFormData((p) => ({ ...p, fullName: value }));
                          }
                        }}
                        pattern="^[A-Za-z\s]{2,}$"
                        title="Enter a valid name (letters only, at least 2 characters)."
                        ref={firstFieldRef}
                        className={`w-full px-3 py-2 rounded-md border outline-none text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                          formData.fullName &&
                          (formData.fullName.length < 2 ? 'border-red-400 bg-red-50' : 'border-gray-300')
                        }`}
                        placeholder="Name"
                        required
                      />
                      {formData.fullName &&
                        formData.fullName.length > 0 &&
                        formData.fullName.length < 2 && (
                          <p className="text-xs text-red-600 mt-0.5 flex items-center gap-1">
                            <AlertCircle size={12} />
                            Must be at least 2 letters
                          </p>
                        )}
                    </div>

                    {/* Email + Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="email" className="block mb-0.5 font-semibold text-gray-900 text-xs">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
                          placeholder="Email"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block mb-0.5 font-semibold text-gray-900 text-xs">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          inputMode="numeric"
                          maxLength={10}
                          pattern="^[6-9]\d{9}$"
                          title="Enter a valid 10-digit mobile number starting with 6–9."
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={() => setPhoneTouched(true)}
                          className={`w-full px-3 py-2 rounded-md border outline-none text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                            phoneTouched && !phoneValid
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="Mobile Number"
                          required
                        />
                        {phoneTouched && !phoneValid && (
                          <p className="text-xs text-red-600 mt-0.5 flex items-center gap-1">
                            <AlertCircle size={12} />
                            Enter valid 10-digit number
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Position */}
                    <div>
                      <label htmlFor="jobId" className="block mb-0.5 font-semibold text-gray-900 text-xs">
                        Position *
                      </label>
                      <div className="relative">
                        <select
                          id="jobId"
                          name="jobId"
                          value={formData.jobId}
                          onChange={handleInputChange}
                          ref={jobSelectRef}
                          className="appearance-none w-full px-3 py-2 pr-8 rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
                          required
                          disabled={jobsLoading || (!!jobsError && jobs.length === 0)}
                        >
                          <option value="" disabled>
                            {jobsLoading ? 'Loading...' : 'Select position'}
                          </option>
                          {jobs.map((job) => (
                            <option key={job._id} value={job._id}>
                              {job.title}
                            </option>
                          ))}
                          <option value="other">Other / Not Listed</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                          ▼
                        </span>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label htmlFor="resumeUpload" className="block mb-0.5 font-semibold text-gray-900 text-xs">
                        Resume (PDF) *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center bg-gray-50 hover:bg-gray-100 transition">
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="resumeUpload"
                          name="resume"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) {
                              setFormData((p) => ({ ...p, resume: null }));
                              return;
                            }
                            const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
                            const maxSize = 5 * 1024 * 1024;
                            if (!isPdf) {
                              alert('Please upload PDF files only.');
                              e.target.value = '';
                              return;
                            }
                            if (file.size > maxSize) {
                              alert('File size must be 5MB or less.');
                              e.target.value = '';
                              return;
                            }
                            setFormData((p) => ({ ...p, resume: file }));
                          }}
                          className="hidden"
                          accept=".pdf,application/pdf"
                          required
                        />

                        <label htmlFor="resumeUpload" className="cursor-pointer block">
                          <div className="mx-auto w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-2">
                            <Upload size={18} className="text-white" />
                          </div>
                          {formData.resume ? (
                            <p className="text-teal-700 font-semibold text-xs flex items-center justify-center gap-1">
                              <CheckCircle size={12} />
                              {formData.resume.name}
                            </p>
                          ) : (
                            <p className="text-gray-700 font-medium text-xs">
                              Click to upload PDF (max 5MB)
                            </p>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            jobId: '',
                            jobTitle: '',
                            resume: null,
                          });
                          if (fileInputRef.current) fileInputRef.current.value = '';
                          setFormStatus({ submitted: false, error: false, message: '' });
                        }}
                        className="px-4 py-1.5 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition text-sm"
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        disabled={loadingSubmit}
                        className="px-5 py-1.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-md shadow hover:from-teal-700 hover:to-teal-600 transition text-sm flex items-center justify-center gap-1"
                      >
                        {loadingSubmit ? (
                          <>
                            <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit <ChevronRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPage;