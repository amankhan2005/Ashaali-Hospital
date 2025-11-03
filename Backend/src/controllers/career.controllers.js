 import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Job from "../models/job.model.js";
import Application from "../models/Application.model.js";

/* ----------------------------- EMAIL SETUP ----------------------------- */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD, // Gmail App Password / App Password
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 50,
});

transporter.verify()
  .then(() => console.log("✅ SMTP ready"))
  .catch((e) => console.error("❌ SMTP verify failed:", e?.message || e));

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
const adminEmailHtml = (brand, tagline, app, submittedAt) => `
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
    ${
      app?.resume?.url
        ? `<p><strong>Resume Link:</strong> <a href="${app.resume.url}" target="_blank" style="color:#18978d;">View Resume</a></p>`
        : `<p>Resume not available.</p>`
    }
    <br/>
    <p>Best Regards,</p>
    <p><strong>${brand}</strong></p>
    <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
    <p style="font-size: 12px; color: #666;">
      This is an automated message from the ${brand} website. Please do not reply directly to this email.
    </p>
  </div>
`;

const applicantEmailHtml = (brand, tagline, app, submittedAt) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #18978d; margin: 0 0 8px;">${brand}</h2>
    <p style="margin: 0 0 4px;"><em>${tagline}</em></p>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;" />
    <p>Dear <strong>${app.fullName}</strong>,</p>
    <p>Thank you for applying to <strong>${brand}</strong>. We have successfully received your application
      for the role of <strong>${app.jobTitle}</strong>.</p>
    <p><strong>Submitted:</strong> ${submittedAt}</p>
    <p>Our HR team will review your profile and contact you if your qualifications match our current openings.</p>
    <p>We appreciate your interest in joining our team at <strong>${brand}</strong>.</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>${brand} HR Team</strong></p>
    <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
    <p style="font-size: 12px; color: #666;">
      This is an automated message from the ${brand} website. Please do not reply directly to this email.
    </p>
  </div>
`;

/* ------------------------------ CONTROLLERS ---------------------------- */

// Get all jobs (you can add { isActive: true } if needed)
export const getPositions = async (_req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("getPositions error:", error);
    return res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

export const addPosition = async (req, res) => {
  try {
    const { title, department = "", location = "", type = "Full-time", description = "", isActive = true } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

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

// Save application (Cloudinary link included)
export const saveApplication = async (req, res) => {
  try {
    const { fullName, email, phone, jobId, jobTitle } = req.body || {};
    const file = req.file; // multer-storage-cloudinary result

    if (!fullName || !email || !phone || (!jobId && !jobTitle)) {
      return res.status(400).json({ message: "fullName, email, phone and either jobId or jobTitle are required" });
    }
    if (!file) {
      return res.status(400).json({ message: "Resume file is required (PDF/DOC/DOCX, max 5MB)" });
    }

    const name = fullName.trim();
    const mail = email.trim().toLowerCase();
    const phoneNum = phone.trim();

    if (!isValidEmail(mail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!isValidPhoneIN(phoneNum)) {
      return res.status(400).json({ message: "Invalid phone number. Must be 10-digit starting with 6–9." });
    }

    // Resolve job title from ID (optional)
    let finalTitle = (jobTitle ? jobTitle.trim() : "") || "Other";
    if (jobId && mongoose.isValidObjectId(jobId)) {
      const job = await Job.findById(jobId);
      if (job?.title) finalTitle = job.title;
    }

    // From multer-storage-cloudinary:
    // file.path     => secure_url (https://res.cloudinary.com/.../raw/upload/...)
    // file.filename => public_id
    const resumeUrl = file?.path;          // secure Cloudinary URL
    const resumePublicId = file?.filename; // public_id (for deletion if needed)
    const resumeMime = file?.mimetype;
    const resumeSize = file?.size;
    const originalName = file?.originalname;

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
        url: resumeUrl,          // <-- store the Cloudinary URL
        path: resumeUrl,         // backward compatibility (if UI is reading path)
        publicId: resumePublicId // <-- store public_id too
      },
    });

    const BRAND = "Ashaali Hospital";
    const TAGLINE =
      "Best Orthopedic Surgeon, Eye Care, Obstetrician And Gynecologist, Neuro-spine Brain Hospital In Lucknow";
    const FROM = `"${BRAND}" <${process.env.ADMIN_EMAIL}>`;
    const submittedAt = formatDateIST(application.createdAt);

    // Admin mail with clickable Cloudinary link
    const adminMail = {
      from: FROM,
      to: process.env.ADMIN_EMAIL,
      replyTo: `${application.fullName} <${application.email}>`,
      subject: `📄 New Application Received - ${application.jobTitle}`,
      html: adminEmailHtml(BRAND, TAGLINE, application, submittedAt),
      attachments: [], // Cloudinary link hai, attachment nahi bhej rahe
    };

    // Applicant confirmation
    const applicantMail = {
      from: FROM,
      to: application.email,
      replyTo: process.env.ADMIN_EMAIL,
      subject: `✅ Application Received - ${BRAND}`,
      html: applicantEmailHtml(BRAND, TAGLINE, application, submittedAt),
    };

    // Send mails (best-effort)
    transporter.sendMail(adminMail).catch((e) => console.error("❌ Admin mail error:", e.message));
    transporter.sendMail(applicantMail).catch((e) => console.error("❌ Applicant mail error:", e.message));

    return res.status(201).json({
      message: "Application submitted successfully.",
      application,
      resumeUrl, // convenience field for your frontend
    });
  } catch (error) {
    console.error("saveApplication error:", error);
    return res.status(500).json({ message: "Failed to submit application", error: error.message });
  }
};

// Admin: list applications
export const getApplications = async (_req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    return res.status(200).json({ total: apps.length, rows: apps });
  } catch (error) {
    console.error("getApplications error:", error);
    return res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};
