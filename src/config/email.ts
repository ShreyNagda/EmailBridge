import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const CLIENT_EMAILS: Record<string, string> = {
  "finance-site": "finance.consult@gmail.com",
  "real-estate": "homeseller.agent@gmail.com",
};
