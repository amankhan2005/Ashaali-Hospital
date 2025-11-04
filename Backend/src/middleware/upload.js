 import multer from "multer";
import path from "path";
import fs from "fs";

// uploads/resumes directory inside project root
const uploadsDir = path.join(process.cwd(), "uploads", "resumes");
fs.mkdirSync(uploadsDir, { recursive: true });

// sanitize filename
const sanitize = (s = "") =>
  s.replace(/[^a-z0-9.\-_]/gi, "_").slice(0, 200);

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

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Unsupported file type"), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

export default upload;
