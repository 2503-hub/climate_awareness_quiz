import crypto from "crypto";
import Token from "../models/Token.js";

/**
 * Create and store an email verification token
 */
export const createEmailVerificationToken = async (userId) => {
  const token = crypto.randomBytes(32).toString("hex");

  await Token.create({
    userId,
    token,
  });

  return token;
};

/**
 * Verify token and return associated userId
 */
export const verifyEmailToken = async (token) => {
  const tokenDoc = await Token.findOne({ token });

  if (!tokenDoc) {
    throw new Error("Invalid or expired token");
  }

  return tokenDoc;
};

/**
 * Delete token after successful verification
 */
export const deleteEmailToken = async (tokenId) => {
  if (!tokenId) return;
  await Token.findByIdAndDelete(tokenId);
};
