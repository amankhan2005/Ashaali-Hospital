 // middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

// 📁 Create uploads/blogs directory inside project root
const uploadsDir = path.join(process.cwd(), "uploads", "blogs");
fs.mkdirSync(uploadsDir, { recursive: true });

// 🧹 Sanitize filename
const sanitize = (s = "") =>
  s.replace(/[^a-z0-9.\-_]/gi, "_").slice(0, 200);

// ⚙️ Storage engine
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname) || "";
    const base = path.basename(file.originalname, ext);
    const name = `${Date.now()}-${sanitize(base)}${ext}`;
    cb(null, name);
  },
});

// ✅ Allow image file types
const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Unsupported file type. Only JPG, PNG, WEBP allowed."), false);
};

// 🚀 Create multer instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

export default upload;
