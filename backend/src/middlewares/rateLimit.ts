import rateLimit from "express-rate-limit";

export const emailRateLimiter = rateLimit({
  windowMs: 60 * 60 * 100, // 1 hour
  max: 10, // Limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
