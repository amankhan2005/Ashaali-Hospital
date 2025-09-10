 import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import doctorRoutes from './src/routes/doctors.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET','POST','PATCH','DELETE'], credentials: true }));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected 🚀"))
  .catch(err => console.log("MongoDB error ❌", err));

// Routes
app.use("/api/doctors", doctorRoutes);

// Default route
app.get("/", (req, res) => res.send("Doctor API is running 🚀"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
