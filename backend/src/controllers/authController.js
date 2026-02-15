import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import {
  createEmailVerificationToken,
  verifyEmailToken,
  deleteEmailToken,
} from "../services/tokenService.js";
import { sendVerificationEmail } from "../services/emailService.js";
import { JWT_SECRET } from "../config/jwt.js";

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const { name,email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // create verification token via service
    const token = await createEmailVerificationToken(user._id);

    const link = `${process.env.SERVER_URL}/api/auth/verify/${token}`;
    await sendVerificationEmail(email, link);

    res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * VERIFY EMAIL
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const tokenDoc = await verifyEmailToken(token);

    await User.findByIdAndUpdate(tokenDoc.userId, {
      isVerified: true,
    });

    await deleteEmailToken(tokenDoc._id);

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });
    console.log("Database says isVerified is:", user.isVerified);
    if (!user.isVerified === false){
      return res.status(401).json({ message: "Email not verified" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, 
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};