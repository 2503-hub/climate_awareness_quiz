import express from "express";
import { generateReport } from "../controllers/reportController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Admin quiz reporting
 */

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Generate report data (admin only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       403:
 *         description: Forbidden
 */
router.get("/", protect, adminOnly, generateReport);

export default router;
