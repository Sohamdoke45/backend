import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import jwt from "jsonwebtoken";
import studentRoutes from "./routes/studentRoutes.js";
import Student from "./models/Student.js";



const SECRET_KEY = "your_secret_key";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided" });
  // Support Bearer token format
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};



// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/school", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));





app.use("/api/auth", authRoutes);
// All /api/students routes are protected and handled in studentRoutes.js
app.use("/api/students", authMiddleware, studentRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
