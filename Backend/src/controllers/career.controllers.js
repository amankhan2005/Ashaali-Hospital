 import mongoose from "mongoose";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import mime from "mime";
import Job from "../models/job.model.js";
import Application from "../models/Application.model.js";

/* ----------------------------- EMAIL SETUP ----------------------------- */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

/* ------------------------------ UTILITIES ------------------------------ */
const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim());
const isValidPhoneIN = (s) => /^[6-9]\d{9}$/.test(String(s || "").trim());
const formatDateIST = (d) =>
  new Date(d).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

/* ------------------------------ EMAIL TEMPLATES ------------------------------ */
const adminEmailHtml = (brand, tagline, app, submittedAt, downloadUrl) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #18978d; margin: 0 0 8px;">${brand}</h2>
    <p style="margin: 0 0 4px;"><em>${tagline}</em></p>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;" />
    <p>Dear <strong>Admin</strong>,</p>
    <p>A new job application has been submitted via the Careers page.</p>
    <p><strong>Name:</strong> ${app.fullName}</p>
    <p><strong>Email:</strong> ${app.email}</p>
    <p><strong>Phone:</strong> ${app.phone}</p>
    <p><strong>Position:</strong> ${app.jobTitle}</p>
    <p><strong>Submitted:</strong> ${submittedAt}</p>
    ${ app?.resume?.url ? `<p><strong>Resume:</strong> <a href="${app.resume.url}" target="_blank">View</a> ${downloadUrl ? ` | <a href="${downloadUrl}" target="_blank">Download</a>` : ""}</p>` : `<p>Resume not available.</p>` }
    <br/>
    <p>Best Regards,</p>
    <p><strong>${brand}</strong></p>
  </div>
`;

const applicantEmailHtml = (brand, tagline, app, submittedAt) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #18978d; margin: 0 0 8px;">${brand}</h2>
    <p style="margin: 0 0 4px;"><em>${tagline}</em></p>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;" />
    <p>Dear <strong>${app.fullName}</strong>,</p>
    <p>Thank you for applying to <strong>${brand}</strong>. We have received your application for <strong>${app.jobTitle}</strong>.</p>
    <p><strong>Submitted:</strong> ${submittedAt}</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>${brand} HR Team</strong></p>
  </div>
`;

/* ------------------------------ CONTROLLERS ---------------------------- */

// GET /api/career/positions
export const getPositions = async (_req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("getPositions error:", error);
    return res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

// POST /api/career/positions
export const addPosition = async (req, res) => {
  try {
    const { title, department = "", location = "", type = "Full-time", description = "", isActive = true } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ message: "Title is required" });

    const job = await Job.create({
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: String(type || "Full-time").trim(),
      description,
      isActive: Boolean(isActive),
    });

    return res.status(201).json({ message: "Job added successfully", job });
  } catch (error) {
    console.error("addPosition error:", error);
    return res.status(500).json({ message: "Failed to add job", error: error.message });
  }
};

// DELETE /api/career/positions/:id
export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid job ID" });

    const job = await Job.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.status(200).json({ message: "Job deleted successfully", job });
  } catch (error) {
    console.error("deletePosition error:", error);
    return res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};

