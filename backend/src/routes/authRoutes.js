import express from "express";
import { register, login, verifyEmail } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../validators/authSchema.js";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and email verification
 */

// Registration with validation
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", validate(registerSchema), register);

// Login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

// Email verification
/**
 * @swagger
 * /auth/verify/{token}:
 *   get:
 *     summary: Verify a user's email token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Invalid or expired token
 */
router.get("/verify/:token", verifyEmail);


export default router;
