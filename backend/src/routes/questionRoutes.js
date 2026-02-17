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

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Quiz question management
 */

/**
 * @swagger
 * /questions/all:
 *   get:
 *     summary: Retrieve all quiz questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of quiz questions
 */
// Public routes
router.get("/all", getAllQuestions);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get a single question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A question object
 *       404:
 *         description: Question not found
 */
router.get("/:id", getQuestionById);

// Answer validation
/**
 * @swagger
 * /questions/validate:
 *   post:
 *     summary: Validate an answer for a question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [questionId, selectedAnswer]
 *             properties:
 *               questionId:
 *                 type: string
 *               selectedAnswer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Validation result
 */
router.post("/validate", validateAnswer);

// Admin route (later, add auth middleware)
/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question (admin only)
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Question created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", protect, adminOnly, createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question by ID (admin only)
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put("/:id", protect, adminOnly, updateQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question by ID (admin only)
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete("/:id", protect, adminOnly, deleteQuestion);

export default router;
