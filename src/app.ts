import express from "express";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/cors";
import emailRoutes from "./routes/email.routes";

const app = express();

// Security Headers
app.use(helmet());

// CORS
app.use(cors(corsOptions));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", emailRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Email Service is running");
});

export default app;
