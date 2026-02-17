import express from "express";
import {
  getAllUsers,
  updateUser,
  deactivateUser,
  getProfile,
  updateProfile
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and admin user management
 */

// Current user profile
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", protect, getProfile);
//  update own profile
/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */
router.put("/profile", protect, updateProfile);

// Admin routes
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get("/", protect, adminOnly, getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID (admin only)
 *     tags: [Users]
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
 *         description: User updated
 *       403:
 *         description: Forbidden
 */
router.put("/:id", protect, adminOnly, updateUser);

/**
 * @swagger
 * /user/deactivate/{id}:
 *   put:
 *     summary: Deactivate a user by ID (admin only)
 *     tags: [Users]
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
 *         description: User deactivated
 *       403:
 *         description: Forbidden
 */
router.put("/deactivate/:id", protect, adminOnly, deactivateUser);

export default router;