// POST /api/career/apply  (upload.single('resume'))
export const saveApplication = async (req, res) => {
  try {
    const { fullName, email, phone, jobId, jobTitle } = req.body || {};
    const file = req.file; // multer disk

    if (!fullName || !email || !phone || (!jobId && !jobTitle)) {
      return res.status(400).json({ message: "fullName, email, phone and either jobId or jobTitle are required" });
    }
    if (!file) {
      return res.status(400).json({ message: "Resume file is required (PDF/DOC/DOCX, max 5MB)" });
    }

    const name = fullName.trim();
    const mail = email.trim().toLowerCase();
    const phoneNum = phone.trim();

    if (!isValidEmail(mail)) return res.status(400).json({ message: "Invalid email format" });
    if (!isValidPhoneIN(phoneNum)) return res.status(400).json({ message: "Invalid phone number" });

    let finalTitle = (jobTitle ? jobTitle.trim() : "") || "Other";
    if (jobId && mongoose.isValidObjectId(jobId)) {
      const job = await Job.findById(jobId);
      if (job?.title) finalTitle = job.title;
    }

    // multer.diskStorage fields
    const resumeLocalPath = file.path; // absolute path
    const resumeRelPath = `/uploads/resumes/${file.filename}`; // public relative url if served as static
    const resumeMime = file.mimetype;
    const resumeSize = file.size;
    const originalName = file.originalname;

    const application = await Application.create({
      fullName: name,
      email: mail,
      phone: phoneNum,
      jobId: mongoose.isValidObjectId(jobId) ? jobId : null,
      jobTitle: finalTitle,
      resume: {
        originalName,
        mimeType: resumeMime,
        size: resumeSize,
        url: resumeRelPath,
        path: resumeLocalPath,
      },
    });

    const BRAND = "Ashaali Hospital";
    // const TAGLINE = "Hospital in Lucknow";
    const FROM = `"${BRAND}" <${process.env.ADMIN_EMAIL}>`;
    const submittedAt = formatDateIST(application.createdAt);

    // Build proxy download URL
    const APP_BASE = (process.env.APP_BASE_URL || "").replace(/\/$/, "");
    const resumeDownloadUrl = `${APP_BASE || ""}/api/career/applications/${application._id}/resume`;

    // Admin mail with local attachment
    const adminMail = {
      from: FROM,
      to: process.env.ADMIN_EMAIL,
      replyTo: `${application.fullName} <${application.email}>`,
      subject: `📄 New Application Received - ${application.jobTitle}`,
      html: adminEmailHtml(BRAND, TAGLINE, application, submittedAt, resumeDownloadUrl),
      attachments: [],
    };

    // Attach the file from disk
    try {
      if (fs.existsSync(resumeLocalPath)) {
        adminMail.attachments.push({
          filename: originalName || `resume-${application._id}`,
          path: resumeLocalPath,
        });
      } else {
        console.warn("Resume file missing at path:", resumeLocalPath);
      }
    } catch (e) {
      console.error("Attach resume error:", e);
    }

    const applicantMail = {
      from: FROM,
      to: application.email,
      replyTo: process.env.ADMIN_EMAIL,
      subject: `✅ Application Received - ${BRAND}`,
      html: applicantEmailHtml(BRAND, TAGLINE, application, submittedAt),
    };

    transporter.sendMail(adminMail).catch((e) => console.error("Admin mail error:", e));
    transporter.sendMail(applicantMail).catch((e) => console.error("Applicant mail error:", e));

    return res.status(201).json({
      message: "Application submitted successfully.",
      application,
      resumeRelPath,
      resumeDownloadUrl,
    });
  } catch (error) {
    console.error("saveApplication error:", error);
    return res.status(500).json({ message: "Failed to submit application", error: error.message });
  }
};

// GET /api/career/applications
export const getApplications = async (_req, res) => {
  try {
    const APP_BASE = (process.env.APP_BASE_URL || "").replace(/\/$/, "");
    const apps = await Application.find().sort({ createdAt: -1 });

    const rows = apps.map((a) => {
      const id = a._id?.toString();
      const download = APP_BASE ? `${APP_BASE}/api/career/applications/${id}/resume` : `/api/career/applications/${id}/resume`;
      const view = `${download}?inline=1`;
      return {
        ...a.toObject(),
        resumeDownloadUrl: download,
        resumeViewUrl: view,
      };
    });

    return res.status(200).json({ total: rows.length, rows });
  } catch (error) {
    console.error("getApplications error:", error);
    return res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

// GET /api/career/applications/:id/resume
export const downloadApplicationResume = async (req, res) => {
  try {
    const { id } = req.params;
    const inline = String(req.query.inline || "").toLowerCase() === "1" || String(req.query.inline || "").toLowerCase() === "true";

    if (!mongoose.isValidObjectId(id)) return res.status(400).send("Invalid application id");

    const app = await Application.findById(id);
    if (!app || !app.resume?.path) return res.status(404).send(""); // No resume upload found 

    const filePath = app.resume.path;
    if (!fs.existsSync(filePath)) return res.status(404).send("Resume file missing on server");

    const stat = fs.statSync(filePath);
    const total = stat.size;
    const range = req.headers.range;
    const filename = app.resume.originalName || `resume-${id}`;
    const contentType = app.resume.mimeType || mime.getType(filePath) || "application/octet-stream";

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      if (start >= total || end >= total) {
        res.setHeader("Content-Range", `bytes */${total}`);
        return res.status(416).send("Requested range not satisfiable");
      }
      const chunkSize = (end - start) + 1;
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
        "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${encodeURIComponent(filename)}"`,
      });
      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
      stream.on("error", (err) => {
        console.error("Stream error:", err);
        res.end();
      });
    } else {
      res.writeHead(200, {
        "Content-Length": total,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Cache-Control": "private, max-age=300",
        "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${encodeURIComponent(filename)}"`,
      });
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on("error", (err) => {
        console.error("Stream error:", err);
        res.end();
      });
    }
  } catch (error) {
    console.error("downloadApplicationResume error:", error);
    return res.status(500).send("Internal server error");
  }
};
