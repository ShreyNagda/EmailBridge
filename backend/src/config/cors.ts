import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const corsOptions: cors.CorsOptions = {
  origin: true, // Allow all origins (or use "*" but true is often better for credentials)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
