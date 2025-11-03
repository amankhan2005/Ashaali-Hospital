 import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, RefreshCw, Eye, Briefcase, Users, CheckCircle, XCircle } from "lucide-react";

export default function JobsAdmin() {
  // ---- Safe API base (no trailing slash). If undefined, we'll still build relative paths for dev proxy.
  const RAW_API = import.meta.env.VITE_API_URL || "";
  const API_BASE = RAW_API.replace(/\/+$/, ""); // "http://localhost:5000"
  const build = (p) => `${API_BASE}${p}`;       // build("/api/career/...")

  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    isActive: true,
  });

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApps, setLoadingApps] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  /* -------------------- LOAD JOBS -------------------- */
  const loadJobs = async () => {
    setLoadingJobs(true);
    setErr(null);
    try {
      if (!API_BASE) {
        throw new Error("VITE_API_URL is not defined. Set it in your .env (e.g., http://localhost:5000)");
      }
      const { data } = await axios.get(build(`/api/career/positions`));
      setJobs(Array.isArray(data) ? data : data.jobs || []);
    } catch (error) {
      console.error("❌ Error fetching jobs:", error);
      setErr(error?.response?.data?.message || error.message || "Failed to fetch jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  /* -------------------- LOAD APPLICATIONS -------------------- */
  const loadApplications = async () => {
    setLoadingApps(true);
    setErr(null);
    try {
      if (!API_BASE) {
        throw new Error("VITE_API_URL is not defined. Set it in your .env (e.g., http://localhost:5000)");
      }
      const { data } = await axios.get(build(`/api/career/applications`));
      setApplications(data?.rows || []);
    } catch (error) {
      console.error("❌ Error fetching applications:", error);
      setErr(error?.response?.data?.message || error.message || "Failed to fetch applications");
    } finally {
      setLoadingApps(false);
    }
  };

  /* -------------------- ADD JOB -------------------- */
  const handleAddJob = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!form.title.trim()) {
      setMsg({ type: "error", text: "Title is required" });
      return;
    }
    try {
      if (!API_BASE) {
        throw new Error("VITE_API_URL is not defined. Set it in your .env (e.g., http://localhost:5000)");
      }
      await axios.post(build(`/api/career/positions`), form);
      setMsg({ type: "success", text: "Job posted successfully!" });
      setForm({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        description: "",
        isActive: true,
      });
      loadJobs();
    } catch (error) {
      console.error("❌ Add job error:", error);
      setMsg({ type: "error", text: error?.response?.data?.message || "Failed to add job" });
      setErr(error?.response?.data?.message || error.message || "Failed to add job");
    } finally {
      setTimeout(() => setMsg(null), 2500);
    }
  };

  /* -------------------- DELETE JOB -------------------- */
  const handleDelete = async (id) => {
    setErr(null);
    if (!confirm("Delete this job?")) return;
    try {
      if (!API_BASE) {
        throw new Error("VITE_API_URL is not defined. Set it in your .env (e.g., http://localhost:5000)");
      }
      await axios.delete(build(`/api/career/positions/${id}`));
      loadJobs();
    } catch (error) {
      console.error("❌ Delete job error:", error);
      setErr(error?.response?.data?.message || error.message || "Failed to delete job");
    }
  };

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  useEffect(() => {
    loadJobs();
    loadApplications();
    console.log("VITE_API_URL =", RAW_API || "(undefined)");
  }, []);

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Career Admin Panel</h1>
          <p className="text-gray-600">Manage job postings and review applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{jobs.filter(j => j.isActive).length}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Briefcase className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-xl">
                <Users className="text-indigo-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Global errors */}
        {err && (
          <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 shadow-sm">
            <div className="flex items-center gap-2">
              <XCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-700 font-medium">{err}</p>
            </div>
          </div>
        )}

        {/* ---------- Add Job Form ---------- */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Plus className="text-blue-600" size={20} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Post New Job</h2>
          </div>

          <form onSubmit={handleAddJob}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. React Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tech / HR / Marketing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Lucknow / Remote"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Short description about the role..."
              />
            </div>

            <label className="flex items-center gap-3 mt-6 cursor-pointer group">
              <input 
                type="checkbox" 
                name="isActive" 
                checked={form.isActive} 
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Active Job</span>
            </label>

            {msg && (
              <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                msg.type === "success" 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-red-50 border border-red-200"
              }`}>
                {msg.type === "success" ? (
                  <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                ) : (
                  <XCircle className="text-red-600 flex-shrink-0" size={18} />
                )}
                <p className={`text-sm font-medium ${
                  msg.type === "success" ? "text-green-700" : "text-red-700"
                }`}>
                  {msg.text}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Post Job
            </button>
          </form>
        </div>

        {/* ---------- Jobs List ---------- */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Briefcase className="text-indigo-600" size={20} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">All Jobs ({jobs.length})</h2>
            </div>
            <button 
              onClick={loadJobs} 
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              <RefreshCw size={16} /> Refresh
            </button>
          </div>

          {loadingJobs ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No jobs posted yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                        {job.isActive && (
                          <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          {job.department || "-"}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          {job.location || "-"}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white flex items-center gap-2 hover:bg-red-700 transition-colors font-medium shadow-sm hover:shadow"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- Applications List ---------- */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Users className="text-indigo-600" size={20} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Applications ({applications.length})</h2>
            </div>
            <button 
              onClick={loadApplications} 
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              <RefreshCw size={16} /> Refresh
            </button>
          </div>

          {loadingApps ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No applications submitted yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-700 border-b border-gray-200">Name</th>
                    <th className="p-4 text-left font-semibold text-gray-700 border-b border-gray-200">Email</th>
                    <th className="p-4 text-left font-semibold text-gray-700 border-b border-gray-200">Phone</th>
                    <th className="p-4 text-left font-semibold text-gray-700 border-b border-gray-200">Position</th>
                    <th className="p-4 text-left font-semibold text-gray-700 border-b border-gray-200">Date</th>
                    <th className="p-4 text-left font-semibold text-gray-700 border-b border-gray-200">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a, idx) => {
                    const link = a?.resume?.path
                      ? a.resume.path.startsWith("http")
                        ? a.resume.path
                        : "/" + a.resume.path.replace(/^\/+/, "")
                      : null;

                    return (
                      <tr key={a._id} className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="p-4 border-b border-gray-200 font-medium text-gray-900">{a.fullName}</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">{a.email}</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">{a.phone}</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">{a.jobTitle}</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">{new Date(a.createdAt).toLocaleString("en-IN")}</td>
                        <td className="p-4 border-b border-gray-200">
                          {link ? (
                            <a 
                              href={link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium hover:underline"
                            >
                              <Eye size={16} /> View
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}