import { Router } from "express";
import { sendEmail } from "../controllers/email.controller";
import { emailRateLimiter } from "../middlewares/rateLimit";

const router = Router();

router.post("/send-email", emailRateLimiter, sendEmail);

export default router;
