 // controllers/career.controller.js
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/job.model.js";
import Application from "../models/Application.model.js";

/* --- keep your existing transporter + helpers (isValidEmail, isValidPhoneIN, formatDateIST, etc.) --- */

const isCloudinaryUrl = (u = "") => /^https?:\/\/res\.cloudinary\.com\//i.test(u);

// Try to extract public_id from Cloudinary URL if multer didn't give us file.filename
const extractPublicIdFromCloudinaryPath = (cloudPath = "") => {
  // examples:
  // https://res.cloudinary.com/<cloud>/raw/upload/v1726164084/resumes/176...-aman-developer.pdf
  // public_id should be: resumes/176...-aman-developer
  try {
    const noQuery = cloudPath.split("?")[0];
    const parts = noQuery.split("/raw/upload/");
    if (parts.length < 2) return null;
    const tail = parts[1];                 // e.g. v1726164084/resumes/xxx.pdf
    const afterVersion = tail.replace(/^v\d+\//, ""); // resumes/xxx.pdf
    return afterVersion.replace(/\.[^.]+$/, "");      // remove extension
  } catch {
    return null;
  }
};

const buildLinksForCloudinary = (file) => {
  const publicLink = file.path; // whatever Cloudinary gave (may 401)
  const originalExt =
    (file.originalname?.split(".").pop() || "pdf").toLowerCase();

  const publicId =
    file.filename /* multer-storage-cloudinary public_id */ ||
    extractPublicIdFromCloudinaryPath(file.path);

  if (!publicId) {
    // cannot build signed links without public_id
    return { publicLink, signedDownload: null, signedAuth: null };
  }

  // Signed download link (works with 'private' resources)
  const signedDownload = cloudinary.utils.private_download_url(
    publicId,
    originalExt,
    {
      resource_type: "raw",
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      attachment: file.originalname || `resume.${originalExt}`,
    }
  );

  // Signed authenticated URL (works with 'authenticated' delivery)
  const signedAuth = cloudinary.url(publicId, {
    resource_type: "raw",
    type: "authenticated",
    sign_url: true,
    // optional: force download
    // flags: "attachment",  // only for images/video transformations, ignore for raw
  });

  return { publicLink, signedDownload, signedAuth };
};

export const saveApplication = async (req, res) => {
  try {
    const { fullName, email, phone, jobId, jobTitle } = req.body || {};
    const file = req.file;

    if (!fullName || !email || !phone || (!jobId && !jobTitle)) {
      return res
        .status(400)
        .json({ message: "fullName, email, phone and either jobId or jobTitle are required" });
    }
    if (!file) return res.status(400).json({ message: "Resume file is required (PDF/DOC/DOCX, max 5MB)" });

    const name = String(fullName).trim();
    const mail = String(email).trim().toLowerCase();
    const phoneNum = String(phone).trim();
    const desiredTitle = (jobTitle ? String(jobTitle).trim() : "") || "Other";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))
      return res.status(400).json({ message: "Invalid email format" });
    if (!/^[6-9]\d{9}$/.test(phoneNum))
      return res.status(400).json({ message: "Invalid phone number. Use 10-digit Indian mobile starting with 6–9." });

    // resolve job
    let jobRef = null;
    let finalTitle = desiredTitle;
    if (jobId) {
      if (!mongoose.isValidObjectId(jobId))
        return res.status(400).json({ message: "Invalid jobId" });
      jobRef = await Job.findById(jobId);
      if (!jobRef) return res.status(404).json({ message: "Job not found" });
      finalTitle = jobRef.title || finalTitle;
    }

    const isUrl = /^https?:\/\//i.test(file.path || "");
    const safeFilename =
      file.originalname || (file.filename ? `${file.filename}.pdf` : "resume.pdf");

    const application = await Application.create({
      fullName: name,
      email: mail,
      phone: phoneNum,
      jobId: jobRef ? jobRef._id : null,
      jobTitle: finalTitle,
      resume: {
        originalName: file.originalname || safeFilename,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        filename: file.filename,
      },
    });

    // ---------- Build brand + links ----------
    const BRAND = "Ashaali Hospital";
    const TAGLINE =
      "Best Orthopedic Surgeon, Eye Care, Obstetrician And Gynecologist, Neuro-spine Brain Hospital In Lucknow";
    const FROM = `"${BRAND}" <${process.env.ADMIN_EMAIL}>`;
    const submittedAt = new Date(application.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    let resumeLinkHTML = "<em>Attached below</em>";
    let attachments = [];

    if (!isUrl) {
      // Local disk -> attach file
      attachments = [
        {
          filename: safeFilename,
          path: path.resolve(application.resume.path),
          contentType: application.resume.mimeType,
        },
      ];
    } else if (isCloudinaryUrl(file.path)) {
      // Cloudinary -> include public + signed fallback links
      const { publicLink, signedDownload, signedAuth } = buildLinksForCloudinary(file);

      const prettyLinks = [];
      if (publicLink) {
        prettyLinks.push(
          `<a href="${publicLink}" target="_blank" style="color:#18978d;">View (public)</a>`
        );
      }
      if (signedDownload) {
        prettyLinks.push(
          `<a href="${signedDownload}" target="_blank" style="color:#18978d;">Download (signed)</a>`
        );
      }
      if (signedAuth) {
        prettyLinks.push(
          `<a href="${signedAuth}" target="_blank" style="color:#18978d;">Open (authenticated)</a>`
        );
      }
      resumeLinkHTML = prettyLinks.join(" &nbsp;|&nbsp; ");
    } else {
      // Some other remote URL
      resumeLinkHTML = `<a href="${file.path}" target="_blank" style="color:#18978d;">Open Resume</a>`;
    }

    // ---------- Emails ----------
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #18978d; margin: 0 0 8px;">${BRAND}</h2>
        <p style="margin: 0 0 4px;"><em>${TAGLINE}</em></p>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;" />
        <p>Dear <strong>Admin</strong>,</p>
        <p>A new job application has been submitted via the Careers page.</p>
        <p><strong>Name:</strong> ${application.fullName}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Position:</strong> ${application.jobTitle}</p>
        <p><strong>Submitted:</strong> ${submittedAt}</p>
        <p><strong>Resume:</strong> ${resumeLinkHTML}</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>${BRAND}</strong></p>
        <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
        <p style="font-size: 12px; color: #666;">
          This is an automated message from the ${BRAND} website. Please do not reply directly to this email.
        </p>
      </div>
    `;

    const applicantHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #18978d; margin: 0 0 8px;">${BRAND}</h2>
        <p style="margin: 0 0 4px;"><em>${TAGLINE}</em></p>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;" />
        <p>Dear <strong>${application.fullName}</strong>,</p>
        <p>
          Thank you for applying to <strong>${BRAND}</strong>. We have successfully received your application
          for the role of <strong>${application.jobTitle}</strong>.
        </p>
        <p><strong>Submitted:</strong> ${submittedAt}</p>
        <p>Our HR team will review your profile and contact you if your qualifications match our current openings.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>${BRAND} HR Team</strong></p>
        <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
        <p style="font-size: 12px; color: #666;">
          This is an automated message from the ${BRAND} website. Please do not reply directly to this email.
        </p>
      </div>
    `;

    // Send mails
    await transporter.sendMail({
      from: `"${BRAND}" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: `${application.fullName} <${application.email}>`,
      subject: `📄 New Application Received - ${application.jobTitle}`,
      html: adminHtml,
      attachments, // only for local files
    }).catch(e => console.error("❌ Admin mail error:", e?.message || e));

    await transporter.sendMail({
      from: `"${BRAND}" <${process.env.ADMIN_EMAIL}>`,
      to: application.email,
      replyTo: process.env.ADMIN_EMAIL,
      subject: `✅ Application Received - ${BRAND}`,
      html: applicantHtml,
    }).catch(e => console.error("❌ Applicant mail error:", e?.message || e));

    return res.status(201).json({ message: "Application submitted successfully.", application });
  } catch (error) {
    console.error("saveApplication error:", error);
    return res.status(500).json({ message: "Failed to submit application", error: error.message });
  }
};
