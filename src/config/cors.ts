import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
