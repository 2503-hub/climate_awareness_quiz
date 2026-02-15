import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  validateAnswer,
  updateQuestion,
  deleteQuestion,

} from "../controllers/questionController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/all", getAllQuestions);
router.get("/:id", getQuestionById);

// Answer validation
router.post("/validate", validateAnswer);

// Admin route (later, add auth middleware)
router.post("/", protect, adminOnly, createQuestion);
router.put("/:id", protect, adminOnly, updateQuestion);
router.delete("/:id", protect, adminOnly, deleteQuestion);

export default router;
