import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reportRoutes from "./routes/reportRoutes.js"; // add reports route
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

//CORS: allow frontend origin and credentials
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
  credentials: true,
}));

//Body parser
app.use(express.json());

//API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/reports", reportRoutes); // admin reports




//Error handler (last middleware)
app.use(errorHandler);

export default app;
