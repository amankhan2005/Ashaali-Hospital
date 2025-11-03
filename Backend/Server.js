//  import express from 'express'; 
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';

// import doctorRoutes from './src/routes/doctors.routes.js'; 
// import galleryRoutes from './src/routes/gallery.routes.js';
// import blogRoutes from './src/routes/blog.routes.js'; 
// import contactRoutes from './src/routes/contact.routes.js'; 
// import appointmentRoutes from './src/routes/appointment.routes.js'; // ✅ Added appointment route

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // ✅ Middleware
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://ashaali-hospital-lko.netlify.app","http://localhost:5174","https://ashaali-adminpage.netlify.app"
// ];

// // app.use(cors({
// //   origin: (origin, callback) => {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error("Not allowed by CORS"));
// //     }
// //   },
// //   methods: ["GET", "POST", "PATCH", "DELETE"],
// //   credentials: true
// // }));

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // ✅ added PUT
//   credentials: true
// }));


// // ✅ Parse request body
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Serve uploads folder
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Connect to MongoDB
// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MONGODB CONNECTED SUCCESSFULLY 🚀🚀🚀");
//   } catch (error) {
//     console.log("MONGODB CONNECTION FAILED ❌❌❌", error);
//   }
// })();

 

// // ✅ Routes
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/contact", contactRoutes); 
// app.use("/api/appointments", appointmentRoutes); // ✅ Appointment route added

// // ✅ Default route
// app.get("/", (req, res) => {
//   res.send("Doctor, Gallery, Blog, Contact & Appointment API is running 🚀");
// });

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import doctorRoutes from './src/routes/doctors.routes.js'; 
import departmentRoutes from './src/routes/department.routes.js'; 
import galleryRoutes from './src/routes/gallery.routes.js';
import blogRoutes from './src/routes/blog.routes.js'; 
import contactRoutes from './src/routes/contact.routes.js'; 
import appointmentRoutes from './src/routes/appointment.routes.js';
import careerRoutes from "./src/routes/career.routes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Middleware --------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://ashaali-hospital-lko.netlify.app",
  "http://localhost:5174",
  "https://ashaali-adminpage.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  credentials: true
}));

// Parse JSON & URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads/resumes", express.static("uploads/resumes"));
app.use("/api/career", careerRoutes);// -------------------- MongoDB --------------------
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY 🚀"))
  .catch(err => console.log("MONGODB CONNECTION FAILED ❌", err));

// -------------------- Routes --------------------
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req,res) => {
  res.send("Doctor, Gallery, Blog, Contact & Appointment API is running 🚀");
});

// -------------------- Error Handling --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message === "Not allowed by CORS") return res.status(403).json({ error: err.message });
  res.status(500).json({ error: "Something went wrong!" });
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
