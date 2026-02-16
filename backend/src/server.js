import dotenv from "dotenv";
dotenv.config(); // Always first

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(
  cors({
    origin:"https://climate-awareness-quiz-frontend.onrender.com",
    credentials: true,
  })
);

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/reports", reportRoutes);

// Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Catch-all 404 (keep this LAST)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================= START SERVER AFTER DB =================
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

export default app;
