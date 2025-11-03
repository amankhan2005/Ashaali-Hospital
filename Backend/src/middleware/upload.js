// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "doctors",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// export default upload;

// middleware/upload.js
 import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ---------- Helpers ----------
const sanitizeName = (name = "") =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9.\-_]/g, "");

// ---------- Resume storage (PDF/DOC/DOCX) ----------
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    // IMPORTANT: resumes need resource_type "raw"
    const original = sanitizeName(file.originalname || "resume.pdf");
    const base = original.replace(/\.(pdf|doc|docx)$/i, "");
    return {
      folder: "resumes",
      resource_type: "raw",
      allowed_formats: ["pdf", "doc", "docx"],
      public_id: `${Date.now()}-${base}`, // no extension; Cloudinary keeps it
    };
  },
});

// File filter for resumes
const resumeFileFilter = (_req, file, cb) => {
  const okMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!okMimes.includes(file.mimetype)) {
    return cb(new Error("Only PDF, DOC, DOCX files are allowed"));
  }
  cb(null, true);
};

// 5 MB limit
const resumeLimits = { fileSize: 5 * 1024 * 1024 };

// Default export: resume uploader
const upload = multer({
  storage: resumeStorage,
  fileFilter: resumeFileFilter,
  limits: resumeLimits,
});
export default upload;

// ----------------------------------------------------------------------
// OPTIONAL: image uploader (e.g., doctors/gallery) – resource_type "image"
// ----------------------------------------------------------------------
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    const original = sanitizeName(file.originalname || "image");
    const base = original.replace(/\.(jpe?g|png|webp|gif)$/i, "");
    return {
      folder: "images",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      public_id: `${Date.now()}-${base}`,
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    };
  },
});

const imageFileFilter = (_req, file, cb) => {
  const ok = /^image\/(jpe?g|png|webp|gif)$/.test(file.mimetype);
  if (!ok) return cb(new Error("Only image files are allowed"));
  cb(null, true);
};

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB
});
