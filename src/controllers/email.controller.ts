import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { transporter, CLIENT_EMAILS } from "../config/email";
import { sanitizeInput } from "../utils/sanitize";

const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  clientId: z.string().min(1, "Client ID is required"),
});

export const sendEmail = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = emailSchema.parse(req.body);

    const { name, email, phone, message, clientId } = validatedData;

    // Check if clientId exists
    const receiverEmail = CLIENT_EMAILS[clientId];
    if (!receiverEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Client ID" });
    }

    // Sanitize inputs
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedName = sanitizeInput(name);
    const sanitizedPhone = phone ? sanitizeInput(phone) : "";

    // Construct email
    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`, // Sender address (must be authenticated user for Gmail usually, but we can set name)
      replyTo: email,
      to: receiverEmail,
      subject: `New Contact Form Submission from ${
        req.headers.origin || "Unknown Origin"
      }`,
      text: `
        You have received a new message:

        Name: ${sanitizedName}
        Email: ${email}
        Phone: ${sanitizedPhone || "N/A"}
        Website Origin: ${req.headers.origin || "Unknown"}
        Timestamp: ${new Date().toISOString()}

        Message:
        ${sanitizedMessage}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors.map((e) => e.message).join(", "),
      });
    }
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
