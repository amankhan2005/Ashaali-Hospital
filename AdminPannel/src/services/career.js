 import API from "../api/axios";

const CAREER_BASE = "/api/career"; // ✅ add /api

const CareerAPI = {
  getJobs: (params = {}) => API.get(`${CAREER_BASE}/positions`, { params }),
  addJob: (payload) => API.post(`${CAREER_BASE}/positions`, payload),
  toggleJob: (id) => API.put(`${CAREER_BASE}/positions/${id}/toggle`),
  deleteJob: (id) => API.delete(`${CAREER_BASE}/positions/${id}`),
  getApplications: (params = {}) => API.get(`${CAREER_BASE}/applications`, { params }),
  applyJob: (formData) =>
    API.post(`${CAREER_BASE}/save`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default CareerAPI;
