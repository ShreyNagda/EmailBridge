import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";
import emailRoutes from "./routes/email.routes";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./config/db";

// Connect to Database
connectDB();

const app = express();

// Security Headers
app.use(helmet());

// CORS
app.use(cors(corsOptions));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/", emailRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Email Service is running");
});

export default app;
