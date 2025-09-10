 import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import doctorRoutes from './src/routes/doctors.routes.js'; 
import galleryRoutes from './src/routes/gallery.routes.js'; // ✅ import gallery routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET','POST','PATCH','DELETE'],
//   credentials: true
// }));
// app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",                     // Dev frontend
  "https://ashaali-hospital-lko.netlify.app"  // Production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// ✅ Serve uploads folder (required for multer temporary files)
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB
(async () => {
  try {
    // FIXED: Removed /${DB_NAME}
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY 🚀🚀🚀");
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED ❌❌❌", error);
  }
})();

// ✅ Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/gallery", galleryRoutes); // ✅ add gallery routes

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Doctor & Gallery API is running 🚀");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
