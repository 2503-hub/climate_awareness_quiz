import express from "express";
import { register, login, verifyEmail } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../validators/authSchema.js";


const router = express.Router();

// Registration with validation
router.post("/register", validate(registerSchema), register);

// Login
router.post("/login", login);

// Email verification
router.get("/verify/:token", verifyEmail);


export default router;
