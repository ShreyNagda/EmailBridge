import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { transporter } from "../config/email";
import User from "../models/User";
import { sanitizeInput } from "../utils/sanitize";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const body = req.body;

    // Check if clientId exists in DB
    const user = await User.findOne({ clientId });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Client ID" });
    }

    if (!user.isAcceptingEmails) {
      return res.status(403).json({
        success: false,
        message: "This endpoint is currently not accepting submissions.",
      });
    }

    const requestOrigin = req.headers.origin;
    if (
      user.allowedOrigins &&
      user.allowedOrigins.length > 0 &&
      requestOrigin
    ) {
      const isAllowed = user.allowedOrigins.some(
        (origin) => origin === requestOrigin || origin === requestOrigin + "/"
      );
      if (!isAllowed) {
        return res.status(403).json({
          success: false,
          message: `Origin ${requestOrigin} is not allowed`,
        });
      }
    }

    const receiverEmails = user.targetEmails;

    if (!receiverEmails || receiverEmails.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No target emails configured" });
    }

    // Construct email content dynamically
    let emailContent = `You have received a new submission:\n\n`;
    emailContent += `Website Origin: ${req.headers.origin || "Unknown"}\n`;
    emailContent += `Timestamp: ${new Date().toISOString()}\n\n`;
    emailContent += `--- Submission Data ---\n`;

    for (const [key, value] of Object.entries(body)) {
      // Skip internal or empty keys if necessary, but user said "anything"
      const sanitizedValue =
        typeof value === "string"
          ? sanitizeInput(value)
          : JSON.stringify(value);
      emailContent += `${
        key.charAt(0).toUpperCase() + key.slice(1)
      }: ${sanitizedValue}\n`;
    }

    // Determine Reply-To and From Name
    const replyToEmail =
      body.email && typeof body.email === "string" ? body.email : undefined;
    const senderName =
      body.name && typeof body.name === "string"
        ? sanitizeInput(body.name)
        : "Form Submission";

    // Construct email
    const mailOptions = {
      from: `"${senderName}" <${process.env.EMAIL_USER}>`,
      replyTo: replyToEmail,
      to: receiverEmails,
      subject: `New Submission from ${req.headers.origin || "Unknown Origin"}`,
      text: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
