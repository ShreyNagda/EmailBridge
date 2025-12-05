import { Router } from "express";
import multer from "multer";
import { sendEmail } from "../controllers/email.controller";
import { emailRateLimiter } from "../middlewares/rateLimit";

const router = Router();
const upload = multer();

router.post("/:clientId", emailRateLimiter, upload.any(), sendEmail);

router.get("/:clientId", (req, res) => {
  res.status(405).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Method Not Allowed</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f3f4f6; }
        .container { text-align: center; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 400px; }
        h1 { color: #ef4444; margin-bottom: 1rem; }
        p { color: #374151; line-height: 1.5; }
        .code { background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Method Not Allowed</h1>
        <p>This endpoint only accepts <span class="code">POST</span> requests.</p>
        <p>Please send your data using JSON or FormData.</p>
      </div>
    </body>
    </html>
  `);
});

export default router;
