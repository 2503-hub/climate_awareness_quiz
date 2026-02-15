import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Force load .env variables immediately
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // sometimes necessary for local dev
  },
});

// Optional: async test function
export const testMailer = async () => {
  try {
    await transporter.verify();
    console.log("Email system is ready!");
  } catch (error) {
    console.error("Email Credentials Missing or Invalid:", error.message);
  }
};

export default transporter;
