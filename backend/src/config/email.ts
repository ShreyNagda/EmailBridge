import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
  family: 4, // Force IPv4
  connectionTimeout: 10000, // 10 seconds
  debug: true, // Show debug output
  logger: true, // Log information to console
} as SMTPTransport.Options);
