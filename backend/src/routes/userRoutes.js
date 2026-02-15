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

// Current user profile
router.get("/profile", protect, getProfile);
//  update own profile
router.put("/profile", protect, updateProfile);

// Admin routes
router.get("/", protect, adminOnly, getAllUsers);
router.put("/:id", protect, adminOnly, updateUser);
router.put("/deactivate/:id", protect, adminOnly, deactivateUser);

export default router;
