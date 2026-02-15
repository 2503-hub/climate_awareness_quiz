import transporter from "../config/mailer.js";

export const sendVerificationEmail = async (email, link) => {
  await transporter.sendMail({
    from: `"Eco mind Platform" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your account",
    html: `
      <h2>Welcome!</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${link}">Verify Email</a>
    `,
  });
};
